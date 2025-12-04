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
  model: '',
  apiKey: '',  // Keep for migration
  endpoint: 'http://localhost:11434',  // Keep for migration
  awsAccessKey: '',  // Keep for migration
  awsSecretKey: '',  // Keep for migration
  awsSessionToken: '',  // Keep for migration
  awsRegion: 'us-east-1',  // Keep for migration
  systemPrompt: '',
  temperature: 0.7,
  quickPrompts: DEFAULT_QUICK_PROMPTS,
  theme: 'light',
  autoRead: false,
  currentSessionId: null,
  sessions: [],

  // NEW: Provider-specific credentials
  providerCredentials: {
    openai: { apiKey: '', selectedModel: '', models: [] },
    openrouter: { apiKey: '', selectedModel: '', models: [] },
    anthropic: { apiKey: '', selectedModel: '', models: [] },
    huggingface: { apiKey: '', selectedModel: '', models: [] },
    ollama: { endpoint: 'http://localhost:11435', selectedModel: '', models: [] },
    bedrock: {
      accessKey: '',
      secretKey: '',
      sessionToken: '',
      region: 'us-east-1',
      selectedModel: '',
      models: []
    }
  }
};

/**
 * Get credentials for the specified provider
 */
export function getProviderCredentials(provider) {
  if (!state.providerCredentials || !state.providerCredentials[provider]) {
    return null;
  }
  return { ...state.providerCredentials[provider] };
}

/**
 * Update credentials for a specific provider
 */
export function updateProviderCredentials(provider, credentials) {
  if (!state.providerCredentials) {
    state.providerCredentials = {};
  }
  if (!state.providerCredentials[provider]) {
    state.providerCredentials[provider] = {};
  }

  state.providerCredentials[provider] = {
    ...state.providerCredentials[provider],
    ...credentials
  };

  saveState();
}

/**
 * Get current provider's credentials
 */
export function getCurrentProviderCredentials() {
  return getProviderCredentials(state.provider);
}

export async function loadState() {
  const stored = await chrome.storage.local.get(['chatState']);
  if (stored.chatState) {
    // Migration: Initialize providerCredentials if missing
    if (!stored.chatState.providerCredentials) {
      stored.chatState.providerCredentials = {
        openai: { apiKey: '', selectedModel: '', models: [] },
        openrouter: { apiKey: '', selectedModel: '', models: [] },
        anthropic: { apiKey: '', selectedModel: '', models: [] },
        huggingface: { apiKey: '', selectedModel: '', models: [] },
        ollama: { endpoint: 'http://localhost:11434', selectedModel: '', models: [] },
        bedrock: {
          accessKey: '',
          secretKey: '',
          sessionToken: '',
          region: 'us-east-1',
          selectedModel: '',
          models: []
        }
      };

      // Migrate old credentials to provider-specific storage
      if (stored.chatState.apiKey) {
        const provider = stored.chatState.provider;
        if (provider === 'openai' || provider === 'openrouter' ||
            provider === 'anthropic' || provider === 'huggingface') {
          stored.chatState.providerCredentials[provider].apiKey = stored.chatState.apiKey;
        }
      }

      if (stored.chatState.endpoint) {
        stored.chatState.providerCredentials.ollama.endpoint = stored.chatState.endpoint || 'http://localhost:11435';
      }

      if (stored.chatState.awsAccessKey) {
        stored.chatState.providerCredentials.bedrock.accessKey = stored.chatState.awsAccessKey;
      }
      if (stored.chatState.awsSecretKey) {
        stored.chatState.providerCredentials.bedrock.secretKey = stored.chatState.awsSecretKey;
      }
      if (stored.chatState.awsSessionToken) {
        stored.chatState.providerCredentials.bedrock.sessionToken = stored.chatState.awsSessionToken;
      }
      if (stored.chatState.awsRegion) {
        stored.chatState.providerCredentials.bedrock.region = stored.chatState.awsRegion;
      }
    }

    // Ensure defaults for Ollama and Bedrock
    if (!state.providerCredentials.ollama.endpoint) {
      state.providerCredentials.ollama.endpoint = 'http://localhost:11435';
    }
    if (!state.providerCredentials.bedrock.region) {
      state.providerCredentials.bedrock.region = 'us-east-1';
    }

    // Ensure models and selectedModel fields exist for all providers
    Object.keys(state.providerCredentials).forEach(provider => {
      if (!state.providerCredentials[provider].models) {
        state.providerCredentials[provider].models = [];
      }
      if (!state.providerCredentials[provider].selectedModel) {
        state.providerCredentials[provider].selectedModel = '';
      }
    });

    // Migration logic for old state
    if (stored.chatState.messages && !stored.chatState.sessions) {
      const legacySession = {
        id: createId(),
        title: 'Previous Chat',
        messages: stored.chatState.messages,
        lastModified: Date.now()
      };
      state = { ...state, ...stored.chatState, sessions: [legacySession], currentSessionId: legacySession.id };
      delete state.messages;
    } else {
      state = { ...state, ...stored.chatState };
    }

    if (state.temperature === undefined) state.temperature = 0.7;
    if (state.autoRead === undefined) state.autoRead = false;
    if (!state.quickPrompts) state.quickPrompts = DEFAULT_QUICK_PROMPTS;
    if (!state.endpoint) state.endpoint = 'http://localhost:11434';
    if (!state.awsRegion) state.awsRegion = 'us-east-1';

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
    if (session.title === 'New Chat' && messages.length > 0) {
      const firstUserMsg = messages.find(m => m.role === 'user');
      if (firstUserMsg) {
        let txt = firstUserMsg.content;
        if (Array.isArray(txt)) txt = txt.find(p => p.type === 'text')?.text || "Image";
        session.title = txt.slice(0, 30) + (txt.length > 30 ? '...' : '');
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