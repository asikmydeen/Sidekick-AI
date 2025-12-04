// sidepanel.js
import { initMock } from './modules/mock.js';
import {
  state, loadState, updateState,
  createNewSession, deleteSession, switchSession, getCurrentSession, updateCurrentSession, deleteAllSessions,
  getProviderCredentials, updateProviderCredentials,
  HF_TASK_MODELS
} from './modules/state.js';
import * as UI from './modules/ui.js';
import * as API from './modules/api.js';
import { getPageContent, readFileAsText } from './modules/utils.js';

initMock();

let abortController = null;
let recognition = null;
let pendingAttachments = [];

document.addEventListener('DOMContentLoaded', async () => {
  await loadState();
  UI.applyTheme(state.theme);
  UI.initFullPageMode(); // Initialize full-page mode if opened as tab

  if (state.provider) {
    UI.elements.providerSelect.value = state.provider;
    // Load provider-specific credentials
    loadProviderCredentials(state.provider);
    handleProviderChange(state.provider);
  }

  if (state.systemPrompt) UI.elements.systemPromptInput.value = state.systemPrompt;
  if (state.temperature) {
    UI.elements.temperatureInput.value = state.temperature;
    UI.elements.tempValueLabel.textContent = state.temperature;
  }
  if (state.quickPrompts) UI.elements.quickPromptsInput.value = state.quickPrompts;
  if (state.autoRead) UI.elements.autoReadInput.checked = state.autoRead;

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

UI.elements.providerSelect.addEventListener('change', (e) => handleProviderChange(e.target.value));

function saveCurrentProviderCredentials() {
  const currentProvider = state.provider;
  if (!currentProvider) return;

  let credentials = {};

  switch (currentProvider) {
    case 'openai':
    case 'openrouter':
    case 'anthropic':
    case 'huggingface':
      credentials.apiKey = UI.elements.apiKeyInput.value.trim();
      break;
    case 'ollama':
      credentials.endpoint = UI.elements.endpointInput.value.trim();
      break;
    case 'bedrock':
      credentials.accessKey = UI.elements.awsAccessKey.value.trim();
      credentials.secretKey = UI.elements.awsSecretKey.value.trim();
      credentials.sessionToken = UI.elements.awsSessionToken.value.trim();
      credentials.region = UI.elements.awsRegion.value.trim();
      break;
  }

  updateProviderCredentials(currentProvider, credentials);
}

function loadProviderCredentials(provider) {
  const credentials = getProviderCredentials(provider);
  if (!credentials) return;

  // Clear all fields first
  UI.elements.apiKeyInput.value = '';
  UI.elements.endpointInput.value = '';
  UI.elements.awsAccessKey.value = '';
  UI.elements.awsSecretKey.value = '';
  UI.elements.awsSessionToken.value = '';
  UI.elements.awsRegion.value = 'us-east-1';

  // Load provider-specific credentials
  switch (provider) {
    case 'openai':
    case 'openrouter':
    case 'anthropic':
    case 'huggingface':
      if (credentials.apiKey) {
        UI.elements.apiKeyInput.value = credentials.apiKey;
      }
      break;
    case 'ollama':
      if (credentials.endpoint) {
        UI.elements.endpointInput.value = credentials.endpoint;
      }
      break;
    case 'bedrock':
      if (credentials.accessKey) UI.elements.awsAccessKey.value = credentials.accessKey;
      if (credentials.secretKey) UI.elements.awsSecretKey.value = credentials.secretKey;
      if (credentials.sessionToken) UI.elements.awsSessionToken.value = credentials.sessionToken;
      if (credentials.region) UI.elements.awsRegion.value = credentials.region;
      break;
  }

  // Restore models and selected model
  if (credentials.models && credentials.models.length > 0) {
    UI.populateModelSelect(credentials.models);
    UI.elements.modelSelectionDiv.classList.remove('hidden');
    UI.elements.advancedSettings.classList.remove('hidden');
    UI.elements.startChatBtn.classList.remove('hidden');

    if (credentials.selectedModel) {
      UI.elements.modelSelect.value = credentials.selectedModel;
    }
  }
}

function updateCredentialFieldsVisibility(provider) {
  // Hide all credential groups
  UI.elements.apiKeyGroup.classList.add('hidden');
  UI.elements.endpointGroup.classList.add('hidden');
  UI.elements.awsGroup.classList.add('hidden');
  UI.elements.hfTaskGroup.classList.add('hidden');

  // Show relevant credential group
  if (provider === 'ollama') {
    UI.elements.endpointGroup.classList.remove('hidden');
  } else if (provider === 'bedrock') {
    UI.elements.awsGroup.classList.remove('hidden');
  } else {
    UI.elements.apiKeyGroup.classList.remove('hidden');
  }

  // Show HuggingFace task selector
  if (provider === 'huggingface') {
    UI.elements.hfTaskGroup.classList.remove('hidden');
    // Load saved task
    const credentials = getProviderCredentials(provider);
    if (credentials?.task) {
      UI.elements.hfTaskSelect.value = credentials.task;
    }
  }
}

// Providers that support manual model entry (don't have reliable model listing)
const MANUAL_MODEL_PROVIDERS = ['huggingface', 'anthropic'];

function updateManualModelVisibility(provider) {
  if (MANUAL_MODEL_PROVIDERS.includes(provider)) {
    UI.elements.manualModelGroup.classList.remove('hidden');

    // Set provider-specific hints based on task
    if (provider === 'huggingface') {
      const task = UI.elements.hfTaskSelect.value || 'chat';
      updateHfTaskHint(task);
    } else if (provider === 'anthropic') {
      UI.elements.modelHint.innerHTML = 'e.g., <code>claude-sonnet-4-20250514</code>, <code>claude-3-5-haiku-20241022</code>';
    }
  } else {
    UI.elements.manualModelGroup.classList.add('hidden');
  }
}

function updateHfTaskHint(task) {
  const hints = {
    'chat': 'e.g., <code>meta-llama/Llama-3.2-3B-Instruct</code>, <code>deepseek-ai/DeepSeek-V3:novita</code>',
    'text-to-image': 'e.g., <code>black-forest-labs/FLUX.1-dev</code>, <code>stabilityai/stable-diffusion-xl-base-1.0</code>',
    'text-to-video': 'e.g., <code>ali-vilab/text-to-video-ms-1.7b</code>, <code>cerspense/zeroscope_v2_576w</code>',
    'image-to-text': 'e.g., <code>Salesforce/blip-image-captioning-large</code>',
    'text-to-speech': 'e.g., <code>facebook/mms-tts-eng</code>, <code>suno/bark-small</code>',
    'speech-to-text': 'e.g., <code>openai/whisper-large-v3</code>'
  };
  UI.elements.modelHint.innerHTML = hints[task] || hints['chat'];
}

// Handle HuggingFace task change
UI.elements.hfTaskSelect.addEventListener('change', () => {
  const task = UI.elements.hfTaskSelect.value;
  updateProviderCredentials('huggingface', { task });
  updateHfTaskHint(task);

  // Update models based on task
  const taskModels = HF_TASK_MODELS[task] || [];
  UI.populateModelSelect(taskModels);

  // Show/hide model selection
  if (taskModels.length > 0) {
    UI.elements.modelSelectionDiv.classList.remove('hidden');
    UI.elements.advancedSettings.classList.remove('hidden');
    UI.elements.startChatBtn.classList.remove('hidden');
  }

  // Save task-specific models
  updateProviderCredentials('huggingface', { models: taskModels });
});

function handleProviderChange(provider) {
  // Save current provider's credentials before switching
  saveCurrentProviderCredentials();

  // Update state
  updateState({ provider });

  // Load new provider's credentials
  loadProviderCredentials(provider);

  // Update UI visibility
  updateCredentialFieldsVisibility(provider);
  updateManualModelVisibility(provider);

  // Reset model selection
  UI.elements.modelSelectionDiv.classList.add('hidden');
  UI.elements.advancedSettings.classList.add('hidden');
  UI.elements.startChatBtn.classList.add('hidden');
}

UI.elements.themeBtn.addEventListener('click', () => {
  const newTheme = state.theme === 'light' ? 'dark' : 'light';
  updateState({ theme: newTheme });
  UI.applyTheme(newTheme);
});

// Expand to full page mode
if (UI.elements.expandBtn) {
  UI.elements.expandBtn.addEventListener('click', () => {
    // Open the sidepanel.html as a full tab and close sidebar
    chrome.tabs.create({ url: chrome.runtime.getURL('sidepanel.html') });
    // Close the sidepanel if we're in a sidebar context
    if (window.close) {
      window.close();
    }
  });
}

// Gallery tab filtering
document.querySelectorAll('.gallery-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    const session = getCurrentSession();
    if (session) {
      UI.renderMediaGallery(session.messages, filter);
    }
  });
});

