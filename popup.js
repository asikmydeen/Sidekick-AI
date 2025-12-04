// popup.js
import { initMock } from './modules/mock.js';
import { 
  state, loadState, saveState, updateState, 
  createNewSession, deleteSession, switchSession, getCurrentSession, updateCurrentSession, deleteAllSessions 
} from './modules/state.js';
import * as UI from './modules/ui.js';
import * as API from './modules/api.js';
import { getPageContent, readFileAsText } from './modules/utils.js';

initMock();

let abortController = null;
let recognition = null;

document.addEventListener('DOMContentLoaded', async () => {
  await loadState();
  UI.applyTheme(state.theme);
  
  // Restore Settings
  if (state.provider) {
    UI.elements.providerSelect.value = state.provider;
    handleProviderChange(state.provider);
  }
  if (state.apiKey) UI.elements.apiKeyInput.value = state.apiKey;
  if (state.endpoint) UI.elements.endpointInput.value = state.endpoint;
  if (state.systemPrompt) UI.elements.systemPromptInput.value = state.systemPrompt;
  if (state.temperature) {
    UI.elements.temperatureInput.value = state.temperature;
    UI.elements.tempValueLabel.textContent = state.temperature;
  }
  if (state.quickPrompts) UI.elements.quickPromptsInput.value = state.quickPrompts;

  // Restore Chat View if active
  if (state.model) {
    const session = getCurrentSession();
    if (session && session.messages.length > 0) {
      UI.elements.modelSelect.innerHTML = `<option value="${state.model}" selected>${state.model}</option>`;
      UI.elements.modelSelectionDiv.classList.remove('hidden');
      UI.elements.advancedSettings.classList.remove('hidden');
      UI.elements.startChatBtn.classList.remove('hidden');
      switchToChat();
    }
  }
});

// --- Settings & Navigation ---

UI.elements.providerSelect.addEventListener('change', (e) => handleProviderChange(e.target.value));

function handleProviderChange(provider) {
  if (provider === 'ollama') {
    UI.elements.apiKeyGroup.classList.add('hidden');
    UI.elements.endpointGroup.classList.remove('hidden');
  } else {
    UI.elements.apiKeyGroup.classList.remove('hidden');
    UI.elements.endpointGroup.classList.add('hidden');
  }
}

UI.elements.themeBtn.addEventListener('click', () => {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  updateState({ theme: newTheme });
  UI.applyTheme(newTheme);
});

UI.elements.settingsBtn.addEventListener('click', () => UI.toggleView('config'));

UI.elements.startChatBtn.addEventListener('click', () => {
  const selectedModel = UI.elements.modelSelect.value;
  if (!selectedModel) return UI.showStatus('Please select a model.', 'error');
  
  updateState({
    model: selectedModel,
    systemPrompt: UI.elements.systemPromptInput.value.trim(),
    temperature: parseFloat(UI.elements.temperatureInput.value),
    quickPrompts: UI.elements.quickPromptsInput.value.trim()
  });
  
  switchToChat();
});

// --- Session Management ---

UI.elements.historyBtn.addEventListener('click', () => {
  UI.renderSessionList(state.sessions, state.currentSessionId, handleSwitchSession, handleDeleteSession);
  UI.toggleSidebar(true);
});

UI.elements.closeSidebarBtn.addEventListener('click', () => UI.toggleSidebar(false));

UI.elements.newChatBtn.addEventListener('click', () => {
  createNewSession();
  switchToChat();
});

UI.elements.clearHistoryBtn.addEventListener('click', () => {
  if (confirm('Delete all history? This cannot be undone.')) {
    deleteAllSessions();
    UI.renderSessionList(state.sessions, state.currentSessionId, handleSwitchSession, handleDeleteSession);
    switchToChat();
  }
});

function handleSwitchSession(id) {
  switchSession(id);
  switchToChat();
  UI.toggleSidebar(false);
}

function handleDeleteSession(id) {
  if (confirm('Delete this chat?')) {
    deleteSession(id);
    UI.renderSessionList(state.sessions, state.currentSessionId, handleSwitchSession, handleDeleteSession);
    // If current was deleted, the state logic updates currentSessionId automatically
    if (state.currentSessionId !== id) switchToChat();
  }
}

// --- Chat Features ---

UI.elements.exportBtn.addEventListener('click', () => {
  const session = getCurrentSession();
  if (!session || session.messages.length ===0) return alert('No history to export.');
  
  let md = `# ${session.title}\n\n`;
  session.messages.forEach(msg => md += `### ${msg.role}\n${msg.content}\n\n`);
  
  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat-${session.id}.md`;
  a.click();
  URL.revokeObjectURL(url);
});

// File Upload
UI.elements.fileBtn.addEventListener('click', () => UI.elements.fileInput.click());
UI.elements.fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Block multimedia files
  if (file.type.startsWith('image/') || file.type.startsWith('video/') || file.type.startsWith('audio/')) {
    alert('Multimedia files are not currently supported. Please upload text-based files (code, markdown, txt, etc).');
    e.target.value = '';
    return;
  }
  
  try {
    const text = await readFileAsText(file);
    
    // Simple heuristic check for binary content
    if (/[\x00-\x08\x0E-\x1F]/.test(text)) {
      throw new Error("File content appears to be binary.");
    }

    const context = `\n\n[File Attachment: ${file.name}]\n\`\`\`\n${text}\n\`\`\``;
    UI.elements.messageInput.value += context;
    UI.autoResizeInput();
  } catch (err) {
    alert('Failed to read file. It may be binary or an unsupported format.');
    console.error(err);
  }
  e.target.value = ''; // Reset
});

