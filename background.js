// background.js

// Ensure the side panel opens when the extension icon is clicked
function setupSidePanel() {
  // Check if the API is available (it should be in Chrome 114+)
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error("Error setting panel behavior:", error));
  }
}

// Setup declarativeNetRequest rules to modify Origin header for Ollama
// This bypasses CORS by making Ollama think the request is from localhost
async function setupOllamaHeaderRules() {
  const RULE_ID = 1;

  // Add rule to modify Origin header for Ollama requests
  const rule = {
    id: RULE_ID,
    priority: 1,
    action: {
      type: 'modifyHeaders',
      requestHeaders: [
        {
          header: 'Origin',
          operation: 'set',
          value: 'http://localhost:11434'
        }
      ]
    },
    condition: {
      urlFilter: '*://localhost:11434/*',
      resourceTypes: ['xmlhttprequest']
    }
  };

  try {
    // Remove and add in a single atomic operation to avoid race conditions
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID],
      addRules: [rule]
    });
    console.log('[Background] Ollama header modification rule installed');
  } catch (error) {
    console.error('[Background] Failed to install Ollama header rule:', error);
  }
}

// Run on installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed - setting up side panel behavior.");
  setupSidePanel();
  setupOllamaHeaderRules();
});

// Run every time the background script wakes up (just in case)
setupSidePanel();
setupOllamaHeaderRules();

// Track offscreen document state
let offscreenCreated = false;

async function ensureOffscreenDocument() {
  if (offscreenCreated) return;

  // Check if offscreen document already exists
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT']
  });

  if (existingContexts.length > 0) {
    offscreenCreated = true;
    return;
  }

  // Create offscreen document
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['USER_MEDIA'],
    justification: 'Speech recognition requires microphone access'
  });
  offscreenCreated = true;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "ping") {
    sendResponse({ response: "pong" });
    return false;
  }

  // Handle speech recognition requests from sidepanel
  if (msg.action === 'startSpeechRecognition') {
    ensureOffscreenDocument().then(() => {
      chrome.runtime.sendMessage({ target: 'offscreen', action: 'startSpeechRecognition' });
    });
    return false;
  }

  if (msg.action === 'stopSpeechRecognition') {
    chrome.runtime.sendMessage({ target: 'offscreen', action: 'stopSpeechRecognition' });
    return false;
  }

  // Forward speech events to sidepanel (from offscreen)
  if (['speechStarted', 'speechResult', 'speechError', 'speechEnded'].includes(msg.action)) {
    // Broadcast to all extension pages (sidepanel will receive it)
    chrome.runtime.sendMessage(msg).catch(() => {});
    return false;
  }

  return false;
});