// modules/state.js

export const DEFAULT_QUICK_PROMPTS = 
`Summarize|Summarize the key points of the following content:
Explain|Explain this concept in simple terms:
Fix Grammar|Please fix the grammar in this text:
Code Review|Review this code for bugs and improvements:`;

export let state = {
  provider: '',
  apiKey: '',
  endpoint: 'http://localhost:11434', // For Ollama or custom endpoints
  model: '',
  systemPrompt: '',
  temperature: 0.7,
  quickPrompts: DEFAULT_QUICK_PROMPTS,
  theme: 'light',
  messages: [] // Array of { role, content }
};

export async function loadState() {
  const stored = await chrome.storage.local.get(['chatState']);
  if (stored.chatState) {
    state = { ...state, ...stored.chatState };
    
    // Ensure defaults for backward compatibility
    if (state.temperature === undefined) state.temperature = 0.7;
    if (!state.quickPrompts) state.quickPrompts = DEFAULT_QUICK_PROMPTS;
    if (!state.endpoint) state.endpoint = 'http://localhost:11434';
  }
  return state;
}

export function saveState() {
  chrome.storage.local.set({ chatState: state });
}

export function updateState(updates) {
  state = { ...state, ...updates };
  saveState();
}

export function clearMessages() {
  state.messages = [];
  saveState();
}