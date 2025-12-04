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
const systemPromptDiv = document.getElementById('systemPromptDiv');
const systemPromptInput = document.getElementById('systemPrompt');
const startChatBtn = document.getElementById('startChatBtn');
const settingsBtn = document.getElementById('settingsBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const chatHistory = document.getElementById('chatHistory');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// State
let state = {
  provider: '',
  apiKey: '',
  model: '',
  systemPrompt: '',
  messages: [] // Array of { role, content }
};

// --- Initialization ---

document.addEventListener('DOMContentLoaded', async () => {
  const stored = await chrome.storage.local.get(['chatState']);
  
  if (stored.chatState) {
    state = { ...state, ...stored.chatState };
    
    // Pre-fill fields
    if (state.provider) providerSelect.value = state.provider;
    if (state.apiKey) apiKeyInput.value = state.apiKey;
    if (state.systemPrompt) systemPromptInput.value = state.systemPrompt;
    
    // Restore Model UI if we have state
    if (state.model) {
       // Show the UI elements for model/system prompt even if we need to fetch logic later
       // But usually, we only go to chat if we have a model.
       if (state.messages.length > 0) {
         // Fake the model option so we don't look empty
         modelSelect.innerHTML = `<option value="${state.model}" selected>${state.model}</option>`;
         modelSelectionDiv.classList.remove('hidden');
         systemPromptDiv.classList.remove('hidden');
         startChatBtn.classList.remove('hidden');
         switchToChat();
       }
    }
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
  systemPromptDiv.classList.add('hidden');
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
    systemPromptDiv.classList.remove('hidden');
    startChatBtn.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    showStatus(`Error: ${err.message}`, 'error');
    
    if (provider === 'anthropic') {
      showStatus('Using default Anthropic models.', 'info');
      const defaults = ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'];
      populateModelSelect(defaults);
      modelSelectionDiv.classList.remove('hidden');
      systemPromptDiv.classList.remove('hidden');
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
  state.systemPrompt = systemPromptInput.value.trim();
  saveState();
  
  switchToChat();
});

settingsBtn.addEventListener('click', () => {
  configSection.classList.remove('hidden');
  chatSection.classList.add('hidden');
  settingsBtn.style.display = 'none';
  clearChatBtn.classList.add('hidden');
});

clearChatBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the chat history?')) {
    state.messages = [];
    saveState();
    renderChat();
  }
});

// Auto-expand textarea
messageInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
  if (this.value === '') this.style.height = '';
});

sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Copy Code Button Delegation
chatHistory.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy-btn')) {
    const btn = e.target;
    const codeBlock = btn.nextElementSibling.querySelector('code');
    const text = codeBlock.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = originalText, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      btn.textContent = 'Error';
    });
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
  modelSelect.innerHTML = '<option value="" disabled selected>Select a model...</option>';
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
  clearChatBtn.classList.remove('hidden');
  renderChat();
}

function renderChat() {
  chatHistory.innerHTML = '';
  
  const intro = document.createElement('div');
  intro.className = 'status-msg';
  intro.textContent = `Chatting with ${state.model}`;
  chatHistory.appendChild(intro);

  state.messages.forEach(msg => {
    appendMessageToDOM(msg.role, msg.content);
  });
  
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const userMsg = { role: 'user', content: text };
  state.messages.push(userMsg);
  saveState();
  
  appendMessageToDOM('user', text);
  messageInput.value = '';
  messageInput.style.height = ''; // Reset height

  const loadingId = 'loading-' + Date.now();
  appendMessageToDOM('assistant', 'Thinking...', loadingId);

  try {
    const responseText = await callChatApi(text);
    
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    
    const botMsg = { role: 'assistant', content: responseText };
    state.messages.push(botMsg);
    saveState();
    
    appendMessageToDOM('assistant', responseText);
  } catch (err) {
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    appendMessageToDOM('error', `Error: ${err.message}`);
  }
}

function appendMessageToDOM(role, text, id = null) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  if (id) div.id = id;
  
  if (role !== 'error' && role !== 'user' && text !== 'Thinking...') {
    div.innerHTML = parseMarkdown(text);
  } else {
    div.textContent = text;
  }
  
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Enhanced Vanilla Markdown Parser
function parseMarkdown(text) {
  let safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // 1. Extract Code Blocks
  const codeBlocks = [];
  safeText = safeText.replace(/```([\s\S]*?)```/g, (match, code) => {
    codeBlocks.push(code);
    return `__CODEBLOCK_${codeBlocks.length - 1}__`;
  });

  // 2. Headers: ### H3, ## H2, # H1
  safeText = safeText.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  safeText = safeText.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  safeText = safeText.replace(/^# (.*$)/gm, '<h1>$1</h1>');

  // 3. Lists: - Item or * Item
  // Simple replacement to bullet points (not true nested lists but visually okay)
  safeText = safeText.replace(/^[\*\-] (.*$)/gm, '<ul><li>$1</li></ul>');
  // Fix adjacent ULs to merge them? Regex is hard for that. Let's just trust CSS margin.

  // 4. Inline Code
  safeText = safeText.replace(/`([^`]+)`/g, '<code style="background:#eee;padding:2px 4px;border-radius:4px;color:#d63384;">$1</code>');

  // 5. Bold & Italic
  safeText = safeText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  safeText = safeText.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  
  // 6. Links [Title](url)
  safeText = safeText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

  // 7. Newlines to <br>
  safeText = safeText.replace(/\n/g, '<br>');

  // Restore Code Blocks with Copy Button
  safeText = safeText.replace(/__CODEBLOCK_(\d+)__/g, (match, index) => {
    return `
      <div class="code-wrapper">
        <button class="copy-btn">Copy</button>
        <pre><code>${codeBlocks[index]}</code></pre>
      </div>`;
  });

  return safeText;
}

async function callChatApi(userMessage) {
  const { provider, apiKey, model, messages, systemPrompt } = state;
  let url = '';
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
  let body = {};

  // Build full message history including System Prompt
  const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
  
  if (systemPrompt) {
    apiMessages.unshift({ role: 'system', content: systemPrompt });
  }

  switch (provider) {
    case 'openai':
    case 'openrouter':
      url = provider === 'openai' 
        ? 'https://api.openai.com/v1/chat/completions' 
        : 'https://openrouter.ai/api/v1/chat/completions';
      
      body = {
        model: model,
        messages: apiMessages
      };
      break;

    case 'anthropic':
      url = 'https://api.anthropic.com/v1/messages';
      headers['x-api-key'] = apiKey;
      headers['anthropic-version'] = '2023-06-01';
      delete headers['Authorization'];
      
      const anthropicSystem = systemPrompt || undefined;
      const anthropicMessages = apiMessages.filter(m => m.role !== 'system');
      
      body = {
        model: model,
        max_tokens: 1024,
        system: anthropicSystem,
        messages: anthropicMessages
      };
      break;

    case 'huggingface':
      url = `https://api-inference.huggingface.co/models/${model}`;
      // HF is simple inference, constructing a prompt string is better than passing array usually
      // For simplicity in this template, we just send user message + history as text block
      const fullPrompt = systemPrompt 
        ? `${systemPrompt}\n\n${messages.map(m => `${m.role}: ${m.content}`).join('\n')}`
        : messages.map(m => `${m.role}: ${m.content}`).join('\n');

      body = {
        inputs: fullPrompt, 
        parameters: { max_new_tokens: 500, return_full_text: false }
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

  if (provider === 'openai' || provider === 'openrouter') {
    return data.choices[0].message.content;
  } else if (provider === 'anthropic') {
    return data.content[0].text;
  } else if (provider === 'huggingface') {
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