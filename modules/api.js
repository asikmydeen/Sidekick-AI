// modules/api.js

export async function fetchModels(provider, key, endpoint = '') {
  let url = '';
  let headers = {};
  let transform = (data) => [];

  switch (provider) {
    case 'openai':
      url = 'https://api.openai.com/v1/models';
      headers = { 'Authorization': `Bearer ${key}` };
      transform = (data) => data.data.map(m => m.id).filter(id => id.startsWith('gpt')).sort();
      break;
    case 'openrouter':
      url = 'https://openrouter.ai/api/v1/models';
      headers = { 'Authorization': `Bearer ${key}` };
      transform = (data) => data.data.map(m => m.id).sort();
      break;
    case 'huggingface':
      url = 'https://huggingface.co/api/models?pipeline_tag=text-generation&sort=downloads&direction=-1&limit=50';
      headers = { 'Authorization': `Bearer ${key}` };
      transform = (data) => data.map(m => m.id);
      break;
    case 'anthropic':
      throw new Error('Anthropic API does not support listing models.');
    case 'ollama':
      const base = endpoint.replace(/\/$/, '');
      url = `${base}/api/tags`;
      transform = (data) => data.models.map(m => m.name);
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
  const { provider, apiKey, model, temperature, endpoint, systemPrompt } = state;
  const messages = state.sessions.find(s => s.id === state.currentSessionId)?.messages || [];
  
  let url = '';
  let headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
  
  // We need to transform the internal message history (which might contain complex vision objects)
  // into the format specific for each provider.
  
  // Standardize History:
  // Internal format is OpenAI compatible: [{ role, content: string | [{type:'text'}, {type:'image_url'}] }]
  
  const history = [];
  if (systemPrompt) history.push({ role: 'system', content: systemPrompt });
  
  // Clone messages to avoid mutating state
  const rawMessages = messages.map(m => ({ role: m.role, content: m.content }));
  
  // The 'messages' array passed here INCLUDES the latest user message which was just added in popup.js
  
  switch (provider) {
    case 'openai':
    case 'openrouter':
      url = provider === 'openai' ? 'https://api.openai.com/v1/chat/completions' : 'https://openrouter.ai/api/v1/chat/completions';
      // OpenAI/OpenRouter handle the array of content objects natively.
      history.push(...rawMessages);
      break;

    case 'ollama':
      const base = endpoint ? endpoint.replace(/\/$/, '') : 'http://localhost:11434';
      url = `${base}/api/chat`;
      
      // Ollama expects: { role, content: string, images: [base64] }
      // We must transform the internal "Vision" format to Ollama format
      const ollamaMessages = rawMessages.map(msg => {
        if (Array.isArray(msg.content)) {
          let text = "";
          let images = [];
          msg.content.forEach(part => {
            if (part.type === 'text') text += part.text;
            if (part.type === 'image_url') {
               // Internal format: "data:image/png;base64,..."
               // Ollama wants JUST the base64 part
               const b64 = part.image_url.url.split(',')[1];
               if (b64) images.push(b64);
            }
          });
          return { role: msg.role, content: text, images: images.length ? images : undefined };
        }
        return msg;
      });
      
      history.push(...ollamaMessages);
      break;
      
    case 'anthropic':
      // Anthropic format support if needed (skip for now to keep simple)
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      delete headers['Authorization'];
      
      // Simplify for Anthropic (drop images for now or implement their specific format later)
      const simpleMessages = rawMessages.map(m => ({
         role: m.role,
         content: Array.isArray(m.content) ? m.content.find(c => c.type==='text')?.text || '' : m.content
      }));
      
      const body = {
        model, max_tokens: 1024, temperature,
        system: systemPrompt || undefined,
        messages: simpleMessages
      };
      
      const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      yield data.content[0].text;
      return;
      
    case 'huggingface':
       // HF fallback (text only)
       url = `https://api-inference.huggingface.co/models/${model}`;
       const fullPrompt = rawMessages.map(m => {
          const txt = Array.isArray(m.content) ? m.content.find(c=>c.type==='text')?.text : m.content;
          return `${m.role}: ${txt}`;
       }).join('\n');
       
       const hfBody = { inputs: fullPrompt, parameters: { max_new_tokens: 500, return_full_text: false, temperature } };
       const hfRes = await fetch(url, { method: 'POST', headers, body: JSON.stringify(hfBody), signal });
       const hfData = await hfRes.json();
       yield Array.isArray(hfData) ? hfData[0].generated_text : JSON.stringify(hfData);
       return;
  }

  // Handle Streaming for OpenAI/OpenRouter/Ollama
  const finalBody = { model, messages: history, stream: true };
  if (provider === 'ollama') finalBody.options = { temperature };
  else finalBody.temperature = temperature;

  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(finalBody), signal });
  
  if (!response.ok) {
    throw new Error(await response.text());
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    
    const chunk = decoder.decode(value, { stream: true });
    
    // Process multiple lines
    const lines = chunk.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      
      if (line.startsWith('data: ')) {
        const jsonStr = line.replace('data: ', '');
        if (jsonStr === '[DONE]') return;
        try {
          const json = JSON.parse(jsonStr);
          const content = json.choices?.[0]?.delta?.content || '';
          if (content) yield content;
        } catch (e) { /* ignore parse errors */ }
      } else if (provider === 'ollama') {
        // Ollama sends raw JSON objects
        try {
          const json = JSON.parse(line);
          const content = json.message?.content || '';
          if (content) yield content;
          if (json.done) return;
        } catch (e) { /* ignore */ }
      }
    }
  }
}