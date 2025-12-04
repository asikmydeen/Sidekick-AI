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

## v1.5.0 – 2025-08-25
- Added "Read Page" functionality: sends current tab content to AI for context
- Added "Stop" button to abort text generation mid-request
- Added `scripting` permission to manifest.json for page content extraction
- Added `chrome.scripting` and `chrome.tabs` to mock API for web preview stability

## v1.6.0 – 2025-08-25
- Added "Quick Shortcuts" (Prompt Chips): Customizable buttons for frequent prompts (e.g., Summarize, Explain)
- Added Temperature Slider: Allows users to control model creativity (0.0 - 1.0)
- Added new "Advanced Settings" section in configuration for managing system prompts and shortcuts

## v1.7.0 – 2025-08-25
- Refactored `popup.js` into modular ES6 components (`modules/api.js`, `modules/ui.js`, `modules/state.js`, etc.)
- Improved maintainability by separating UI logic, state management, and API calls
- Updated `popup.html` to support module-based script loading

## v1.8.0 – 2025-08-25
- Added **Ollama Support**: Users can now connect to local LLM instances (defaulting to localhost:11434).
- Added **Voice Input**: Added a microphone button in the chat interface that uses browser speech recognition to transcribe text.
- Updated `modules/api.js` to handle Ollama API endpoints (`/api/tags` and `/api/chat`).
- Updated UI to dynamically toggle between API Key and Endpoint fields based on the selected provider.

## v1.9.0 – 2025-08-25
- **Multiple Sessions**: Added a "History" sidebar allowing users to create, switch, and delete multiple chat sessions.
- **Streaming Output**: Implemented real-time text generation (typing effect) for supported providers (OpenAI, Ollama).
- **File Attachments**: Users can now attach text-based files (txt, code, md) to the chat context via a paperclip button.
- **Token Usage**: Added a live token counter display to track context usage percentages.
- **Refactored State**: Migrated state management to handle an array of sessions instead of a single message list.

## v1.9.1 – 2025-08-25
- **Bug Fix**: Restricted file attachments to text-based formats only.
- Added validation to prevent image/binary files from being read as raw text, which previously caused garbage characters to appear in the chat input.