UI.elements.settingsBtn.addEventListener('click', () => UI.toggleView('config'));

UI.elements.startChatBtn.addEventListener('click', () => {
  const selectedModel = UI.elements.modelSelect.value;
  if (!selectedModel) return UI.showStatus('Please select a model.', 'error');

  updateState({
    model: selectedModel,
    systemPrompt: UI.elements.systemPromptInput.value.trim(),
    temperature: parseFloat(UI.elements.temperatureInput.value),
    quickPrompts: UI.elements.quickPromptsInput.value.trim(),
    autoRead: UI.elements.autoReadInput.checked
  });

  switchToChat();
});

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
    if (state.currentSessionId !== id) switchToChat();
  }
}

UI.elements.exportBtn.addEventListener('click', () => {
  const session = getCurrentSession();
  if (!session || session.messages.length === 0) return alert('No history to export.');

  let md = `# ${session.title}\n\n`;
  session.messages.forEach(msg => {
    if (Array.isArray(msg.content)) {
       const txt = msg.content.find(c => c.type === 'text')?.text || '';
       md += `### ${msg.role}\n${txt}\n[Image Attached]\n\n`;
    } else {
       md += `### ${msg.role}\n${msg.content}\n\n`;
    }
  });

  const blob = new Blob([md], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chat-${session.id}.md`;
  a.click();
  URL.revokeObjectURL(url);
});

UI.elements.fileBtn.addEventListener('click', () => UI.elements.fileInput.click());
UI.elements.fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Handle image files
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target.result;
      pendingAttachments.push({ type: 'image_url', base64: base64 });
      UI.renderAttachments(pendingAttachments, (index) => {
        pendingAttachments.splice(index, 1);
        UI.renderAttachments(pendingAttachments, () => {});
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    return;
  }

  // Handle audio files (for speech-to-text)
  if (file.type.startsWith('audio/')) {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target.result;
      pendingAttachments.push({ type: 'audio', base64: base64, name: file.name });
      UI.renderAttachments(pendingAttachments, (index) => {
        pendingAttachments.splice(index, 1);
        UI.renderAttachments(pendingAttachments, () => {});
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
    return;
  }

  // Handle text files
  try {
    const text = await readFileAsText(file);
    if (/[\x00-\x08\x0E-\x1F]/.test(text)) {
      throw new Error("File content appears to be binary.");
    }
    const context = `\n\n[File Attachment: ${file.name}]\n\`\`\`\n${text}\n\`\`\``;
    UI.elements.messageInput.value += context;
    UI.autoResizeInput();
  } catch (err) {
    alert('Failed to read file. Please upload images, audio, or text files.');
    console.error(err);
  }
  e.target.value = '';
});

