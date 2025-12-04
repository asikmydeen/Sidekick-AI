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
    },
    tabs: {
      query: async () => [{ id: 1 }]
    },
    scripting: {
      executeScript: async ({ target, func }) => {
        return [{ result: "This is a mock page content from the web preview mode.\n\nIt simulates what the extension would read from a real webpage." }];
      }
    }
  };
}

// DOM Elements
const configSection = document.getElementById('configSection');
const chatSection = document.getElementById('chatSection');
const advancedSettings = document.getElementById('advancedSettings');
const providerSelect = document.getElementById('provider');
const apiKeyInput = document.getElementById('apiKey');
const fetchModelsBtn = document.getElementById('fetchModelsBtn');
const fetchStatus = document.getElementById('fetchStatus');
const modelSelect = document.getElementById('model');
const modelSelectionDiv = document.getElementById('modelSelection');
const systemPromptInput = document.getElementById('systemPrompt');
const temperatureInput = document.getElementById('temperature');
const tempValueLabel = document.getElementById('tempValue');
const quickPromptsInput = document.getElementById('quickPromptsConfig');
const startChatBtn = document.getElementById('startChatBtn');
const settingsBtn = document.getElementById('settingsBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const exportBtn = document.getElementById('exportBtn');
const themeBtn = document.getElementById('themeBtn');
const chatHistory = document.getElementById('chatHistory');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const stopBtn = document.getElementById('stopBtn');
const includePageContent = document.getElementById('includePageContent');
const promptChipsContainer = document.getElementById('promptChips');

// Default Quick Prompts
const DEFAULT_QUICK_PROMPTS = 
`Summarize|Summarize the key points of the following content:
Explain|Explain this concept in simple terms:
Fix Grammar|Please fix the grammar in this text:
Code Review|Review this code for bugs and improvements:`;

// State
let state = {
  provider: '',
  apiKey: '',
  model: '',
  systemPrompt: '',
  temperature: 0.7,
  quickPrompts: DEFAULT_QUICK_PROMPTS,
  theme: 'light',
  messages: []
};

let abortController = null;

// --- Initialization ---

document.addEventListener('DOMContentLoaded', async () => {
  const stored = await chrome.storage.local.get(['chatState']);
  
  if (stored.chatState) {
    state = { ...state, ...stored.chatState };
    // Ensure defaults if missing (for upgrades)
    if (state.temperature === undefined) state.temperature = 0.7;
    if (!state.quickPrompts) state.quickPrompts = DEFAULT_QUICK_PROMPTS;

    // Restore UI
    applyTheme(state.theme);
    if (state.provider) providerSelect.value = state.provider;
    if (state.apiKey) apiKeyInput.value = state.apiKey;
    if (state.systemPrompt) systemPromptInput.value = state.systemPrompt;
    if (state.temperature) {
      temperatureInput.value = state.temperature;
      tempValueLabel.textContent = state.temperature;
    }
    if (state.quickPrompts) quickPromptsInput.value = state.quickPrompts;
    
    // Restore Model UI
    if (state.model) {
       if (state.messages.length > 0) {
         modelSelect.innerHTML = `<option value="${state.model}" selected>${state.model}</option>`;
         modelSelectionDiv.classList.remove('hidden');
         advancedSettings.classList.remove('hidden');
         startChatBtn.classList.remove('hidden');
         switchToChat();
       }
    }
  } else {
    // Fresh install default
    quickPromptsInput.value = DEFAULT_QUICK_PROMPTS;
  }
});

// --- Event Listeners ---

themeBtn.addEventListener('click', () => {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  applyTheme(state.theme);
  saveState();
});

temperatureInput.addEventListener('input', (e) => {
  tempValueLabel.textContent = e.target.value;
});

exportBtn.addEventListener('click', () => {
  if (state.messages.length === 0) {
    alert('No chat history to export.');
    return;
  }
  
  let mdContent = `# Chat Export - ${state.model}\n\n`;
  if (state.systemPrompt) {
    mdContent += `**System Instructions**: ${state.systemPrompt}\n\n---\n\n`;
  }
  
  state.messages.forEach(msg => {
    const role = msg.role === 'user' ? 'User' : 'AI';
    mdContent += `### ${role}\n${msg.content}\n\n`;
  });
  
  const blob = new Blob([mdContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat-export-${new Date().toISOString().slice(0,10)}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

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
  advancedSettings.classList.add('hidden');
  startChatBtn.classList.add('hidden');
  modelSelect.innerHTML = '<option value="" disabled selected>Select a model...</option>';

  try {
    const models = await fetchModels(provider, key);
    if (models.length === 0) throw new Error('No models found.');
    
    populateModelSelect(models);
    showStatus(`Found ${models.length} models.`, 'success');
    modelSelectionDiv.classList.remove('hidden');
    advancedSettings.classList.remove('hidden');
    startChatBtn.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    showStatus(`Error: ${err.message}`, 'error');
    
    if (provider === 'anthropic') {
      showStatus('Using default Anthropic models.', 'info');
      const defaults = ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'];
      populateModelSelect(defaults);
      modelSelectionDiv.classList.remove('hidden');
      advancedSettings.classList.remove('hidden');
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
  state.temperature = parseFloat(temperatureInput.value);
  state.quickPrompts = quickPromptsInput.value.trim();
  saveState();
  
  switchToChat();
});

settingsBtn.addEventListener('click', () => {
  configSection.classList.remove('hidden');
  chatSection.classList.add('hidden');
  settingsBtn.style.display = 'none';
  clearChatBtn.classList.add('hidden');
  exportBtn.classList.add('hidden');
});

clearChatBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the chat history?')) {
    state.messages = [];
    saveState();
    renderChat();
  }
});

messageInput.addEventListener('input', function() {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
  if (this.value === '') this.style.height = '';
});

sendBtn.addEventListener('click', sendMessage);
stopBtn.addEventListener('click', () => {
  if (abortController) {
    abortController.abort();
    abortController = null;
    const loadingEl = document.querySelector('.typing-dots').closest('.message');
    if (loadingEl) {
      loadingEl.textContent = '[Stopped by user]';
      loadingEl.classList.add('error');
    }
    toggleLoading(false);
  }
});

messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

chatHistory.addEventListener('click', (e) => {
  if (e.target.classList.contains('copy-btn')) {
    const btn = e.target;
    const codeBlock = btn.nextElementSibling.querySelector('code');
    const text = codeBlock.textContent;
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = originalText, 2000);
    });
  }
});

