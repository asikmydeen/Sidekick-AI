// modules/mock.js

export function initMock() {
  if (typeof chrome === 'undefined' || !chrome.storage) {
    console.log('Running in web preview mode - mocking Chrome APIs');
    window.chrome = {
      storage: {
        local: {
          get: async (keys) => {
            const result = {};
            const k = Array.isArray(keys) ? keys : [keys];
            k.forEach(key => {
              const val = localStorage.getItem(key);
              if (val) result[key] = JSON.parse(val);
            });
            return result;
          },
          set: async (items) => {
            Object.entries(items).forEach(([key, value]) => {
              localStorage.setItem(key, JSON.stringify(value));
            });
          }
        }
      },
      runtime: {
        onInstalled: { addListener: () => {} },
        onMessage: { addListener: () => {} }
      },
      tabs: {
        query: async () => [{ id: 1, url: 'https://example.com' }]
      },
      scripting: {
        executeScript: async ({ target, func }) => {
          return [{ result: "This is a mock page content from the web preview mode.\n\nIt simulates what the extension would read from a real webpage." }];
        }
      },
      sidePanel: {
        setPanelBehavior: async () => {}
      }
    };
  }
}