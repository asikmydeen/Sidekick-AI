// background.js

// Ensure the side panel opens when the extension icon is clicked
function setupSidePanel() {
  // Check if Chrome's sidePanel API is available (Chrome 114+)
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error("Error setting panel behavior:", error));
  }
  // Check if Firefox's sidebarAction API is available
  else if (chrome.sidebarAction) {
    // Firefox: Toggle sidebar when toolbar icon is clicked
    chrome.action.onClicked.addListener(() => {
      chrome.sidebarAction.toggle();
    });
    console.log("Firefox sidebar mode enabled");
  } else {
    console.log("No sidebar API available");
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

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "ping") {
    sendResponse({ response: "pong" });
  }
  return false;
});