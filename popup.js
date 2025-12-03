// popup.js

// --- Mock Chrome API for Web Preview ---
if (typeof chrome === 'undefined' || !chrome.storage) {
  console.log('Running in web preview mode - mocking Chrome APIs');
  window.chrome = {
    storage: {
      local: {
        get: async (keys) => {
          const result = {};
          const k = Array.isArray(keys) ? keys : [keys];
          k.forEach(key => {
            const val = localStorage.getItem(key);
            if (val) result[key] = JSON.parse(val);
          });
          return result;
        },
        set: async (items) => {
          Object.entries(items).forEach(([key, value]) => {
            localStorage.setItem(key, JSON.stringify(value));
          });
        }
      }
    },
    runtime: {
      onInstalled: { addListener: () => {} },
      onMessage: { addListener: () => {} }
    }
  };
}

// DOM Elements
const configSection = document.getElementById('configSection');
const chatSection = document.getElementById('chatSection');
const providerSelect = document.getElementById('provider');
const apiKeyInput = document.getElementById('apiKey');
const fetchModelsBtn = document.getElementById('fetchModelsBtn');
const fetchStatus = document.getElementById('fetchStatus');
const modelSelect = document.getElementById('model');
const modelSelectionDiv = document.getElementById('modelSelection');
const startChatBtn = document.getElementById('startChatBtn');
const settingsBtn = document.getElementById('settingsBtn');
const chatHistory = document.getElementById('chatHistory');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// State
let state = {
  provider: '',
  apiKey: '',
  model: '',
  history: []
};

// --- Initialization ---

document.addEventListener('DOMContentLoaded', async () => {
  const stored = await chrome.storage.local.get(['chatState']);
  if (stored.chatState) {
    state = { ...state, ...stored.chatState };
    // Pre-fill fields if available
    if (state.provider) providerSelect.value = state.provider;
    if (state.apiKey) apiKeyInput.value = state.apiKey;
    
    // If we have a selected model, we can try to jump to chat or show model select
    // For simplicity, we restart at config to ensure connection is still valid
  }
});

// --- Event Listeners ---

fetchModelsBtn.addEventListener('click', async () => {
  const provider = providerSelect.value;
  const key = apiKeyInput.value.trim();

  if (!provider || !key) {
    showStatus('Please select a provider and enter an API key.', 'error');
    return;
  }

  state.provider = provider;
  state.apiKey = key;
  saveState();

  showStatus('Fetching models...', 'info');
  modelSelectionDiv.classList.add('hidden');
  startChatBtn.classList.add('hidden');
  modelSelect.innerHTML = '<option value="" disabled selected>Select a model...</option>';

  try {
    const models = await fetchModels(provider, key);
    if (models.length === 0) {
      throw new Error('No models found.');
    }
    
    populateModelSelect(models);
    showStatus(`Found ${models.length} models.`, 'success');
    modelSelectionDiv.classList.remove('hidden');
    startChatBtn.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    showStatus(`Error: ${err.message}`, 'error');
    
    // Fallback for providers that might fail listing (e.g., Anthropic sometimes)
    if (provider === 'anthropic') {
      showStatus('Could not list Anthropic models automatically. Adding defaults.', 'info');
      const defaults = ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'];
      populateModelSelect(defaults);
      modelSelectionDiv.classList.remove('hidden');
      startChatBtn.classList.remove('hidden');
    }
  }
});

startChatBtn.addEventListener('click', () => {
  const selectedModel = modelSelect.value;
  if (!selectedModel) {
    showStatus('Please select a model.', 'error');
    return;
  }
  state.model = selectedModel;
  saveState();
  
  switchToChat();
});

settingsBtn.addEventListener('click', () => {
  configSection.classList.remove('hidden');
  chatSection.classList.add('hidden');
  settingsBtn.style.display = 'none';
});

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// --- Logic Functions ---

