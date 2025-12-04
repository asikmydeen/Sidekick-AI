// modules/utils.js

export async function getPageContent() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab) return null;
    
    // Cannot script on chrome:// pages
    if (tab.url.startsWith('chrome://')) {
      return "Cannot read content from browser system pages.";
    }

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        return document.body.innerText;
      }
    });

    if (results && results[0] && results[0].result) {
      // Truncate to avoid token limits (approx 10k chars is safe for most modern models)
      const text = results[0].result;
      return text.length > 10000 ? text.substring(0, 10000) + "\n...[Content Truncated]" : text;
    }
    return null;
  } catch (err) {
    console.error("Failed to read page:", err);
    return `Error reading page: ${err.message}`;
  }
}