UI.elements.fetchModelsBtn.addEventListener('click', async () => {
  const provider = UI.elements.providerSelect.value;

  if (!provider) return UI.showStatus('Select a provider.', 'error');

  // Save current credentials
  saveCurrentProviderCredentials();

  // Get credentials for validation
  const credentials = getProviderCredentials(provider);

  // Validate credentials
  if (provider === 'bedrock') {
    if (!credentials.accessKey || !credentials.secretKey) {
      return UI.showStatus('Enter AWS Credentials.', 'error');
    }
  } else if (provider !== 'ollama' && !credentials.apiKey) {
    return UI.showStatus('Enter API Key.', 'error');
  }

  UI.showStatus('Fetching...', 'info');

  try {
    const models = await API.fetchModels(provider, credentials);
    if (!models.length) throw new Error('No models found.');
    UI.populateModelSelect(models);
    UI.showStatus(`Found ${models.length} models.`, 'success');
    UI.elements.modelSelectionDiv.classList.remove('hidden');
    UI.elements.advancedSettings.classList.remove('hidden');
    UI.elements.startChatBtn.classList.remove('hidden');

    // Save fetched models to provider credentials
    updateProviderCredentials(provider, { models: models });
  } catch (err) {
    UI.showStatus(`Error: ${err.message}`, 'error');
  }
});

// Save selected model when changed
UI.elements.modelSelect.addEventListener('change', () => {
  const provider = state.provider;
  const selectedModel = UI.elements.modelSelect.value;
  if (provider && selectedModel) {
    updateProviderCredentials(provider, { selectedModel: selectedModel });
  }
});

