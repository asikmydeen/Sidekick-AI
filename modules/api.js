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
      // Remove trailing slash if present
      const base = endpoint.replace(/\/$/, '');
      url = `${base}/api/tags`;
      // Ollama does not require auth headers usually
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
  
  const data = await response.json();
  return transform(data);
}

export async function callChatApi(state, userPrompt, signal) {
  const { provider, apiKey, model, messages, systemPrompt, temperature, endpoint } = state;
  let url = '';
  let headers = {
    'Content-Type': 'application/json'
  };
  if (apiKey) headers['Authorization'] = `Bearer ${apiKey}`;
  
  let body = {};

  // Build History
  const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
  
  // Replace the last dummy message with the actual enriched prompt
  apiMessages.pop(); 
  apiMessages.push({ role: 'user', content: userPrompt });

  if (systemPrompt) apiMessages.unshift({ role: 'system', content: systemPrompt });

  switch (provider) {
    case 'openai':
    case 'openrouter':
      url = provider === 'openai' 
        ? 'https://api.openai.com/v1/chat/completions' 
        : 'https://openrouter.ai/api/v1/chat/completions';
      body = { model: model, messages: apiMessages, temperature: temperature };
      break;

    case 'anthropic':
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      delete headers['Authorization'];
      body = {
        model: model,
        max_tokens: 1024,
        temperature: temperature,
        system: systemPrompt || undefined,
        messages: apiMessages.filter(m => m.role !== 'system')
      };
      break;

    case 'huggingface':
      url = `https://api-inference.huggingface.co/models/${model}`;
      const fullPromptHF = systemPrompt 
        ? `${systemPrompt}\n\n${apiMessages.map(m => `${m.role}: ${m.content}`).join('\n')}`
        : apiMessages.map(m => `${m.role}: ${m.content}`).join('\n');
      body = { 
        inputs: fullPromptHF, 
        parameters: { max_new_tokens: 500, return_full_text: false, temperature: temperature } 
      };
      break;

    case 'ollama':
      const base = endpoint ? endpoint.replace(/\/$/, '') : 'http://localhost:11434';
      url = `${base}/api/chat`;
      // Ollama expects 'stream: false' for simple request, or we can handle streaming.
      // For now, let's use stream: false to keep it compatible with our existing architecture.
      body = {
        model: model,
        messages: apiMessages,
        stream: false,
        options: { temperature: temperature }
      };
      break;
  }

  const response = await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body), signal: signal });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to send message: ${errText}`);
  }

  const data = await response.json();

  if (provider === 'openai' || provider === 'openrouter') {
    return data.choices[0].message.content;
  } else if (provider === 'anthropic') {
    return data.content[0].text;
  } else if (provider === 'huggingface') {
    if (Array.isArray(data) && data[0].generated_text) return data[0].generated_text;
    return JSON.stringify(data);
  } else if (provider === 'ollama') {
    return data.message.content;
  }
}