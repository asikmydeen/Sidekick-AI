// modules/utils.js

export async function getPageContent() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return null;

    // Check if tab.url is available (requires 'tabs' permission)
    if (!tab.url) {
      return "Cannot access page URL. Please ensure the extension has the required permissions.";
    }

    // Handle both Chrome and Firefox system pages
    if (tab.url.startsWith('chrome://') ||
        tab.url.startsWith('about:') ||
        tab.url.startsWith('moz-extension://') ||
        tab.url.startsWith('chrome-extension://')) {
      return "Cannot read system or extension pages.";
    }

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.body.innerText
    });

    if (results && results[0] && results[0].result) {
      const text = results[0].result;
      return text.length > 20000 ? text.substring(0, 20000) + "\n...[Content Truncated]" : text;
    }
    return null;
  } catch (err) {
    console.error("Failed to read page:", err);

    // Check if this is a Firefox permission error
    const isFirefox = navigator.userAgent.includes('Firefox');
    if (isFirefox && (err.message.includes('Missing host permission') || err.message.includes('permission'))) {
      return `⚠️ Firefox Permission Required\n\nTo read page content, please enable website access:\n\n1. Go to about:addons\n2. Click on "Sidekick AI"\n3. Go to "Permissions" tab\n4. Enable "Access your data for all websites"\n\nThen try again.`;
    }

    // Chrome permission error
    if (err.message.includes('Extension manifest must request permission')) {
      return `⚠️ Permission Required\n\nThe extension doesn't have permission to read this page. Please check extension permissions in your browser settings.`;
    }

    return `Error reading page: ${err.message}`;
  }
}

export function estimateTokens(text) {
  // Rough estimate: 1 token ~= 4 chars in English
  return Math.ceil(text.length / 4);
}

export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}