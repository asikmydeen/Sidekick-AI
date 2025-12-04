// modules/state.js

export const DEFAULT_QUICK_PROMPTS = 
`Summarize|Summarize the key points of the following content:
Explain|Explain this concept in simple terms:
Fix Grammar|Please fix the grammar in this text:
Code Review|Review this code for bugs and improvements:`;

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export let state = {
  provider: '',
  apiKey: '',
  endpoint: 'http://localhost:11434',
  model: '',
  systemPrompt: '',
  temperature: 0.7,
  quickPrompts: DEFAULT_QUICK_PROMPTS,
  theme: 'light',
  currentSessionId: null,
  sessions: [] // Array of { id, title, messages, lastModified }
};

export async function loadState() {
  const stored = await chrome.storage.local.get(['chatState']);
  if (stored.chatState) {
    // Migration logic for old state (single message array)
    if (stored.chatState.messages && !stored.chatState.sessions) {
      const legacySession = {
        id: createId(),
        title: 'Previous Chat',
        messages: stored.chatState.messages,
        lastModified: Date.now()
      };
      state = { ...state, ...stored.chatState, sessions: [legacySession], currentSessionId: legacySession.id };
      delete state.messages; // Clean up old key
    } else {
      state = { ...state, ...stored.chatState };
    }

    // Defaults
    if (state.temperature === undefined) state.temperature = 0.7;
    if (!state.quickPrompts) state.quickPrompts = DEFAULT_QUICK_PROMPTS;
    if (!state.endpoint) state.endpoint = 'http://localhost:11434';
    
    // Ensure we have a valid session
    if (state.sessions.length === 0) {
      createNewSession();
    } else if (!state.currentSessionId || !state.sessions.find(s => s.id === state.currentSessionId)) {
      state.currentSessionId = state.sessions[0].id;
    }
  } else {
    createNewSession();
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

export function createNewSession() {
  const newSession = {
    id: createId(),
    title: 'New Chat',
    messages: [],
    lastModified: Date.now()
  };
  state.sessions.unshift(newSession);
  state.currentSessionId = newSession.id;
  saveState();
  return newSession;
}

export function getCurrentSession() {
  return state.sessions.find(s => s.id === state.currentSessionId);
}

export function updateCurrentSession(messages) {
  const session = getCurrentSession();
  if (session) {
    session.messages = messages;
    session.lastModified = Date.now();
    // Auto-title based on first user message if title is still default
    if (session.title === 'New Chat' && messages.length > 0) {
      const firstUserMsg = messages.find(m => m.role === 'user');
      if (firstUserMsg) {
        session.title = firstUserMsg.content.slice(0, 30) + (firstUserMsg.content.length > 30 ? '...' : '');
      }
    }
    saveState();
  }
}

export function deleteSession(id) {
  state.sessions = state.sessions.filter(s => s.id !== id);
  if (state.currentSessionId === id) {
    if (state.sessions.length > 0) {
      state.currentSessionId = state.sessions[0].id;
    } else {
      createNewSession();
    }
  }
  saveState();
}

export function switchSession(id) {
  const session = state.sessions.find(s => s.id === id);
  if (session) {
    state.currentSessionId = id;
    saveState();
  }
}

export function deleteAllSessions() {
  state.sessions = [];
  createNewSession();
}