// Manual model entry - Add button
UI.elements.saveModelBtn.addEventListener('click', () => {
  const modelName = UI.elements.manualModelInput.value.trim();
  if (!modelName) {
    UI.showStatus('Please enter a model name.', 'error');
    return;
  }

  const provider = state.provider;

  // Add to dropdown and select it
  UI.addModelToSelect(modelName);

  // Save to provider credentials
  const credentials = getProviderCredentials(provider);
  const models = credentials.models || [];
  if (!models.includes(modelName)) {
    models.push(modelName);
  }
  updateProviderCredentials(provider, { models, selectedModel: modelName });

  // Show model selection and advanced settings
  UI.elements.modelSelectionDiv.classList.remove('hidden');
  UI.elements.advancedSettings.classList.remove('hidden');
  UI.elements.startChatBtn.classList.remove('hidden');

  // Clear input
  UI.elements.manualModelInput.value = '';
  UI.showStatus(`Model "${modelName}" added.`, 'success');
});

// Allow Enter key in manual model input
UI.elements.manualModelInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    UI.elements.saveModelBtn.click();
  }
});

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
    UI.stopSpeaking();
    UI.toggleLoading(false);
  }
});

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

function switchToChat() {
  UI.toggleView('chat');
  UI.renderChips(state.quickPrompts, (prompt) => {
    UI.elements.messageInput.value = prompt + " ";
    UI.elements.messageInput.focus();
  });

  const session = getCurrentSession();
  UI.renderChat(session ? session.messages : [], state.model);

  // Show expand button in sidebar mode only
  if (UI.elements.expandBtn && !UI.isFullPageMode()) {
    UI.elements.expandBtn.classList.remove('hidden');
  }
}

async function sendMessage() {
  const text = UI.elements.messageInput.value.trim();
  if (!text && pendingAttachments.length === 0) return;

  const session = getCurrentSession();
  if (!session) return;

  UI.stopSpeaking();
  const includePage = UI.elements.includePageContent.checked;
  let finalText = text;

  UI.toggleLoading(true);

  if (includePage) {
    const pageText = await getPageContent();
    if (pageText) finalText += `\n\n[Page Content]:\n${pageText}`;
  }

  // Check if this is a HuggingFace multi-modal task
  const provider = state.provider;
  const hfTask = provider === 'huggingface' ? (getProviderCredentials('huggingface')?.task || 'chat') : null;

  // Handle HuggingFace multi-modal tasks
  if (provider === 'huggingface' && hfTask !== 'chat') {
    await handleHuggingFaceTask(hfTask, finalText, session);
    return;
  }

  // Standard chat flow
  let messageContent;
  if (pendingAttachments.length > 0) {
    messageContent = [];
    if (finalText) messageContent.push({ type: 'text', text: finalText });
    pendingAttachments.forEach(att => {
      messageContent.push({ type: 'image_url', image_url: { url: att.base64 } });
    });
  } else {
    messageContent = finalText;
  }

  session.messages.push({ role: 'user', content: messageContent });
  updateCurrentSession(session.messages);

  UI.appendMessageToDOM('user', messageContent);
  UI.elements.messageInput.value = '';
  UI.elements.includePageContent.checked = false;
  UI.autoResizeInput();

  pendingAttachments = [];
  UI.renderAttachments([], () => {});

  const msgId = 'msg-' + Date.now();
  UI.appendMessageToDOM('assistant', null, msgId, true);

  abortController = new AbortController();
  let fullResponse = "";

  try {
    const stream = API.streamChatApi(state, messageContent, abortController.signal);

    for await (const chunk of stream) {
      fullResponse += chunk;
      UI.updateStreamingMessage(msgId, fullResponse);
    }

    session.messages.push({ role: 'assistant', content: fullResponse });
    updateCurrentSession(session.messages);
    UI.updateTokenCount(session.messages);

    UI.finalizeMessageInDOM(msgId, fullResponse);
    if (state.autoRead) {
      UI.speakText(fullResponse);
    }

  } catch (err) {
    if (err.name !== 'AbortError') {
      UI.removeMessage(msgId);
      UI.appendMessageToDOM('error', `Error: ${err.message}`);
    } else {
      if (fullResponse) {
        session.messages.push({ role: 'assistant', content: fullResponse });
        updateCurrentSession(session.messages);
        UI.finalizeMessageInDOM(msgId, fullResponse);
      }
    }
  } finally {
    UI.toggleLoading(false);
    abortController = null;
  }
}

