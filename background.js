// background.js

function setupSidePanel() {
  // Allow the side panel to open when the action icon is clicked
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error("Failed to set panel behavior:", error));
  }
}

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
  setupSidePanel();
});

// Also try to set it immediately in case the worker wakes up and it wasn't set
setupSidePanel();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "ping") {
    sendResponse({ response: "pong" });
  }
});