// --- UI Logic ---

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    themeBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    themeBtn.textContent = '🌙';
  }
}

function renderChips() {
  promptChipsContainer.innerHTML = '';
  const lines = state.quickPrompts.split('\n');
  lines.forEach(line => {
    if (!line.trim()) return;
    const parts = line.split('|');
    const label = parts[0].trim();
    const prompt = parts.length > 1 ? parts.slice(1).join('|').trim() : label;
    
    if (!label) return;

    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = label;
    btn.title = prompt;
    btn.addEventListener('click', () => {
      messageInput.value = prompt + " ";
      messageInput.focus();
      // Auto-resize
      messageInput.style.height = 'auto';
      messageInput.style.height = (messageInput.scrollHeight) + 'px';
    });
    promptChipsContainer.appendChild(btn);
  });
}

function switchToChat() {
  configSection.classList.add('hidden');
  chatSection.classList.remove('hidden');
  settingsBtn.style.display = 'block';
  clearChatBtn.classList.remove('hidden');
  exportBtn.classList.remove('hidden');
  renderChips();
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

// --- Backend Logic ---

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

async function getPageContent() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return null;
    if (tab.url.startsWith('chrome://')) return "Cannot read system pages.";

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.body.innerText
    });

    if (results && results[0] && results[0].result) {
      const text = results[0].result;
      return text.length > 10000 ? text.substring(0, 10000) + "\n...[Truncated]" : text;
    }
    return null;
  } catch (err) {
    return `Error reading page: ${err.message}`;
  }
}