// Handle HuggingFace multi-modal tasks (image generation, TTS, etc.)
async function handleHuggingFaceTask(task, text, session) {
  const credentials = getProviderCredentials('huggingface');
  const model = state.model;
  const apiKey = credentials.apiKey;

  UI.elements.messageInput.value = '';
  UI.autoResizeInput();

  try {
    switch (task) {
      case 'text-to-image': {
        // Show user prompt
        session.messages.push({ role: 'user', content: text });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('user', text);

        // Show loading
        const msgId = 'msg-' + Date.now();
        UI.appendMessageToDOM('assistant', null, msgId, true);

        // Generate image
        const imageUrl = await API.textToImage(model, text, apiKey);

        // Remove loading and show result
        UI.removeMessage(msgId);
        const responseContent = [
          { type: 'generated_image', url: imageUrl, prompt: text }
        ];
        session.messages.push({ role: 'assistant', content: responseContent });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('assistant', responseContent);
        break;
      }

      case 'image-to-text': {
        // Need an image attachment
        if (pendingAttachments.length === 0) {
          UI.showStatus('Please attach an image first.', 'error');
          UI.toggleLoading(false);
          return;
        }

        const imageData = pendingAttachments[0].base64;
        const userContent = [
          { type: 'text', text: text || 'Describe this image' },
          { type: 'image_url', image_url: { url: imageData } }
        ];
        session.messages.push({ role: 'user', content: userContent });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('user', userContent);

        pendingAttachments = [];
        UI.renderAttachments([], () => {});

        // Show loading
        const msgId = 'msg-' + Date.now();
        UI.appendMessageToDOM('assistant', null, msgId, true);

        // Get caption
        const caption = await API.imageToText(model, imageData, apiKey);

        // Remove loading and show result
        UI.removeMessage(msgId);
        session.messages.push({ role: 'assistant', content: caption });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('assistant', caption);
        break;
      }

      case 'text-to-video': {
        // Show user prompt
        session.messages.push({ role: 'user', content: text });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('user', text);

        // Show loading with video generation notice
        const msgId = 'msg-' + Date.now();
        UI.appendMessageToDOM('assistant', null, msgId, true);
        UI.showStatus('Generating video... This may take 30-120 seconds.', 'info');

        // Generate video
        const videoUrl = await API.textToVideo(model, text, apiKey);

        // Remove loading and show result
        UI.removeMessage(msgId);
        const responseContent = [
          { type: 'generated_video', url: videoUrl, prompt: text }
        ];
        session.messages.push({ role: 'assistant', content: responseContent });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('assistant', responseContent);
        break;
      }

      case 'text-to-speech': {
        // Show user text
        session.messages.push({ role: 'user', content: text });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('user', text);

        // Show loading
        const msgId = 'msg-' + Date.now();
        UI.appendMessageToDOM('assistant', null, msgId, true);

        // Generate audio
        const audioUrl = await API.textToSpeech(model, text, apiKey);

        // Remove loading and show result
        UI.removeMessage(msgId);
        const responseContent = [
          { type: 'generated_audio', url: audioUrl }
        ];
        session.messages.push({ role: 'assistant', content: responseContent });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('assistant', responseContent);
        break;
      }

      case 'speech-to-text': {
        // Need an audio attachment
        if (pendingAttachments.length === 0) {
          UI.showStatus('Please attach an audio file first.', 'error');
          UI.toggleLoading(false);
          return;
        }

        const audioData = pendingAttachments[0].base64;
        const userContent = [
          { type: 'audio_input', url: audioData }
        ];
        session.messages.push({ role: 'user', content: userContent });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('user', userContent);

        pendingAttachments = [];
        UI.renderAttachments([], () => {});

        // Show loading
        const msgId = 'msg-' + Date.now();
        UI.appendMessageToDOM('assistant', null, msgId, true);

        // Transcribe
        const transcription = await API.speechToText(model, audioData, apiKey);

        // Remove loading and show result
        UI.removeMessage(msgId);
        session.messages.push({ role: 'assistant', content: transcription });
        updateCurrentSession(session.messages);
        UI.appendMessageToDOM('assistant', transcription);
        break;
      }

      default:
        UI.showStatus(`Unknown task: ${task}`, 'error');
    }
  } catch (err) {
    UI.appendMessageToDOM('error', `Error: ${err.message}`);
  } finally {
    UI.toggleLoading(false);
  }
}