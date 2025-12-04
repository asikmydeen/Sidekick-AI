// modules/api.js
import { signRequest } from './aws.js';
import { state, getCurrentProviderCredentials } from './state.js';

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
      url = 'https://huggingface.co/api/models?pipeline_tag=text-generation&sort=downloads&direction=-1&limit=50';
      headers = { 'Authorization': `Bearer ${credentials.apiKey}` };
      transform = (data) => data.map(m => m.id);
      break;
    case 'anthropic':
      throw new Error('Anthropic API does not support listing models automatically.');
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
  const { provider, model, temperature, systemPrompt } = state;
  const messages = state.sessions.find(s => s.id === state.currentSessionId)?.messages || [];

  const credentials = getCurrentProviderCredentials();

  if (!credentials) {
    throw new Error(`No credentials configured for provider: ${provider}`);
  }

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

     const ollamaMessages = rawMessages.map(msg => {
        if (Array.isArray(msg.content)) {
          let text = "";
          let images = [];
          msg.content.forEach(part => {
            if (part.type === 'text') text += part.text;
            if (part.type === 'image_url') {
               const b64 = part.image_url.url.split(',')[1];
               if (b64) images.push(b64);
            }
          });
          return { role: msg.role, content: text, images: images.length ? images : undefined };
        }
        return msg;
      });

      const body = { model, messages: ollamaMessages, stream: true, options: { temperature } };
      if (systemPrompt) body.system = systemPrompt;

      const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal });
      if (!response.ok) throw new Error(await response.text());
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // Ollama sends JSON objects directly (sometimes multiple per chunk)
        const lines = chunk.split('\n');
        for (const line of lines) {
           if (!line.trim()) continue;
           try {
             const json = JSON.parse(line);
             if (json.message?.content) yield json.message.content;
           } catch(e) {}
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
     // Note: Hugging Face Inference API endpoint. The 410 error occurs when models are not deployed
     // or available on the serverless inference API. Use models that are actively deployed.
     url = `https://api-inference.huggingface.co/models/${model}`;
     const fullPrompt = rawMessages.map(m => {
          const txt = Array.isArray(m.content) ? m.content.find(c=>c.type==='text')?.text : m.content;
          return `${m.role}: ${txt}`;
     }).join('\n');
     const hfBody = { inputs: fullPrompt, parameters: { max_new_tokens: 500, return_full_text: false, temperature } };
     const hfRes = await fetch(url, { method: 'POST', headers: { 'Authorization': `Bearer ${credentials.apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify(hfBody), signal });
     if (!hfRes.ok) {
       const errorText = await hfRes.text();
       throw new Error(`Hugging Face API error (${hfRes.status}): ${errorText}`);
     }
     const hfData = await hfRes.json();
     yield Array.isArray(hfData) ? hfData[0].generated_text : JSON.stringify(hfData);
  }
}