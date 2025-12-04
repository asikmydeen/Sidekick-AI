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

## v1.2.0 – 2025-08-25
- Added chat persistence: conversation history is saved to local storage
- Added basic Markdown support: renders code blocks, bold, and italics without external libraries
- Added "Clear Chat" button to wipe history
- Improved styles for code blocks and headers

## v1.3.0 – 2025-08-25
- Added System Instructions field in settings to customize AI behavior
- Enhanced Markdown parser to support headers (h1-h3), links, and bullet lists
- Added "Copy" buttons to all code blocks for easy clipboard access
- Added auto-expanding chat input textarea for better UX

## v1.4.0 – 2025-08-25
- Added Dark Mode support with a toggle button in the header
- Added "Export Chat" functionality to download history as a Markdown file
- Added animated "typing dots" indicator for better visual feedback during API calls