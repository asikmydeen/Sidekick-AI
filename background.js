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

  // Remove existing rules first
  try {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [RULE_ID]
    });
  } catch (e) {
    console.log('[Background] No existing rules to remove');
  }

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
    await chrome.declarativeNetRequest.updateDynamicRules({
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

// Port-based streaming for Ollama requests
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === 'ollama-stream') {
    port.onMessage.addListener(async (msg) => {
      const { url, body } = msg;

      try {
        console.log('[Background] Streaming request to:', url);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });

        if (!response.ok) {
          const errorText = await response.text();
          port.postMessage({ error: `HTTP ${response.status}: ${errorText}` });
          port.disconnect();
          return;
        }

        // Stream the response chunks
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            port.postMessage({ done: true });
            port.disconnect();
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          port.postMessage({ chunk });
        }

      } catch (error) {
        console.error('[Background] Ollama request failed:', error);
        port.postMessage({ error: error.message });
        port.disconnect();
      }
    });
  }
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "ping") {
    sendResponse({ response: "pong" });
  }
  return false;
});