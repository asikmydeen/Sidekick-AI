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
export async function* streamChatApi(state, userPrompt, signal) {
  const { provider, apiKey, model, temperature, endpoint, systemPrompt } = state;
  const messages = state.sessions.find(s => s.id === state.currentSessionId)?.messages || [];
  
  let url = '';
  let headers = { 'Content-Type': 'application/json' };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
  
  let body = {};
  
  const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
  // Messages already include the user prompt in state before this call? 
  // Wait, in popup.js we usually push user msg to state THEN call api. 
  // So apiMessages HAS the user prompt at the end. We don't need to append it again unless it's not in state yet.
  // Current logic in previous version was: prompt passed as arg.
  // Let's rely on the arg 'userPrompt' being the last content if it's not in history yet?
  // Actually, standard is: History + New Prompt.
  
  // Clean history:
  const history = apiMessages.map(m => ({ role: m.role, content: m.content }));
  if (systemPrompt) history.unshift({ role: 'system', content: systemPrompt });

  switch (provider) {
    case 'openai':
    case 'openrouter':
      url = provider === 'openai' ? 'https://api.openai.com/v1/chat/completions' : 'https://openrouter.ai/api/v1/chat/completions';
      body = { model, messages: history, temperature, stream: true };
      break;

    case 'ollama':
      const base = endpoint ? endpoint.replace(/\/$/, '') : 'http://localhost:11434';
      url = `${base}/api/chat`;
      body = { model, messages: history, options: { temperature }, stream: true };
      break;
      
    case 'anthropic':
      // Anthropic streaming is different (SSE events). 
      // For simplicity in this iteration, we'll do non-streaming for Anthropic 
      // OR implement a specific parser. Let's do non-streaming fallback for Anthropic first 
      // to ensure stability, or basic stream if easy.
      // Let's do standard fetch for Anthropic for now to avoid complexity explosion.
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      delete headers['Authorization'];
      body = {
        model, max_tokens: 1024, temperature,
        system: systemPrompt || undefined,
        messages: history.filter(m => m.role !== 'system')
      };
      
      const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal });
      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      yield data.content[0].text;
      return;
      
    case 'huggingface':
       // HF streaming is also specific. Fallback to non-stream.
       url = `https://api-inference.huggingface.co/models/${model}`;
       const fullPrompt = history.map(m => `${m.role}: ${m.content}`).join('\n');
       body = { inputs: fullPrompt, parameters: { max_new_tokens: 500, return_full_text: false, temperature } };
       
       const hfRes = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal });
       const hfData = await hfRes.json();
       yield Array.isArray(hfData) ? hfData[0].generated_text : JSON.stringify(hfData);
       return;
  }

  // Handle Streaming for OpenAI/OpenRouter/Ollama
  const response = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body), signal });
  
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