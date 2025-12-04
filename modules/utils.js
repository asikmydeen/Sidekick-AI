// modules/utils.js

export async function getPageContent() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) return null;
    if (tab.url.startsWith('chrome://')) return "Cannot read system pages.";

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