// modules/ui.js
import { estimateTokens } from './utils.js';

export const elements = {
  container: document.querySelector('.container'),
  configSection: document.getElementById('configSection'),
  chatSection: document.getElementById('chatSection'),
  advancedSettings: document.getElementById('advancedSettings'),
  providerSelect: document.getElementById('provider'),
  apiKeyInput: document.getElementById('apiKey'),
  apiKeyGroup: document.getElementById('apiKeyGroup'),
  endpointInput: document.getElementById('endpoint'),
  endpointGroup: document.getElementById('endpointGroup'),
  fetchModelsBtn: document.getElementById('fetchModelsBtn'),
  fetchStatus: document.getElementById('fetchStatus'),
  modelSelect: document.getElementById('model'),
  modelSelectionDiv: document.getElementById('modelSelection'),
  systemPromptInput: document.getElementById('systemPrompt'),
  temperatureInput: document.getElementById('temperature'),
  tempValueLabel: document.getElementById('tempValue'),
  quickPromptsInput: document.getElementById('quickPromptsConfig'),
  startChatBtn: document.getElementById('startChatBtn'),
  settingsBtn: document.getElementById('settingsBtn'),
  // New UI Elements
  historyBtn: document.getElementById('historyBtn'),
  newChatBtn: document.getElementById('newChatBtn'),
  historySidebar: document.getElementById('historySidebar'),
  sessionList: document.getElementById('sessionList'),
  closeSidebarBtn: document.getElementById('closeSidebarBtn'),
  clearHistoryBtn: document.getElementById('clearHistoryBtn'),
  
  exportBtn: document.getElementById('exportBtn'),
  themeBtn: document.getElementById('themeBtn'),
  chatHistory: document.getElementById('chatHistory'),
  messageInput: document.getElementById('messageInput'),
  sendBtn: document.getElementById('sendBtn'),
  stopBtn: document.getElementById('stopBtn'),
  micBtn: document.getElementById('micBtn'),
  fileBtn: document.getElementById('fileBtn'),
  fileInput: document.getElementById('fileInput'),
  includePageContent: document.getElementById('includePageContent'),
  promptChipsContainer: document.getElementById('promptChips'),
  tokenCount: document.getElementById('tokenCount')
};

export function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    elements.themeBtn.textContent = '☀️';
  } else {
    document.body.classList.remove('dark-mode');
    elements.themeBtn.textContent = '🌙';
  }
}

export function showStatus(msg, type) {
  elements.fetchStatus.textContent = msg;
  elements.fetchStatus.className = `status-msg ${type}`;
}

export function toggleView(view) {
  if (view === 'chat') {
    elements.configSection.classList.add('hidden');
    elements.chatSection.classList.remove('hidden');
    elements.settingsBtn.style.display = 'block';
    elements.historyBtn.classList.remove('hidden');
    elements.newChatBtn.classList.remove('hidden');
    elements.exportBtn.classList.remove('hidden');
  } else {
    elements.configSection.classList.remove('hidden');
    elements.chatSection.classList.add('hidden');
    elements.settingsBtn.style.display = 'none';
    elements.historyBtn.classList.add('hidden');
    elements.newChatBtn.classList.add('hidden');
    elements.exportBtn.classList.add('hidden');
  }
}

export function toggleSidebar(show) {
  if (show) {
    elements.historySidebar.classList.add('open');
  } else {
    elements.historySidebar.classList.remove('open');
  }
}

export function renderSessionList(sessions, currentId, onSwitch, onDelete) {
  elements.sessionList.innerHTML = '';
  sessions.forEach(session => {
    const item = document.createElement('div');
    item.className = `session-item ${session.id === currentId ? 'active' : ''}`;
    
    const title = document.createElement('span');
    title.className = 'session-title';
    title.textContent = session.title || 'New Chat';
    title.onclick = () => onSwitch(session.id);
    
    const delBtn = document.createElement('button');
    delBtn.textContent = '×';
    delBtn.className = 'session-delete';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      onDelete(session.id);
    };
    
    item.appendChild(title);
    item.appendChild(delBtn);
    elements.sessionList.appendChild(item);
  });
}

export function populateModelSelect(models) {
  elements.modelSelect.innerHTML = '<option value="" disabled selected>Select a model...</option>';
  models.forEach(m => {
    const option = document.createElement('option');
    option.value = m;
    option.textContent = m;
    elements.modelSelect.appendChild(option);
  });
}

export function renderChips(quickPromptsText, onChipClick) {
  elements.promptChipsContainer.innerHTML = '';
  const lines = quickPromptsText.split('\n');
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
    btn.addEventListener('click', () => onChipClick(prompt));
    elements.promptChipsContainer.appendChild(btn);
  });
}

export function renderChat(messages, modelName) {
  elements.chatHistory.innerHTML = '';
  const intro = document.createElement('div');
  intro.className = 'status-msg';
  intro.textContent = `Chatting with ${modelName}`;
  elements.chatHistory.appendChild(intro);

  messages.forEach(msg => {
    appendMessageToDOM(msg.role, msg.content);
  });
  scrollToBottom();
  updateTokenCount(messages);
}

export function appendMessageToDOM(role, text, id = null, isLoading = false) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  if (id) div.id = id;
  
  if (isLoading) {
    div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  } else {
    // If text is null (streaming start), leave empty
    if (text) div.innerHTML = parseMarkdown(text);
  }
  
  elements.chatHistory.appendChild(div);
  scrollToBottom();
}

export function updateStreamingMessage(id, text) {
  const el = document.getElementById(id);
  if (el) {
    // We re-parse markdown on every chunk (expensive but easiest for simple implementation)
    // Optimization: only parse if markdown syntax detected, or debounce. 
    // For this size, it's fine.
    el.innerHTML = parseMarkdown(text);
    scrollToBottom();
  }
}

export function updateTokenCount(messages) {
  let totalTxt = "";
  messages.forEach(m => totalTxt += m.content);
  const count = estimateTokens(totalTxt);
  // Assume generic 128k context for modern models, or 8k conservative
  const limit = 128000; 
  const percent = Math.min((count / limit) * 100, 100).toFixed(1);
  elements.tokenCount.textContent = `${count.toLocaleString()} tokens used`;
  elements.tokenCount.title = `Approx. ${percent}% of 128k context window`;
}

export function removeMessage(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

export function toggleLoading(isLoading) {
  if (isLoading) {
    elements.sendBtn.classList.add('hidden');
    elements.stopBtn.classList.remove('hidden');
    elements.messageInput.disabled = true;
  } else {
    elements.sendBtn.classList.remove('hidden');
    elements.stopBtn.classList.add('hidden');
    elements.messageInput.disabled = false;
    elements.messageInput.focus();
  }
}

export function scrollToBottom() {
  elements.chatHistory.scrollTop = elements.chatHistory.scrollHeight;
}

export function autoResizeInput() {
  const input = elements.messageInput;
  input.style.height = 'auto';
  input.style.height = (input.scrollHeight) + 'px';
  if (input.value === '') input.style.height = '';
}

// Markdown Parser (same as before)
function parseMarkdown(text) {
  if (!text) return '';
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