# Version History

## v1.0.0 – 2025-08-24
- @ToneDice created manifest.json with basic permissions and action popup
- Added background.js with minimal event listener
- Added content.js placeholder
- Added popup.html and popup.js with simple ping functionality
- Added styles.css for minimal popup styling

## v1.1.0 – 2025-08-25
- Added multi-provider chatbot functionality (OpenAI, OpenRouter, Hugging Face, Anthropic)
- Updated popup.html to include settings and chat interface
- Updated popup.js to fetch models dynamically and handle chat API requests
- Updated manifest.json to include `host_permissions` for API access

## v1.1.1 – 2025-08-25
- Added package.json and vite to resolve preview environment errors
- Added mock Chrome API in popup.js to allow UI testing in the web preview