// background.js
// Listens for messages or extension events

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed and ready.");
  // Allow the side panel to open when the action icon is clicked
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error(error));
  }
});

// Example message listener
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "ping") {
    sendResponse({ response: "pong" });
  }
});