function toggleLoading(isLoading) {
  if (isLoading) {
    sendBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');
    messageInput.disabled = true;
  } else {
    sendBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
    messageInput.disabled = false;
    messageInput.focus();
  }
}

async function sendMessage() {
  let text = messageInput.value.trim();
  if (!text) return;

  const shouldIncludeContext = includePageContent.checked;
  let contextMsg = "";

  toggleLoading(true);

  if (shouldIncludeContext) {
    const content = await getPageContent();
    if (content) {
      contextMsg = `\n\n--- Page Content ---\n${content}\n---------------------`;
      text += ` [Attached Page Context]`; 
    }
  }

  const userMsg = { role: 'user', content: text };
  state.messages.push(userMsg);
  saveState();
  
  appendMessageToDOM('user', text);
  messageInput.value = '';
  messageInput.style.height = '';
  includePageContent.checked = false;

  const apiPrompt = text.replace(' [Attached Page Context]', '') + contextMsg;
  const loadingId = 'loading-' + Date.now();
  appendMessageToDOM('assistant', null, loadingId, true);

  abortController = new AbortController();

  try {
    const responseText = await callChatApi(apiPrompt, abortController.signal);
    const loadingEl = document.getElementById(loadingId);
    if (loadingEl) loadingEl.remove();
    
    const botMsg = { role: 'assistant', content: responseText };
    state.messages.push(botMsg);
    saveState();
    
    appendMessageToDOM('assistant', responseText);
  } catch (err) {
    if (err.name !== 'AbortError') {
      const loadingEl = document.getElementById(loadingId);
      if (loadingEl) loadingEl.remove();
      appendMessageToDOM('error', `Error: ${err.message}`);
    }
  } finally {
    toggleLoading(false);
    abortController = null;
  }
}

function appendMessageToDOM(role, text, id = null, isLoading = false) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  if (id) div.id = id;
  
  if (isLoading) {
    div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  } else if (role !== 'error' && role !== 'user') {
    div.innerHTML = parseMarkdown(text);
  } else {
    div.textContent = text;
  }
  
  chatHistory.appendChild(div);
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function parseMarkdown(text) {
  let safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const codeBlocks = [];
  safeText = safeText.replace(/```([\s\S]*?)```/g, (match, code) => {
    codeBlocks.push(code);
    return `__CODEBLOCK_${codeBlocks.length - 1}__`;
  });

  safeText = safeText.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  safeText = safeText.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  safeText = safeText.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  safeText = safeText.replace(/^[\*\-] (.*$)/gm, '<ul><li>$1</li></ul>');
  safeText = safeText.replace(/`([^`]+)`/g, '<code style="background:rgba(128,128,128,0.2);padding:2px 4px;border-radius:4px;">$1</code>');
  safeText = safeText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  safeText = safeText.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  safeText = safeText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
  safeText = safeText.replace(/\n/g, '<br>');

  safeText = safeText.replace(/__CODEBLOCK_(\d+)__/g, (match, index) => {
    return `<div class="code-wrapper"><button class="copy-btn">Copy</button><pre><code>${codeBlocks[index]}</code></pre></div>`;
  });
  return safeText;
}

async function callChatApi(userPrompt, signal) {
  const { provider, apiKey, model, messages, systemPrompt, temperature } = state;
  let url = '';
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
  let body = {};

  const apiMessages = messages.map(m => ({ role: m.role, content: m.content }));
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
      const fullPrompt = systemPrompt 
        ? `${systemPrompt}\n\n${apiMessages.map(m => `${m.role}: ${m.content}`).join('\n')}`
        : apiMessages.map(m => `${m.role}: ${m.content}`).join('\n');
      body = { 
        inputs: fullPrompt, 
        parameters: { max_new_tokens: 500, return_full_text: false, temperature: temperature } 
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
  }
}

function showStatus(msg, type) {
  fetchStatus.textContent = msg;
  fetchStatus.className = `status-msg ${type}`;
}

function saveState() {
  chrome.storage.local.set({ chatState: state });
}