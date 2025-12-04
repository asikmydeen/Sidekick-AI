// background.js

// Ensure the side panel opens when the extension icon is clicked
function setupSidePanel() {
  // Check if the API is available (it should be in Chrome 114+)
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error("Error setting panel behavior:", error));
  }
}

// Run on installation
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed - setting up side panel behavior.");
  setupSidePanel();
});

// Run every time the background script wakes up (just in case)
setupSidePanel();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "ping") {
    sendResponse({ response: "pong" });
    return false;
  }

  // Handle Ollama requests through service worker to bypass CORS
  if (msg.action === "ollamaRequest") {
    handleOllamaRequest(msg.url, msg.body)
      .then(sendResponse)
      .catch(error => sendResponse({ error: error.message }));
    return true; // Keep message channel open for async response
  }

  return false;
});

async function handleOllamaRequest(url, body) {
  try {
    console.log('[Background] Proxying request to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Ollama error (${response.status}): ${errorText}`);
    }

    // For streaming responses, we need to read the full stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      chunks.push(chunk);
    }

    return { success: true, data: chunks.join('') };

  } catch (error) {
    console.error('[Background] Ollama request failed:', error);
    return { success: false, error: error.message };
  }
}