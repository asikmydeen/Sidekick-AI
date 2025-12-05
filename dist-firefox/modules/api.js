// modules/api.js
import { signRequest } from './aws.js';
import { getCurrentProviderCredentials } from './state.js';
import { InferenceClient } from '../lib/huggingface-inference.js';

export async function fetchModels(provider, credentials) {
  let url = '';
  let headers = {};
  let transform = (data) => [];

  switch (provider) {
    case 'openai':
      url = 'https://api.openai.com/v1/models';
      headers = { 'Authorization': `Bearer ${credentials.apiKey}` };
      transform = (data) => data.data.map(m => m.id).filter(id => id.startsWith('gpt')).sort();
      break;
    case 'openrouter':
      url = 'https://openrouter.ai/api/v1/models';
      headers = { 'Authorization': `Bearer ${credentials.apiKey}` };
      transform = (data) => data.data.map(m => m.id).sort();
      break;
    case 'huggingface':
      // Return some popular models as suggestions - users can add their own via manual entry
      // Format: model-name or model-name:provider (e.g., deepseek-ai/DeepSeek-V3:novita)
      return [
        'meta-llama/Llama-3.2-3B-Instruct',
        'meta-llama/Llama-3.1-8B-Instruct',
        'Qwen/Qwen2.5-72B-Instruct',
        'mistralai/Mistral-7B-Instruct-v0.3',
        'deepseek-ai/DeepSeek-R1-Distill-Qwen-32B',
        'google/gemma-2-9b-it'
      ];
    case 'anthropic':
      // Return common Anthropic models - users can add their own via manual entry
      return [
        'claude-sonnet-4-20250514',
        'claude-3-5-sonnet-20241022',
        'claude-3-5-haiku-20241022',
        'claude-3-opus-20240229',
        'claude-3-haiku-20240307'
      ];
    case 'ollama':
      const base = credentials.endpoint.replace(/\/$/, '');
      url = `${base}/api/tags`;
      transform = (data) => data.models.map(m => m.name);
      break;
    case 'bedrock':
      // ListFoundationModels
      const region = credentials.region || 'us-east-1';
      url = `https://bedrock.${region}.amazonaws.com/foundation-models?byOutputModality=TEXT`;
      const signedHeaders = await signRequest({
        method: 'GET',
        url,
        headers: { 'content-type': 'application/json' },
        accessKey: credentials.accessKey,
        secretKey: credentials.secretKey,
        sessionToken: credentials.sessionToken,
        region,
        service: 'bedrock'
      });
      headers = signedHeaders;
      transform = (data) => data.modelSummaries.map(m => m.modelId).sort();
      break;
    default:
      throw new Error('Unknown provider');
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API Error ${response.status}: ${errorData}`);
  }
  return transform(await response.json());
}

// Stream generator function
export async function* streamChatApi(state, newMsgContent, signal) {
  console.log('[DEBUG] streamChatApi called', { provider: state.provider, model: state.model });

  const { provider, model, temperature, systemPrompt } = state;
  const messages = state.sessions.find(s => s.id === state.currentSessionId)?.messages || [];

  console.log('[DEBUG] Getting credentials for provider:', provider);
  const credentials = getCurrentProviderCredentials();

  if (!credentials) {
    console.error('[DEBUG] No credentials found for provider:', provider);
    throw new Error(`No credentials configured for provider: ${provider}`);
  }

  console.log('[DEBUG] Credentials:', credentials);

  let url = '';
  let headers = { 'Content-Type': 'application/json' };

  // Prepare history
  const history = [];
  if (systemPrompt && provider !== 'bedrock') history.push({ role: 'system', content: systemPrompt });

  const rawMessages = messages.map(m => ({ role: m.role, content: m.content }));

  // Add the new user message
  rawMessages.push({ role: 'user', content: newMsgContent });

  if (provider === 'openai' || provider === 'openrouter') {
    if (credentials.apiKey) headers['Authorization'] = `Bearer ${credentials.apiKey}`;
    history.push(...rawMessages);

    url = provider === 'openai' ? 'https://api.openai.com/v1/chat/completions' : 'https://openrouter.ai/api/v1/chat/completions';
    const body = { model, messages: history, stream: true, temperature };

    const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal });
    if (!response.ok) throw new Error(await response.text());

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (line.startsWith('data: ') && !line.includes('[DONE]')) {
          try {
            const json = JSON.parse(line.replace('data: ', ''));
            const content = json.choices?.[0]?.delta?.content || '';
            if (content) yield content;
          } catch(e) {}
        }
      }
    }
  } else if (provider === 'ollama') {
    const base = credentials.endpoint ? credentials.endpoint.replace(/\/$/, '') : 'http://localhost:11434';
    url = `${base}/api/chat`;

    // Convert messages to Ollama format
    const ollamaMessages = rawMessages.map(msg => {
      if (Array.isArray(msg.content)) {
        let text = "";
        msg.content.forEach(part => {
          if (part.type === 'text') text += part.text;
        });
        return { role: msg.role, content: text };
      }
      return msg;
    });

    const body = { model, messages: ollamaMessages, stream: true };
    if (systemPrompt) body.system = systemPrompt;
    if (temperature !== undefined) body.options = { temperature };

    // Direct fetch - CORS bypassed via declarativeNetRequest Origin header rewrite
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama error ${response.status}: ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');
      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          if (json.message?.content) yield json.message.content;
        } catch (e) {
          // Ignore parse errors for incomplete chunks
        }
      }
    }
  } else if (provider === 'bedrock') {
     // Bedrock Non-Streaming (Simple Implementation for now)
     // To support streaming with AWS SigV4 via REST without SDK requires complex event-stream binary parsing.
     // Fallback to non-streaming invocation for stability.

     const region = credentials.region || 'us-east-1';
     url = `https://bedrock-runtime.${region}.amazonaws.com/model/${model}/converse`;

     const bedrockMessages = rawMessages.map(m => {
        const contentBlock = [];
        if (Array.isArray(m.content)) {
           m.content.forEach(c => {
             if (c.type === 'text') contentBlock.push({ text: c.text });
           });
        } else {
           contentBlock.push({ text: m.content });
        }
        return { role: m.role, content: contentBlock };
     });

     const bodyObj = {
       messages: bedrockMessages,
       inferenceConfig: { temperature, maxTokens: 2048 }
     };
     if (systemPrompt) bodyObj.system = [{ text: systemPrompt }];

     const body = JSON.stringify(bodyObj);
     const signedHeaders = await signRequest({
        method: 'POST',
        url,
        headers: { 'content-type': 'application/json' },
        body,
        accessKey: credentials.accessKey,
        secretKey: credentials.secretKey,
        sessionToken: credentials.sessionToken,
        region,
        service: 'bedrock'
     });

     const response = await fetch(url, { method: 'POST', headers: signedHeaders, body, signal });
     if (!response.ok) throw new Error(await response.text());

     const json = await response.json();
     const text = json.output?.message?.content?.[0]?.text || '';
     yield text;
  } else if (provider === 'huggingface') {
    // Hugging Face Router API - OpenAI-compatible endpoint
    // Supports multiple providers with format: model-name or model-name:provider
    // e.g., "meta-llama/Llama-3.2-3B-Instruct" or "deepseek-ai/DeepSeek-V3:novita"
    url = 'https://router.huggingface.co/v1/chat/completions';

    // Convert messages to OpenAI format
    const hfMessages = rawMessages.map(m => {
      const txt = Array.isArray(m.content) ? m.content.find(c => c.type === 'text')?.text : m.content;
      return { role: m.role, content: txt };
    });

    // Add system prompt if provided
    if (systemPrompt) {
      hfMessages.unshift({ role: 'system', content: systemPrompt });
    }

    const hfBody = {
      model,
      messages: hfMessages,
      max_tokens: 2048,
      temperature,
      stream: true
    };

    const hfRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentials.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hfBody),
      signal
    });

    if (!hfRes.ok) {
      const errorText = await hfRes.text();
      if (hfRes.status === 404 || hfRes.status === 422) {
        throw new Error(`Model "${model}" not found. Check the model name and provider format.`);
      }
      throw new Error(`Hugging Face API error (${hfRes.status}): ${errorText}`);
    }

    // Stream the response (OpenAI-compatible SSE format)
    const reader = hfRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ') && !line.includes('[DONE]')) {
          try {
            const json = JSON.parse(line.replace('data: ', ''));
            const content = json.choices?.[0]?.delta?.content || '';
            if (content) yield content;
          } catch (e) {
            // Ignore parse errors for incomplete chunks
          }
        }
      }
    }
  }
}

