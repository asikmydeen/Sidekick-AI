# Sidekick AI

<p align="center">
  <img src="icon128.png" alt="Sidekick AI Logo" width="128" height="128">
</p>

<p align="center">
  <strong>Your AI Sidekick in Chrome's Sidebar</strong>
</p>

<p align="center">
  Connect to multiple AI providers • Chat with any webpage • Beautiful, intuitive interface
</p>

---

## ✨ Features

### 🤖 Multi-Provider Support
Connect to your favorite AI services with a single extension:
- **OpenAI** (GPT-4, GPT-4o, GPT-3.5, o1, o3)
- **Anthropic** (Claude 3.5, Claude 3 Opus/Sonnet/Haiku)
- **OpenRouter** (Access 100+ models)
- **HuggingFace** (Open-source models, image generation)
- **Ollama** (Run AI locally, completely private)
- **AWS Bedrock** (Enterprise-grade AI)

### 💬 Powerful Chat Features
- **Chat History** - All conversations saved locally with search
- **Auto-Generated Titles** - AI automatically names your chats
- **Edit & Regenerate** - Edit messages and regenerate responses
- **Export Chats** - Download as Markdown or JSON
- **Copy Code Blocks** - One-click copy for all code snippets

### 🌐 Webpage Integration
- **Include Page Content** - Send current webpage text to AI for context
- **File Attachments** - Attach images and documents to your messages
- **Quick Prompts** - Customizable prompt shortcuts

### 🎨 User Experience
- **Side Panel Mode** - Chat while browsing without leaving your page
- **Full Page Mode** - Expand for a dedicated chat experience
- **Dark/Light Theme** - Easy on the eyes, day or night
- **Keyboard Shortcuts** - Power user productivity

### 🖼️ HuggingFace Multi-Modal (Beta)
- Text-to-Image generation
- Image-to-Image transformation
- Image captioning
- Video generation

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Send message |
| `Ctrl/Cmd + N` | New chat |
| `Ctrl/Cmd + K` | Search history |
| `Ctrl/Cmd + /` | Focus input |
| `Escape` | Stop generation / Close sidebar |

---

## 🚀 Getting Started

1. **Install** the extension from Chrome Web Store
2. **Click** the extension icon to open the side panel
3. **Select** your preferred AI provider
4. **Enter** your API key (stored locally, never sent to our servers)
5. **Start chatting!**

### Getting API Keys

| Provider | Get API Key |
|----------|-------------|
| OpenAI | [platform.openai.com](https://platform.openai.com/api-keys) |
| Anthropic | [console.anthropic.com](https://console.anthropic.com/) |
| OpenRouter | [openrouter.ai](https://openrouter.ai/keys) |
| HuggingFace | [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens) |
| Ollama | No key needed - [Download Ollama](https://ollama.ai/) |

---

## 🔒 Privacy & Security

- **Your API keys are stored locally** in Chrome's secure storage
- **No data is sent to our servers** - all communication is directly with your chosen AI provider
- **Chat history is stored locally** on your device
- **No analytics or tracking** - we respect your privacy

---

## 🛠️ For Developers

### Local Development
```bash
git clone https://github.com/yourusername/sidekick-ai.git
cd sidekick-ai
# Load the extension in Chrome:
# 1. Go to chrome://extensions
# 2. Enable "Developer mode"
# 3. Click "Load unpacked" and select the `dist` folder
```

### Using Ollama Locally
To use Ollama with the extension, start Ollama with CORS enabled:
```bash
OLLAMA_ORIGINS="*" ollama serve
```

---

## 📝 Changelog

### v2.1.0
- Added chat history search
- Auto-generated chat titles
- Edit and regenerate messages
- Export chats (Markdown/JSON)
- Copy code blocks with one click
- Keyboard shortcuts
- UI improvements

### v2.0.0
- Multi-provider support
- HuggingFace integration
- Image generation capabilities
- Full page mode
- Dark/light theme

---

## 📄 Legal

- [Privacy Policy](PRIVACY_POLICY.md)
- [Terms of Service](TERMS_OF_SERVICE.md)

---

## 🤝 Support

Having issues? [Open an issue](https://github.com/yourusername/sidekick-ai/issues) on GitHub.

---

<p align="center">Made with ❤️ for the AI community</p>