// API Connection
UI.elements.fetchModelsBtn.addEventListener('click', async () => {
  const provider = UI.elements.providerSelect.value;
  const key = UI.elements.apiKeyInput.value.trim();
  const endpoint = UI.elements.endpointInput.value.trim();
  
  if (!provider) return UI.showStatus('Select a provider.', 'error');
  if (provider !== 'ollama' && !key) return UI.showStatus('Enter API Key.', 'error');

  updateState({ provider, apiKey: key, endpoint });
  UI.showStatus('Fetching...', 'info');

  try {
    const models = await API.fetchModels(provider, key, endpoint);
    if (!models.length) throw new Error('No models found.');
    UI.populateModelSelect(models);
    UI.showStatus(`Found ${models.length} models.`, 'success');
    UI.elements.modelSelectionDiv.classList.remove('hidden');
    UI.elements.advancedSettings.classList.remove('hidden');
    UI.elements.startChatBtn.classList.remove('hidden');
  } catch (err) {
    UI.showStatus(`Error: ${err.message}`, 'error');
  }
});

// Inputs
UI.elements.temperatureInput.addEventListener('input', (e) => UI.elements.tempValueLabel.textContent = e.target.value);
UI.elements.messageInput.addEventListener('input', UI.autoResizeInput);
UI.elements.messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

UI.elements.sendBtn.addEventListener('click', sendMessage);
UI.elements.stopBtn.addEventListener('click', () => {
  if (abortController) {
    abortController.abort();
    abortController = null;
    UI.toggleLoading(false);
  }
});

// Voice
UI.elements.micBtn.addEventListener('click', () => {
  if (!('webkitSpeechRecognition' in window)) return alert('Voice not supported.');
  if (recognition) { recognition.stop(); return; }
  
  recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  
  recognition.onstart = () => {
    UI.elements.micBtn.classList.add('listening');
    UI.elements.messageInput.placeholder = "Listening...";
  };
  recognition.onresult = (e) => {
    let t = '';
    for (let i = e.resultIndex; i < e.results.length; ++i) t += e.results[i][0].transcript;
    UI.elements.messageInput.value = t;
    UI.autoResizeInput();
  };
  recognition.onend = () => {
    UI.elements.micBtn.classList.remove('listening');
    recognition = null;
    UI.elements.messageInput.placeholder = "Type your message...";
  };
  recognition.start();
});

// Helpers
function switchToChat() {
  UI.toggleView('chat');
  UI.renderChips(state.quickPrompts, (prompt) => {
    UI.elements.messageInput.value = prompt + " ";
    UI.elements.messageInput.focus();
  });
  
  const session = getCurrentSession();
  UI.renderChat(session ? session.messages : [], state.model);
}

async function sendMessage() {
  const text = UI.elements.messageInput.value.trim();
  if (!text) return;

  const session = getCurrentSession();
  if (!session) return;

  const includePage = UI.elements.includePageContent.checked;
  let finalText = text;
  
  UI.toggleLoading(true);

  if (includePage) {
    const pageText = await getPageContent();
    if (pageText) finalText += `\n\n[Page Content]:\n${pageText}`;
  }

  // Update Local State
  session.messages.push({ role: 'user', content: finalText });
  updateCurrentSession(session.messages);
  
  UI.appendMessageToDOM('user', finalText);
  UI.elements.messageInput.value = '';
  UI.elements.includePageContent.checked = false;
  UI.autoResizeInput();

  // Create Bot Message Placeholder
  const msgId = 'msg-' + Date.now();
  UI.appendMessageToDOM('assistant', null, msgId, true);

  abortController = new AbortController();
  let fullResponse = "";

  try {
    const stream = API.streamChatApi(state, finalText, abortController.signal);
    
    // Process Stream
    for await (const chunk of stream) {
      fullResponse += chunk;
      UI.updateStreamingMessage(msgId, fullResponse);
    }
    
    // Save Final Response
    session.messages.push({ role: 'assistant', content: fullResponse });
    updateCurrentSession(session.messages);
    UI.updateTokenCount(session.messages);
    
  } catch (err) {
    if (err.name !== 'AbortError') {
      UI.removeMessage(msgId);
      UI.appendMessageToDOM('error', `Error: ${err.message}`);
    } else {
      // If aborted, save what we have
      if (fullResponse) {
        session.messages.push({ role: 'assistant', content: fullResponse });
        updateCurrentSession(session.messages);
      }
    }
  } finally {
    UI.toggleLoading(false);
    abortController = null;
  }
}