// ===== HuggingFace Multi-Modal Tasks =====

/**
 * Text-to-Image generation using HuggingFace Inference Client
 * Returns a base64 data URL of the generated image
 * @param {string} provider - 'auto', 'fal-ai', 'hf-inference', 'replicate', etc.
 */
export async function textToImage(model, prompt, apiKey, options = {}) {
  const client = new InferenceClient(apiKey);
  const provider = options.provider || 'auto';

  const blob = await client.textToImage({
    provider: provider,
    model: model,
    inputs: prompt,
    parameters: {
      guidance_scale: options.guidanceScale || 7.5,
      num_inference_steps: options.steps || 5,
      width: options.width || 512,
      height: options.height || 512,
      negative_prompt: options.negativePrompt || ''
    }
  });

  // Convert Blob to base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Image-to-Image transformation using HuggingFace Inference Client
 * Returns a base64 data URL of the transformed image
 * @param {string} provider - 'auto', 'fal-ai', 'hf-inference', 'replicate', etc.
 */
export async function imageToImage(model, imageData, prompt, apiKey, options = {}) {
  const client = new InferenceClient(apiKey);
  const provider = options.provider || 'fal-ai'; // fal-ai works best for most image-to-image models

  // Convert base64 data URL to Blob if needed
  let imageBlob;
  if (typeof imageData === 'string' && imageData.startsWith('data:')) {
    const base64 = imageData.split(',')[1];
    const mimeType = imageData.split(';')[0].split(':')[1] || 'image/png';
    const binaryData = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    imageBlob = new Blob([binaryData], { type: mimeType });
  } else if (imageData instanceof Blob) {
    imageBlob = imageData;
  } else {
    imageBlob = new Blob([imageData], { type: 'image/png' });
  }

  const blob = await client.imageToImage({
    provider: provider,
    model: model,
    inputs: imageBlob,
    parameters: {
      prompt: prompt,
      guidance_scale: options.guidanceScale || 7.5,
      num_inference_steps: options.steps || 25,
      strength: options.strength || 0.8,
      negative_prompt: options.negativePrompt || ''
    }
  });

  // Convert Blob to base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Image-to-Text (image captioning) using HuggingFace Inference Client
 * Returns a text description of the image
 * @param {string} provider - 'auto', 'fal-ai', 'hf-inference', 'replicate', etc.
 */
export async function imageToText(model, imageData, apiKey, options = {}) {
  const client = new InferenceClient(apiKey);
  const provider = options.provider || 'auto';

  // Convert base64 data URL to Blob if needed
  let imageBlob;
  if (typeof imageData === 'string' && imageData.startsWith('data:')) {
    const base64 = imageData.split(',')[1];
    const mimeType = imageData.split(';')[0].split(':')[1];
    const binaryData = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    imageBlob = new Blob([binaryData], { type: mimeType });
  } else if (imageData instanceof Blob) {
    imageBlob = imageData;
  } else {
    imageBlob = new Blob([imageData]);
  }

  const result = await client.imageToText({
    provider: provider,
    model: model,
    data: imageBlob
  });

  return result.generated_text || JSON.stringify(result);
}

/**
 * Text-to-Speech using HuggingFace Inference Client
 * Returns a base64 data URL of the generated audio
 * @param {string} provider - 'auto', 'fal-ai', 'hf-inference', 'replicate', etc.
 */
export async function textToSpeech(model, text, apiKey, options = {}) {
  const client = new InferenceClient(apiKey);
  const provider = options.provider || 'auto';

  const blob = await client.textToSpeech({
    provider: provider,
    model: model,
    inputs: text
  });

  // Convert Blob to base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Speech-to-Text (ASR) using HuggingFace Inference Client
 * Returns transcribed text
 * @param {string} provider - 'auto', 'fal-ai', 'hf-inference', 'replicate', etc.
 */
export async function speechToText(model, audioData, apiKey, options = {}) {
  const client = new InferenceClient(apiKey);
  const provider = options.provider || 'auto';

  // Convert base64 data URL to Blob if needed
  let audioBlob;
  if (typeof audioData === 'string' && audioData.startsWith('data:')) {
    const base64 = audioData.split(',')[1];
    const mimeType = audioData.split(';')[0].split(':')[1] || 'audio/flac';
    const binaryData = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    audioBlob = new Blob([binaryData], { type: mimeType });
  } else if (audioData instanceof Blob) {
    audioBlob = audioData;
  } else {
    audioBlob = new Blob([audioData], { type: 'audio/flac' });
  }

  const result = await client.automaticSpeechRecognition({
    provider: provider,
    model: model,
    data: audioBlob
  });

  return result.text || JSON.stringify(result);
}

/**
 * Generate a concise title for a chat session based on its messages
 * Uses the configured LLM provider to summarize the conversation
 * @param {Object} state - The app state with provider/model configuration
 * @param {Array} messages - The messages to summarize (at least one user + one assistant message)
 * @returns {Promise<string|null>} - Generated title or null if generation fails
 */
export async function generateChatTitle(state, messages) {
  if (!messages || messages.length < 2) return null;

  const { provider, model } = state;
  const credentials = getCurrentProviderCredentials();

  if (!credentials) return null;

  // Check if provider is configured (has required credentials)
  const hasCredentials = (
    (provider === 'openai' && credentials.apiKey) ||
    (provider === 'openrouter' && credentials.apiKey) ||
    (provider === 'anthropic' && credentials.apiKey) ||
    (provider === 'huggingface' && credentials.apiKey) ||
    (provider === 'ollama' && credentials.endpoint) ||
    (provider === 'bedrock' && credentials.accessKey && credentials.secretKey)
  );

  if (!hasCredentials) return null;

  // Build a summary prompt
  const conversationSummary = messages.slice(0, 4).map(m => {
    let text = '';
    if (typeof m.content === 'string') {
      text = m.content;
    } else if (Array.isArray(m.content)) {
      text = m.content.find(c => c.type === 'text')?.text || '[media]';
    }
    return `${m.role}: ${text.slice(0, 200)}`;
  }).join('\n');

  const titlePrompt = `Generate a very short title (max 5 words) for this conversation. Reply with ONLY the title, no quotes or punctuation:\n\n${conversationSummary}`;

  try {
    let generatedTitle = '';

    if (provider === 'openai' || provider === 'openrouter') {
      const url = provider === 'openai'
        ? 'https://api.openai.com/v1/chat/completions'
        : 'https://openrouter.ai/api/v1/chat/completions';

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credentials.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: titlePrompt }],
          max_tokens: 20,
          temperature: 0.3
        })
      });

      if (!response.ok) return null;
      const json = await response.json();
      generatedTitle = json.choices?.[0]?.message?.content?.trim() || '';

    } else if (provider === 'ollama') {
      const base = credentials.endpoint?.replace(/\/$/, '') || 'http://localhost:11434';
      const response = await fetch(`${base}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: titlePrompt }],
          stream: false
        })
      });

      if (!response.ok) return null;
      const json = await response.json();
      generatedTitle = json.message?.content?.trim() || '';

    } else if (provider === 'huggingface') {
      const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${credentials.apiKey}`
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: titlePrompt }],
          max_tokens: 20,
          temperature: 0.3
        })
      });

      if (!response.ok) return null;
      const json = await response.json();
      generatedTitle = json.choices?.[0]?.message?.content?.trim() || '';

    } else if (provider === 'bedrock') {
      const region = credentials.region || 'us-east-1';
      const url = `https://bedrock-runtime.${region}.amazonaws.com/model/${model}/converse`;
      const body = JSON.stringify({
        messages: [{ role: 'user', content: [{ text: titlePrompt }] }],
        inferenceConfig: { temperature: 0.3, maxTokens: 20 }
      });

      const signedHeaders = await signRequest({
        method: 'POST',
        url,
        headers: { 'content-type': 'application/json' },
        body,
        accessKey: credentials.accessKey,
        secretKey: credentials.secretKey,
        sessionToken: credentials.sessionToken,
        region,
        service: 'bedrock'
      });

      const response = await fetch(url, { method: 'POST', headers: signedHeaders, body });
      if (!response.ok) return null;
      const json = await response.json();
      generatedTitle = json.output?.message?.content?.[0]?.text?.trim() || '';
    }

    // Clean up the title - remove quotes, limit length
    generatedTitle = generatedTitle.replace(/^["']|["']$/g, '').trim();
    if (generatedTitle.length > 50) {
      generatedTitle = generatedTitle.slice(0, 47) + '...';
    }

    return generatedTitle || null;

  } catch (err) {
    console.warn('Failed to generate chat title:', err);
    return null;
  }
}

/**
 * Text-to-Video generation using HuggingFace Inference Client
 * Returns a base64 data URL of the generated video
 * Note: Video generation can take longer than image generation (30-120s)
 * @param {string} provider - 'auto', 'fal-ai', 'hf-inference', 'replicate', etc.
 */
export async function textToVideo(model, prompt, apiKey, options = {}) {
  const client = new InferenceClient(apiKey);
  const provider = options.provider || 'auto';

  const blob = await client.textToVideo({
    provider: provider,
    model: model,
    inputs: prompt,
    parameters: {
      num_frames: options.numFrames || 16,
      num_inference_steps: options.steps || 25,
      guidance_scale: options.guidanceScale || 9,
      negative_prompt: options.negativePrompt || 'low quality, blurry, distorted'
    }
  });

  // Convert Blob to base64 data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}