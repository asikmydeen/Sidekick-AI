// popup.js
import { initMock } from './modules/mock.js';
import { state, loadState, saveState, updateState, clearMessages } from './modules/state.js';
import * as UI from './modules/ui.js';
import * as API from './modules/api.js';
import { getPageContent } from './modules/utils.js';

// Initialize Mock API (for web preview)
initMock();

// AbortController for stopping generation
let abortController = null;

document.addEventListener('DOMContentLoaded', async () => {
  // Load State
  await loadState();

  // Initialize UI with loaded state
  UI.applyTheme(state.theme);
  
  if (state.provider) UI.elements.providerSelect.value = state.provider;
  if (state.apiKey) UI.elements.apiKeyInput.value = state.apiKey;
  if (state.systemPrompt) UI.elements.systemPromptInput.value = state.systemPrompt;
  if (state.temperature) {
    UI.elements.temperatureInput.value = state.temperature;
    UI.elements.tempValueLabel.textContent = state.temperature;
  }
  if (state.quickPrompts) UI.elements.quickPromptsInput.value = state.quickPrompts;

  // Restore Chat View if model is selected and history exists
  if (state.model) {
    if (state.messages.length > 0) {
      // Restore model UI state for chat view
      UI.elements.modelSelect.innerHTML = `<option value="${state.model}" selected>${state.model}</option>`;
      UI.elements.modelSelectionDiv.classList.remove('hidden');
      UI.elements.advancedSettings.classList.remove('hidden');
      UI.elements.startChatBtn.classList.remove('hidden');
      
      switchToChat();
    }
  }
});

// --- Event Listeners ---

// Theme
UI.elements.themeBtn.addEventListener('click', () => {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  updateState({ theme: newTheme });
  UI.applyTheme(newTheme);
});

// Settings & Navigation
UI.elements.settingsBtn.addEventListener('click', () => UI.toggleView('config'));

UI.elements.startChatBtn.addEventListener('click', () => {
  const selectedModel = UI.elements.modelSelect.value;
  if (!selectedModel) {
    UI.showStatus('Please select a model.', 'error');
    return;
  }
  
  updateState({
    model: selectedModel,
    systemPrompt: UI.elements.systemPromptInput.value.trim(),
    temperature: parseFloat(UI.elements.temperatureInput.value),
    quickPrompts: UI.elements.quickPromptsInput.value.trim()
  });
  
  switchToChat();
});

// Chat Actions
UI.elements.clearChatBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear the chat history?')) {
    clearMessages();
    UI.renderChat(state.messages, state.model);
  }
});

UI.elements.exportBtn.addEventListener('click', () => {
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

// API Connection
UI.elements.fetchModelsBtn.addEventListener('click', async () => {
  const provider = UI.elements.providerSelect.value;
  const key = UI.elements.apiKeyInput.value.trim();

  if (!provider || !key) {
    UI.showStatus('Please select a provider and enter an API key.', 'error');
    return;
  }

  updateState({ provider, apiKey: key });

  UI.showStatus('Fetching models...', 'info');
  UI.elements.modelSelectionDiv.classList.add('hidden');
  UI.elements.advancedSettings.classList.add('hidden');
  UI.elements.startChatBtn.classList.add('hidden');
  UI.elements.modelSelect.innerHTML = '<option value="" disabled selected>Select a model...</option>';

  try {
    const models = await API.fetchModels(provider, key);
    if (models.length === 0) throw new Error('No models found.');
    
    UI.populateModelSelect(models);
    UI.showStatus(`Found ${models.length} models.`, 'success');
    UI.elements.modelSelectionDiv.classList.remove('hidden');
    UI.elements.advancedSettings.classList.remove('hidden');
    UI.elements.startChatBtn.classList.remove('hidden');
  } catch (err) {
    console.error(err);
    UI.showStatus(`Error: ${err.message}`, 'error');
    
    // Fallback for Anthropic
    if (provider === 'anthropic') {
      UI.showStatus('Using default Anthropic models.', 'info');
      const defaults = ['claude-3-5-sonnet-20240620', 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'];
      UI.populateModelSelect(defaults);
      UI.elements.modelSelectionDiv.classList.remove('hidden');
      UI.elements.advancedSettings.classList.remove('hidden');
      UI.elements.startChatBtn.classList.remove('hidden');
    }
  }
});

// Slider Input
UI.elements.temperatureInput.addEventListener('input', (e) => {
  UI.elements.tempValueLabel.textContent = e.target.value;
});

// Chat Input Handling
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
    
    // Find loading dots and replace with stopped message
    const loadingDots = document.querySelector('.typing-dots');
    if (loadingDots) {
      const wrapper = loadingDots.closest('.message');
      wrapper.textContent = '[Stopped by user]';
      wrapper.classList.add('error');
    }
    UI.toggleLoading(false);
  }
});

// Copy Code Buttons
UI.elements.chatHistory.addEventListener('click', (e) => {
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

// --- Helper Logic ---

function switchToChat() {
  UI.toggleView('chat');
  UI.renderChips(state.quickPrompts, (prompt) => {
    UI.elements.messageInput.value = prompt + " ";
    UI.elements.messageInput.focus();
    UI.autoResizeInput();
  });
  UI.renderChat(state.messages, state.model);
}

async function sendMessage() {
  let text = UI.elements.messageInput.value.trim();
  if (!text) return;

  const shouldIncludeContext = UI.elements.includePageContent.checked;
  let contextMsg = "";

  UI.toggleLoading(true);

  if (shouldIncludeContext) {
    const content = await getPageContent();
    if (content) {
      contextMsg = `\n\n--- Page Content ---\n${content}\n---------------------`;
      text += ` [Attached Page Context]`; 
    }
  }

  // Update State & UI with User Message
  state.messages.push({ role: 'user', content: text });
  saveState();
  
  UI.appendMessageToDOM('user', text);
  
  // Reset Input
  UI.elements.messageInput.value = '';
  UI.elements.messageInput.style.height = '';
  UI.elements.includePageContent.checked = false;

  // Prepare loading state
  const loadingId = 'loading-' + Date.now();
  UI.appendMessageToDOM('assistant', null, loadingId, true);

  // Prepare prompt for API (strip UI marker, add real context)
  const apiPrompt = text.replace(' [Attached Page Context]', '') + contextMsg;
  
  abortController = new AbortController();

  try {
    const responseText = await API.callChatApi(state, apiPrompt, abortController.signal);
    
    UI.removeMessage(loadingId);
    
    state.messages.push({ role: 'assistant', content: responseText });
    saveState();
    
    UI.appendMessageToDOM('assistant', responseText);
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('Generation stopped by user');
    } else {
      UI.removeMessage(loadingId);
      UI.appendMessageToDOM('error', `Error: ${err.message}`);
    }
  } finally {
    UI.toggleLoading(false);
    abortController = null;
  }
}