async function fetchModels(provider, key) {
  let url = '';
  let headers = {};
  let transform = (data) => [];

  switch (provider) {
    case 'openai':
      url = 'https://api.openai.com/v1/models';
      headers = { 'Authorization': `Bearer ${key}` };
      transform = (data) => data.data.map(m => m.id).sort();
      break;
      
    case 'openrouter':
      url = 'https://openrouter.ai/api/v1/models';
      headers = { 'Authorization': `Bearer ${key}` };
      transform = (data) => data.data.map(m => m.id).sort();
      break;

    case 'huggingface':
      // Hugging Face has a huge list. We'll filter for text-generation.
      url = 'https://huggingface.co/api/models?pipeline_tag=text-generation&sort=downloads&direction=-1&limit=50';
      headers = { 'Authorization': `Bearer ${key}` };
      transform = (data) => data.map(m => m.id);
      break;

    case 'anthropic':
      // Anthropic does not support listing models via API key as of standard implementation.
      // We will throw to trigger the fallback in the click handler.
      throw new Error('Anthropic API does not support listing models.');
      
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

function populateModelSelect(models) {
  models.forEach(m => {
    const option = document.createElement('option');
    option.value = m;
    option.textContent = m;
    modelSelect.appendChild(option);
  });
}

function switchToChat() {
  configSection.classList.add('hidden');
  chatSection.classList.remove('hidden');
  settingsBtn.style.display = 'block';
  renderChat();
}

function renderChat() {
  chatHistory.innerHTML = '';
  // Optional: render history if we were persisting conversation
  const intro = document.createElement('div');
  intro.className = 'status-msg';
  intro.textContent = `Chatting with ${state.model} on ${state.provider}`;
  chatHistory.appendChild(intro);
}

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  // Add User Message
  appendMessage('user', text);
  messageInput.value = '';

  // Add Loading State
  const loadingId = 'loading-' + Date.now();
  appendMessage('assistant', 'Thinking...', loadingId);

  try {
    const responseText = await callChatApi(text);
    // Replace loading with actual message
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    appendMessage('assistant', responseText);
  } catch (err) {
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    appendMessage('error', `Error: ${err.message}`);
  }
}

function appendMessage(role, text, id = null) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  div.textContent = text;
  if (id) div.id = id;
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function callChatApi(userMessage) {
  const { provider, apiKey, model } = state;
  let url = '';
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
  let body = {};

  switch (provider) {
    case 'openai':
    case 'openrouter':
      url = provider === 'openai' 
        ? 'https://api.openai.com/v1/chat/completions' 
        : 'https://openrouter.ai/api/v1/chat/completions';
      
      body = {
        model: model,
        messages: [{ role: 'user', content: userMessage }]
      };
      break;

    case 'anthropic':
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      // Anthropic uses x-api-key, remove Bearer
      delete headers['Authorization'];
      
      body = {
        model: model,
        max_tokens: 1024,
        messages: [{ role: 'user', content: userMessage }]
      };
      break;

    case 'huggingface':
      url = `https://api-inference.huggingface.co/models/${model}`;
      body = {
        inputs: userMessage,
        parameters: { max_new_tokens: 250, return_full_text: false }
      };
      break;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Failed to send message: ${errText}`);
  }

  const data = await response.json();

  // Parse response based on provider
  if (provider === 'openai' || provider === 'openrouter') {
    return data.choices[0].message.content;
  } else if (provider === 'anthropic') {
    return data.content[0].text;
  } else if (provider === 'huggingface') {
    // HF Inference usually returns array [{ generated_text: "..." }]
    if (Array.isArray(data) && data[0].generated_text) {
      return data[0].generated_text;
    }
    return JSON.stringify(data);
  }
}

function showStatus(msg, type) {
  fetchStatus.textContent = msg;
  fetchStatus.className = `status-msg ${type}`;
}

function saveState() {
  chrome.storage.local.set({ chatState: state });
}