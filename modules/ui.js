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

  awsGroup: document.getElementById('awsGroup'),
  awsAccessKey: document.getElementById('awsAccessKey'),
  awsSecretKey: document.getElementById('awsSecretKey'),
  awsSessionToken: document.getElementById('awsSessionToken'),
  awsRegion: document.getElementById('awsRegion'),

  hfTaskGroup: document.getElementById('hfTaskGroup'),
  hfTaskSelect: document.getElementById('hfTask'),
  hfTaskHint: document.getElementById('hfTaskHint'),

  fetchModelsBtn: document.getElementById('fetchModelsBtn'),
  fetchStatus: document.getElementById('fetchStatus'),
  modelSelect: document.getElementById('model'),
  modelSelectionDiv: document.getElementById('modelSelection'),
  manualModelGroup: document.getElementById('manualModelGroup'),
  manualModelInput: document.getElementById('manualModel'),
  saveModelBtn: document.getElementById('saveModelBtn'),
  modelHint: document.getElementById('modelHint'),
  systemPromptInput: document.getElementById('systemPrompt'),
  temperatureInput: document.getElementById('temperature'),
  tempValueLabel: document.getElementById('tempValue'),
  quickPromptsInput: document.getElementById('quickPromptsConfig'),
  autoReadInput: document.getElementById('autoRead'),
  startChatBtn: document.getElementById('startChatBtn'),
  settingsBtn: document.getElementById('settingsBtn'),

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
  tokenCount: document.getElementById('tokenCount'),
  attachmentPreview: document.getElementById('attachmentPreview')
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

// Helper to download media (images, audio)
function downloadMedia(dataUrl, filename) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function renderSessionList(sessions, currentId, onSwitch, onDelete) {
  elements.sessionList.innerHTML = '';
  sessions.forEach(session => {
    const item = document.createElement('div');
    item.className = `session-item ${session.id === currentId ? 'active' : ''}`;
    let displayTitle = session.title || 'New Chat';

    const title = document.createElement('span');
    title.className = 'session-title';
    title.textContent = displayTitle;
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

export function addModelToSelect(model) {
  // Check if model already exists
  const existing = Array.from(elements.modelSelect.options).find(opt => opt.value === model);
  if (existing) {
    elements.modelSelect.value = model;
    return;
  }

  const option = document.createElement('option');
  option.value = model;
  option.textContent = model;
  elements.modelSelect.appendChild(option);
  elements.modelSelect.value = model;
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

export function appendMessageToDOM(role, content, id = null, isLoading = false) {
  const div = document.createElement('div');
  div.className = `message ${role}`;
  if (id) div.id = id;

  let textContent = "";
  if (typeof content === 'string') textContent = content;
  else if (Array.isArray(content)) {
    textContent = content.find(c => c.type === 'text')?.text || "";
  }

  if (isLoading) {
    div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
  } else {
    if (Array.isArray(content)) {
      content.forEach(part => {
        if (part.type === 'text') {
           const p = document.createElement('div');
           p.innerHTML = parseMarkdown(part.text);
           div.appendChild(p);
        } else if (part.type === 'image_url') {
           const img = document.createElement('img');
           img.src = part.image_url.url;
           img.className = 'chat-image';
           div.appendChild(img);
        } else if (part.type === 'generated_image') {
           // Generated image from text-to-image
           const container = document.createElement('div');
           container.className = 'generated-media-container';
           const img = document.createElement('img');
           img.src = part.url;
           img.className = 'generated-image';
           img.alt = part.prompt || 'Generated image';
           container.appendChild(img);
           // Add download button
           const downloadBtn = document.createElement('button');
           downloadBtn.className = 'media-btn';
           downloadBtn.textContent = '⬇️ Download';
           downloadBtn.onclick = () => downloadMedia(part.url, 'generated-image.png');
           container.appendChild(downloadBtn);
           div.appendChild(container);
        } else if (part.type === 'generated_audio') {
           // Generated audio from text-to-speech
           const container = document.createElement('div');
           container.className = 'generated-media-container';
           const audio = document.createElement('audio');
           audio.src = part.url;
           audio.controls = true;
           audio.className = 'generated-audio';
           container.appendChild(audio);
           // Add download button
           const downloadBtn = document.createElement('button');
           downloadBtn.className = 'media-btn';
           downloadBtn.textContent = '⬇️ Download';
           downloadBtn.onclick = () => downloadMedia(part.url, 'generated-audio.wav');
           container.appendChild(downloadBtn);
           div.appendChild(container);
        } else if (part.type === 'audio_input') {
           // Audio uploaded for speech-to-text
           const audio = document.createElement('audio');
           audio.src = part.url;
           audio.controls = true;
           audio.className = 'input-audio';
           div.appendChild(audio);
        }
      });
    } else {
      if (content) div.innerHTML = parseMarkdown(content);
    }

    if (role === 'assistant' && textContent) {
      const controls = document.createElement('div');
      controls.className = 'msg-controls';

      const speakBtn = document.createElement('button');
      speakBtn.className = 'msg-btn';
      speakBtn.textContent = '🔊';
      speakBtn.title = 'Read aloud';
      speakBtn.onclick = () => toggleSpeech(textContent, speakBtn);

      controls.appendChild(speakBtn);
      div.appendChild(controls);
    }
  }

  elements.chatHistory.appendChild(div);

  div.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const code = e.target.parentElement.querySelector('code').textContent;
      navigator.clipboard.writeText(code);
      const originalText = e.target.textContent;
      e.target.textContent = "Copied!";
      e.target.classList.add('copied');
      setTimeout(() => {
        e.target.textContent = originalText;
        e.target.classList.remove('copied');
      }, 2000);
    });
  });

  scrollToBottom();
}

export function updateStreamingMessage(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = parseMarkdown(text);
    scrollToBottom();
  }
}

export function finalizeMessageInDOM(id, content) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = '';
    let textContent = "";
    if (typeof content === 'string') textContent = content;

    const p = document.createElement('div');
    p.innerHTML = parseMarkdown(textContent);
    el.appendChild(p);

    const controls = document.createElement('div');
    controls.className = 'msg-controls';

    const speakBtn = document.createElement('button');
    speakBtn.className = 'msg-btn';
    speakBtn.textContent = '🔊';
    speakBtn.title = 'Read aloud';
    speakBtn.onclick = () => toggleSpeech(textContent, speakBtn);

    controls.appendChild(speakBtn);
    el.appendChild(controls);

    el.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.target.parentElement.querySelector('code').textContent;
        navigator.clipboard.writeText(code);
        const originalText = e.target.textContent;
        e.target.textContent = "Copied!";
        e.target.classList.add('copied');
        setTimeout(() => {
          e.target.textContent = originalText;
          e.target.classList.remove('copied');
        }, 2000);
      });
    });

    scrollToBottom();
  }
}

function toggleSpeech(text, btn) {
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    document.querySelectorAll('.msg-btn.speaking').forEach(b => {
       b.classList.remove('speaking');
       b.textContent = '🔊';
    });
    return;
  }
  speakText(text, btn);
}

export function speakText(text, btn = null) {
  window.speechSynthesis.cancel();
  const cleanText = text.replace(/[*#`_\[\]]/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = 'en-US';
  utterance.rate = 1.0;

  utterance.onstart = () => {
    if (btn) {
      btn.classList.add('speaking');
      btn.textContent = '⏹';
    }
  };

  utterance.onend = () => {
    if (btn) {
      btn.classList.remove('speaking');
      btn.textContent = '🔊';
    }
  };

  utterance.onerror = () => {
     if (btn) {
      btn.classList.remove('speaking');
      btn.textContent = '🔊';
    }
  };

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  window.speechSynthesis.cancel();
}

export function updateTokenCount(messages) {
  let totalTxt = "";
  messages.forEach(m => {
    if (typeof m.content === 'string') totalTxt += m.content;
    else if (Array.isArray(m.content)) {
      m.content.forEach(c => {
         if (c.type === 'text') totalTxt += c.text;
         if (c.type === 'image_url') totalTxt += " ".repeat(4000);
      });
    }
  });
  const count = estimateTokens(totalTxt);
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

export function renderAttachments(attachments, onRemove) {
  elements.attachmentPreview.innerHTML = '';
  attachments.forEach((att, index) => {
    const thumb = document.createElement('div');
    thumb.className = 'preview-thumb';

    if (att.type === 'audio') {
      // Audio file preview
      const audioIcon = document.createElement('div');
      audioIcon.className = 'audio-preview-icon';
      audioIcon.textContent = '🎵';
      audioIcon.title = att.name || 'Audio file';
      thumb.appendChild(audioIcon);
    } else {
      // Image preview
      const img = document.createElement('img');
      img.src = att.base64;
      thumb.appendChild(img);
    }

    const btn = document.createElement('button');
    btn.className = 'remove-btn';
    btn.textContent = '×';
    btn.onclick = () => onRemove(index);

    thumb.appendChild(btn);
    elements.attachmentPreview.appendChild(thumb);
  });
}

function parseMarkdown(text) {
  if (!text) return '';
  let safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const codeBlocks = [];
  safeText = safeText.replace(/```([\s\S]*?)```/g, (_match, code) => {
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

  safeText = safeText.replace(/__CODEBLOCK_(\d+)__/g, (_match, index) => {
    return `<div class="code-wrapper"><button class="copy-btn">Copy</button><pre><code>${codeBlocks[index]}</code></pre></div>`;
  });
  return safeText;
}