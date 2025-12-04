var Za=Object.defineProperty;var Ga=(e,t,a)=>t in e?Za(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a;var w=(e,t,a)=>Ga(e,typeof t!="symbol"?t+"":t,a);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();function en(){(typeof chrome>"u"||!chrome.storage)&&(console.log("Running in web preview mode - mocking Chrome APIs"),window.chrome={storage:{local:{get:async e=>{const t={};return(Array.isArray(e)?e:[e]).forEach(n=>{const i=localStorage.getItem(n);i&&(t[n]=JSON.parse(i))}),t},set:async e=>{Object.entries(e).forEach(([t,a])=>{localStorage.setItem(t,JSON.stringify(a))})}}},runtime:{onInstalled:{addListener:()=>{}},onMessage:{addListener:()=>{}}},tabs:{query:async()=>[{id:1,url:"https://example.com"}]},scripting:{executeScript:async({target:e,func:t})=>[{result:`This is a mock page content from the web preview mode.

It simulates what the extension would read from a real webpage.`}]},sidePanel:{setPanelBehavior:async()=>{}}})}const ma=`Summarize|Summarize the key points of the following content:
Explain|Explain this concept in simple terms:
Fix Grammar|Please fix the grammar in this text:
Code Review|Review this code for bugs and improvements:`;function fa(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}let h={provider:"",model:"",apiKey:"",endpoint:"http://localhost:11434",awsAccessKey:"",awsSecretKey:"",awsSessionToken:"",awsRegion:"us-east-1",systemPrompt:"",temperature:.7,quickPrompts:ma,theme:"light",autoRead:!1,currentSessionId:null,sessions:[],providerCredentials:{openai:{apiKey:"",selectedModel:"",models:[]},openrouter:{apiKey:"",selectedModel:"",models:[]},anthropic:{apiKey:"",selectedModel:"",models:[]},huggingface:{apiKey:"",selectedModel:"",models:[],task:"chat",taskModels:{}},ollama:{endpoint:"http://localhost:11434",selectedModel:"",models:[]},bedrock:{accessKey:"",secretKey:"",sessionToken:"",region:"us-east-1",selectedModel:"",models:[]}}};const tn={chat:["meta-llama/Llama-3.2-3B-Instruct","meta-llama/Llama-3.1-8B-Instruct","Qwen/Qwen2.5-72B-Instruct","mistralai/Mistral-7B-Instruct-v0.3","deepseek-ai/DeepSeek-R1-Distill-Qwen-32B"],"text-to-image":["Tongyi-MAI/Z-Image-Turbo","black-forest-labs/FLUX.1-schnell","black-forest-labs/FLUX.1-dev","stabilityai/stable-diffusion-xl-base-1.0","runwayml/stable-diffusion-v1-5"],"image-to-image":["black-forest-labs/FLUX.1-dev","black-forest-labs/FLUX.1-schnell","stabilityai/stable-diffusion-xl-refiner-1.0","timbrooks/instruct-pix2pix","lllyasviel/sd-controlnet-canny"],"image-to-text":["Salesforce/blip-image-captioning-large","Salesforce/blip-image-captioning-base","nlpconnect/vit-gpt2-image-captioning","microsoft/git-base"],"text-to-speech":["facebook/mms-tts-eng","espnet/kan-bayashi_ljspeech_vits","microsoft/speecht5_tts","suno/bark-small"],"speech-to-text":["openai/whisper-large-v3","openai/whisper-medium","openai/whisper-small","facebook/wav2vec2-large-960h-lv60-self"],"text-to-video":["ali-vilab/text-to-video-ms-1.7b","cerspense/zeroscope_v2_576w","ByteDance/AnimateDiff-Lightning","hotshotco/Hotshot-XL"]};function Me(e){return!h.providerCredentials||!h.providerCredentials[e]?null:{...h.providerCredentials[e]}}function $e(e,t){h.providerCredentials||(h.providerCredentials={}),h.providerCredentials[e]||(h.providerCredentials[e]={}),h.providerCredentials[e]={...h.providerCredentials[e],...t},qe()}function an(){return Me(h.provider)}async function nn(){const e=await chrome.storage.local.get(["chatState"]);if(e.chatState){if(!e.chatState.providerCredentials){if(e.chatState.providerCredentials={openai:{apiKey:"",selectedModel:"",models:[]},openrouter:{apiKey:"",selectedModel:"",models:[]},anthropic:{apiKey:"",selectedModel:"",models:[]},huggingface:{apiKey:"",selectedModel:"",models:[]},ollama:{endpoint:"http://localhost:11434",selectedModel:"",models:[]},bedrock:{accessKey:"",secretKey:"",sessionToken:"",region:"us-east-1",selectedModel:"",models:[]}},e.chatState.apiKey){const t=e.chatState.provider;(t==="openai"||t==="openrouter"||t==="anthropic"||t==="huggingface")&&(e.chatState.providerCredentials[t].apiKey=e.chatState.apiKey)}e.chatState.endpoint&&(e.chatState.providerCredentials.ollama.endpoint=e.chatState.endpoint||"http://localhost:11434"),e.chatState.awsAccessKey&&(e.chatState.providerCredentials.bedrock.accessKey=e.chatState.awsAccessKey),e.chatState.awsSecretKey&&(e.chatState.providerCredentials.bedrock.secretKey=e.chatState.awsSecretKey),e.chatState.awsSessionToken&&(e.chatState.providerCredentials.bedrock.sessionToken=e.chatState.awsSessionToken),e.chatState.awsRegion&&(e.chatState.providerCredentials.bedrock.region=e.chatState.awsRegion)}if(h.providerCredentials.ollama.endpoint||(h.providerCredentials.ollama.endpoint="http://localhost:11434"),h.providerCredentials.bedrock.region||(h.providerCredentials.bedrock.region="us-east-1"),Object.keys(h.providerCredentials).forEach(t=>{h.providerCredentials[t].models||(h.providerCredentials[t].models=[]),h.providerCredentials[t].selectedModel||(h.providerCredentials[t].selectedModel="")}),e.chatState.messages&&!e.chatState.sessions){const t={id:fa(),title:"Previous Chat",messages:e.chatState.messages,lastModified:Date.now()};h={...h,...e.chatState,sessions:[t],currentSessionId:t.id},delete h.messages}else h={...h,...e.chatState};h.temperature===void 0&&(h.temperature=.7),h.autoRead===void 0&&(h.autoRead=!1),h.quickPrompts||(h.quickPrompts=ma),h.endpoint||(h.endpoint="http://localhost:11434"),h.awsRegion||(h.awsRegion="us-east-1"),h.sessions.length===0?et():(!h.currentSessionId||!h.sessions.find(t=>t.id===h.currentSessionId))&&(h.currentSessionId=h.sessions[0].id)}else et();return h}function qe(){chrome.storage.local.set({chatState:h})}function St(e){h={...h,...e},qe()}function et(){const e={id:fa(),title:"New Chat",messages:[],lastModified:Date.now()};return h.sessions.unshift(e),h.currentSessionId=e.id,qe(),e}function Fe(){return h.sessions.find(e=>e.id===h.currentSessionId)}function le(e){var a;const t=Fe();if(t){if(t.messages=e,t.lastModified=Date.now(),t.title==="New Chat"&&e.length>0){const n=e.find(i=>i.role==="user");if(n){let i=n.content;Array.isArray(i)&&(i=((a=i.find(o=>o.type==="text"))==null?void 0:a.text)||"Image"),t.title=i.slice(0,30)+(i.length>30?"...":"")}}qe()}}function on(e){h.sessions=h.sessions.filter(t=>t.id!==e),h.currentSessionId===e&&(h.sessions.length>0?h.currentSessionId=h.sessions[0].id:et()),qe()}function rn(e){h.sessions.find(a=>a.id===e)&&(h.currentSessionId=e,qe())}function sn(){h.sessions=[],et()}async function ln(){try{const[e]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!e)return null;if(e.url.startsWith("chrome://"))return"Cannot read system pages.";const t=await chrome.scripting.executeScript({target:{tabId:e.id},func:()=>document.body.innerText});if(t&&t[0]&&t[0].result){const a=t[0].result;return a.length>2e4?a.substring(0,2e4)+`
...[Content Truncated]`:a}return null}catch(e){return console.error("Failed to read page:",e),`Error reading page: ${e.message}`}}function cn(e){return Math.ceil(e.length/4)}function dn(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=i=>t(i.target.result),n.onerror=i=>a(i),n.readAsText(e)})}const c={container:document.querySelector(".container"),configSection:document.getElementById("configSection"),chatSection:document.getElementById("chatSection"),advancedSettings:document.getElementById("advancedSettings"),providerSelect:document.getElementById("provider"),apiKeyInput:document.getElementById("apiKey"),apiKeyGroup:document.getElementById("apiKeyGroup"),endpointInput:document.getElementById("endpoint"),endpointGroup:document.getElementById("endpointGroup"),awsGroup:document.getElementById("awsGroup"),awsAccessKey:document.getElementById("awsAccessKey"),awsSecretKey:document.getElementById("awsSecretKey"),awsSessionToken:document.getElementById("awsSessionToken"),awsRegion:document.getElementById("awsRegion"),hfTaskGroup:document.getElementById("hfTaskGroup"),hfTaskSelect:document.getElementById("hfTask"),hfTaskHint:document.getElementById("hfTaskHint"),hfProviderGroup:document.getElementById("hfProviderGroup"),hfProviderSelect:document.getElementById("hfProvider"),fetchModelsBtn:document.getElementById("fetchModelsBtn"),fetchStatus:document.getElementById("fetchStatus"),modelSelect:document.getElementById("model"),modelSelectionDiv:document.getElementById("modelSelection"),manualModelGroup:document.getElementById("manualModelGroup"),manualModelInput:document.getElementById("manualModel"),saveModelBtn:document.getElementById("saveModelBtn"),modelHint:document.getElementById("modelHint"),systemPromptInput:document.getElementById("systemPrompt"),temperatureInput:document.getElementById("temperature"),tempValueLabel:document.getElementById("tempValue"),quickPromptsInput:document.getElementById("quickPromptsConfig"),autoReadInput:document.getElementById("autoRead"),startChatBtn:document.getElementById("startChatBtn"),settingsBtn:document.getElementById("settingsBtn"),historyBtn:document.getElementById("historyBtn"),newChatBtn:document.getElementById("newChatBtn"),historySidebar:document.getElementById("historySidebar"),sessionList:document.getElementById("sessionList"),closeSidebarBtn:document.getElementById("closeSidebarBtn"),clearHistoryBtn:document.getElementById("clearHistoryBtn"),exportBtn:document.getElementById("exportBtn"),expandBtn:document.getElementById("expandBtn"),collapseBtn:document.getElementById("collapseBtn"),themeBtn:document.getElementById("themeBtn"),chatHistory:document.getElementById("chatHistory"),messageInput:document.getElementById("messageInput"),sendBtn:document.getElementById("sendBtn"),stopBtn:document.getElementById("stopBtn"),micBtn:document.getElementById("micBtn"),fileBtn:document.getElementById("fileBtn"),fileInput:document.getElementById("fileInput"),includePageContent:document.getElementById("includePageContent"),promptChipsContainer:document.getElementById("promptChips"),tokenCount:document.getElementById("tokenCount"),attachmentPreview:document.getElementById("attachmentPreview"),mediaGallery:document.getElementById("mediaGallery"),galleryGrid:document.getElementById("galleryGrid"),mediaLightbox:document.getElementById("mediaLightbox"),closeLightbox:document.getElementById("closeLightbox"),lightboxPrompt:document.getElementById("lightboxPrompt"),lightboxDownload:document.getElementById("lightboxDownload")};function ga(e){e==="dark"?(document.body.classList.add("dark-mode"),c.themeBtn.textContent="☀️"):(document.body.classList.remove("dark-mode"),c.themeBtn.textContent="🌙")}function ce(e,t){c.fetchStatus.textContent=e,c.fetchStatus.className=`status-msg ${t}`}function ha(e){e==="chat"?(c.configSection.classList.add("hidden"),c.chatSection.classList.remove("hidden"),c.settingsBtn.style.display="block",c.historyBtn.classList.remove("hidden"),c.newChatBtn.classList.remove("hidden"),c.exportBtn.classList.remove("hidden")):(c.configSection.classList.remove("hidden"),c.chatSection.classList.add("hidden"),c.settingsBtn.style.display="none",c.historyBtn.classList.add("hidden"),c.newChatBtn.classList.add("hidden"),c.exportBtn.classList.add("hidden"))}function It(e){e?c.historySidebar.classList.add("open"):c.historySidebar.classList.remove("open")}function ot(e,t){const a=document.createElement("a");a.href=e,a.download=t,document.body.appendChild(a),a.click(),document.body.removeChild(a)}function Ge(e,t,a=""){if(!c.mediaLightbox)return;const n=c.mediaLightbox.querySelector(".lightbox-content");if(n.innerHTML="",t==="video"){const o=document.createElement("video");o.src=e,o.controls=!0,o.autoplay=!0,o.className="lightbox-video",n.appendChild(o)}else if(t==="image"){const o=document.createElement("img");o.src=e,o.className="lightbox-image",n.appendChild(o)}c.lightboxPrompt&&(c.lightboxPrompt.textContent=a),c.lightboxDownload&&(c.lightboxDownload.onclick=()=>{ot(e,`generated-${t}.${t==="video"?"mp4":"png"}`)}),c.mediaLightbox.classList.remove("hidden");const i=o=>{o.key==="Escape"&&ya()};document.addEventListener("keydown",i),c.mediaLightbox._escapeHandler=i}function ya(){if(!c.mediaLightbox)return;c.mediaLightbox.classList.add("hidden");const e=c.mediaLightbox.querySelector(".lightbox-content");e&&(e.innerHTML=""),c.mediaLightbox._escapeHandler&&document.removeEventListener("keydown",c.mediaLightbox._escapeHandler)}c.closeLightbox&&c.closeLightbox.addEventListener("click",ya);function ba(){return window.innerWidth>500}function pn(){ba()?(document.body.classList.add("full-page-mode"),c.expandBtn&&c.expandBtn.classList.add("hidden"),c.collapseBtn&&c.collapseBtn.classList.remove("hidden")):c.collapseBtn&&c.collapseBtn.classList.add("hidden")}function un(e,t="all"){c.galleryGrid&&(c.galleryGrid.innerHTML="",e.forEach(a=>{a.role!=="assistant"||!Array.isArray(a.content)||a.content.forEach(n=>{if(n.type==="generated_image"&&(t==="all"||t==="image")){const i=Ft("image",n.url,n.prompt);c.galleryGrid.appendChild(i)}else if(n.type==="generated_video"&&(t==="all"||t==="video")){const i=Ft("video",n.url,n.prompt);c.galleryGrid.appendChild(i)}})}))}function Ft(e,t,a){const n=document.createElement("div");if(n.className=`media-card ${e}-card`,e==="image"){const o=document.createElement("img");o.src=t,o.alt=a||"Generated image",o.onclick=()=>Ge(t,"image",a),n.appendChild(o)}else if(e==="video"){const o=document.createElement("video");o.src=t,o.muted=!0,o.loop=!0,o.onmouseenter=()=>o.play(),o.onmouseleave=()=>o.pause(),o.onclick=()=>Ge(t,"video",a),n.appendChild(o)}const i=document.createElement("div");return i.className="media-card-overlay",i.innerHTML=`
    <span class="media-type-badge">${e==="image"?"🎨":"🎬"}</span>
    <p class="media-prompt">${a?a.slice(0,50)+(a.length>50?"...":""):""}</p>
  `,n.appendChild(i),n}function Tt(e,t,a,n){c.sessionList.innerHTML="",e.forEach(i=>{const o=document.createElement("div");o.className=`session-item ${i.id===t?"active":""}`;let r=i.title||"New Chat";const l=document.createElement("span");l.className="session-title",l.textContent=r,l.onclick=()=>a(i.id);const s=document.createElement("button");s.textContent="×",s.className="session-delete",s.onclick=d=>{d.stopPropagation(),n(i.id)},o.appendChild(l),o.appendChild(s),c.sessionList.appendChild(o)})}function Ct(e){c.modelSelect.innerHTML='<option value="" disabled selected>Select a model...</option>',e.forEach(t=>{const a=document.createElement("option");a.value=t,a.textContent=t,c.modelSelect.appendChild(a)})}function mn(e){if(Array.from(c.modelSelect.options).find(n=>n.value===e)){c.modelSelect.value=e;return}const a=document.createElement("option");a.value=e,a.textContent=e,c.modelSelect.appendChild(a),c.modelSelect.value=e}function fn(e,t){c.promptChipsContainer.innerHTML="",e.split(`
`).forEach(n=>{if(!n.trim())return;const i=n.split("|"),o=i[0].trim(),r=i.length>1?i.slice(1).join("|").trim():o;if(!o)return;const l=document.createElement("button");l.className="chip",l.textContent=o,l.title=r,l.addEventListener("click",()=>t(r)),c.promptChipsContainer.appendChild(l)})}function gn(e,t){c.chatHistory.innerHTML="";const a=document.createElement("div");a.className="status-msg",a.textContent=`Chatting with ${t}`,c.chatHistory.appendChild(a),e.forEach(n=>{H(n.role,n.content)}),lt(),xa(e)}function H(e,t,a=null,n=!1){var r;const i=document.createElement("div");i.className=`message ${e}`,a&&(i.id=a);let o="";if(typeof t=="string"?o=t:Array.isArray(t)&&(o=((r=t.find(l=>l.type==="text"))==null?void 0:r.text)||""),n)i.innerHTML='<div class="typing-dots"><span></span><span></span><span></span></div>';else if(Array.isArray(t)?t.forEach(l=>{if(l.type==="text"){const s=document.createElement("div");s.innerHTML=st(l.text),i.appendChild(s)}else if(l.type==="image_url"){const s=document.createElement("img");s.src=l.image_url.url,s.className="chat-image",i.appendChild(s)}else if(l.type==="generated_image"){const s=document.createElement("div");s.className="generated-media-container";const d=document.createElement("img");d.src=l.url,d.className="generated-image",d.alt=l.prompt||"Generated image",d.onclick=()=>Ge(l.url,"image",l.prompt),s.appendChild(d);const p=document.createElement("button");p.className="media-btn",p.textContent="🔲 Full View",p.onclick=()=>Ge(l.url,"image",l.prompt),s.appendChild(p);const u=document.createElement("button");u.className="media-btn",u.textContent="⬇️ Download",u.onclick=()=>ot(l.url,"generated-image.png"),s.appendChild(u),i.appendChild(s)}else if(l.type==="generated_audio"){const s=document.createElement("div");s.className="generated-media-container";const d=document.createElement("audio");d.src=l.url,d.controls=!0,d.className="generated-audio",s.appendChild(d);const p=document.createElement("button");p.className="media-btn",p.textContent="⬇️ Download",p.onclick=()=>ot(l.url,"generated-audio.wav"),s.appendChild(p),i.appendChild(s)}else if(l.type==="generated_video"){const s=document.createElement("div");s.className="generated-media-container video-container";const d=document.createElement("video");d.src=l.url,d.controls=!0,d.autoplay=!1,d.loop=!0,d.muted=!1,d.className="generated-video",d.title=l.prompt||"Generated video",s.appendChild(d);const p=document.createElement("button");p.className="media-btn",p.textContent="🔲 Full View",p.onclick=()=>Ge(l.url,"video",l.prompt),s.appendChild(p);const u=document.createElement("button");u.className="media-btn",u.textContent="⬇️ Download",u.onclick=()=>ot(l.url,"generated-video.mp4"),s.appendChild(u),i.appendChild(s)}else if(l.type==="audio_input"){const s=document.createElement("audio");s.src=l.url,s.controls=!0,s.className="input-audio",i.appendChild(s)}}):t&&(i.innerHTML=st(t)),e==="assistant"&&o){const l=document.createElement("div");l.className="msg-controls";const s=document.createElement("button");s.className="msg-btn",s.textContent="🔊",s.title="Read aloud",s.onclick=()=>va(o,s),l.appendChild(s),i.appendChild(l)}c.chatHistory.appendChild(i),i.querySelectorAll(".copy-btn").forEach(l=>{l.addEventListener("click",s=>{const d=s.target.parentElement.querySelector("code").textContent;navigator.clipboard.writeText(d);const p=s.target.textContent;s.target.textContent="Copied!",s.target.classList.add("copied"),setTimeout(()=>{s.target.textContent=p,s.target.classList.remove("copied")},2e3)})}),lt()}function hn(e,t){const a=document.getElementById(e);a&&(a.innerHTML=st(t),lt())}function Ht(e,t){const a=document.getElementById(e);if(a){a.innerHTML="";let n="";typeof t=="string"&&(n=t);const i=document.createElement("div");i.innerHTML=st(n),a.appendChild(i);const o=document.createElement("div");o.className="msg-controls";const r=document.createElement("button");r.className="msg-btn",r.textContent="🔊",r.title="Read aloud",r.onclick=()=>va(n,r),o.appendChild(r),a.appendChild(o),a.querySelectorAll(".copy-btn").forEach(l=>{l.addEventListener("click",s=>{const d=s.target.parentElement.querySelector("code").textContent;navigator.clipboard.writeText(d);const p=s.target.textContent;s.target.textContent="Copied!",s.target.classList.add("copied"),setTimeout(()=>{s.target.textContent=p,s.target.classList.remove("copied")},2e3)})}),lt()}}function va(e,t){if(window.speechSynthesis.speaking){window.speechSynthesis.cancel(),document.querySelectorAll(".msg-btn.speaking").forEach(a=>{a.classList.remove("speaking"),a.textContent="🔊"});return}wa(e,t)}function wa(e,t=null){window.speechSynthesis.cancel();const a=e.replace(/[*#`_\[\]]/g,""),n=new SpeechSynthesisUtterance(a);n.lang="en-US",n.rate=1,n.onstart=()=>{t&&(t.classList.add("speaking"),t.textContent="⏹")},n.onend=()=>{t&&(t.classList.remove("speaking"),t.textContent="🔊")},n.onerror=()=>{t&&(t.classList.remove("speaking"),t.textContent="🔊")},window.speechSynthesis.speak(n)}function _a(){window.speechSynthesis.cancel()}function xa(e){let t="";e.forEach(o=>{typeof o.content=="string"?t+=o.content:Array.isArray(o.content)&&o.content.forEach(r=>{r.type==="text"&&(t+=r.text),r.type==="image_url"&&(t+=" ".repeat(4e3))})});const a=cn(t),i=Math.min(a/128e3*100,100).toFixed(1);c.tokenCount.textContent=`${a.toLocaleString()} tokens used`,c.tokenCount.title=`Approx. ${i}% of 128k context window`}function Re(e){const t=document.getElementById(e);t&&t.remove()}function Te(e){e?(c.sendBtn.classList.add("hidden"),c.stopBtn.classList.remove("hidden"),c.messageInput.disabled=!0):(c.sendBtn.classList.remove("hidden"),c.stopBtn.classList.add("hidden"),c.messageInput.disabled=!1,c.messageInput.focus())}function lt(){c.chatHistory.scrollTop=c.chatHistory.scrollHeight}function tt(){const e=c.messageInput;e.style.height="auto",e.style.height=e.scrollHeight+"px",e.value===""&&(e.style.height="")}function Ce(e,t){c.attachmentPreview.innerHTML="",e.forEach((a,n)=>{const i=document.createElement("div");if(i.className="preview-thumb",a.type==="audio"){const r=document.createElement("div");r.className="audio-preview-icon",r.textContent="🎵",r.title=a.name||"Audio file",i.appendChild(r)}else{const r=document.createElement("img");r.src=a.base64,i.appendChild(r)}const o=document.createElement("button");o.className="remove-btn",o.textContent="×",o.onclick=()=>t(n),i.appendChild(o),c.attachmentPreview.appendChild(i)})}function st(e){if(!e)return"";let t=e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");const a=[];return t=t.replace(/```([\s\S]*?)```/g,(n,i)=>(a.push(i),`__CODEBLOCK_${a.length-1}__`)),t=t.replace(/^### (.*$)/gm,"<h3>$1</h3>"),t=t.replace(/^## (.*$)/gm,"<h2>$1</h2>"),t=t.replace(/^# (.*$)/gm,"<h1>$1</h1>"),t=t.replace(/^[\*\-] (.*$)/gm,"<ul><li>$1</li></ul>"),t=t.replace(/`([^`]+)`/g,'<code style="background:rgba(128,128,128,0.2);padding:2px 4px;border-radius:4px;">$1</code>'),t=t.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>"),t=t.replace(/\*([^*]+)\*/g,"<em>$1</em>"),t=t.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target="_blank">$1</a>'),t=t.replace(/\n/g,"<br>"),t=t.replace(/__CODEBLOCK_(\d+)__/g,(n,i)=>`<div class="code-wrapper"><button class="copy-btn">Copy</button><pre><code>${a[i]}</code></pre></div>`),t}async function Xe(e,t){const a=new TextEncoder,n=typeof e=="string"?a.encode(e):e,i=await crypto.subtle.importKey("raw",n,{name:"HMAC",hash:"SHA-256"},!1,["sign"]);return crypto.subtle.sign("HMAC",i,a.encode(t))}async function Vt(e){const t=new TextEncoder,a=await crypto.subtle.digest("SHA-256",t.encode(e));return Array.from(new Uint8Array(a)).map(n=>n.toString(16).padStart(2,"0")).join("")}function yn(e){return Array.from(new Uint8Array(e)).map(t=>t.toString(16).padStart(2,"0")).join("")}async function ka({method:e,url:t,headers:a,body:n,accessKey:i,secretKey:o,sessionToken:r,region:l,service:s}){const p=new Date().toISOString().replace(/[:-]|\.\d{3}/g,""),u=p.slice(0,8),y=new URL(t).host,b=new URL(t).pathname,k="";a.host=y,a["x-amz-date"]=p,r&&(a["x-amz-security-token"]=r);const C={};Object.keys(a).forEach(B=>{C[B.toLowerCase()]=a[B]});const q=Object.keys(a).map(B=>B.toLowerCase()).sort(),F=q.map(B=>`${B}:${C[B].trim()}
`).join(""),pe=q.join(";"),ve=await Vt(n||""),Z=[e,b,k,F,pe,ve].join(`
`),he="AWS4-HMAC-SHA256",V=`${u}/${l}/${s}/aws4_request`,we=[he,p,V,await Vt(Z)].join(`
`),Y=await Xe(`AWS4${o}`,u),W=await Xe(Y,l),re=await Xe(W,s),G=await Xe(re,"aws4_request"),se=yn(await Xe(G,we)),ye=`${he} Credential=${i}/${V}, SignedHeaders=${pe}, Signature=${se}`;return{...a,Authorization:ye}}var bn=Object.defineProperty,Aa=(e,t)=>{for(var a in t)bn(e,a,{get:t[a],enumerable:!0})},Sa={};Aa(Sa,{audioClassification:()=>uo,audioToAudio:()=>mo,automaticSpeechRecognition:()=>fo,chatCompletion:()=>Io,chatCompletionStream:()=>To,documentQuestionAnswering:()=>Oo,featureExtraction:()=>Co,fillMask:()=>Eo,imageClassification:()=>ho,imageSegmentation:()=>yo,imageToImage:()=>bo,imageToText:()=>vo,imageToVideo:()=>wo,objectDetection:()=>_o,questionAnswering:()=>Po,request:()=>co,sentenceSimilarity:()=>Ro,streamingRequest:()=>po,summarization:()=>Lo,tableQuestionAnswering:()=>Uo,tabularClassification:()=>Fo,tabularRegression:()=>Ho,textClassification:()=>$o,textGeneration:()=>Mo,textGenerationStream:()=>Do,textToImage:()=>xo,textToSpeech:()=>go,textToVideo:()=>ko,tokenClassification:()=>Bo,translation:()=>jo,visualQuestionAnswering:()=>qo,zeroShotClassification:()=>No,zeroShotImageClassification:()=>So});var Et="https://huggingface.co",Pt="https://router.huggingface.co",ht=`${Pt}/v1`,vn="X-HF-Bill-To",Kt={baseten:{},"black-forest-labs":{},cerebras:{},clarifai:{},cohere:{},"fal-ai":{},"featherless-ai":{},"fireworks-ai":{},groq:{},"hf-inference":{},hyperbolic:{},nebius:{},novita:{},nscale:{},openai:{},publicai:{},ovhcloud:{},replicate:{},sambanova:{},scaleway:{},together:{},wavespeed:{},"zai-org":{}},ct=class extends Error{constructor(e){super(e),this.name="InferenceClientError"}},J=class extends ct{constructor(e){super(e),this.name="InputError"}},wn=class extends ct{constructor(e){super(e),this.name="RoutingError"}},Ia=class extends ct{constructor(t,a,n){super(t);w(this,"httpRequest");w(this,"httpResponse");this.httpRequest={...a,...a.headers?{headers:{...a.headers,..."Authorization"in a.headers?{Authorization:"Bearer [redacted]"}:void 0}}:void 0},this.httpResponse=n}},ee=class extends Ia{constructor(e,t,a){super(e,t,a),this.name="ProviderApiError"}},Ye=class extends Ia{constructor(e,t,a){super(e,t,a),this.name="HubApiError"}},x=class extends ct{constructor(e){super(e),this.name="ProviderOutputError"}};function Ta(e){return Array.isArray(e)?e:[e]}var de=class{constructor(e,t,a=!1){w(this,"provider");w(this,"baseUrl");w(this,"clientSideRoutingOnly");this.provider=e,this.baseUrl=t,this.clientSideRoutingOnly=a}makeBaseUrl(e){return e.authMethod!=="provider-key"?`${Pt}/${this.provider}`:this.baseUrl}makeBody(e){return"data"in e.args&&e.args.data?e.args.data:JSON.stringify(this.preparePayload(e))}makeUrl(e){const t=this.makeBaseUrl(e),a=this.makeRoute(e).replace(/^\/+/,"");return`${t}/${a}`}prepareHeaders(e,t){const a={};return e.authMethod!=="none"&&(a.Authorization=`Bearer ${e.accessToken}`),t||(a["Content-Type"]="application/json"),a}},ae=class extends de{constructor(e,t,a=!1){super(e,t,a)}makeRoute(){return"v1/chat/completions"}preparePayload(e){return{...e.args,model:e.model}}async getResponse(e){if(typeof e=="object"&&Array.isArray(e==null?void 0:e.choices)&&typeof(e==null?void 0:e.created)=="number"&&typeof(e==null?void 0:e.id)=="string"&&typeof(e==null?void 0:e.model)=="string"&&(e.system_fingerprint===void 0||e.system_fingerprint===null||typeof e.system_fingerprint=="string")&&typeof(e==null?void 0:e.usage)=="object")return e;throw new x("Expected ChatCompletionOutput")}},Ee=class extends de{constructor(e,t,a=!1){super(e,t,a)}preparePayload(e){return{...e.args,model:e.model}}makeRoute(){return"v1/completions"}async getResponse(e){const t=Ta(e);if(Array.isArray(t)&&t.length>0&&t.every(a=>typeof a=="object"&&!!a&&"generated_text"in a&&typeof a.generated_text=="string"))return t[0];throw new x("Expected Array<{generated_text: string}>")}},Ca=class extends ae{constructor(){super("auto","https://router.huggingface.co")}makeBaseUrl(e){if(e.authMethod!=="hf-token")throw new wn("Cannot select auto-router when using non-Hugging Face API key.");return this.baseUrl}};function ue(e){if(globalThis.Buffer)return globalThis.Buffer.from(e).toString("base64");{const t=[];return e.forEach(a=>{t.push(String.fromCharCode(a))}),globalThis.btoa(t.join(""))}}function _n(e,t){return Object.assign({},...t.map(a=>{if(e[a]!==void 0)return{[a]:e[a]}}))}function wt(e,t){return e.includes(t)}function R(e,t){const a=Array.isArray(t)?t:[t],n=Object.keys(e).filter(i=>!wt(a,i));return _n(e,n)}var zt=["feature-extraction","sentence-similarity"],D=class extends de{constructor(){super("hf-inference",`${Pt}/hf-inference`)}preparePayload(e){return e.args}makeUrl(e){return e.model.startsWith("http://")||e.model.startsWith("https://")?e.model:super.makeUrl(e)}makeRoute(e){return e.task&&["feature-extraction","sentence-similarity"].includes(e.task)?`models/${e.model}/pipeline/${e.task}`:`models/${e.model}`}async getResponse(e){return e}},xn=class extends D{async getResponse(e,t,a,n){if(!e)throw new x("Received malformed response from HF-Inference text-to-image API: response is undefined");if(typeof e=="object"){if(n==="json")return{...e};if("data"in e&&Array.isArray(e.data)&&e.data[0].b64_json){const i=e.data[0].b64_json;return n==="url"?`data:image/jpeg;base64,${i}`:await(await fetch(`data:image/jpeg;base64,${i}`)).blob()}if("output"in e&&Array.isArray(e.output))return n==="url"?e.output[0]:await(await fetch(e.output[0])).blob()}if(e instanceof Blob){if(n==="url"||n==="json"){const i=await e.arrayBuffer().then(o=>Buffer.from(o).toString("base64"));return n==="url"?`data:image/jpeg;base64,${i}`:{output:`data:image/jpeg;base64,${i}`}}return e}throw new x("Received malformed response from HF-Inference text-to-image API: expected a Blob")}},kn=class extends D{makeUrl(e){let t;return e.model.startsWith("http://")||e.model.startsWith("https://")?t=e.model.trim():t=`${this.makeBaseUrl(e)}/models/${e.model}`,t=t.replace(/\/+$/,""),t.endsWith("/v1")?t+="/chat/completions":t.endsWith("/chat/completions")||(t+="/v1/chat/completions"),t}preparePayload(e){return{...e.args,model:e.model}}async getResponse(e){return e}},An=class extends D{async getResponse(e){const t=Ta(e);if(Array.isArray(t)&&t.every(a=>"generated_text"in a&&typeof(a==null?void 0:a.generated_text)=="string"))return t==null?void 0:t[0];throw new x("Received malformed response from HF-Inference text generation API: expected Array<{generated_text: string}>")}},Sn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t=="object"&&t!==null&&typeof t.label=="string"&&typeof t.score=="number"))return e;throw new x("Received malformed response from HF-Inference audio-classification API: expected Array<{label: string, score: number}> but received different format")}},In=class extends D{async getResponse(e){return e}async preparePayloadAsync(e){return"data"in e?e:{...R(e,"inputs"),data:e.inputs}}},Tn=class extends D{async getResponse(e){if(!Array.isArray(e))throw new x("Received malformed response from HF-Inference audio-to-audio API: expected Array");if(!e.every(t=>typeof t=="object"&&t&&"label"in t&&typeof t.label=="string"&&"content-type"in t&&typeof t["content-type"]=="string"&&"blob"in t&&typeof t.blob=="string"))throw new x("Received malformed response from HF-Inference audio-to-audio API: expected Array<{label: string, audio: Blob}>");return e}},Cn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t=="object"&&!!t&&typeof(t==null?void 0:t.answer)=="string"&&(typeof t.end=="number"||typeof t.end>"u")&&(typeof t.score=="number"||typeof t.score>"u")&&(typeof t.start=="number"||typeof t.start>"u")))return e[0];throw new x("Received malformed response from HF-Inference document-question-answering API: expected Array<{answer: string, end: number, score: number, start: number}>")}},En=class extends D{async getResponse(e){const t=(a,n,i=0)=>i>n?!1:a.every(o=>Array.isArray(o))?a.every(o=>t(o,n,i+1)):a.every(o=>typeof o=="number");if(Array.isArray(e)&&t(e,3,0))return e;throw new x("Received malformed response from HF-Inference feature-extraction API: expected Array<number[][][] | number[][] | number[] | number>")}},Pn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t.label=="string"&&typeof t.score=="number"))return e;throw new x("Received malformed response from HF-Inference image-classification API: expected Array<{label: string, score: number}>")}},Rn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t.label=="string"&&typeof t.mask=="string"&&(t.score===void 0||typeof t.score=="number")))return e;throw new x("Received malformed response from HF-Inference image-segmentation API: expected Array<{label: string, mask: string, score: number}>")}async preparePayloadAsync(e){return{...e,inputs:ue(new Uint8Array(e.inputs instanceof ArrayBuffer?e.inputs:await e.inputs.arrayBuffer()))}}},Ln=class extends D{async getResponse(e){if(typeof(e==null?void 0:e.generated_text)!="string")throw new x("Received malformed response from HF-Inference image-to-text API: expected {generated_text: string}");return e}},Un=class extends D{async preparePayloadAsync(e){return e.parameters?{...e,inputs:ue(new Uint8Array(e.inputs instanceof ArrayBuffer?e.inputs:await e.inputs.arrayBuffer()))}:{...e,model:e.model,data:e.inputs}}async getResponse(e){if(e instanceof Blob)return e;throw new x("Received malformed response from HF-Inference image-to-image API: expected Blob")}},$n=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t.label=="string"&&typeof t.score=="number"&&typeof t.box.xmin=="number"&&typeof t.box.ymin=="number"&&typeof t.box.xmax=="number"&&typeof t.box.ymax=="number"))return e;throw new x("Received malformed response from HF-Inference object-detection API: expected Array<{label: string, score: number, box: {xmin: number, ymin: number, xmax: number, ymax: number}}>")}},Mn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t.label=="string"&&typeof t.score=="number"))return e;throw new x("Received malformed response from HF-Inference zero-shot-image-classification API: expected Array<{label: string, score: number}>")}},Dn=class extends D{async getResponse(e){const t=e==null?void 0:e[0];if(Array.isArray(t)&&t.every(a=>typeof(a==null?void 0:a.label)=="string"&&typeof a.score=="number"))return t;throw new x("Received malformed response from HF-Inference text-classification API: expected Array<{label: string, score: number}>")}},Bn=class extends D{async getResponse(e){if(Array.isArray(e)?e.every(t=>typeof t=="object"&&!!t&&typeof t.answer=="string"&&typeof t.end=="number"&&typeof t.score=="number"&&typeof t.start=="number"):typeof e=="object"&&e&&typeof e.answer=="string"&&typeof e.end=="number"&&typeof e.score=="number"&&typeof e.start=="number")return Array.isArray(e)?e[0]:e;throw new x("Received malformed response from HF-Inference question-answering API: expected Array<{answer: string, end: number, score: number, start: number}>")}},jn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t.score=="number"&&typeof t.sequence=="string"&&typeof t.token=="number"&&typeof t.token_str=="string"))return e;throw new x("Received malformed response from HF-Inference fill-mask API: expected Array<{score: number, sequence: string, token: number, token_str: string}>")}},Nn=class Ea extends D{async getResponse(t){if(typeof t=="object"&&t!==null&&"labels"in t&&"scores"in t&&Array.isArray(t.labels)&&Array.isArray(t.scores)&&t.labels.length===t.scores.length&&t.labels.every(a=>typeof a=="string")&&t.scores.every(a=>typeof a=="number")){const a=t.scores;return t.labels.map((n,i)=>({label:n,score:a[i]}))}if(Array.isArray(t)&&t.every(Ea.validateOutputElement))return t;throw new x("Received malformed response from HF-Inference zero-shot-classification API: expected Array<{label: string, score: number}>")}static validateOutputElement(t){return typeof t=="object"&&!!t&&"label"in t&&"score"in t&&typeof t.label=="string"&&typeof t.score=="number"}},On=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t=="number"))return e;throw new x("Received malformed response from HF-Inference sentence-similarity API: expected Array<number>")}},qn=class _t extends D{static validate(t){return typeof t=="object"&&!!t&&"aggregator"in t&&typeof t.aggregator=="string"&&"answer"in t&&typeof t.answer=="string"&&"cells"in t&&Array.isArray(t.cells)&&t.cells.every(a=>typeof a=="string")&&"coordinates"in t&&Array.isArray(t.coordinates)&&t.coordinates.every(a=>Array.isArray(a)&&a.every(n=>typeof n=="number"))}async getResponse(t){if(Array.isArray(t)&&Array.isArray(t)?t.every(a=>_t.validate(a)):_t.validate(t))return Array.isArray(t)?t[0]:t;throw new x("Received malformed response from HF-Inference table-question-answering API: expected {aggregator: string, answer: string, cells: string[], coordinates: number[][]}")}},Fn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t.end=="number"&&typeof t.entity_group=="string"&&typeof t.score=="number"&&typeof t.start=="number"&&typeof t.word=="string"))return e;throw new x("Received malformed response from HF-Inference token-classification API: expected Array<{end: number, entity_group: string, score: number, start: number, word: string}>")}},Hn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof(t==null?void 0:t.translation_text)=="string"))return(e==null?void 0:e.length)===1?e==null?void 0:e[0]:e;throw new x("Received malformed response from HF-Inference translation API: expected Array<{translation_text: string}>")}},Vn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof(t==null?void 0:t.summary_text)=="string"))return e==null?void 0:e[0];throw new x("Received malformed response from HF-Inference summarization API: expected Array<{summary_text: string}>")}},Kn=class extends D{async getResponse(e){return e}},zn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t=="number"))return e;throw new x("Received malformed response from HF-Inference tabular-classification API: expected Array<number>")}},Wn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t=="object"&&!!t&&typeof(t==null?void 0:t.answer)=="string"&&typeof t.score=="number"))return e[0];throw new x("Received malformed response from HF-Inference visual-question-answering API: expected Array<{answer: string, score: number}>")}},Xn=class extends D{async getResponse(e){if(Array.isArray(e)&&e.every(t=>typeof t=="number"))return e;throw new x("Received malformed response from HF-Inference tabular-regression API: expected Array<number>")}},Qn=class extends D{async getResponse(e){return e}},Jn=console;function He(){return Jn}var yt=new Map;function Yn(e,t){return t?Array.isArray(t)?t:Object.entries(t).map(([a,n])=>({provider:a,hfModelId:e,providerId:n.providerId,status:n.status,task:n.task,adapter:n.adapter,adapterWeightsPath:n.adapterWeightsPath})):[]}async function Pa(e,t,a){var i;let n;if(yt.has(e))n=yt.get(e);else{const o=`${Et}/api/models/${e}?expand[]=inferenceProviderMapping`,r=await((a==null?void 0:a.fetch)??fetch)(o,{headers:t!=null&&t.startsWith("hf_")?{Authorization:`Bearer ${t}`}:{}});if(!r.ok)if((i=r.headers.get("Content-Type"))!=null&&i.startsWith("application/json")){const s=await r.json();if("error"in s&&typeof s.error=="string")throw new Ye(`Failed to fetch inference provider mapping for model ${e}: ${s.error}`,{url:o,method:"GET"},{requestId:r.headers.get("x-request-id")??"",status:r.status,body:s})}else throw new Ye(`Failed to fetch inference provider mapping for model ${e}`,{url:o,method:"GET"},{requestId:r.headers.get("x-request-id")??"",status:r.status,body:await r.text()});let l=null;try{l=await r.json()}catch{throw new Ye(`Failed to fetch inference provider mapping for model ${e}: malformed API response, invalid JSON`,{url:o,method:"GET"},{requestId:r.headers.get("x-request-id")??"",status:r.status,body:await r.text()})}if(!(l!=null&&l.inferenceProviderMapping))throw new Ye(`We have not been able to find inference provider information for model ${e}.`,{url:o,method:"GET"},{requestId:r.headers.get("x-request-id")??"",status:r.status,body:await r.text()});n=Yn(e,l.inferenceProviderMapping),yt.set(e,n)}return n}async function Zn(e,t){const a=He();if(e.provider==="auto"&&e.task==="conversational")return{hfModelId:e.modelId,provider:"auto",providerId:e.modelId,status:"live",task:"conversational"};if(Kt[e.provider][e.modelId])return Kt[e.provider][e.modelId];const i=(await Pa(e.modelId,e.accessToken,t)).find(o=>o.provider===e.provider);if(i){const o=e.provider==="hf-inference"&&wt(zt,e.task)?zt:[e.task];if(!wt(o,i.task))throw new J(`Model ${e.modelId} is not supported for task ${e.task} and provider ${e.provider}. Supported task: ${i.task}.`);return i.status==="staging"&&a.warn(`Model ${e.modelId} is in staging mode for provider ${e.provider}. Meant for test purposes only.`),i}return null}async function U(e,t,a){var i;const n=He();if(a){if(e)throw new J("Specifying both endpointUrl and provider is not supported.");return"hf-inference"}if(e||(n.log("Defaulting to 'auto' which will select the first provider available for the model, sorted by the user's order in https://hf.co/settings/inference-providers."),e="auto"),e==="auto"){if(!t)throw new J("Specifying a model is required when provider is 'auto'");e=(i=(await Pa(t))[0])==null?void 0:i.provider,n.log("Auto selected provider:",e)}if(!e)throw new J(`No Inference Provider available for model ${t}.`);return e}var Gn="https://inference.baseten.co",ei=class extends ae{constructor(){super("baseten",Gn)}},ti="https://api.clarifai.com",ai=class extends ae{constructor(){super("clarifai",ti)}makeRoute(){return"/v2/ext/openai/v1/chat/completions"}prepareHeaders(e,t){const a={Authorization:e.authMethod!=="provider-key"?`Bearer ${e.accessToken}`:`Key ${e.accessToken}`};return t||(a["Content-Type"]="application/json"),a}};function dt(e){return new Promise(t=>{setTimeout(()=>t(),e)})}var ni="https://api.us1.bfl.ai",ii=class extends de{constructor(){super("black-forest-labs",ni)}preparePayload(e){return{...R(e.args,["inputs","parameters"]),...e.args.parameters,prompt:e.args.inputs}}prepareHeaders(e,t){const a={Authorization:e.authMethod!=="provider-key"?`Bearer ${e.accessToken}`:`X-Key ${e.accessToken}`};return t||(a["Content-Type"]="application/json"),a}makeRoute(e){if(!e)throw new J("Params are required");return`/v1/${e.model}`}async getResponse(e,t,a,n){const i=He(),o=new URL(e.polling_url);for(let r=0;r<5;r++){await dt(1e3),i.debug(`Polling Black Forest Labs API for the result... ${r+1}/5`),o.searchParams.set("attempt",r.toString(10));const l=await fetch(o,{headers:{"Content-Type":"application/json"}});if(!l.ok)throw new ee("Failed to fetch result from black forest labs API",{url:o.toString(),method:"GET",headers:{"Content-Type":"application/json"}},{requestId:l.headers.get("x-request-id")??"",status:l.status,body:await l.text()});const s=await l.json();if(typeof s=="object"&&s&&"status"in s&&typeof s.status=="string"&&s.status==="Ready"&&"result"in s&&typeof s.result=="object"&&s.result&&"sample"in s.result&&typeof s.result.sample=="string")return n==="json"?s.result:n==="url"?s.result.sample:await(await fetch(s.result.sample)).blob()}throw new x("Timed out while waiting for the result from black forest labs API - aborting after 5 attempts")}},oi=class extends ae{constructor(){super("cerebras","https://api.cerebras.ai")}},ri=class extends ae{constructor(){super("cohere","https://api.cohere.com")}makeRoute(){return"/compatibility/v1/chat/completions"}};function Pe(e){return/^http(s?):/.test(e)||e.startsWith("/")}var Wt=["audio/mpeg","audio/mp4","audio/wav","audio/x-wav"],pt=class extends de{constructor(e){super("fal-ai",e||"https://fal.run")}preparePayload(e){return e.args}makeRoute(e){return`/${e.model}`}prepareHeaders(e,t){const a={Authorization:e.authMethod!=="provider-key"?`Bearer ${e.accessToken}`:`Key ${e.accessToken}`};return t||(a["Content-Type"]="application/json"),a}},ut=class extends pt{async getResponseFromQueueApi(e,t,a){if(!t||!a)throw new J(`URL and headers are required for ${this.task} task`);if(!e.request_id)throw new x(`Received malformed response from Fal.ai ${this.task} API: no request ID found in the response`);let i=e.status;const o=new URL(t),r=`${o.protocol}//${o.host}${o.host==="router.huggingface.co"?"/fal-ai":""}`,l=new URL(e.response_url).pathname,s=o.search,d=`${r}${l}/status${s}`,p=`${r}${l}${s}`;for(;i!=="COMPLETED";){await dt(500);const b=await fetch(d,{headers:a});if(!b.ok)throw new ee("Failed to fetch response status from fal-ai API",{url:d,method:"GET"},{requestId:b.headers.get("x-request-id")??"",status:b.status,body:await b.text()});try{i=(await b.json()).status}catch{throw new x("Failed to parse status response from fal-ai API: received malformed response")}}const u=await fetch(p,{headers:a});let y;try{y=await u.json()}catch{throw new x("Failed to parse result response from fal-ai API: received malformed response")}return y}};function Ra(e,t){return`${Et}/${e}/resolve/main/${t}`}var si=class extends pt{preparePayload(e){var a;const t={...R(e.args,["inputs","parameters"]),...e.args.parameters,sync_mode:!0,prompt:e.args.inputs};return((a=e.mapping)==null?void 0:a.adapter)==="lora"&&e.mapping.adapterWeightsPath&&(t.loras=[{path:Ra(e.mapping.hfModelId,e.mapping.adapterWeightsPath),scale:1}],e.mapping.providerId==="fal-ai/lora"&&(t.model_name="stabilityai/stable-diffusion-xl-base-1.0")),t}async getResponse(e,t,a,n){if(typeof e=="object"&&"images"in e&&Array.isArray(e.images)&&e.images.length>0&&"url"in e.images[0]&&typeof e.images[0].url=="string")return n==="json"?{...e}:n==="url"?e.images[0].url:await(await fetch(e.images[0].url)).blob();throw new x("Received malformed response from Fal.ai text-to-image API")}},li=class extends ut{constructor(){super("https://queue.fal.run");w(this,"task");this.task="image-to-image"}makeRoute(t){return t.authMethod!=="provider-key"?`/${t.model}?_subdomain=queue`:`/${t.model}`}preparePayload(t){var n;const a=t.args;return((n=t.mapping)==null?void 0:n.adapter)==="lora"&&t.mapping.adapterWeightsPath&&(a.loras=[{path:Ra(t.mapping.hfModelId,t.mapping.adapterWeightsPath),scale:1}]),a}async preparePayloadAsync(t){const n=`data:${t.inputs instanceof Blob?t.inputs.type:"image/png"};base64,${ue(new Uint8Array(t.inputs instanceof ArrayBuffer?t.inputs:await t.inputs.arrayBuffer()))}`;return{...R(t,["inputs","parameters"]),image_url:n,...t.parameters,...t,image_urls:[n]}}async getResponse(t,a,n){const i=await this.getResponseFromQueueApi(t,a,n);if(typeof i=="object"&&i&&"images"in i&&Array.isArray(i.images)&&i.images.length>0&&typeof i.images[0]=="object"&&i.images[0]&&"url"in i.images[0]&&typeof i.images[0].url=="string"&&Pe(i.images[0].url))return await(await fetch(i.images[0].url)).blob();throw new x(`Received malformed response from Fal.ai image-to-image API: expected { images: Array<{ url: string }> } result format, got instead: ${JSON.stringify(i)}`)}},ci=class extends ut{constructor(){super("https://queue.fal.run");w(this,"task");this.task="text-to-video"}makeRoute(t){return t.authMethod!=="provider-key"?`/${t.model}?_subdomain=queue`:`/${t.model}`}preparePayload(t){return{...R(t.args,["inputs","parameters"]),...t.args.parameters,prompt:t.args.inputs}}async getResponse(t,a,n){const i=await this.getResponseFromQueueApi(t,a,n);if(typeof i=="object"&&i&&"video"in i&&typeof i.video=="object"&&i.video&&"url"in i.video&&typeof i.video.url=="string"&&Pe(i.video.url))return await(await fetch(i.video.url)).blob();throw new x(`Received malformed response from Fal.ai text-to-video API: expected { video: { url: string } } result format, got instead: ${JSON.stringify(i)}`)}},di=class extends ut{constructor(){super("https://queue.fal.run");w(this,"task");this.task="image-to-video"}makeRoute(t){return t.authMethod!=="provider-key"?`/${t.model}?_subdomain=queue`:`/${t.model}`}preparePayload(t){return{...R(t.args,["inputs","parameters"]),...t.args.parameters,image_url:t.args.image_url}}async preparePayloadAsync(t){const a=t.inputs instanceof Blob?t.inputs.type:"image/png";return{...R(t,["inputs","parameters"]),image_url:`data:${a};base64,${ue(new Uint8Array(t.inputs instanceof ArrayBuffer?t.inputs:await t.inputs.arrayBuffer()))}`,...t.parameters,...t}}async getResponse(t,a,n){const i=await this.getResponseFromQueueApi(t,a,n);if(typeof i=="object"&&i!==null&&"video"in i&&typeof i.video=="object"&&i.video!==null&&"url"in i.video&&typeof i.video.url=="string"&&"url"in i.video&&Pe(i.video.url))return await(await fetch(i.video.url)).blob();throw new x(`Received malformed response from Fal.ai image‑to‑video API: expected { video: { url: string } }, got: ${JSON.stringify(i)}`)}},pi=class extends pt{prepareHeaders(e,t){const a=super.prepareHeaders(e,t);return a["Content-Type"]="application/json",a}async getResponse(e){const t=e;if(typeof(t==null?void 0:t.text)!="string")throw new x(`Received malformed response from Fal.ai Automatic Speech Recognition API: expected { text: string } format, got instead: ${JSON.stringify(e)}`);return{text:t.text}}async preparePayloadAsync(e){const t="data"in e&&e.data instanceof Blob?e.data:"inputs"in e?e.inputs:void 0,a=t==null?void 0:t.type;if(!a)throw new J("Unable to determine the input's content-type. Make sure your are passing a Blob when using provider fal-ai.");if(!Wt.includes(a))throw new J(`Provider fal-ai does not support blob type ${a} - supported content types are: ${Wt.join(", ")}`);const n=ue(new Uint8Array(await t.arrayBuffer()));return{..."data"in e?R(e,"data"):R(e,"inputs"),audio_url:`data:${a};base64,${n}`}}},ui=class extends pt{preparePayload(e){return{...R(e.args,["inputs","parameters"]),...e.args.parameters,text:e.args.inputs}}async getResponse(e){var n;const t=e;if(typeof((n=t==null?void 0:t.audio)==null?void 0:n.url)!="string")throw new x(`Received malformed response from Fal.ai Text-to-Speech API: expected { audio: { url: string } } format, got instead: ${JSON.stringify(e)}`);const a=await fetch(t.audio.url);if(!a.ok)throw new ee(`Failed to fetch audio from ${t.audio.url}: ${a.statusText}`,{url:t.audio.url,method:"GET",headers:{"Content-Type":"application/json"}},{requestId:a.headers.get("x-request-id")??"",status:a.status,body:await a.text()});try{return await a.blob()}catch(i){throw new ee(`Failed to fetch audio from ${t.audio.url}: ${i instanceof Error?i.message:String(i)}`,{url:t.audio.url,method:"GET",headers:{"Content-Type":"application/json"}},{requestId:a.headers.get("x-request-id")??"",status:a.status,body:await a.text()})}}},mi=class extends ut{constructor(){super("https://queue.fal.run");w(this,"task");this.task="image-segmentation"}makeRoute(t){return t.authMethod!=="provider-key"?`/${t.model}?_subdomain=queue`:`/${t.model}`}preparePayload(t){return{...R(t.args,["inputs","parameters"]),...t.args.parameters,sync_mode:!0}}async preparePayloadAsync(t){const a="data"in t&&t.data instanceof Blob?t.data:"inputs"in t?t.inputs:void 0,n=a instanceof Blob?a.type:"image/png",i=ue(new Uint8Array(a instanceof ArrayBuffer?a:await a.arrayBuffer()));return{...R(t,["inputs","parameters","data"]),...t.parameters,...t,image_url:`data:${n};base64,${i}`,sync_mode:!0}}async getResponse(t,a,n){const i=await this.getResponseFromQueueApi(t,a,n);if(typeof i=="object"&&i!==null&&"image"in i&&typeof i.image=="object"&&i.image!==null&&"url"in i.image&&typeof i.image.url=="string"){const o=await fetch(i.image.url);if(!o.ok)throw new ee(`Failed to fetch segmentation mask from ${i.image.url}`,{url:i.image.url,method:"GET"},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:await o.text()});const l=await(await o.blob()).arrayBuffer();return[{label:"mask",score:1,mask:ue(new Uint8Array(l))}]}throw new x(`Received malformed response from Fal.ai image-segmentation API: expected { image: { url: string } } format, got instead: ${JSON.stringify(t)}`)}},La="https://api.featherless.ai",fi=class extends ae{constructor(){super("featherless-ai",La)}},gi=class extends Ee{constructor(){super("featherless-ai",La)}preparePayload(e){return{model:e.model,...R(e.args,["inputs","parameters"]),...e.args.parameters?{max_tokens:e.args.parameters.max_new_tokens,...R(e.args.parameters,"max_new_tokens")}:void 0,prompt:e.args.inputs}}async getResponse(e){if(typeof e=="object"&&"choices"in e&&Array.isArray(e==null?void 0:e.choices)&&typeof(e==null?void 0:e.model)=="string")return{generated_text:e.choices[0].text};throw new x("Received malformed response from Featherless AI text generation API")}},hi=class extends ae{constructor(){super("fireworks-ai","https://api.fireworks.ai")}makeRoute(){return"/inference/v1/chat/completions"}},Ua="https://api.groq.com",yi=class extends Ee{constructor(){super("groq",Ua)}makeRoute(){return"/openai/v1/chat/completions"}},bi=class extends ae{constructor(){super("groq",Ua)}makeRoute(){return"/openai/v1/chat/completions"}},Rt="https://api.hyperbolic.xyz",vi=class extends ae{constructor(){super("hyperbolic",Rt)}},wi=class extends Ee{constructor(){super("hyperbolic",Rt)}makeRoute(){return"v1/chat/completions"}preparePayload(e){return{messages:[{content:e.args.inputs,role:"user"}],...e.args.parameters?{max_tokens:e.args.parameters.max_new_tokens,...R(e.args.parameters,"max_new_tokens")}:void 0,...R(e.args,["inputs","parameters"]),model:e.model}}async getResponse(e){if(typeof e=="object"&&"choices"in e&&Array.isArray(e==null?void 0:e.choices)&&typeof(e==null?void 0:e.model)=="string")return{generated_text:e.choices[0].message.content};throw new x("Received malformed response from Hyperbolic text generation API")}},_i=class extends de{constructor(){super("hyperbolic",Rt)}makeRoute(e){return"/v1/images/generations"}preparePayload(e){return{...R(e.args,["inputs","parameters"]),...e.args.parameters,prompt:e.args.inputs,model_name:e.model}}async getResponse(e,t,a,n){if(typeof e=="object"&&"images"in e&&Array.isArray(e.images)&&e.images[0]&&typeof e.images[0].image=="string")return n==="json"?{...e}:n==="url"?`data:image/jpeg;base64,${e.images[0].image}`:fetch(`data:image/jpeg;base64,${e.images[0].image}`).then(i=>i.blob());throw new x("Received malformed response from Hyperbolic text-to-image API")}},mt="https://api.studio.nebius.ai",xi=class extends ae{constructor(){super("nebius",mt)}preparePayload(e){var n;const t=super.preparePayload(e),a=e.args.response_format;return(a==null?void 0:a.type)==="json_schema"&&((n=a.json_schema)!=null&&n.schema)&&(t.guided_json=a.json_schema.schema),t}},ki=class extends Ee{constructor(){super("nebius",mt)}preparePayload(e){return{...e.args,model:e.model,prompt:e.args.inputs}}async getResponse(e){var t;if(typeof e=="object"&&"choices"in e&&Array.isArray(e==null?void 0:e.choices)&&e.choices.length>0&&typeof((t=e.choices[0])==null?void 0:t.text)=="string")return{generated_text:e.choices[0].text};throw new x("Received malformed response from Nebius text generation API")}},Ai=class extends de{constructor(){super("nebius",mt)}preparePayload(e){return{...R(e.args,["inputs","parameters"]),...e.args.parameters,response_format:"b64_json",prompt:e.args.inputs,model:e.model}}makeRoute(){return"v1/images/generations"}async getResponse(e,t,a,n){if(typeof e=="object"&&"data"in e&&Array.isArray(e.data)&&e.data.length>0&&"b64_json"in e.data[0]&&typeof e.data[0].b64_json=="string"){if(n==="json")return{...e};const i=e.data[0].b64_json;return n==="url"?`data:image/jpeg;base64,${i}`:fetch(`data:image/jpeg;base64,${i}`).then(o=>o.blob())}throw new x("Received malformed response from Nebius text-to-image API")}},Si=class extends de{constructor(){super("nebius",mt)}preparePayload(e){return{input:e.args.inputs,model:e.model}}makeRoute(){return"v1/embeddings"}async getResponse(e){return e.data.map(t=>t.embedding)}},Lt="https://api.novita.ai",Ii=class extends Ee{constructor(){super("novita",Lt)}makeRoute(){return"/v3/openai/chat/completions"}},Ti=class extends ae{constructor(){super("novita",Lt)}makeRoute(){return"/v3/openai/chat/completions"}},Ci=class extends de{constructor(){super("novita",Lt)}makeRoute(e){return`/v3/async/${e.model}`}preparePayload(e){const{num_inference_steps:t,...a}=e.args.parameters??{};return{...R(e.args,["inputs","parameters"]),...a,steps:t,prompt:e.args.inputs}}async getResponse(e,t,a){if(!t||!a)throw new J("URL and headers are required for text-to-video task");const n=e.task_id;if(!n)throw new x("Received malformed response from Novita text-to-video API: no task ID found in the response");const i=new URL(t),r=`${`${i.protocol}//${i.host}${i.host==="router.huggingface.co"?"/novita":""}`}/v3/async/task-result?task_id=${n}`;let l="",s;for(;l!=="TASK_STATUS_SUCCEED"&&l!=="TASK_STATUS_FAILED";){await dt(500);const d=await fetch(r,{headers:a});if(!d.ok)throw new ee("Failed to fetch task result",{url:r,method:"GET",headers:a},{requestId:d.headers.get("x-request-id")??"",status:d.status,body:await d.text()});try{if(s=await d.json(),s&&typeof s=="object"&&"task"in s&&s.task&&typeof s.task=="object"&&"status"in s.task&&typeof s.task.status=="string")l=s.task.status;else throw new x("Received malformed response from Novita text-to-video API: failed to get task status")}catch{throw new x("Received malformed response from Novita text-to-video API: failed to parse task result")}}if(l==="TASK_STATUS_FAILED")throw new x("Novita text-to-video task failed");if(typeof s=="object"&&s&&"videos"in s&&typeof s.videos=="object"&&s.videos&&Array.isArray(s.videos)&&s.videos.length>0&&"video_url"in s.videos[0]&&typeof s.videos[0].video_url=="string"&&Pe(s.videos[0].video_url))return await(await fetch(s.videos[0].video_url)).blob();throw new x(`Received malformed response from Novita text-to-video API: expected { videos: [{ video_url: string }] } format, got instead: ${JSON.stringify(s)}`)}},$a="https://inference.api.nscale.com",Ei=class extends ae{constructor(){super("nscale",$a)}},Pi=class extends de{constructor(){super("nscale",$a)}preparePayload(e){return{...R(e.args,["inputs","parameters"]),...e.args.parameters,response_format:"b64_json",prompt:e.args.inputs,model:e.model}}makeRoute(){return"v1/images/generations"}async getResponse(e,t,a,n){if(typeof e=="object"&&"data"in e&&Array.isArray(e.data)&&e.data.length>0&&"b64_json"in e.data[0]&&typeof e.data[0].b64_json=="string"){if(n==="json")return{...e};const i=e.data[0].b64_json;return n==="url"?`data:image/jpeg;base64,${i}`:fetch(`data:image/jpeg;base64,${i}`).then(o=>o.blob())}throw new x("Received malformed response from Nscale text-to-image API")}},Ri="https://api.openai.com",Li=class extends ae{constructor(){super("openai",Ri,!0)}},Ma="https://oai.endpoints.kepler.ai.cloud.ovh.net",Ui=class extends ae{constructor(){super("ovhcloud",Ma)}},$i=class extends Ee{constructor(){super("ovhcloud",Ma)}preparePayload(e){return{model:e.model,...R(e.args,["inputs","parameters"]),...e.args.parameters?{max_tokens:e.args.parameters.max_new_tokens,...R(e.args.parameters,"max_new_tokens")}:void 0,prompt:e.args.inputs}}async getResponse(e){if(typeof e=="object"&&"choices"in e&&Array.isArray(e==null?void 0:e.choices)&&typeof(e==null?void 0:e.model)=="string")return{generated_text:e.choices[0].text};throw new x("Received malformed response from OVHcloud text generation API")}},Mi=class extends ae{constructor(){super("publicai","https://api.publicai.co")}},at=class extends de{constructor(e){super("replicate",e||"https://api.replicate.com")}makeRoute(e){return e.model.includes(":")?"v1/predictions":`v1/models/${e.model}/predictions`}preparePayload(e){return{input:{...R(e.args,["inputs","parameters"]),...e.args.parameters,prompt:e.args.inputs},version:e.model.includes(":")?e.model.split(":")[1]:void 0}}prepareHeaders(e,t){const a={Authorization:`Bearer ${e.accessToken}`,Prefer:"wait"};return t||(a["Content-Type"]="application/json"),a}makeUrl(e){const t=this.makeBaseUrl(e);return e.model.includes(":")?`${t}/v1/predictions`:`${t}/v1/models/${e.model}/predictions`}},Di=class extends at{preparePayload(e){var t;return{input:{...R(e.args,["inputs","parameters"]),...e.args.parameters,prompt:e.args.inputs,lora_weights:((t=e.mapping)==null?void 0:t.adapter)==="lora"&&e.mapping.adapterWeightsPath?`https://huggingface.co/${e.mapping.hfModelId}`:void 0},version:e.model.includes(":")?e.model.split(":")[1]:void 0}}async getResponse(e,t,a,n){if(typeof e=="object"&&"output"in e&&typeof e.output=="string"&&Pe(e.output))return n==="json"?{...e}:n==="url"?e.output:await(await fetch(e.output)).blob();if(typeof e=="object"&&"output"in e&&Array.isArray(e.output)&&e.output.length>0&&typeof e.output[0]=="string")return n==="json"?{...e}:n==="url"?e.output[0]:await(await fetch(e.output[0])).blob();throw new x("Received malformed response from Replicate text-to-image API")}},Bi=class extends at{preparePayload(e){const t=super.preparePayload(e),a=t.input;if(typeof a=="object"&&a!==null&&"prompt"in a){const n=a;n.text=n.prompt,delete n.prompt}return t}async getResponse(e){if(e instanceof Blob)return e;if(e&&typeof e=="object"&&"output"in e){if(typeof e.output=="string")return await(await fetch(e.output)).blob();if(Array.isArray(e.output))return await(await fetch(e.output[0])).blob()}throw new x("Received malformed response from Replicate text-to-speech API")}},ji=class extends at{async getResponse(e){if(typeof e=="object"&&e&&"output"in e&&typeof e.output=="string"&&Pe(e.output))return await(await fetch(e.output)).blob();throw new x("Received malformed response from Replicate text-to-video API")}},Ni=class extends at{preparePayload(e){return{input:{...R(e.args,["inputs","parameters"]),...e.args.parameters,audio:e.args.inputs},version:e.model.includes(":")?e.model.split(":")[1]:void 0}}async preparePayloadAsync(e){const t="data"in e&&e.data instanceof Blob?e.data:"inputs"in e?e.inputs:void 0;if(!t||!(t instanceof Blob))throw new Error("Audio input must be a Blob");const a=new Uint8Array(await t.arrayBuffer()),n=ue(a),i=`data:${t.type||"audio/wav"};base64,${n}`;return{..."data"in e?R(e,"data"):R(e,"inputs"),inputs:i}}async getResponse(e){if(typeof(e==null?void 0:e.output)=="string")return{text:e.output};if(Array.isArray(e==null?void 0:e.output)&&typeof e.output[0]=="string")return{text:e.output[0]};const t=e==null?void 0:e.output;if(t&&typeof t=="object"){if(typeof t.transcription=="string")return{text:t.transcription};if(typeof t.translation=="string")return{text:t.translation};if(typeof t.txt_file=="string")return{text:await(await fetch(t.txt_file)).text()}}throw new x("Received malformed response from Replicate automatic-speech-recognition API")}},Oi=class extends at{preparePayload(e){var t;return{input:{...R(e.args,["inputs","parameters"]),...e.args.parameters,input_image:e.args.inputs,lora_weights:((t=e.mapping)==null?void 0:t.adapter)==="lora"&&e.mapping.adapterWeightsPath?`https://huggingface.co/${e.mapping.hfModelId}`:void 0},version:e.model.includes(":")?e.model.split(":")[1]:void 0}}async preparePayloadAsync(e){const{inputs:t,...a}=e,n=new Uint8Array(await t.arrayBuffer()),i=ue(n),o=`data:${t.type||"image/jpeg"};base64,${i}`;return{...a,inputs:o}}async getResponse(e){if(typeof e=="object"&&e&&"output"in e&&Array.isArray(e.output)&&e.output.length>0&&typeof e.output[0]=="string")return await(await fetch(e.output[0])).blob();if(typeof e=="object"&&e&&"output"in e&&typeof e.output=="string"&&Pe(e.output))return await(await fetch(e.output)).blob();throw new x("Received malformed response from Replicate image-to-image API")}},qi=class extends ae{constructor(){super("sambanova","https://api.sambanova.ai")}preparePayload(e){const t=e.args.response_format;return(t==null?void 0:t.type)==="json_schema"&&t.json_schema&&(t.json_schema.strict??!0)&&(t.json_schema.strict=!1),super.preparePayload(e)}},Fi=class extends de{constructor(){super("sambanova","https://api.sambanova.ai")}makeRoute(){return"/v1/embeddings"}async getResponse(e){if(typeof e=="object"&&"data"in e&&Array.isArray(e.data))return e.data.map(t=>t.embedding);throw new x("Received malformed response from Sambanova feature-extraction (embeddings) API")}preparePayload(e){return{model:e.model,input:e.args.inputs,...e.args}}},Ut="https://api.scaleway.ai",Hi=class extends ae{constructor(){super("scaleway",Ut)}},Vi=class extends Ee{constructor(){super("scaleway",Ut)}preparePayload(e){return{model:e.model,...e.args,prompt:e.args.inputs}}async getResponse(e){if(typeof e=="object"&&e!==null&&"choices"in e&&Array.isArray(e.choices)&&e.choices.length>0){const t=e.choices[0];if(typeof t=="object"&&t&&"text"in t&&t.text&&typeof t.text=="string")return{generated_text:t.text}}throw new x("Received malformed response from Scaleway text generation API")}},Ki=class extends de{constructor(){super("scaleway",Ut)}preparePayload(e){return{input:e.args.inputs,model:e.model}}makeRoute(){return"v1/embeddings"}async getResponse(e){return e.data.map(t=>t.embedding)}},$t="https://api.together.xyz",zi=class extends ae{constructor(){super("together",$t)}preparePayload(e){var n;const t=super.preparePayload(e),a=t.response_format;return(a==null?void 0:a.type)==="json_schema"&&((n=a==null?void 0:a.json_schema)!=null&&n.schema)&&(t.response_format={type:"json_schema",schema:a.json_schema.schema}),t}},Wi=class extends Ee{constructor(){super("together",$t)}preparePayload(e){return{model:e.model,...e.args,prompt:e.args.inputs}}async getResponse(e){if(typeof e=="object"&&"choices"in e&&Array.isArray(e==null?void 0:e.choices)&&typeof(e==null?void 0:e.model)=="string")return{generated_text:e.choices[0].text};throw new x("Received malformed response from Together text generation API")}},Xi=class extends de{constructor(){super("together",$t)}makeRoute(){return"v1/images/generations"}preparePayload(e){return{...R(e.args,["inputs","parameters"]),...e.args.parameters,prompt:e.args.inputs,response_format:"base64",model:e.model}}async getResponse(e,t,a,n){if(typeof e=="object"&&"data"in e&&Array.isArray(e.data)&&e.data.length>0&&"b64_json"in e.data[0]&&typeof e.data[0].b64_json=="string"){if(n==="json")return{...e};const i=e.data[0].b64_json;return n==="url"?`data:image/jpeg;base64,${i}`:fetch(`data:image/jpeg;base64,${i}`).then(o=>o.blob())}throw new x("Received malformed response from Together text-to-image API")}},nt="https://api.wavespeed.ai";async function Da(e,t){const a=ue(new Uint8Array(e instanceof ArrayBuffer?e:await e.arrayBuffer())),n=Array.isArray(t)&&t.every(i=>typeof i=="string")?t:[a];return{base:a,images:n}}var ft=class extends de{constructor(e){super("wavespeed",e||nt)}makeRoute(e){return`/api/v3/${e.model}`}preparePayload(e){var a;const t={...R(e.args,["inputs","parameters"]),...e.args.parameters?R(e.args.parameters,["images"]):void 0,prompt:e.args.inputs};return((a=e.mapping)==null?void 0:a.adapter)==="lora"&&(t.loras=[{path:e.mapping.hfModelId,scale:1}]),t}async getResponse(e,t,a){var l;if(!t||!a)throw new J("Headers are required for WaveSpeed AI API calls");const n=new URL(t),i=new URL(e.data.urls.get).pathname,r=`${`${n.protocol}//${n.host}${n.host==="router.huggingface.co"?"/wavespeed":""}`}${i}`;for(;;){const s=await fetch(r,{headers:a});if(!s.ok)throw new ee("Failed to fetch response status from WaveSpeed AI API",{url:r,method:"GET"},{requestId:s.headers.get("x-request-id")??"",status:s.status,body:await s.text()});const p=(await s.json()).data;switch(p.status){case"completed":{if(!((l=p.outputs)!=null&&l[0]))throw new x("Received malformed response from WaveSpeed AI API: No output URL in completed response");const u=await fetch(p.outputs[0]);if(!u.ok)throw new ee("Failed to fetch generation output from WaveSpeed AI API",{url:p.outputs[0],method:"GET"},{requestId:u.headers.get("x-request-id")??"",status:u.status,body:await u.text()});return await u.blob()}case"failed":throw new x(p.error||"Task failed");default:{await dt(500);continue}}}}},Qi=class extends ft{constructor(){super(nt)}},Ji=class extends ft{constructor(){super(nt)}},Yi=class extends ft{constructor(){super(nt)}async preparePayloadAsync(e){var i,o;const t=e.images??((i=e.parameters)==null?void 0:i.images),{base:a,images:n}=await Da(e.inputs,t);return{...e,inputs:(o=e.parameters)==null?void 0:o.prompt,image:a,images:n}}},Zi=class extends ft{constructor(){super(nt)}async preparePayloadAsync(e){var i,o;const t=e.images??((i=e.parameters)==null?void 0:i.images),{base:a,images:n}=await Da(e.inputs,t);return{...e,inputs:(o=e.parameters)==null?void 0:o.prompt,image:a,images:n}}},Gi="https://api.z.ai",eo=class extends ae{constructor(){super("zai-org",Gi)}prepareHeaders(e,t){const a=super.prepareHeaders(e,t);return a["x-source-channel"]="hugging_face",a["accept-language"]="en-US,en",a}makeRoute(){return"/api/paas/v4/chat/completions"}},bt={baseten:{conversational:new ei},"black-forest-labs":{"text-to-image":new ii},cerebras:{conversational:new oi},clarifai:{conversational:new ai},cohere:{conversational:new ri},"fal-ai":{"text-to-image":new si,"text-to-speech":new ui,"text-to-video":new ci,"image-to-image":new li,"automatic-speech-recognition":new pi,"image-segmentation":new mi,"image-to-video":new di},"featherless-ai":{conversational:new fi,"text-generation":new gi},"hf-inference":{"text-to-image":new xn,conversational:new kn,"text-generation":new An,"text-classification":new Dn,"question-answering":new Bn,"audio-classification":new Sn,"automatic-speech-recognition":new In,"fill-mask":new jn,"feature-extraction":new En,"image-classification":new Pn,"image-segmentation":new Rn,"document-question-answering":new Cn,"image-to-text":new Ln,"object-detection":new $n,"audio-to-audio":new Tn,"zero-shot-image-classification":new Mn,"zero-shot-classification":new Nn,"image-to-image":new Un,"sentence-similarity":new On,"table-question-answering":new qn,"tabular-classification":new zn,"text-to-speech":new Kn,"token-classification":new Fn,translation:new Hn,summarization:new Vn,"visual-question-answering":new Wn,"tabular-regression":new Xn,"text-to-audio":new Qn},"fireworks-ai":{conversational:new hi},groq:{conversational:new bi,"text-generation":new yi},hyperbolic:{"text-to-image":new _i,conversational:new vi,"text-generation":new wi},nebius:{"text-to-image":new Ai,conversational:new xi,"text-generation":new ki,"feature-extraction":new Si},novita:{conversational:new Ti,"text-generation":new Ii,"text-to-video":new Ci},nscale:{"text-to-image":new Pi,conversational:new Ei},openai:{conversational:new Li},ovhcloud:{conversational:new Ui,"text-generation":new $i},publicai:{conversational:new Mi},replicate:{"text-to-image":new Di,"text-to-speech":new Bi,"text-to-video":new ji,"image-to-image":new Oi,"automatic-speech-recognition":new Ni},sambanova:{conversational:new qi,"feature-extraction":new Fi},scaleway:{conversational:new Hi,"text-generation":new Vi,"feature-extraction":new Ki},together:{"text-to-image":new Xi,conversational:new zi,"text-generation":new Wi},wavespeed:{"text-to-image":new Qi,"text-to-video":new Ji,"image-to-image":new Yi,"image-to-video":new Zi},"zai-org":{conversational:new eo}};function L(e,t){if(e==="hf-inference"&&!t||e==="auto")return new D;if(!t)throw new J("you need to provide a task name when using an external provider, e.g. 'text-to-image'");if(!(e in bt))throw new J(`Provider '${e}' not supported. Available providers: ${Object.keys(bt)}`);const a=bt[e];if(!a||!(t in a))throw new J(`Task '${t}' not supported for provider '${e}'. Available tasks: ${Object.keys(a??{})}`);return a[t]}var to="4.13.4",ao="@huggingface/inference",vt=null;async function De(e,t,a){const{model:n}=e,i=t.provider,{task:o}=a??{};if(e.endpointUrl&&i!=="hf-inference")throw new J("Cannot use endpointUrl with a third-party provider.");if(n&&Pe(n))throw new J("Model URLs are no longer supported. Use endpointUrl instead.");if(e.endpointUrl)return xt(n??e.endpointUrl,t,e,void 0,a);if(!n&&!o)throw new J("No model provided, and no task has been specified.");const r=n??await no(o);if(t.clientSideRoutingOnly&&!n)throw new J(`Provider ${i} requires a model ID to be passed directly.`);const l=t.clientSideRoutingOnly?{provider:i,providerId:oo(n,i),hfModelId:n,status:"live",task:o}:await Zn({modelId:r,task:o,provider:i,accessToken:e.accessToken},{fetch:a==null?void 0:a.fetch});if(!l)throw new J(`We have not been able to find inference provider information for model ${r}.`);return xt(l.providerId,t,e,l,a)}function xt(e,t,a,n,i){const{accessToken:o,endpointUrl:r,provider:l,model:s,...d}=a,p=t.provider,{includeCredentials:u,task:y,signal:b,billTo:k}=i??{},C=(()=>{if(t.clientSideRoutingOnly&&o&&o.startsWith("hf_"))throw new J(`Provider ${p} is closed-source and does not support HF tokens.`);return o?o.startsWith("hf_")?"hf-token":"provider-key":u==="include"?"credentials-include":"none"})(),q=r??e,F=t.makeUrl({authMethod:C,model:q,task:y}),pe=t.prepareHeaders({accessToken:o,authMethod:C},"data"in a&&!!a.data);k&&(pe[vn]=k);const Z=[`${ao}/${to}`,typeof navigator<"u"?navigator.userAgent:void 0].filter(Y=>Y!==void 0).join(" ");pe["User-Agent"]=Z;const he=t.makeBody({args:d,model:e,task:y,mapping:n});let V;typeof u=="string"?V=u:u===!0&&(V="include");const we={headers:pe,method:"POST",body:he,...V?{credentials:V}:void 0,signal:b};return{url:F,info:we}}async function no(e){vt||(vt=await io());const t=vt[e];if(((t==null?void 0:t.models.length)??0)<=0)throw new J(`No default model defined for task ${e}, please define the model explicitly.`);return t.models[0].id}async function io(){const e=`${Et}/api/tasks`,t=await fetch(e);if(!t.ok)throw new Ye("Failed to load tasks definitions from Hugging Face Hub.",{url:e,method:"GET"},{requestId:t.headers.get("x-request-id")??"",status:t.status,body:await t.text()});return await t.json()}function oo(e,t){if(!e.startsWith(`${t}/`))throw new J(`Models from ${t} must be prefixed by "${t}/". Got "${e}".`);return e.slice(t.length+1)}function ro(e){let t,a,n,i=!1;return function(r){t===void 0?(t=r,a=0,n=-1):t=lo(t,r);const l=t.length;let s=0;for(;a<l;){i&&(t[a]===10&&(s=++a),i=!1);let d=-1;for(;a<l&&d===-1;++a)switch(t[a]){case 58:n===-1&&(n=a-s);break;case 13:i=!0;case 10:d=a;break}if(d===-1)break;e(t.subarray(s,d),n),s=a,n=-1}s===l?t=void 0:s!==0&&(t=t.subarray(s),a-=s)}}function so(e,t,a){let n=Xt();const i=new TextDecoder;return function(r,l){if(r.length===0)a==null||a(n),n=Xt();else if(l>0){const s=i.decode(r.subarray(0,l)),d=l+(r[l+1]===32?2:1),p=i.decode(r.subarray(d));switch(s){case"data":n.data=n.data?n.data+`
`+p:p;break;case"event":n.event=p;break;case"id":e(n.id=p);break;case"retry":{const u=parseInt(p,10);isNaN(u)||t(n.retry=u);break}}}}}function lo(e,t){const a=new Uint8Array(e.length+t.length);return a.set(e),a.set(t,e.length),a}function Xt(){return{data:"",event:"",id:"",retry:void 0}}function xe(e){let t=null;if(e instanceof Blob||e instanceof ArrayBuffer)t="[Blob or ArrayBuffer]";else if(typeof e=="string")try{t=JSON.parse(e)}catch{t=e}return t.accessToken&&(t.accessToken="[REDACTED]"),t}async function $(e,t,a){var s;const{url:n,info:i}=await De(e,t,a),o=await((a==null?void 0:a.fetch)??fetch)(n,i),r={url:n,info:i};if((a==null?void 0:a.retry_on_error)!==!1&&o.status===503)return $(e,t,a);if(!o.ok){const d=o.headers.get("Content-Type");if(["application/json","application/problem+json"].some(u=>d==null?void 0:d.startsWith(u))){const u=await o.json();throw[400,422,404,500].includes(o.status)&&(a!=null&&a.chatCompletion)?new ee(`Provider ${e.provider} does not seem to support chat completion for model ${e.model} . Error: ${JSON.stringify(u.error)}`,{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:u}):typeof u.error=="string"||typeof u.detail=="string"||typeof u.message=="string"?new ee(`Failed to perform inference: ${u.error??u.detail??u.message}`,{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:u}):new ee("Failed to perform inference: an HTTP error occurred when requesting the provider.",{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:u})}const p=d!=null&&d.startsWith("text/plain;")?await o.text():void 0;throw new ee(`Failed to perform inference: ${p??"an HTTP error occurred when requesting the provider"}`,{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:p??""})}return(s=o.headers.get("Content-Type"))!=null&&s.startsWith("application/json")?{data:await o.json(),requestContext:r}:{data:await o.blob(),requestContext:r}}async function*gt(e,t,a){var p,u;const{url:n,info:i}=await De({...e,stream:!0},t,a),o=await((a==null?void 0:a.fetch)??fetch)(n,i);if((a==null?void 0:a.retry_on_error)!==!1&&o.status===503)return yield*gt(e,t,a);if(!o.ok){if((p=o.headers.get("Content-Type"))!=null&&p.startsWith("application/json")){const y=await o.json();if([400,422,404,500].includes(o.status)&&(a!=null&&a.chatCompletion))throw new ee(`Provider ${e.provider} does not seem to support chat completion for model ${e.model} . Error: ${JSON.stringify(y.error)}`,{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:y});if(typeof y.error=="string")throw new ee(`Failed to perform inference: ${y.error}`,{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:y});if(y.error&&"message"in y.error&&typeof y.error.message=="string")throw new ee(`Failed to perform inference: ${y.error.message}`,{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:y});if(typeof y.message=="string")throw new ee(`Failed to perform inference: ${y.message}`,{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:y})}throw new ee("Failed to perform inference: an HTTP error occurred when requesting the provider.",{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:""})}if(!((u=o.headers.get("content-type"))!=null&&u.startsWith("text/event-stream")))throw new ee("Failed to perform inference: server does not support event stream content type, it returned "+o.headers.get("content-type"),{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:""});if(!o.body)return;const r=o.body.getReader();let l=[];const d=ro(so(()=>{},()=>{},y=>{l.push(y)}));try{for(;;){const{done:y,value:b}=await r.read();if(y)return;d(b);for(const k of l)if(k.data.length>0){if(k.data==="[DONE]")return;const C=JSON.parse(k.data);if(typeof C=="object"&&C!==null&&"error"in C){const q=typeof C.error=="string"?C.error:typeof C.error=="object"&&C.error&&"message"in C.error&&typeof C.error.message=="string"?C.error.message:JSON.stringify(C.error);throw new ee(`Failed to perform inference: an occurred while streaming the response: ${q}`,{url:n,method:i.method??"GET",headers:i.headers,body:xe(i.body)},{requestId:o.headers.get("x-request-id")??"",status:o.status,body:C})}yield C}l=[]}}finally{r.releaseLock()}}async function co(e,t){He().warn("The request method is deprecated and will be removed in a future version of huggingface.js. Use specific task functions instead.");const n=await U(e.provider,e.model,e.endpointUrl),i=L(n,t==null?void 0:t.task);return(await $(e,i,t)).data}async function*po(e,t){He().warn("The streamingRequest method is deprecated and will be removed in a future version of huggingface.js. Use specific task functions instead.");const n=await U(e.provider,e.model,e.endpointUrl),i=L(n,t==null?void 0:t.task);yield*gt(e,i,t)}function Ba(e){return"data"in e?e:{...R(e,"inputs"),data:e.inputs}}async function uo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"audio-classification"),i=Ba(e),{data:o}=await $(i,n,{...t,task:"audio-classification"});return n.getResponse(o)}async function mo(e,t){const a="inputs"in e?e.model:void 0,n=await U(e.provider,a),i=L(n,"audio-to-audio"),o=Ba(e),{data:r}=await $(o,i,{...t,task:"audio-to-audio"});return i.getResponse(r)}async function fo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"automatic-speech-recognition"),i=await n.preparePayloadAsync(e),{data:o}=await $(i,n,{...t,task:"automatic-speech-recognition"});return n.getResponse(o)}async function go(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"text-to-speech"),{data:i}=await $(e,n,{...t,task:"text-to-speech"});return n.getResponse(i)}function Mt(e){return"data"in e?e:{...R(e,"inputs"),data:e.inputs}}async function ho(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"image-classification"),i=Mt(e),{data:o}=await $(i,n,{...t,task:"image-classification"});return n.getResponse(o)}async function yo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"image-segmentation"),i=await n.preparePayloadAsync(e),{data:o}=await $(i,n,{...t,task:"image-segmentation"}),{url:r,info:l}=await De(e,n,{...t,task:"image-segmentation"});return n.getResponse(o,r,l.headers)}async function bo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"image-to-image"),i=await n.preparePayloadAsync(e),{data:o}=await $(i,n,{...t,task:"image-to-image"}),{url:r,info:l}=await De(e,n,{...t,task:"image-to-image"});return n.getResponse(o,r,l.headers)}async function vo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"image-to-text"),i=Mt(e),{data:o}=await $(i,n,{...t,task:"image-to-text"});return n.getResponse(o[0])}async function wo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"image-to-video"),i=await n.preparePayloadAsync(e),{data:o}=await $(i,n,{...t,task:"image-to-video"}),{url:r,info:l}=await De(e,n,{...t,task:"image-to-video"});return n.getResponse(o,r,l.headers)}async function _o(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"object-detection"),i=Mt(e),{data:o}=await $(i,n,{...t,task:"object-detection"});return n.getResponse(o)}async function xo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"text-to-image"),{data:i}=await $(e,n,{...t,task:"text-to-image"}),{url:o,info:r}=await De(e,n,{...t,task:"text-to-image"});return n.getResponse(i,o,r.headers,t==null?void 0:t.outputType)}async function ko(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"text-to-video"),{data:i}=await $(e,n,{...t,task:"text-to-video"}),{url:o,info:r}=await De(e,n,{...t,task:"text-to-video"});return n.getResponse(i,o,r.headers)}async function Ao(e){return e.inputs instanceof Blob?{...e,inputs:{image:ue(new Uint8Array(await e.inputs.arrayBuffer()))}}:{...e,inputs:{image:ue(new Uint8Array(e.inputs.image instanceof ArrayBuffer?e.inputs.image:await e.inputs.image.arrayBuffer()))}}}async function So(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"zero-shot-image-classification"),i=await Ao(e),{data:o}=await $(i,n,{...t,task:"zero-shot-image-classification"});return n.getResponse(o)}async function Io(e,t){let a;if(!e.provider||e.provider==="auto")a=new Ca;else{const i=await U(e.provider,e.model,e.endpointUrl);a=L(i,"conversational")}const{data:n}=await $(e,a,{...t,task:"conversational"});return a.getResponse(n)}async function*To(e,t){let a;if(!e.provider||e.provider==="auto")a=new Ca;else{const n=await U(e.provider,e.model,e.endpointUrl);a=L(n,"conversational")}yield*gt(e,a,{...t,task:"conversational"})}async function Co(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"feature-extraction"),{data:i}=await $(e,n,{...t,task:"feature-extraction"});return n.getResponse(i)}async function Eo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"fill-mask"),{data:i}=await $(e,n,{...t,task:"fill-mask"});return n.getResponse(i)}async function Po(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"question-answering"),{data:i}=await $(e,n,{...t,task:"question-answering"});return n.getResponse(i)}async function Ro(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"sentence-similarity"),{data:i}=await $(e,n,{...t,task:"sentence-similarity"});return n.getResponse(i)}async function Lo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"summarization"),{data:i}=await $(e,n,{...t,task:"summarization"});return n.getResponse(i)}async function Uo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"table-question-answering"),{data:i}=await $(e,n,{...t,task:"table-question-answering"});return n.getResponse(i)}async function $o(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"text-classification"),{data:i}=await $(e,n,{...t,task:"text-classification"});return n.getResponse(i)}async function Mo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"text-generation"),{data:i}=await $(e,n,{...t,task:"text-generation"});return n.getResponse(i)}async function*Do(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"text-generation");yield*gt(e,n,{...t,task:"text-generation"})}async function Bo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"token-classification"),{data:i}=await $(e,n,{...t,task:"token-classification"});return n.getResponse(i)}async function jo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"translation"),{data:i}=await $(e,n,{...t,task:"translation"});return n.getResponse(i)}async function No(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"zero-shot-classification"),{data:i}=await $(e,n,{...t,task:"zero-shot-classification"});return n.getResponse(i)}async function Oo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"document-question-answering"),i={...e,inputs:{question:e.inputs.question,image:ue(new Uint8Array(await e.inputs.image.arrayBuffer()))}},{data:o}=await $(i,n,{...t,task:"document-question-answering"});return n.getResponse(o)}async function qo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"visual-question-answering"),i={...e,inputs:{question:e.inputs.question,image:ue(new Uint8Array(await e.inputs.image.arrayBuffer()))}},{data:o}=await $(i,n,{...t,task:"visual-question-answering"});return n.getResponse(o)}async function Fo(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"tabular-classification"),{data:i}=await $(e,n,{...t,task:"tabular-classification"});return n.getResponse(i)}async function Ho(e,t){const a=await U(e.provider,e.model,e.endpointUrl),n=L(a,"tabular-regression"),{data:i}=await $(e,n,{...t,task:"tabular-regression"});return n.getResponse(i)}function Vo(e){return Object.entries(e)}var Ve=class ja{constructor(t="",a={}){w(this,"accessToken");w(this,"defaultOptions");this.accessToken=t,this.defaultOptions=a;for(const[n,i]of Vo(Sa))Object.defineProperty(this,n,{enumerable:!1,value:(o,r)=>i({endpointUrl:a.endpointUrl,accessToken:t,...o},{...R(a,["endpointUrl"]),...r})})}endpoint(t){return new ja(this.accessToken,{...this.defaultOptions,endpointUrl:t})}},Ko={};Aa(Ko,{getInferenceSnippets:()=>Gp});var m=Object.freeze({Text:"Text",NumericLiteral:"NumericLiteral",StringLiteral:"StringLiteral",Identifier:"Identifier",Equals:"Equals",OpenParen:"OpenParen",CloseParen:"CloseParen",OpenStatement:"OpenStatement",CloseStatement:"CloseStatement",OpenExpression:"OpenExpression",CloseExpression:"CloseExpression",OpenSquareBracket:"OpenSquareBracket",CloseSquareBracket:"CloseSquareBracket",OpenCurlyBracket:"OpenCurlyBracket",CloseCurlyBracket:"CloseCurlyBracket",Comma:"Comma",Dot:"Dot",Colon:"Colon",Pipe:"Pipe",CallOperator:"CallOperator",AdditiveBinaryOperator:"AdditiveBinaryOperator",MultiplicativeBinaryOperator:"MultiplicativeBinaryOperator",ComparisonBinaryOperator:"ComparisonBinaryOperator",UnaryOperator:"UnaryOperator",Comment:"Comment"}),be=class{constructor(e,t){this.value=e,this.type=t}};function Qt(e){return/\w/.test(e)}function Qe(e){return/[0-9]/.test(e)}function Jt(e){return/\s/.test(e)}var zo=[["{%",m.OpenStatement],["%}",m.CloseStatement],["{{",m.OpenExpression],["}}",m.CloseExpression],["(",m.OpenParen],[")",m.CloseParen],["{",m.OpenCurlyBracket],["}",m.CloseCurlyBracket],["[",m.OpenSquareBracket],["]",m.CloseSquareBracket],[",",m.Comma],[".",m.Dot],[":",m.Colon],["|",m.Pipe],["<=",m.ComparisonBinaryOperator],[">=",m.ComparisonBinaryOperator],["==",m.ComparisonBinaryOperator],["!=",m.ComparisonBinaryOperator],["<",m.ComparisonBinaryOperator],[">",m.ComparisonBinaryOperator],["+",m.AdditiveBinaryOperator],["-",m.AdditiveBinaryOperator],["~",m.AdditiveBinaryOperator],["*",m.MultiplicativeBinaryOperator],["/",m.MultiplicativeBinaryOperator],["%",m.MultiplicativeBinaryOperator],["=",m.Equals]],Wo=new Map([["n",`
`],["t","	"],["r","\r"],["b","\b"],["f","\f"],["v","\v"],["'","'"],['"','"'],["\\","\\"]]);function Xo(e,t={}){return e.endsWith(`
`)&&(e=e.slice(0,-1)),t.lstrip_blocks&&(e=e.replace(/^[ \t]*({[#%-])/gm,"$1")),t.trim_blocks&&(e=e.replace(/([#%-]})\n/g,"$1")),e.replace(/{%\s*(end)?generation\s*%}/gs,"")}function Qo(e,t={}){var d,p;const a=[],n=Xo(e,t);let i=0,o=0;const r=u=>{let y="";for(;u(n[i]);){if(n[i]==="\\"){if(++i,i>=n.length)throw new SyntaxError("Unexpected end of input");const b=n[i++],k=Wo.get(b);if(k===void 0)throw new SyntaxError(`Unexpected escaped character: ${b}`);y+=k;continue}if(y+=n[i++],i>=n.length)throw new SyntaxError("Unexpected end of input")}return y},l=()=>{const u=a.at(-1);u&&u.type===m.Text&&(u.value=u.value.trimEnd(),u.value===""&&a.pop())},s=()=>{for(;i<n.length&&Jt(n[i]);)++i};e:for(;i<n.length;){const u=(d=a.at(-1))==null?void 0:d.type;if(u===void 0||u===m.CloseStatement||u===m.CloseExpression||u===m.Comment){let b="";for(;i<n.length&&!(n[i]==="{"&&(n[i+1]==="%"||n[i+1]==="{"||n[i+1]==="#"));)b+=n[i++];if(b.length>0){a.push(new be(b,m.Text));continue}}if(n[i]==="{"&&n[i+1]==="#"){i+=2;const b=n[i]==="-";b&&++i;let k="";for(;n[i]!=="#"||n[i+1]!=="}";){if(i+2>=n.length)throw new SyntaxError("Missing end of comment tag");k+=n[i++]}const C=k.endsWith("-");C&&(k=k.slice(0,-1)),b&&l(),a.push(new be(k,m.Comment)),i+=2,C&&s();continue}if(n.slice(i,i+3)==="{%-"){l(),a.push(new be("{%",m.OpenStatement)),i+=3;continue}if(n.slice(i,i+3)==="{{-"){l(),a.push(new be("{{",m.OpenExpression)),o=0,i+=3;continue}if(r(Jt),n.slice(i,i+3)==="-%}"){a.push(new be("%}",m.CloseStatement)),i+=3,s();continue}if(n.slice(i,i+3)==="-}}"){a.push(new be("}}",m.CloseExpression)),i+=3,s();continue}const y=n[i];if(y==="-"||y==="+"){const b=(p=a.at(-1))==null?void 0:p.type;if(b===m.Text||b===void 0)throw new SyntaxError(`Unexpected character: ${y}`);switch(b){case m.Identifier:case m.NumericLiteral:case m.StringLiteral:case m.CloseParen:case m.CloseSquareBracket:break;default:{++i;const k=r(Qe);a.push(new be(`${y}${k}`,k.length>0?m.NumericLiteral:m.UnaryOperator));continue}}}for(const[b,k]of zo){if(b==="}}"&&o>0)continue;if(n.slice(i,i+b.length)===b){a.push(new be(b,k)),k===m.OpenExpression?o=0:k===m.OpenCurlyBracket?++o:k===m.CloseCurlyBracket&&--o,i+=b.length;continue e}}if(y==="'"||y==='"'){++i;const b=r(k=>k!==y);a.push(new be(b,m.StringLiteral)),++i;continue}if(Qe(y)){let b=r(Qe);if(n[i]==="."&&Qe(n[i+1])){++i;const k=r(Qe);b=`${b}.${k}`}a.push(new be(b,m.NumericLiteral));continue}if(Qt(y)){const b=r(Qt);a.push(new be(b,m.Identifier));continue}throw new SyntaxError(`Unexpected character: ${y}`)}return a}var Ae=class{constructor(){w(this,"type","Statement")}},Jo=class extends Ae{constructor(t){super();w(this,"type","Program");this.body=t}},Yo=class extends Ae{constructor(t,a,n){super();w(this,"type","If");this.test=t,this.body=a,this.alternate=n}},Zo=class extends Ae{constructor(t,a,n,i){super();w(this,"type","For");this.loopvar=t,this.iterable=a,this.body=n,this.defaultBlock=i}},Go=class extends Ae{constructor(){super(...arguments);w(this,"type","Break")}},er=class extends Ae{constructor(){super(...arguments);w(this,"type","Continue")}},tr=class extends Ae{constructor(t,a,n){super();w(this,"type","Set");this.assignee=t,this.value=a,this.body=n}},ar=class extends Ae{constructor(t,a,n){super();w(this,"type","Macro");this.name=t,this.args=a,this.body=n}},nr=class extends Ae{constructor(t){super();w(this,"type","Comment");this.value=t}},ge=class extends Ae{constructor(){super(...arguments);w(this,"type","Expression")}},ir=class extends ge{constructor(t,a,n){super();w(this,"type","MemberExpression");this.object=t,this.property=a,this.computed=n}},Yt=class extends ge{constructor(t,a){super();w(this,"type","CallExpression");this.callee=t,this.args=a}},Ne=class extends ge{constructor(t){super();w(this,"type","Identifier");this.value=t}},Ke=class extends ge{constructor(t){super();w(this,"type","Literal");this.value=t}},or=class extends Ke{constructor(){super(...arguments);w(this,"type","IntegerLiteral")}},rr=class extends Ke{constructor(){super(...arguments);w(this,"type","FloatLiteral")}},Zt=class extends Ke{constructor(){super(...arguments);w(this,"type","StringLiteral")}},sr=class extends Ke{constructor(){super(...arguments);w(this,"type","ArrayLiteral")}},Gt=class extends Ke{constructor(){super(...arguments);w(this,"type","TupleLiteral")}},lr=class extends Ke{constructor(){super(...arguments);w(this,"type","ObjectLiteral")}},Je=class extends ge{constructor(t,a,n){super();w(this,"type","BinaryExpression");this.operator=t,this.left=a,this.right=n}},cr=class extends ge{constructor(t,a){super();w(this,"type","FilterExpression");this.operand=t,this.filter=a}},dr=class extends Ae{constructor(t,a){super();w(this,"type","FilterStatement");this.filter=t,this.body=a}},pr=class extends ge{constructor(t,a){super();w(this,"type","SelectExpression");this.lhs=t,this.test=a}},ur=class extends ge{constructor(t,a,n){super();w(this,"type","TestExpression");this.operand=t,this.negate=a,this.test=n}},mr=class extends ge{constructor(t,a){super();w(this,"type","UnaryExpression");this.operator=t,this.argument=a}},fr=class extends ge{constructor(t=void 0,a=void 0,n=void 0){super();w(this,"type","SliceExpression");this.start=t,this.stop=a,this.step=n}},gr=class extends ge{constructor(t,a){super();w(this,"type","KeywordArgumentExpression");this.key=t,this.value=a}},hr=class extends ge{constructor(t){super();w(this,"type","SpreadExpression");this.argument=t}},yr=class extends Ae{constructor(t,a,n){super();w(this,"type","CallStatement");this.call=t,this.callerArgs=a,this.body=n}},br=class extends ge{constructor(t,a,n){super();w(this,"type","Ternary");this.condition=t,this.trueExpr=a,this.falseExpr=n}};function vr(e){const t=new Jo([]);let a=0;function n(f,g){const v=e[a++];if(!v||v.type!==f)throw new Error(`Parser Error: ${g}. ${v.type} !== ${f}.`);return v}function i(f){if(!s(f))throw new SyntaxError(`Expected ${f}`);++a}function o(){switch(e[a].type){case m.Comment:return new nr(e[a++].value);case m.Text:return d();case m.OpenStatement:return p();case m.OpenExpression:return u();default:throw new SyntaxError(`Unexpected token type: ${e[a].type}`)}}function r(...f){return a+f.length<=e.length&&f.every((g,v)=>g===e[a+v].type)}function l(...f){var g,v,X;return((g=e[a])==null?void 0:g.type)===m.OpenStatement&&((v=e[a+1])==null?void 0:v.type)===m.Identifier&&f.includes((X=e[a+1])==null?void 0:X.value)}function s(...f){return a+f.length<=e.length&&f.every((g,v)=>e[a+v].type==="Identifier"&&g===e[a+v].value)}function d(){return new Zt(n(m.Text,"Expected text token").value)}function p(){if(n(m.OpenStatement,"Expected opening statement token"),e[a].type!==m.Identifier)throw new SyntaxError(`Unknown statement, got ${e[a].type}`);const f=e[a].value;let g;switch(f){case"set":++a,g=y();break;case"if":++a,g=b(),n(m.OpenStatement,"Expected {% token"),i("endif"),n(m.CloseStatement,"Expected %} token");break;case"macro":++a,g=k(),n(m.OpenStatement,"Expected {% token"),i("endmacro"),n(m.CloseStatement,"Expected %} token");break;case"for":++a,g=q(),n(m.OpenStatement,"Expected {% token"),i("endfor"),n(m.CloseStatement,"Expected %} token");break;case"call":{++a;let v=null;r(m.OpenParen)&&(v=re());const X=j();if(X.type!=="Identifier")throw new SyntaxError("Expected identifier following call statement");const Ja=re();n(m.CloseStatement,"Expected closing statement token");const qt=[];for(;!l("endcall");)qt.push(o());n(m.OpenStatement,"Expected '{%'"),i("endcall"),n(m.CloseStatement,"Expected closing statement token");const Ya=new Yt(X,Ja);g=new yr(Ya,v,qt);break}case"break":++a,n(m.CloseStatement,"Expected closing statement token"),g=new Go;break;case"continue":++a,n(m.CloseStatement,"Expected closing statement token"),g=new er;break;case"filter":{++a;let v=j();v instanceof Ne&&r(m.OpenParen)&&(v=W(v)),n(m.CloseStatement,"Expected closing statement token");const X=[];for(;!l("endfilter");)X.push(o());n(m.OpenStatement,"Expected '{%'"),i("endfilter"),n(m.CloseStatement,"Expected '%}'"),g=new dr(v,X);break}default:throw new SyntaxError(`Unknown statement type: ${f}`)}return g}function u(){n(m.OpenExpression,"Expected opening expression token");const f=F();return n(m.CloseExpression,"Expected closing expression token"),f}function y(){const f=C();let g=null;const v=[];if(r(m.Equals))++a,g=C();else{for(n(m.CloseStatement,"Expected %} token");!l("endset");)v.push(o());n(m.OpenStatement,"Expected {% token"),i("endset")}return n(m.CloseStatement,"Expected closing statement token"),new tr(f,g,v)}function b(){const f=F();n(m.CloseStatement,"Expected closing statement token");const g=[],v=[];for(;!l("elif","else","endif");)g.push(o());if(l("elif")){++a,++a;const X=b();v.push(X)}else if(l("else"))for(++a,++a,n(m.CloseStatement,"Expected closing statement token");!l("endif");)v.push(o());return new Yo(f,g,v)}function k(){const f=j();if(f.type!=="Identifier")throw new SyntaxError("Expected identifier following macro statement");const g=re();n(m.CloseStatement,"Expected closing statement token");const v=[];for(;!l("endmacro");)v.push(o());return new ar(f,g,v)}function C(f=!1){const g=f?j:F,v=[g()],X=r(m.Comma);for(;X&&(++a,v.push(g()),!!r(m.Comma)););return X?new Gt(v):v[0]}function q(){const f=C(!0);if(!(f instanceof Ne||f instanceof Gt))throw new SyntaxError(`Expected identifier/tuple for the loop variable, got ${f.type} instead`);if(!s("in"))throw new SyntaxError("Expected `in` keyword following loop variable");++a;const g=F();n(m.CloseStatement,"Expected closing statement token");const v=[];for(;!l("endfor","else");)v.push(o());const X=[];if(l("else"))for(++a,++a,n(m.CloseStatement,"Expected closing statement token");!l("endfor");)X.push(o());return new Zo(f,g,v,X)}function F(){return pe()}function pe(){const f=ve();if(s("if")){++a;const g=ve();if(s("else")){++a;const v=pe();return new br(g,f,v)}else return new pr(f,g)}return f}function ve(){let f=Z();for(;s("or");){const g=e[a];++a;const v=Z();f=new Je(g,f,v)}return f}function Z(){let f=he();for(;s("and");){const g=e[a];++a;const v=he();f=new Je(g,f,v)}return f}function he(){let f;for(;s("not");){const g=e[a];++a;const v=he();f=new mr(g,v)}return f??V()}function V(){let f=we();for(;;){let g;if(s("not","in"))g=new be("not in",m.Identifier),a+=2;else if(s("in"))g=e[a++];else if(r(m.ComparisonBinaryOperator))g=e[a++];else break;const v=we();f=new Je(g,f,v)}return f}function we(){let f=B();for(;r(m.AdditiveBinaryOperator);){const g=e[a];++a;const v=B();f=new Je(g,f,v)}return f}function Y(){const f=ye(j());return r(m.OpenParen)?W(f):f}function W(f){let g=new Yt(f,re());return g=ye(g),r(m.OpenParen)&&(g=W(g)),g}function re(){n(m.OpenParen,"Expected opening parenthesis for arguments list");const f=G();return n(m.CloseParen,"Expected closing parenthesis for arguments list"),f}function G(){const f=[];for(;!r(m.CloseParen);){let g;if(e[a].type===m.MultiplicativeBinaryOperator&&e[a].value==="*"){++a;const v=F();g=new hr(v)}else if(g=F(),r(m.Equals)){if(++a,!(g instanceof Ne))throw new SyntaxError("Expected identifier for keyword argument");const v=F();g=new gr(g,v)}f.push(g),r(m.Comma)&&++a}return f}function se(){const f=[];let g=!1;for(;!r(m.CloseSquareBracket);)r(m.Colon)?(f.push(void 0),++a,g=!0):(f.push(F()),r(m.Colon)&&(++a,g=!0));if(f.length===0)throw new SyntaxError("Expected at least one argument for member/slice expression");if(g){if(f.length>3)throw new SyntaxError("Expected 0-3 arguments for slice expression");return new fr(...f)}return f[0]}function ye(f){for(;r(m.Dot)||r(m.OpenSquareBracket);){const g=e[a];++a;let v;const X=g.type===m.OpenSquareBracket;if(X)v=se(),n(m.CloseSquareBracket,"Expected closing square bracket");else if(v=j(),v.type!=="Identifier")throw new SyntaxError("Expected identifier following dot operator");f=new ir(f,v,X)}return f}function B(){let f=ne();for(;r(m.MultiplicativeBinaryOperator);){const g=e[a++],v=ne();f=new Je(g,f,v)}return f}function ne(){let f=me();for(;s("is");){++a;const g=s("not");g&&++a;const v=j();if(!(v instanceof Ne))throw new SyntaxError("Expected identifier for the test");f=new ur(f,g,v)}return f}function me(){let f=Y();for(;r(m.Pipe);){++a;let g=j();if(!(g instanceof Ne))throw new SyntaxError("Expected identifier for the filter");r(m.OpenParen)&&(g=W(g)),f=new cr(f,g)}return f}function j(){const f=e[a++];switch(f.type){case m.NumericLiteral:{const g=f.value;return g.includes(".")?new rr(Number(g)):new or(Number(g))}case m.StringLiteral:{let g=f.value;for(;r(m.StringLiteral);)g+=e[a++].value;return new Zt(g)}case m.Identifier:return new Ne(f.value);case m.OpenParen:{const g=C();return n(m.CloseParen,"Expected closing parenthesis, got ${tokens[current].type} instead."),g}case m.OpenSquareBracket:{const g=[];for(;!r(m.CloseSquareBracket);)g.push(F()),r(m.Comma)&&++a;return++a,new sr(g)}case m.OpenCurlyBracket:{const g=new Map;for(;!r(m.CloseCurlyBracket);){const v=F();n(m.Colon,"Expected colon between key and value in object literal");const X=F();g.set(v,X),r(m.Comma)&&++a}return++a,new lr(g)}default:throw new SyntaxError(`Unexpected token: ${f.type}`)}}for(;a<e.length;)t.body.push(o());return t}function wr(e,t,a=1){t===void 0&&(t=e,e=0);const n=[];for(let i=e;i<t;i+=a)n.push(i);return n}function ea(e,t,a,n=1){const i=Math.sign(n);i>=0?(t=(t??(t=0))<0?Math.max(e.length+t,0):Math.min(t,e.length),a=(a??(a=e.length))<0?Math.max(e.length+a,0):Math.min(a,e.length)):(t=(t??(t=e.length-1))<0?Math.max(e.length+t,-1):Math.min(t,e.length-1),a=(a??(a=-1))<-1?Math.max(e.length+a,-1):Math.min(a,e.length-1));const o=[];for(let r=t;i*r<i*a;r+=n)o.push(e[r]);return o}function _r(e){return e.replace(/\b\w/g,t=>t.toUpperCase())}function xr(e){return kr(new Date,e)}function kr(e,t){const a=new Intl.DateTimeFormat(void 0,{month:"long"}),n=new Intl.DateTimeFormat(void 0,{month:"short"}),i=o=>o<10?"0"+o:o.toString();return t.replace(/%[YmdbBHM%]/g,o=>{switch(o){case"%Y":return e.getFullYear().toString();case"%m":return i(e.getMonth()+1);case"%d":return i(e.getDate());case"%b":return n.format(e);case"%B":return a.format(e);case"%H":return i(e.getHours());case"%M":return i(e.getMinutes());case"%%":return"%";default:return o}})}function Ar(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Sr(e,t,a,n){if(n===0)return e;let i=n==null||n<0?1/0:n;const o=t.length===0?new RegExp("(?=)","gu"):new RegExp(Ar(t),"gu");return e.replaceAll(o,r=>i>0?(--i,a):r)}var ta=class extends Error{},aa=class extends Error{},Ie=class{constructor(e=void 0){w(this,"type","RuntimeValue");w(this,"value");w(this,"builtins",new Map);this.value=e}__bool__(){return new I(!!this.value)}toString(){return String(this.value)}},T=class extends Ie{constructor(){super(...arguments);w(this,"type","IntegerValue")}},K=class extends Ie{constructor(){super(...arguments);w(this,"type","FloatValue")}toString(){return this.value%1===0?this.value.toFixed(1):this.value.toString()}},_=class extends Ie{constructor(){super(...arguments);w(this,"type","StringValue");w(this,"builtins",new Map([["upper",new O(()=>new _(this.value.toUpperCase()))],["lower",new O(()=>new _(this.value.toLowerCase()))],["strip",new O(()=>new _(this.value.trim()))],["title",new O(()=>new _(_r(this.value)))],["capitalize",new O(()=>new _(this.value.charAt(0).toUpperCase()+this.value.slice(1)))],["length",new T(this.value.length)],["rstrip",new O(()=>new _(this.value.trimEnd()))],["lstrip",new O(()=>new _(this.value.trimStart()))],["startswith",new O(t=>{if(t.length===0)throw new Error("startswith() requires at least one argument");const a=t[0];if(a instanceof _)return new I(this.value.startsWith(a.value));if(a instanceof P){for(const n of a.value){if(!(n instanceof _))throw new Error("startswith() tuple elements must be strings");if(this.value.startsWith(n.value))return new I(!0)}return new I(!1)}throw new Error("startswith() argument must be a string or tuple of strings")})],["endswith",new O(t=>{if(t.length===0)throw new Error("endswith() requires at least one argument");const a=t[0];if(a instanceof _)return new I(this.value.endsWith(a.value));if(a instanceof P){for(const n of a.value){if(!(n instanceof _))throw new Error("endswith() tuple elements must be strings");if(this.value.endsWith(n.value))return new I(!0)}return new I(!1)}throw new Error("endswith() argument must be a string or tuple of strings")})],["split",new O(t=>{const a=t[0]??new z;if(!(a instanceof _||a instanceof z))throw new Error("sep argument must be a string or null");const n=t[1]??new T(-1);if(!(n instanceof T))throw new Error("maxsplit argument must be a number");let i=[];if(a instanceof z){const o=this.value.trimStart();for(const{0:r,index:l}of o.matchAll(/\S+/g)){if(n.value!==-1&&i.length>=n.value&&l!==void 0){i.push(r+o.slice(l+r.length));break}i.push(r)}}else{if(a.value==="")throw new Error("empty separator");i=this.value.split(a.value),n.value!==-1&&i.length>n.value&&i.push(i.splice(n.value).join(a.value))}return new P(i.map(o=>new _(o)))})],["replace",new O(t=>{if(t.length<2)throw new Error("replace() requires at least two arguments");const a=t[0],n=t[1];if(!(a instanceof _&&n instanceof _))throw new Error("replace() arguments must be strings");let i;if(t.length>2?t[2].type==="KeywordArgumentsValue"?i=t[2].value.get("count")??new z:i=t[2]:i=new z,!(i instanceof T||i instanceof z))throw new Error("replace() count argument must be a number or null");return new _(Sr(this.value,a.value,n.value,i.value))})]]))}},I=class extends Ie{constructor(){super(...arguments);w(this,"type","BooleanValue")}};function Ue(e,t,a,n=!0){const i=a??0;switch(e.type){case"NullValue":return"null";case"UndefinedValue":return n?"null":"undefined";case"IntegerValue":case"FloatValue":case"StringValue":case"BooleanValue":return JSON.stringify(e.value);case"ArrayValue":case"ObjectValue":{const o=t?" ".repeat(t):"",r=`
`+o.repeat(i),l=r+o;if(e.type==="ArrayValue"){const s=e.value.map(d=>Ue(d,t,i+1,n));return t?`[${l}${s.join(`,${l}`)}${r}]`:`[${s.join(", ")}]`}else{const s=Array.from(e.value.entries()).map(([d,p])=>{const u=`"${d}": ${Ue(p,t,i+1,n)}`;return t?`${l}${u}`:u});return t?`{${s.join(",")}${r}}`:`{${s.join(", ")}}`}}default:throw new Error(`Cannot convert to JSON: ${e.type}`)}}var oe=class extends Ie{constructor(){super(...arguments);w(this,"type","ObjectValue");w(this,"builtins",new Map([["get",new O(([t,a])=>{if(!(t instanceof _))throw new Error(`Object key must be a string: got ${t.type}`);return this.value.get(t.value)??a??new z})],["items",new O(()=>this.items())],["keys",new O(()=>this.keys())],["values",new O(()=>this.values())],["dictsort",new O(t=>{let a=new Map;const n=t.filter(s=>s instanceof Ze?(a=s.value,!1):!0),i=n.at(0)??a.get("case_sensitive")??new I(!1);if(!(i instanceof I))throw new Error("case_sensitive must be a boolean");const o=n.at(1)??a.get("by")??new _("key");if(!(o instanceof _))throw new Error("by must be a string");if(!["key","value"].includes(o.value))throw new Error("by must be either 'key' or 'value'");const r=n.at(2)??a.get("reverse")??new I(!1);if(!(r instanceof I))throw new Error("reverse must be a boolean");const l=Array.from(this.value.entries()).map(([s,d])=>new P([new _(s),d])).sort((s,d)=>{const p=o.value==="key"?0:1,u=s.value[p],y=d.value[p],b=kt(u,y,i.value);return r.value?-b:b});return new P(l)})]]))}__bool__(){return new I(this.value.size>0)}items(){return new P(Array.from(this.value.entries()).map(([t,a])=>new P([new _(t),a])))}keys(){return new P(Array.from(this.value.keys()).map(t=>new _(t)))}values(){return new P(Array.from(this.value.values()))}toString(){return Ue(this,null,0,!1)}},Ze=class extends oe{constructor(){super(...arguments);w(this,"type","KeywordArgumentsValue")}},P=class extends Ie{constructor(){super(...arguments);w(this,"type","ArrayValue");w(this,"builtins",new Map([["length",new T(this.value.length)]]))}__bool__(){return new I(this.value.length>0)}toString(){return Ue(this,null,0,!1)}},Ir=class extends P{constructor(){super(...arguments);w(this,"type","TupleValue")}},O=class extends Ie{constructor(){super(...arguments);w(this,"type","FunctionValue")}},z=class extends Ie{constructor(){super(...arguments);w(this,"type","NullValue")}},N=class extends Ie{constructor(){super(...arguments);w(this,"type","UndefinedValue")}},Le=class{constructor(e){w(this,"variables",new Map([["namespace",new O(e=>{if(e.length===0)return new oe(new Map);if(e.length!==1||!(e[0]instanceof oe))throw new Error("`namespace` expects either zero arguments or a single object argument");return e[0]})]]));w(this,"tests",new Map([["boolean",e=>e.type==="BooleanValue"],["callable",e=>e instanceof O],["odd",e=>{if(!(e instanceof T))throw new Error(`cannot odd on ${e.type}`);return e.value%2!==0}],["even",e=>{if(!(e instanceof T))throw new Error(`cannot even on ${e.type}`);return e.value%2===0}],["false",e=>e.type==="BooleanValue"&&!e.value],["true",e=>e.type==="BooleanValue"&&e.value],["none",e=>e.type==="NullValue"],["string",e=>e.type==="StringValue"],["number",e=>e instanceof T||e instanceof K],["integer",e=>e instanceof T],["iterable",e=>e.type==="ArrayValue"||e.type==="StringValue"],["mapping",e=>e.type==="ObjectValue"],["lower",e=>{const t=e.value;return e.type==="StringValue"&&t===t.toLowerCase()}],["upper",e=>{const t=e.value;return e.type==="StringValue"&&t===t.toUpperCase()}],["none",e=>e.type==="NullValue"],["defined",e=>e.type!=="UndefinedValue"],["undefined",e=>e.type==="UndefinedValue"],["equalto",(e,t)=>e.value===t.value],["eq",(e,t)=>e.value===t.value]]));this.parent=e}set(e,t){return this.declareVariable(e,rt(t))}declareVariable(e,t){if(this.variables.has(e))throw new SyntaxError(`Variable already declared: ${e}`);return this.variables.set(e,t),t}setVariable(e,t){return this.variables.set(e,t),t}resolve(e){if(this.variables.has(e))return this;if(this.parent)return this.parent.resolve(e);throw new Error(`Unknown variable: ${e}`)}lookupVariable(e){try{return this.resolve(e).variables.get(e)??new N}catch{return new N}}};function Tr(e){e.set("false",!1),e.set("true",!0),e.set("none",null),e.set("raise_exception",t=>{throw new Error(t)}),e.set("range",wr),e.set("strftime_now",xr),e.set("True",!0),e.set("False",!1),e.set("None",null)}function na(e,t){const a=t.split(".");let n=e;for(const i of a)if(n instanceof oe)n=n.value.get(i)??new N;else if(n instanceof P){const o=parseInt(i,10);if(!isNaN(o)&&o>=0&&o<n.value.length)n=n.value[o];else return new N}else return new N;return n}function kt(e,t,a=!1){if(e instanceof z&&t instanceof z)return 0;if(e instanceof z||t instanceof z)throw new Error(`Cannot compare ${e.type} with ${t.type}`);if(e instanceof N&&t instanceof N)return 0;if(e instanceof N||t instanceof N)throw new Error(`Cannot compare ${e.type} with ${t.type}`);const n=o=>o instanceof T||o instanceof K||o instanceof I,i=o=>o instanceof I?o.value?1:0:o.value;if(n(e)&&n(t)){const o=i(e),r=i(t);return o<r?-1:o>r?1:0}if(e.type!==t.type)throw new Error(`Cannot compare different types: ${e.type} and ${t.type}`);switch(e.type){case"StringValue":{let o=e.value,r=t.value;return a||(o=o.toLowerCase(),r=r.toLowerCase()),o<r?-1:o>r?1:0}default:throw new Error(`Cannot compare type: ${e.type}`)}}var Cr=class{constructor(e){w(this,"global");this.global=e??new Le}run(e){return this.evaluate(e,this.global)}evaluateBinaryExpression(e,t){const a=this.evaluate(e.left,t);switch(e.operator.value){case"and":return a.__bool__().value?this.evaluate(e.right,t):a;case"or":return a.__bool__().value?a:this.evaluate(e.right,t)}const n=this.evaluate(e.right,t);switch(e.operator.value){case"==":return new I(a.value==n.value);case"!=":return new I(a.value!=n.value)}if(a instanceof N||n instanceof N){if(n instanceof N&&["in","not in"].includes(e.operator.value))return new I(e.operator.value==="not in");throw new Error(`Cannot perform operation ${e.operator.value} on undefined values`)}else{if(a instanceof z||n instanceof z)throw new Error("Cannot perform operation on null values");if(e.operator.value==="~")return new _(a.value.toString()+n.value.toString());if((a instanceof T||a instanceof K)&&(n instanceof T||n instanceof K)){const i=a.value,o=n.value;switch(e.operator.value){case"+":case"-":case"*":{const r=e.operator.value==="+"?i+o:e.operator.value==="-"?i-o:i*o;return a instanceof K||n instanceof K?new K(r):new T(r)}case"/":return new K(i/o);case"%":{const r=i%o;return a instanceof K||n instanceof K?new K(r):new T(r)}case"<":return new I(i<o);case">":return new I(i>o);case">=":return new I(i>=o);case"<=":return new I(i<=o)}}else if(a instanceof P&&n instanceof P)switch(e.operator.value){case"+":return new P(a.value.concat(n.value))}else if(n instanceof P){const i=n.value.find(o=>o.value===a.value)!==void 0;switch(e.operator.value){case"in":return new I(i);case"not in":return new I(!i)}}}if(a instanceof _||n instanceof _)switch(e.operator.value){case"+":return new _(a.value.toString()+n.value.toString())}if(a instanceof _&&n instanceof _)switch(e.operator.value){case"in":return new I(n.value.includes(a.value));case"not in":return new I(!n.value.includes(a.value))}if(a instanceof _&&n instanceof oe)switch(e.operator.value){case"in":return new I(n.value.has(a.value));case"not in":return new I(!n.value.has(a.value))}throw new SyntaxError(`Unknown operator "${e.operator.value}" between ${a.type} and ${n.type}`)}evaluateArguments(e,t){const a=[],n=new Map;for(const i of e)if(i.type==="SpreadExpression"){const o=i,r=this.evaluate(o.argument,t);if(!(r instanceof P))throw new Error(`Cannot unpack non-iterable type: ${r.type}`);for(const l of r.value)a.push(l)}else if(i.type==="KeywordArgumentExpression"){const o=i;n.set(o.key.value,this.evaluate(o.value,t))}else{if(n.size>0)throw new Error("Positional arguments must come before keyword arguments");a.push(this.evaluate(i,t))}return[a,n]}applyFilter(e,t,a){if(t.type==="Identifier"){const n=t;if(n.value==="tojson")return new _(Ue(e));if(e instanceof P)switch(n.value){case"list":return e;case"first":return e.value[0];case"last":return e.value[e.value.length-1];case"length":return new T(e.value.length);case"reverse":return new P(e.value.slice().reverse());case"sort":return new P(e.value.slice().sort((i,o)=>kt(i,o,!1)));case"join":return new _(e.value.map(i=>i.value).join(""));case"string":return new _(Ue(e,null,0,!1));case"unique":{const i=new Set,o=[];for(const r of e.value)i.has(r.value)||(i.add(r.value),o.push(r));return new P(o)}default:throw new Error(`Unknown ArrayValue filter: ${n.value}`)}else if(e instanceof _)switch(n.value){case"length":case"upper":case"lower":case"title":case"capitalize":{const i=e.builtins.get(n.value);if(i instanceof O)return i.value([],a);if(i instanceof T)return i;throw new Error(`Unknown StringValue filter: ${n.value}`)}case"trim":return new _(e.value.trim());case"indent":return new _(e.value.split(`
`).map((i,o)=>o===0||i.length===0?i:"    "+i).join(`
`));case"join":case"string":return e;case"int":{const i=parseInt(e.value,10);return new T(isNaN(i)?0:i)}case"float":{const i=parseFloat(e.value);return new K(isNaN(i)?0:i)}default:throw new Error(`Unknown StringValue filter: ${n.value}`)}else if(e instanceof T||e instanceof K)switch(n.value){case"abs":return e instanceof T?new T(Math.abs(e.value)):new K(Math.abs(e.value));case"int":return new T(Math.floor(e.value));case"float":return new K(e.value);default:throw new Error(`Unknown NumericValue filter: ${n.value}`)}else if(e instanceof oe)switch(n.value){case"items":return new P(Array.from(e.value.entries()).map(([i,o])=>new P([new _(i),o])));case"length":return new T(e.value.size);default:{const i=e.builtins.get(n.value);if(i)return i instanceof O?i.value([],a):i;throw new Error(`Unknown ObjectValue filter: ${n.value}`)}}else if(e instanceof I)switch(n.value){case"bool":return new I(e.value);case"int":return new T(e.value?1:0);case"float":return new K(e.value?1:0);case"string":return new _(e.value?"true":"false");default:throw new Error(`Unknown BooleanValue filter: ${n.value}`)}throw new Error(`Cannot apply filter "${n.value}" to type: ${e.type}`)}else if(t.type==="CallExpression"){const n=t;if(n.callee.type!=="Identifier")throw new Error(`Unknown filter: ${n.callee.type}`);const i=n.callee.value;if(i==="tojson"){const[,o]=this.evaluateArguments(n.args,a),r=o.get("indent")??new z;if(!(r instanceof T||r instanceof z))throw new Error("If set, indent must be a number");return new _(Ue(e,r.value))}else if(i==="join"){let o;if(e instanceof _)o=Array.from(e.value);else if(e instanceof P)o=e.value.map(d=>d.value);else throw new Error(`Cannot apply filter "${i}" to type: ${e.type}`);const[r,l]=this.evaluateArguments(n.args,a),s=r.at(0)??l.get("separator")??new _("");if(!(s instanceof _))throw new Error("separator must be a string");return new _(o.join(s.value))}else if(i==="int"||i==="float"){const[o,r]=this.evaluateArguments(n.args,a),l=o.at(0)??r.get("default")??(i==="int"?new T(0):new K(0));if(e instanceof _){const s=i==="int"?parseInt(e.value,10):parseFloat(e.value);return isNaN(s)?l:i==="int"?new T(s):new K(s)}else{if(e instanceof T||e instanceof K)return e;if(e instanceof I)return i==="int"?new T(e.value?1:0):new K(e.value?1:0);throw new Error(`Cannot apply filter "${i}" to type: ${e.type}`)}}else if(i==="default"){const[o,r]=this.evaluateArguments(n.args,a),l=o[0]??new _(""),s=o[1]??r.get("boolean")??new I(!1);if(!(s instanceof I))throw new Error("`default` filter flag must be a boolean");return e instanceof N||s.value&&!e.__bool__().value?l:e}if(e instanceof P){switch(i){case"sort":{const[o,r]=this.evaluateArguments(n.args,a),l=o.at(0)??r.get("reverse")??new I(!1);if(!(l instanceof I))throw new Error("reverse must be a boolean");const s=o.at(1)??r.get("case_sensitive")??new I(!1);if(!(s instanceof I))throw new Error("case_sensitive must be a boolean");const d=o.at(2)??r.get("attribute")??new z;if(!(d instanceof _||d instanceof T||d instanceof z))throw new Error("attribute must be a string, integer, or null");const p=u=>{if(d instanceof z)return u;const y=d instanceof T?String(d.value):d.value;return na(u,y)};return new P(e.value.slice().sort((u,y)=>{const b=p(u),k=p(y),C=kt(b,k,s.value);return l.value?-C:C}))}case"selectattr":case"rejectattr":{const o=i==="selectattr";if(e.value.some(u=>!(u instanceof oe)))throw new Error(`\`${i}\` can only be applied to array of objects`);if(n.args.some(u=>u.type!=="StringLiteral"))throw new Error(`arguments of \`${i}\` must be strings`);const[r,l,s]=n.args.map(u=>this.evaluate(u,a));let d;if(l){const u=a.tests.get(l.value);if(!u)throw new Error(`Unknown test: ${l.value}`);d=u}else d=(...u)=>u[0].__bool__().value;const p=e.value.filter(u=>{const y=u.value.get(r.value),b=y?d(y,s):!1;return o?b:!b});return new P(p)}case"map":{const[,o]=this.evaluateArguments(n.args,a);if(o.has("attribute")){const r=o.get("attribute");if(!(r instanceof _))throw new Error("attribute must be a string");const l=o.get("default"),s=e.value.map(d=>{if(!(d instanceof oe))throw new Error("items in map must be an object");const p=na(d,r.value);return p instanceof N?l??new N:p});return new P(s)}else throw new Error("`map` expressions without `attribute` set are not currently supported.")}}throw new Error(`Unknown ArrayValue filter: ${i}`)}else if(e instanceof _){switch(i){case"indent":{const[o,r]=this.evaluateArguments(n.args,a),l=o.at(0)??r.get("width")??new T(4);if(!(l instanceof T))throw new Error("width must be a number");const s=o.at(1)??r.get("first")??new I(!1),d=o.at(2)??r.get("blank")??new I(!1),p=e.value.split(`
`),u=" ".repeat(l.value),y=p.map((b,k)=>!s.value&&k===0||!d.value&&b.length===0?b:u+b);return new _(y.join(`
`))}case"replace":{const o=e.builtins.get("replace");if(!(o instanceof O))throw new Error("replace filter not available");const[r,l]=this.evaluateArguments(n.args,a);return o.value([...r,new Ze(l)],a)}}throw new Error(`Unknown StringValue filter: ${i}`)}else if(e instanceof oe){const o=e.builtins.get(i);if(o&&o instanceof O){const[r,l]=this.evaluateArguments(n.args,a);return l.size>0&&r.push(new Ze(l)),o.value(r,a)}throw new Error(`Unknown ObjectValue filter: ${i}`)}else throw new Error(`Cannot apply filter "${i}" to type: ${e.type}`)}throw new Error(`Unknown filter: ${t.type}`)}evaluateFilterExpression(e,t){const a=this.evaluate(e.operand,t);return this.applyFilter(a,e.filter,t)}evaluateTestExpression(e,t){const a=this.evaluate(e.operand,t),n=t.tests.get(e.test.value);if(!n)throw new Error(`Unknown test: ${e.test.value}`);const i=n(a);return new I(e.negate?!i:i)}evaluateSelectExpression(e,t){return this.evaluate(e.test,t).__bool__().value?this.evaluate(e.lhs,t):new N}evaluateUnaryExpression(e,t){const a=this.evaluate(e.argument,t);switch(e.operator.value){case"not":return new I(!a.value);default:throw new SyntaxError(`Unknown operator: ${e.operator.value}`)}}evaluateTernaryExpression(e,t){return this.evaluate(e.condition,t).__bool__().value?this.evaluate(e.trueExpr,t):this.evaluate(e.falseExpr,t)}evalProgram(e,t){return this.evaluateBlock(e.body,t)}evaluateBlock(e,t){let a="";for(const n of e){const i=this.evaluate(n,t);i.type!=="NullValue"&&i.type!=="UndefinedValue"&&(a+=i.toString())}return new _(a)}evaluateIdentifier(e,t){return t.lookupVariable(e.value)}evaluateCallExpression(e,t){const[a,n]=this.evaluateArguments(e.args,t);n.size>0&&a.push(new Ze(n));const i=this.evaluate(e.callee,t);if(i.type!=="FunctionValue")throw new Error(`Cannot call something that is not a function: got ${i.type}`);return i.value(a,t)}evaluateSliceExpression(e,t,a){if(!(e instanceof P||e instanceof _))throw new Error("Slice object must be an array or string");const n=this.evaluate(t.start,a),i=this.evaluate(t.stop,a),o=this.evaluate(t.step,a);if(!(n instanceof T||n instanceof N))throw new Error("Slice start must be numeric or undefined");if(!(i instanceof T||i instanceof N))throw new Error("Slice stop must be numeric or undefined");if(!(o instanceof T||o instanceof N))throw new Error("Slice step must be numeric or undefined");return e instanceof P?new P(ea(e.value,n.value,i.value,o.value)):new _(ea(Array.from(e.value),n.value,i.value,o.value).join(""))}evaluateMemberExpression(e,t){const a=this.evaluate(e.object,t);let n;if(e.computed){if(e.property.type==="SliceExpression")return this.evaluateSliceExpression(a,e.property,t);n=this.evaluate(e.property,t)}else n=new _(e.property.value);let i;if(a instanceof oe){if(!(n instanceof _))throw new Error(`Cannot access property with non-string: got ${n.type}`);i=a.value.get(n.value)??a.builtins.get(n.value)}else if(a instanceof P||a instanceof _)if(n instanceof T)i=a.value.at(n.value),a instanceof _&&(i=new _(a.value.at(n.value)));else if(n instanceof _)i=a.builtins.get(n.value);else throw new Error(`Cannot access property with non-string/non-number: got ${n.type}`);else{if(!(n instanceof _))throw new Error(`Cannot access property with non-string: got ${n.type}`);i=a.builtins.get(n.value)}return i instanceof Ie?i:new N}evaluateSet(e,t){const a=e.value?this.evaluate(e.value,t):this.evaluateBlock(e.body,t);if(e.assignee.type==="Identifier"){const n=e.assignee.value;t.setVariable(n,a)}else if(e.assignee.type==="TupleLiteral"){const n=e.assignee;if(!(a instanceof P))throw new Error(`Cannot unpack non-iterable type in set: ${a.type}`);const i=a.value;if(i.length!==n.value.length)throw new Error(`Too ${n.value.length>i.length?"few":"many"} items to unpack in set`);for(let o=0;o<n.value.length;++o){const r=n.value[o];if(r.type!=="Identifier")throw new Error(`Cannot unpack to non-identifier in set: ${r.type}`);t.setVariable(r.value,i[o])}}else if(e.assignee.type==="MemberExpression"){const n=e.assignee,i=this.evaluate(n.object,t);if(!(i instanceof oe))throw new Error("Cannot assign to member of non-object");if(n.property.type!=="Identifier")throw new Error("Cannot assign to member with non-identifier property");i.value.set(n.property.value,a)}else throw new Error(`Invalid LHS inside assignment expression: ${JSON.stringify(e.assignee)}`);return new z}evaluateIf(e,t){const a=this.evaluate(e.test,t);return this.evaluateBlock(a.__bool__().value?e.body:e.alternate,t)}evaluateFor(e,t){const a=new Le(t);let n,i;if(e.iterable.type==="SelectExpression"){const d=e.iterable;i=this.evaluate(d.lhs,a),n=d.test}else i=this.evaluate(e.iterable,a);if(!(i instanceof P||i instanceof oe))throw new Error(`Expected iterable or object type in for loop: got ${i.type}`);i instanceof oe&&(i=i.keys());const o=[],r=[];for(let d=0;d<i.value.length;++d){const p=new Le(a),u=i.value[d];let y;if(e.loopvar.type==="Identifier")y=b=>b.setVariable(e.loopvar.value,u);else if(e.loopvar.type==="TupleLiteral"){const b=e.loopvar;if(u.type!=="ArrayValue")throw new Error(`Cannot unpack non-iterable type: ${u.type}`);const k=u;if(b.value.length!==k.value.length)throw new Error(`Too ${b.value.length>k.value.length?"few":"many"} items to unpack`);y=C=>{for(let q=0;q<b.value.length;++q){if(b.value[q].type!=="Identifier")throw new Error(`Cannot unpack non-identifier type: ${b.value[q].type}`);C.setVariable(b.value[q].value,k.value[q])}}}else throw new Error(`Invalid loop variable(s): ${e.loopvar.type}`);n&&(y(p),!this.evaluate(n,p).__bool__().value)||(o.push(u),r.push(y))}let l="",s=!0;for(let d=0;d<o.length;++d){const p=new Map([["index",new T(d+1)],["index0",new T(d)],["revindex",new T(o.length-d)],["revindex0",new T(o.length-d-1)],["first",new I(d===0)],["last",new I(d===o.length-1)],["length",new T(o.length)],["previtem",d>0?o[d-1]:new N],["nextitem",d<o.length-1?o[d+1]:new N]]);a.setVariable("loop",new oe(p)),r[d](a);try{const u=this.evaluateBlock(e.body,a);l+=u.value}catch(u){if(u instanceof aa)continue;if(u instanceof ta)break;throw u}s=!1}if(s){const d=this.evaluateBlock(e.defaultBlock,a);l+=d.value}return new _(l)}evaluateMacro(e,t){return t.setVariable(e.name.value,new O((a,n)=>{var r;const i=new Le(n);a=a.slice();let o;((r=a.at(-1))==null?void 0:r.type)==="KeywordArgumentsValue"&&(o=a.pop());for(let l=0;l<e.args.length;++l){const s=e.args[l],d=a[l];if(s.type==="Identifier"){const p=s;if(!d)throw new Error(`Missing positional argument: ${p.value}`);i.setVariable(p.value,d)}else if(s.type==="KeywordArgumentExpression"){const p=s,u=d??(o==null?void 0:o.value.get(p.key.value))??this.evaluate(p.value,i);i.setVariable(p.key.value,u)}else throw new Error(`Unknown argument type: ${s.type}`)}return this.evaluateBlock(e.body,i)})),new z}evaluateCallStatement(e,t){const a=new O((l,s)=>{const d=new Le(s);if(e.callerArgs)for(let p=0;p<e.callerArgs.length;++p){const u=e.callerArgs[p];if(u.type!=="Identifier")throw new Error(`Caller parameter must be an identifier, got ${u.type}`);d.setVariable(u.value,l[p]??new N)}return this.evaluateBlock(e.body,d)}),[n,i]=this.evaluateArguments(e.call.args,t);n.push(new Ze(i));const o=this.evaluate(e.call.callee,t);if(o.type!=="FunctionValue")throw new Error(`Cannot call something that is not a function: got ${o.type}`);const r=new Le(t);return r.setVariable("caller",a),o.value(n,r)}evaluateFilterStatement(e,t){const a=this.evaluateBlock(e.body,t);return this.applyFilter(a,e.filter,t)}evaluate(e,t){if(!e)return new N;switch(e.type){case"Program":return this.evalProgram(e,t);case"Set":return this.evaluateSet(e,t);case"If":return this.evaluateIf(e,t);case"For":return this.evaluateFor(e,t);case"Macro":return this.evaluateMacro(e,t);case"CallStatement":return this.evaluateCallStatement(e,t);case"Break":throw new ta;case"Continue":throw new aa;case"IntegerLiteral":return new T(e.value);case"FloatLiteral":return new K(e.value);case"StringLiteral":return new _(e.value);case"ArrayLiteral":return new P(e.value.map(a=>this.evaluate(a,t)));case"TupleLiteral":return new Ir(e.value.map(a=>this.evaluate(a,t)));case"ObjectLiteral":{const a=new Map;for(const[n,i]of e.value){const o=this.evaluate(n,t);if(!(o instanceof _))throw new Error(`Object keys must be strings: got ${o.type}`);a.set(o.value,this.evaluate(i,t))}return new oe(a)}case"Identifier":return this.evaluateIdentifier(e,t);case"CallExpression":return this.evaluateCallExpression(e,t);case"MemberExpression":return this.evaluateMemberExpression(e,t);case"UnaryExpression":return this.evaluateUnaryExpression(e,t);case"BinaryExpression":return this.evaluateBinaryExpression(e,t);case"FilterExpression":return this.evaluateFilterExpression(e,t);case"FilterStatement":return this.evaluateFilterStatement(e,t);case"TestExpression":return this.evaluateTestExpression(e,t);case"SelectExpression":return this.evaluateSelectExpression(e,t);case"Ternary":return this.evaluateTernaryExpression(e,t);case"Comment":return new z;default:throw new SyntaxError(`Unknown node type: ${e.type}`)}}};function rt(e){switch(typeof e){case"number":return Number.isInteger(e)?new T(e):new K(e);case"string":return new _(e);case"boolean":return new I(e);case"undefined":return new N;case"object":return e===null?new z:Array.isArray(e)?new P(e.map(rt)):new oe(new Map(Object.entries(e).map(([t,a])=>[t,rt(a)])));case"function":return new O((t,a)=>{const n=e(...t.map(i=>i.value))??null;return rt(n)});default:throw new Error(`Cannot convert to runtime value: ${e}`)}}var te=`
`,Er="{%- ",Pr=" -%}";function Rr(e){switch(e.operator.type){case"MultiplicativeBinaryOperator":return 4;case"AdditiveBinaryOperator":return 3;case"ComparisonBinaryOperator":return 2;case"Identifier":return e.operator.value==="and"?1:e.operator.value==="in"||e.operator.value==="not in"?2:0}return 0}function Lr(e,t="	"){const a=typeof t=="number"?" ".repeat(t):t;return ke(e.body,0,a).replace(/\n$/,"")}function ie(...e){return Er+e.join(" ")+Pr}function ke(e,t,a){return e.map(n=>Ur(n,t,a)).join(te)}function Ur(e,t,a){const n=a.repeat(t);switch(e.type){case"Program":return ke(e.body,t,a);case"If":return $r(e,t,a);case"For":return Mr(e,t,a);case"Set":return Dr(e,t,a);case"Macro":return Br(e,t,a);case"Break":return n+ie("break");case"Continue":return n+ie("continue");case"CallStatement":return jr(e,t,a);case"FilterStatement":return Nr(e,t,a);case"Comment":return n+"{# "+e.value+" #}";default:return n+"{{- "+E(e)+" -}}"}}function $r(e,t,a){const n=a.repeat(t),i=[];let o=e;for(;o&&(i.push({test:o.test,body:o.body}),o.alternate.length===1&&o.alternate[0].type==="If");)o=o.alternate[0];let r=n+ie("if",E(i[0].test))+te+ke(i[0].body,t+1,a);for(let l=1;l<i.length;++l)r+=te+n+ie("elif",E(i[l].test))+te+ke(i[l].body,t+1,a);return o&&o.alternate.length>0&&(r+=te+n+ie("else")+te+ke(o.alternate,t+1,a)),r+=te+n+ie("endif"),r}function Mr(e,t,a){const n=a.repeat(t);let i="";if(e.iterable.type==="SelectExpression"){const r=e.iterable;i=`${E(r.lhs)} if ${E(r.test)}`}else i=E(e.iterable);let o=n+ie("for",E(e.loopvar),"in",i)+te+ke(e.body,t+1,a);return e.defaultBlock.length>0&&(o+=te+n+ie("else")+te+ke(e.defaultBlock,t+1,a)),o+=te+n+ie("endfor"),o}function Dr(e,t,a){const n=a.repeat(t),i=E(e.assignee),o=e.value?E(e.value):"",r=n+ie("set",`${i}${e.value?" = "+o:""}`);return e.body.length===0?r:r+te+ke(e.body,t+1,a)+te+n+ie("endset")}function Br(e,t,a){const n=a.repeat(t),i=e.args.map(E).join(", ");return n+ie("macro",`${e.name.value}(${i})`)+te+ke(e.body,t+1,a)+te+n+ie("endmacro")}function jr(e,t,a){const n=a.repeat(t),i=e.callerArgs&&e.callerArgs.length>0?`(${e.callerArgs.map(E).join(", ")})`:"",o=E(e.call);let r=n+ie(`call${i}`,o)+te;return r+=ke(e.body,t+1,a)+te,r+=n+ie("endcall"),r}function Nr(e,t,a){const n=a.repeat(t),i=e.filter.type==="Identifier"?e.filter.value:E(e.filter);let o=n+ie("filter",i)+te;return o+=ke(e.body,t+1,a)+te,o+=n+ie("endfilter"),o}function E(e,t=-1){switch(e.type){case"SpreadExpression":return`*${E(e.argument)}`;case"Identifier":return e.value;case"IntegerLiteral":return`${e.value}`;case"FloatLiteral":return`${e.value}`;case"StringLiteral":return JSON.stringify(e.value);case"BinaryExpression":{const a=e,n=Rr(a),i=E(a.left,n),o=E(a.right,n+1),r=`${i} ${a.operator.value} ${o}`;return n<t?`(${r})`:r}case"UnaryExpression":{const a=e;return a.operator.value+(a.operator.value==="not"?" ":"")+E(a.argument,1/0)}case"CallExpression":{const a=e,n=a.args.map(E).join(", ");return`${E(a.callee)}(${n})`}case"MemberExpression":{const a=e;let n=E(a.object);["Identifier","MemberExpression","CallExpression","StringLiteral","IntegerLiteral","FloatLiteral","ArrayLiteral","TupleLiteral","ObjectLiteral"].includes(a.object.type)||(n=`(${n})`);let i=E(a.property);return!a.computed&&a.property.type!=="Identifier"&&(i=`(${i})`),a.computed?`${n}[${i}]`:`${n}.${i}`}case"FilterExpression":{const a=e,n=E(a.operand,1/0);return a.filter.type==="CallExpression"?`${n} | ${E(a.filter)}`:`${n} | ${a.filter.value}`}case"SelectExpression":{const a=e;return`${E(a.lhs)} if ${E(a.test)}`}case"TestExpression":{const a=e;return`${E(a.operand)} is${a.negate?" not":""} ${a.test.value}`}case"ArrayLiteral":case"TupleLiteral":{const a=e.value.map(E),n=e.type==="ArrayLiteral"?"[]":"()";return`${n[0]}${a.join(", ")}${n[1]}`}case"ObjectLiteral":return`{${Array.from(e.value.entries()).map(([n,i])=>`${E(n)}: ${E(i)}`).join(", ")}}`;case"SliceExpression":{const a=e,n=a.start?E(a.start):"",i=a.stop?E(a.stop):"",o=a.step?`:${E(a.step)}`:"";return`${n}:${i}${o}`}case"KeywordArgumentExpression":{const a=e;return`${a.key.value}=${E(a.value)}`}case"Ternary":{const a=e,n=`${E(a.trueExpr)} if ${E(a.condition,0)} else ${E(a.falseExpr)}`;return t>-1?`(${n})`:n}default:throw new Error(`Unknown expression type: ${e.type}`)}}var Or=class{constructor(e){w(this,"parsed");const t=Qo(e,{lstrip_blocks:!0,trim_blocks:!0});this.parsed=vr(t)}render(e){const t=new Le;if(Tr(t),e)for(const[i,o]of Object.entries(e))t.set(i,o);return new Cr(t).run(this.parsed).value}format(e){return Lr(this.parsed,(e==null?void 0:e.indent)||"	")}},qr={transformers:["audio-classification","automatic-speech-recognition","depth-estimation","document-question-answering","feature-extraction","fill-mask","image-classification","image-feature-extraction","image-segmentation","image-to-image","image-to-text","image-text-to-text","mask-generation","object-detection","question-answering","summarization","table-question-answering","text-classification","text-generation","text-to-audio","text-to-speech","token-classification","translation","video-classification","visual-question-answering","zero-shot-classification","zero-shot-image-classification","zero-shot-object-detection"]},Dt={"text-classification":{name:"Text Classification",subtasks:[{type:"acceptability-classification",name:"Acceptability Classification"},{type:"entity-linking-classification",name:"Entity Linking Classification"},{type:"fact-checking",name:"Fact Checking"},{type:"intent-classification",name:"Intent Classification"},{type:"language-identification",name:"Language Identification"},{type:"multi-class-classification",name:"Multi Class Classification"},{type:"multi-label-classification",name:"Multi Label Classification"},{type:"multi-input-text-classification",name:"Multi-input Text Classification"},{type:"natural-language-inference",name:"Natural Language Inference"},{type:"semantic-similarity-classification",name:"Semantic Similarity Classification"},{type:"sentiment-classification",name:"Sentiment Classification"},{type:"topic-classification",name:"Topic Classification"},{type:"semantic-similarity-scoring",name:"Semantic Similarity Scoring"},{type:"sentiment-scoring",name:"Sentiment Scoring"},{type:"sentiment-analysis",name:"Sentiment Analysis"},{type:"hate-speech-detection",name:"Hate Speech Detection"},{type:"text-scoring",name:"Text Scoring"}],modality:"nlp"},"token-classification":{name:"Token Classification",subtasks:[{type:"named-entity-recognition",name:"Named Entity Recognition"},{type:"part-of-speech",name:"Part of Speech"},{type:"parsing",name:"Parsing"},{type:"lemmatization",name:"Lemmatization"},{type:"word-sense-disambiguation",name:"Word Sense Disambiguation"},{type:"coreference-resolution",name:"Coreference-resolution"}],modality:"nlp"},"table-question-answering":{name:"Table Question Answering",modality:"nlp"},"question-answering":{name:"Question Answering",subtasks:[{type:"extractive-qa",name:"Extractive QA"},{type:"open-domain-qa",name:"Open Domain QA"},{type:"closed-domain-qa",name:"Closed Domain QA"}],modality:"nlp"},"zero-shot-classification":{name:"Zero-Shot Classification",modality:"nlp"},translation:{name:"Translation",modality:"nlp"},summarization:{name:"Summarization",subtasks:[{type:"news-articles-summarization",name:"News Articles Summarization"},{type:"news-articles-headline-generation",name:"News Articles Headline Generation"}],modality:"nlp"},"feature-extraction":{name:"Feature Extraction",modality:"nlp"},"text-generation":{name:"Text Generation",subtasks:[{type:"dialogue-modeling",name:"Dialogue Modeling"},{type:"dialogue-generation",name:"Dialogue Generation"},{type:"conversational",name:"Conversational"},{type:"language-modeling",name:"Language Modeling"},{type:"text-simplification",name:"Text simplification"},{type:"explanation-generation",name:"Explanation Generation"},{type:"abstractive-qa",name:"Abstractive QA"},{type:"open-domain-abstractive-qa",name:"Open Domain Abstractive QA"},{type:"closed-domain-qa",name:"Closed Domain QA"},{type:"open-book-qa",name:"Open Book QA"},{type:"closed-book-qa",name:"Closed Book QA"},{type:"text2text-generation",name:"Text2Text Generation"}],modality:"nlp"},"fill-mask":{name:"Fill-Mask",subtasks:[{type:"slot-filling",name:"Slot Filling"},{type:"masked-language-modeling",name:"Masked Language Modeling"}],modality:"nlp"},"sentence-similarity":{name:"Sentence Similarity",modality:"nlp"},"text-to-speech":{name:"Text-to-Speech",modality:"audio"},"text-to-audio":{name:"Text-to-Audio",modality:"audio"},"automatic-speech-recognition":{name:"Automatic Speech Recognition",modality:"audio"},"audio-to-audio":{name:"Audio-to-Audio",modality:"audio"},"audio-classification":{name:"Audio Classification",subtasks:[{type:"keyword-spotting",name:"Keyword Spotting"},{type:"speaker-identification",name:"Speaker Identification"},{type:"audio-intent-classification",name:"Audio Intent Classification"},{type:"audio-emotion-recognition",name:"Audio Emotion Recognition"},{type:"audio-language-identification",name:"Audio Language Identification"}],modality:"audio"},"audio-text-to-text":{name:"Audio-Text-to-Text",modality:"multimodal",hideInDatasets:!0},"voice-activity-detection":{name:"Voice Activity Detection",modality:"audio"},"depth-estimation":{name:"Depth Estimation",modality:"cv"},"image-classification":{name:"Image Classification",subtasks:[{type:"multi-label-image-classification",name:"Multi Label Image Classification"},{type:"multi-class-image-classification",name:"Multi Class Image Classification"}],modality:"cv"},"object-detection":{name:"Object Detection",subtasks:[{type:"face-detection",name:"Face Detection"},{type:"vehicle-detection",name:"Vehicle Detection"}],modality:"cv"},"image-segmentation":{name:"Image Segmentation",subtasks:[{type:"instance-segmentation",name:"Instance Segmentation"},{type:"semantic-segmentation",name:"Semantic Segmentation"},{type:"panoptic-segmentation",name:"Panoptic Segmentation"}],modality:"cv"},"text-to-image":{name:"Text-to-Image",modality:"cv"},"image-to-text":{name:"Image-to-Text",subtasks:[{type:"image-captioning",name:"Image Captioning"}],modality:"cv"},"image-to-image":{name:"Image-to-Image",subtasks:[{type:"image-inpainting",name:"Image Inpainting"},{type:"image-colorization",name:"Image Colorization"},{type:"super-resolution",name:"Super Resolution"}],modality:"cv"},"image-to-video":{name:"Image-to-Video",modality:"cv"},"unconditional-image-generation":{name:"Unconditional Image Generation",modality:"cv"},"video-classification":{name:"Video Classification",modality:"cv"},"reinforcement-learning":{name:"Reinforcement Learning",modality:"rl"},robotics:{name:"Robotics",modality:"rl",subtasks:[{type:"grasping",name:"Grasping"},{type:"task-planning",name:"Task Planning"}]},"tabular-classification":{name:"Tabular Classification",modality:"tabular",subtasks:[{type:"tabular-multi-class-classification",name:"Tabular Multi Class Classification"},{type:"tabular-multi-label-classification",name:"Tabular Multi Label Classification"}]},"tabular-regression":{name:"Tabular Regression",modality:"tabular",subtasks:[{type:"tabular-single-column-regression",name:"Tabular Single Column Regression"}]},"tabular-to-text":{name:"Tabular to Text",modality:"tabular",subtasks:[{type:"rdf-to-text",name:"RDF to text"}],hideInModels:!0},"table-to-text":{name:"Table to Text",modality:"nlp",hideInModels:!0},"multiple-choice":{name:"Multiple Choice",subtasks:[{type:"multiple-choice-qa",name:"Multiple Choice QA"},{type:"multiple-choice-coreference-resolution",name:"Multiple Choice Coreference Resolution"}],modality:"nlp",hideInModels:!0},"text-ranking":{name:"Text Ranking",modality:"nlp"},"text-retrieval":{name:"Text Retrieval",subtasks:[{type:"document-retrieval",name:"Document Retrieval"},{type:"utterance-retrieval",name:"Utterance Retrieval"},{type:"entity-linking-retrieval",name:"Entity Linking Retrieval"},{type:"fact-checking-retrieval",name:"Fact Checking Retrieval"}],modality:"nlp",hideInModels:!0},"time-series-forecasting":{name:"Time Series Forecasting",modality:"tabular",subtasks:[{type:"univariate-time-series-forecasting",name:"Univariate Time Series Forecasting"},{type:"multivariate-time-series-forecasting",name:"Multivariate Time Series Forecasting"}]},"text-to-video":{name:"Text-to-Video",modality:"cv"},"image-text-to-text":{name:"Image-Text-to-Text",modality:"multimodal"},"visual-question-answering":{name:"Visual Question Answering",subtasks:[{type:"visual-question-answering",name:"Visual Question Answering"}],modality:"multimodal"},"document-question-answering":{name:"Document Question Answering",subtasks:[{type:"document-question-answering",name:"Document Question Answering"}],modality:"multimodal",hideInDatasets:!0},"zero-shot-image-classification":{name:"Zero-Shot Image Classification",modality:"cv"},"graph-ml":{name:"Graph Machine Learning",modality:"other"},"mask-generation":{name:"Mask Generation",modality:"cv"},"zero-shot-object-detection":{name:"Zero-Shot Object Detection",modality:"cv"},"text-to-3d":{name:"Text-to-3D",modality:"cv"},"image-to-3d":{name:"Image-to-3D",modality:"cv"},"image-feature-extraction":{name:"Image Feature Extraction",modality:"cv"},"video-text-to-text":{name:"Video-Text-to-Text",modality:"multimodal",hideInDatasets:!1},"keypoint-detection":{name:"Keypoint Detection",subtasks:[{type:"pose-estimation",name:"Pose Estimation"}],modality:"cv",hideInDatasets:!0},"visual-document-retrieval":{name:"Visual Document Retrieval",modality:"multimodal"},"any-to-any":{name:"Any-to-Any",modality:"multimodal"},"video-to-video":{name:"Video-to-Video",modality:"cv",hideInDatasets:!0},other:{name:"Other",modality:"other",hideInModels:!0,hideInDatasets:!0}},Fr=Object.keys(Dt);Object.values(Dt).flatMap(e=>"subtasks"in e?e.subtasks:[]).map(e=>e.type);new Set(Fr);var Hr={datasets:[{description:"A dataset with multiple modality input and output pairs.",id:"PKU-Alignment/align-anything"}],demo:{inputs:[{filename:"any-to-any-input.jpg",type:"img"},{label:"Text Prompt",content:"What is the significance of this place?",type:"text"}],outputs:[{label:"Generated Text",content:"The place in the picture is Osaka Castle, located in Osaka, Japan. Osaka Castle is a historic castle that was originally built in the 16th century by Toyotomi Hideyoshi, a powerful warlord of the time. It is one of the most famous landmarks in Osaka and is known for its distinctive white walls and black roof tiles. The castle has been rebuilt several times over the centuries and is now a popular tourist attraction, offering visitors a glimpse into Japan's rich history and culture.",type:"text"},{filename:"any-to-any-output.wav",type:"audio"}]},metrics:[],models:[{description:"Strong model that can take in video, audio, image, text and output text and natural speech.",id:"Qwen/Qwen2.5-Omni-7B"},{description:"Robust model that can take in image and text and generate image and text.",id:"OmniGen2/OmniGen2"},{description:"Any-to-any model with speech, video, audio, image and text understanding capabilities.",id:"openbmb/MiniCPM-o-2_6"},{description:"A model that can understand image and text and generate image and text.",id:"ByteDance-Seed/BAGEL-7B-MoT"}],spaces:[{description:"An application to chat with an any-to-any (image & text) model.",id:"OmniGen2/OmniGen2"}],summary:"Any-to-any models can understand two or more modalities and output two or more modalities.",widgetModels:[],youtubeId:""},Vr=Hr,Kr={datasets:[{description:"A benchmark of 10 different audio tasks.",id:"s3prl/superb"},{description:"A dataset of YouTube clips and their sound categories.",id:"agkphysics/AudioSet"}],demo:{inputs:[{filename:"audio.wav",type:"audio"}],outputs:[{data:[{label:"Up",score:.2},{label:"Down",score:.8}],type:"chart"}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"An easy-to-use model for command recognition.",id:"speechbrain/google_speech_command_xvector"},{description:"An emotion recognition model.",id:"ehcalabres/wav2vec2-lg-xlsr-en-speech-emotion-recognition"},{description:"A language identification model.",id:"facebook/mms-lid-126"}],spaces:[{description:"An application that can classify music into different genre.",id:"kurianbenoy/audioclassification"}],summary:"Audio classification is the task of assigning a label or class to a given audio. It can be used for recognizing which command a user is giving or the emotion of a statement, as well as identifying a speaker.",widgetModels:["MIT/ast-finetuned-audioset-10-10-0.4593"],youtubeId:"KWwzcmG98Ds"},zr=Kr,Wr={datasets:[{description:"A dataset containing audio conversations with question–answer pairs.",id:"nvidia/AF-Think"},{description:"A more advanced and comprehensive dataset that contains characteristics of the audio as well",id:"tsinghua-ee/QualiSpeech"}],demo:{inputs:[{filename:"audio.wav",type:"audio"},{label:"Text Prompt",content:"What is the gender of the speaker?",type:"text"}],outputs:[{label:"Generated Text",content:"The gender of the speaker is female.",type:"text"}]},metrics:[],models:[{description:"A lightweight model that has capabilities of taking both audio and text as inputs and generating responses.",id:"fixie-ai/ultravox-v0_5-llama-3_2-1b"},{description:"A multimodal model that supports voice chat and audio analysis.",id:"Qwen/Qwen2-Audio-7B-Instruct"},{description:"A model for audio understanding, speech translation, and transcription.",id:"mistralai/Voxtral-Small-24B-2507"},{description:"A new model capable of audio question answering and reasoning.",id:"nvidia/audio-flamingo-3"}],spaces:[{description:"A space that takes input as both audio and text and generates answers.",id:"iamomtiwari/ATTT"},{description:"A web application that demonstrates chatting with the Qwen2Audio Model.",id:"freddyaboulton/talk-to-qwen-webrtc"}],summary:"Audio-text-to-text models take both an audio clip and a text prompt as input, and generate natural language text as output. These models can answer questions about spoken content, summarize meetings, analyze music, or interpret speech beyond simple transcription. They are useful for applications that combine speech understanding with reasoning or conversation.",widgetModels:[],youtubeId:""},Xr=Wr,Qr={datasets:[{description:"512-element X-vector embeddings of speakers from CMU ARCTIC dataset.",id:"Matthijs/cmu-arctic-xvectors"}],demo:{inputs:[{filename:"input.wav",type:"audio"}],outputs:[{filename:"label-0.wav",type:"audio"},{filename:"label-1.wav",type:"audio"}]},metrics:[{description:"The Signal-to-Noise ratio is the relationship between the target signal level and the background noise level. It is calculated as the logarithm of the target signal divided by the background noise, in decibels.",id:"snri"},{description:"The Signal-to-Distortion ratio is the relationship between the target signal and the sum of noise, interference, and artifact errors",id:"sdri"}],models:[{description:"A speech enhancement model.",id:"ResembleAI/resemble-enhance"},{description:"A model that can change the voice in a speech recording.",id:"microsoft/speecht5_vc"}],spaces:[{description:"An application for speech separation.",id:"younver/speechbrain-speech-separation"},{description:"An application for audio style transfer.",id:"nakas/audio-diffusion_style_transfer"}],summary:"Audio-to-Audio is a family of tasks in which the input is an audio and the output is one or multiple generated audios. Some example tasks are speech enhancement and source separation.",widgetModels:["speechbrain/sepformer-wham"],youtubeId:"iohj7nCCYoM"},Jr=Qr,Yr={datasets:[{description:"31,175 hours of multilingual audio-text dataset in 108 languages.",id:"mozilla-foundation/common_voice_17_0"},{description:"Multilingual and diverse audio dataset with 101k hours of audio.",id:"amphion/Emilia-Dataset"},{description:"A dataset with 44.6k hours of English speaker data and 6k hours of other language speakers.",id:"parler-tts/mls_eng"},{description:"A multilingual audio dataset with 370K hours of audio.",id:"espnet/yodas"}],demo:{inputs:[{filename:"input.flac",type:"audio"}],outputs:[{label:"Transcript",content:"Going along slushy country roads and speaking to damp audiences in...",type:"text"}]},metrics:[{description:"",id:"wer"},{description:"",id:"cer"}],models:[{description:"A powerful ASR model by OpenAI.",id:"openai/whisper-large-v3"},{description:"A good generic speech model by MetaAI for fine-tuning.",id:"facebook/w2v-bert-2.0"},{description:"An end-to-end model that performs ASR and Speech Translation by MetaAI.",id:"facebook/seamless-m4t-v2-large"},{description:"A powerful multilingual ASR and Speech Translation model by Nvidia.",id:"nvidia/canary-1b"},{description:"Powerful speaker diarization model.",id:"pyannote/speaker-diarization-3.1"}],spaces:[{description:"A powerful general-purpose speech recognition application.",id:"hf-audio/whisper-large-v3"},{description:"Latest ASR model from Useful Sensors.",id:"mrfakename/Moonshinex"},{description:"A high quality speech and text translation model by Meta.",id:"facebook/seamless_m4t"},{description:"A powerful multilingual ASR and Speech Translation model by Nvidia",id:"nvidia/canary-1b"}],summary:"Automatic Speech Recognition (ASR), also known as Speech to Text (STT), is the task of transcribing a given audio to text. It has many applications, such as voice user interfaces.",widgetModels:["openai/whisper-large-v3"],youtubeId:"TksaY_FDgnk"},Zr=Yr,Gr={datasets:[{description:"Largest document understanding dataset.",id:"HuggingFaceM4/Docmatix"},{description:"Dataset from the 2020 DocVQA challenge. The documents are taken from the UCSF Industry Documents Library.",id:"eliolio/docvqa"}],demo:{inputs:[{label:"Question",content:"What is the idea behind the consumer relations efficiency team?",type:"text"},{filename:"document-question-answering-input.png",type:"img"}],outputs:[{label:"Answer",content:"Balance cost efficiency with quality customer service",type:"text"}]},metrics:[{description:"The evaluation metric for the DocVQA challenge is the Average Normalized Levenshtein Similarity (ANLS). This metric is flexible to character regognition errors and compares the predicted answer with the ground truth answer.",id:"anls"},{description:"Exact Match is a metric based on the strict character match of the predicted answer and the right answer. For answers predicted correctly, the Exact Match will be 1. Even if only one character is different, Exact Match will be 0",id:"exact-match"}],models:[{description:"A robust document question answering model.",id:"impira/layoutlm-document-qa"},{description:"A document question answering model specialized in invoices.",id:"impira/layoutlm-invoices"},{description:"A special model for OCR-free document question answering.",id:"microsoft/udop-large"},{description:"A powerful model for document question answering.",id:"google/pix2struct-docvqa-large"}],spaces:[{description:"A robust document question answering application.",id:"impira/docquery"},{description:"An application that can answer questions from invoices.",id:"impira/invoices"},{description:"An application to compare different document question answering models.",id:"merve/compare_docvqa_models"}],summary:"Document Question Answering (also known as Document Visual Question Answering) is the task of answering questions on document images. Document question answering models take a (document, question) pair as input and return an answer in natural language. Models usually rely on multi-modal features, combining text, position of words (bounding-boxes) and image.",widgetModels:["impira/layoutlm-invoices"],youtubeId:""},es=Gr,ts={datasets:[{description:"Wikipedia dataset containing cleaned articles of all languages. Can be used to train `feature-extraction` models.",id:"wikipedia"}],demo:{inputs:[{label:"Input",content:"India, officially the Republic of India, is a country in South Asia.",type:"text"}],outputs:[{table:[["Dimension 1","Dimension 2","Dimension 3"],["2.583383083343506","2.757075071334839","0.9023529887199402"],["8.29393482208252","1.1071064472198486","2.03399395942688"],["-0.7754912972450256","-1.647324562072754","-0.6113331913948059"],["0.07087723910808563","1.5942802429199219","1.4610432386398315"]],type:"tabular"}]},metrics:[],models:[{description:"A powerful feature extraction model for natural language processing tasks.",id:"thenlper/gte-large"},{description:"A strong feature extraction model for retrieval.",id:"Alibaba-NLP/gte-Qwen1.5-7B-instruct"}],spaces:[{description:"A leaderboard to rank text feature extraction models based on a benchmark.",id:"mteb/leaderboard"},{description:"A leaderboard to rank best feature extraction models based on human feedback.",id:"mteb/arena"}],summary:"Feature extraction is the task of extracting features learnt in a model.",widgetModels:["facebook/bart-base"]},as=ts,ns={datasets:[{description:"A common dataset that is used to train models for many languages.",id:"wikipedia"},{description:"A large English dataset with text crawled from the web.",id:"c4"}],demo:{inputs:[{label:"Input",content:"The <mask> barked at me",type:"text"}],outputs:[{type:"chart",data:[{label:"wolf",score:.487},{label:"dog",score:.061},{label:"cat",score:.058},{label:"fox",score:.047},{label:"squirrel",score:.025}]}]},metrics:[{description:"Cross Entropy is a metric that calculates the difference between two probability distributions. Each probability distribution is the distribution of predicted words",id:"cross_entropy"},{description:"Perplexity is the exponential of the cross-entropy loss. It evaluates the probabilities assigned to the next word by the model. Lower perplexity indicates better performance",id:"perplexity"}],models:[{description:"State-of-the-art masked language model.",id:"answerdotai/ModernBERT-large"},{description:"A multilingual model trained on 100 languages.",id:"FacebookAI/xlm-roberta-base"}],spaces:[],summary:"Masked language modeling is the task of masking some of the words in a sentence and predicting which words should replace those masks. These models are useful when we want to get a statistical understanding of the language in which the model is trained in.",widgetModels:["distilroberta-base"],youtubeId:"mqElG5QJWUg"},is=ns,os={datasets:[{description:"Benchmark dataset used for image classification with images that belong to 100 classes.",id:"cifar100"},{description:"Dataset consisting of images of garments.",id:"fashion_mnist"}],demo:{inputs:[{filename:"image-classification-input.jpeg",type:"img"}],outputs:[{type:"chart",data:[{label:"Egyptian cat",score:.514},{label:"Tabby cat",score:.193},{label:"Tiger cat",score:.068}]}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"A strong image classification model.",id:"google/vit-base-patch16-224"},{description:"A robust image classification model.",id:"facebook/deit-base-distilled-patch16-224"},{description:"A strong image classification model.",id:"facebook/convnext-large-224"}],spaces:[{description:"A leaderboard to evaluate different image classification models.",id:"timm/leaderboard"}],summary:"Image classification is the task of assigning a label or class to an entire image. Images are expected to have only one class for each image. Image classification models take an image as input and return a prediction about which class the image belongs to.",widgetModels:["google/vit-base-patch16-224"],youtubeId:"tjAIM7BOYhw"},rs=os,ss={datasets:[{description:"ImageNet-1K is a image classification dataset in which images are used to train image-feature-extraction models.",id:"imagenet-1k"}],demo:{inputs:[{filename:"mask-generation-input.png",type:"img"}],outputs:[{table:[["Dimension 1","Dimension 2","Dimension 3"],["0.21236686408519745","1.0919708013534546","0.8512550592422485"],["0.809657871723175","-0.18544459342956543","-0.7851548194885254"],["1.3103108406066895","-0.2479034662246704","-0.9107287526130676"],["1.8536205291748047","-0.36419737339019775","0.09717650711536407"]],type:"tabular"}]},metrics:[],models:[{description:"A powerful image feature extraction model.",id:"timm/vit_large_patch14_dinov2.lvd142m"},{description:"A strong image feature extraction model.",id:"nvidia/MambaVision-T-1K"},{description:"A robust image feature extraction model.",id:"facebook/dino-vitb16"},{description:"Cutting-edge image feature extraction model.",id:"apple/aimv2-large-patch14-336-distilled"},{description:"Strong image feature extraction model that can be used on images and documents.",id:"OpenGVLab/InternViT-6B-448px-V1-2"}],spaces:[{description:"A leaderboard to evaluate different image-feature-extraction models on classification performances",id:"timm/leaderboard"}],summary:"Image feature extraction is the task of extracting features learnt in a computer vision model.",widgetModels:[]},ls=ss,cs={datasets:[{description:"Synthetic dataset, for image relighting",id:"VIDIT"},{description:"Multiple images of celebrities, used for facial expression translation",id:"huggan/CelebA-faces"},{description:"12M image-caption pairs.",id:"Spawning/PD12M"}],demo:{inputs:[{filename:"image-to-image-input.jpeg",type:"img"}],outputs:[{filename:"image-to-image-output.png",type:"img"}]},isPlaceholder:!1,metrics:[{description:"Peak Signal to Noise Ratio (PSNR) is an approximation of the human perception, considering the ratio of the absolute intensity with respect to the variations. Measured in dB, a high value indicates a high fidelity.",id:"PSNR"},{description:"Structural Similarity Index (SSIM) is a perceptual metric which compares the luminance, contrast and structure of two images. The values of SSIM range between -1 and 1, and higher values indicate closer resemblance to the original image.",id:"SSIM"},{description:"Inception Score (IS) is an analysis of the labels predicted by an image classification model when presented with a sample of the generated images.",id:"IS"}],models:[{description:"An image-to-image model to improve image resolution.",id:"fal/AuraSR-v2"},{description:"Powerful image editing model.",id:"black-forest-labs/FLUX.1-Kontext-dev"},{description:"Virtual try-on model.",id:"yisol/IDM-VTON"},{description:"Image re-lighting model.",id:"kontext-community/relighting-kontext-dev-lora-v3"},{description:"Strong model for inpainting and outpainting.",id:"black-forest-labs/FLUX.1-Fill-dev"},{description:"Strong model for image editing using depth maps.",id:"black-forest-labs/FLUX.1-Depth-dev-lora"}],spaces:[{description:"Image editing application.",id:"black-forest-labs/FLUX.1-Kontext-Dev"},{description:"Image relighting application.",id:"lllyasviel/iclight-v2-vary"},{description:"An application for image upscaling.",id:"jasperai/Flux.1-dev-Controlnet-Upscaler"}],summary:"Image-to-image is the task of transforming an input image through a variety of possible manipulations and enhancements, such as super-resolution, image inpainting, colorization, and more.",widgetModels:["Qwen/Qwen-Image"],youtubeId:""},ds=cs,ps={datasets:[{description:"Dataset from 12M image-text of Reddit",id:"red_caps"},{description:"Dataset from 3.3M images of Google",id:"datasets/conceptual_captions"}],demo:{inputs:[{filename:"savanna.jpg",type:"img"}],outputs:[{label:"Detailed description",content:"a herd of giraffes and zebras grazing in a field",type:"text"}]},metrics:[],models:[{description:"Strong OCR model.",id:"allenai/olmOCR-7B-0725"},{description:"Powerful image captioning model.",id:"fancyfeast/llama-joycaption-beta-one-hf-llava"}],spaces:[{description:"SVG generator app from images.",id:"multimodalart/OmniSVG-3B"},{description:"An application that converts documents to markdown.",id:"numind/NuMarkdown-8B-Thinking"},{description:"An application that can caption images.",id:"fancyfeast/joy-caption-beta-one"}],summary:"Image to text models output a text from a given image. Image captioning or optical character recognition can be considered as the most common applications of image to text.",widgetModels:["Salesforce/blip-image-captioning-large"],youtubeId:""},us=ps,ms={datasets:[{description:"Instructions composed of image and text.",id:"liuhaotian/LLaVA-Instruct-150K"},{description:"Collection of image-text pairs on scientific topics.",id:"DAMO-NLP-SG/multimodal_textbook"},{description:"A collection of datasets made for model fine-tuning.",id:"HuggingFaceM4/the_cauldron"},{description:"Screenshots of websites with their HTML/CSS codes.",id:"HuggingFaceM4/WebSight"}],demo:{inputs:[{filename:"image-text-to-text-input.png",type:"img"},{label:"Text Prompt",content:"Describe the position of the bee in detail.",type:"text"}],outputs:[{label:"Answer",content:"The bee is sitting on a pink flower, surrounded by other flowers. The bee is positioned in the center of the flower, with its head and front legs sticking out.",type:"text"}]},metrics:[],models:[{description:"Small and efficient yet powerful vision language model.",id:"HuggingFaceTB/SmolVLM-Instruct"},{description:"Cutting-edge reasoning vision language model.",id:"zai-org/GLM-4.5V"},{description:"Cutting-edge small vision language model to convert documents to text.",id:"rednote-hilab/dots.ocr"},{description:"Small yet powerful model.",id:"Qwen/Qwen2.5-VL-3B-Instruct"},{description:"Image-text-to-text model with agentic capabilities.",id:"microsoft/Magma-8B"}],spaces:[{description:"Leaderboard to evaluate vision language models.",id:"opencompass/open_vlm_leaderboard"},{description:"An application that compares object detection capabilities of different vision language models.",id:"sergiopaniego/vlm_object_understanding"},{description:"An application to compare different OCR models.",id:"prithivMLmods/Multimodal-OCR"}],summary:"Image-text-to-text models take in an image and text prompt and output text. These models are also called vision-language models, or VLMs. The difference from image-to-text models is that these models take an additional text input, not restricting the model to certain use cases like image captioning, and may also be trained to accept a conversation as input.",widgetModels:["zai-org/GLM-4.5V"],youtubeId:"IoGaGfU1CIg"},fs=ms,gs={datasets:[{description:"Scene segmentation dataset.",id:"scene_parse_150"}],demo:{inputs:[{filename:"image-segmentation-input.jpeg",type:"img"}],outputs:[{filename:"image-segmentation-output.png",type:"img"}]},metrics:[{description:"Average Precision (AP) is the Area Under the PR Curve (AUC-PR). It is calculated for each semantic class separately",id:"Average Precision"},{description:"Mean Average Precision (mAP) is the overall average of the AP values",id:"Mean Average Precision"},{description:"Intersection over Union (IoU) is the overlap of segmentation masks. Mean IoU is the average of the IoU of all semantic classes",id:"Mean Intersection over Union"},{description:"APα is the Average Precision at the IoU threshold of a α value, for example, AP50 and AP75",id:"APα"}],models:[{description:"Solid panoptic segmentation model trained on COCO.",id:"tue-mps/coco_panoptic_eomt_large_640"},{description:"Background removal model.",id:"briaai/RMBG-1.4"},{description:"A multipurpose image segmentation model for high resolution images.",id:"ZhengPeng7/BiRefNet"},{description:"Powerful human-centric image segmentation model.",id:"facebook/sapiens-seg-1b"},{description:"Panoptic segmentation model trained on the COCO (common objects) dataset.",id:"facebook/mask2former-swin-large-coco-panoptic"}],spaces:[{description:"A semantic segmentation application that can predict unseen instances out of the box.",id:"facebook/ov-seg"},{description:"One of the strongest segmentation applications.",id:"jbrinkma/segment-anything"},{description:"A human-centric segmentation model.",id:"facebook/sapiens-pose"},{description:"An instance segmentation application to predict neuronal cell types from microscopy images.",id:"rashmi/sartorius-cell-instance-segmentation"},{description:"An application that segments videos.",id:"ArtGAN/Segment-Anything-Video"},{description:"An panoptic segmentation application built for outdoor environments.",id:"segments/panoptic-segment-anything"}],summary:"Image Segmentation divides an image into segments where each pixel in the image is mapped to an object. This task has multiple variants such as instance segmentation, panoptic segmentation and semantic segmentation.",widgetModels:["nvidia/segformer-b0-finetuned-ade-512-512"],youtubeId:"dKE8SIt9C-w"},hs=gs,ys={datasets:[{description:"A benchmark dataset for reference image controlled video generation.",id:"ali-vilab/VACE-Benchmark"},{description:"A dataset of video generation style preferences.",id:"Rapidata/sora-video-generation-style-likert-scoring"},{description:"A dataset with videos and captions throughout the videos.",id:"BestWishYsh/ChronoMagic"}],demo:{inputs:[{filename:"image-to-video-input.jpg",type:"img"},{label:"Optional Text Prompt",content:"This penguin is dancing",type:"text"}],outputs:[{filename:"image-to-video-output.gif",type:"img"}]},metrics:[{description:"Fréchet Video Distance (FVD) measures the perceptual similarity between the distributions of generated videos and a set of real videos, assessing overall visual quality and temporal coherence of the video generated from an input image.",id:"fvd"},{description:"CLIP Score measures the semantic similarity between a textual prompt (if provided alongside the input image) and the generated video frames. It evaluates how well the video's generated content and motion align with the textual description, conditioned on the initial image.",id:"clip_score"},{description:"First Frame Fidelity, often measured using LPIPS (Learned Perceptual Image Patch Similarity), PSNR, or SSIM, quantifies how closely the first frame of the generated video matches the input conditioning image.",id:"lpips"},{description:"Identity Preservation Score measures the consistency of identity (e.g., a person's face or a specific object's characteristics) between the input image and throughout the generated video frames, often calculated using features from specialized models like face recognition (e.g., ArcFace) or re-identification models.",id:"identity_preservation"},{description:"Motion Score evaluates the quality, realism, and temporal consistency of motion in the video generated from a static image. This can be based on optical flow analysis (e.g., smoothness, magnitude), consistency of object trajectories, or specific motion plausibility assessments.",id:"motion_score"}],models:[{description:"LTX-Video, a 13B parameter model for high quality video generation",id:"Lightricks/LTX-Video-0.9.7-dev"},{description:"A 14B parameter model for reference image controlled video generation",id:"Wan-AI/Wan2.1-VACE-14B"},{description:"An image-to-video generation model using FramePack F1 methodology with Hunyuan-DiT architecture",id:"lllyasviel/FramePack_F1_I2V_HY_20250503"},{description:"A distilled version of the LTX-Video-0.9.7-dev model for faster inference",id:"Lightricks/LTX-Video-0.9.7-distilled"},{description:"An image-to-video generation model by Skywork AI, 14B parameters, producing 720p videos.",id:"Skywork/SkyReels-V2-I2V-14B-720P"},{description:"Image-to-video variant of Tencent's HunyuanVideo.",id:"tencent/HunyuanVideo-I2V"},{description:"A 14B parameter model for 720p image-to-video generation by Wan-AI.",id:"Wan-AI/Wan2.1-I2V-14B-720P"},{description:"A Diffusers version of the Wan2.1-I2V-14B-720P model for 720p image-to-video generation.",id:"Wan-AI/Wan2.1-I2V-14B-720P-Diffusers"}],spaces:[{description:"An application to generate videos fast.",id:"Lightricks/ltx-video-distilled"},{description:"Generate videos with the FramePack-F1",id:"linoyts/FramePack-F1"},{description:"Generate videos with the FramePack",id:"lisonallen/framepack-i2v"},{description:"Wan2.1 with CausVid LoRA",id:"multimodalart/wan2-1-fast"},{description:"A demo for Stable Video Diffusion",id:"multimodalart/stable-video-diffusion"}],summary:"Image-to-video models take a still image as input and generate a video. These models can be guided by text prompts to influence the content and style of the output video.",widgetModels:[],youtubeId:void 0},bs=ys,vs={datasets:[{description:"Widely used benchmark dataset for multiple Vision tasks.",id:"merve/coco2017"},{description:"Medical Imaging dataset of the Human Brain for segmentation and mask generating tasks",id:"rocky93/BraTS_segmentation"}],demo:{inputs:[{filename:"mask-generation-input.png",type:"img"}],outputs:[{filename:"mask-generation-output.png",type:"img"}]},metrics:[{description:"IoU is used to measure the overlap between predicted mask and the ground truth mask.",id:"Intersection over Union (IoU)"}],models:[{description:"Small yet powerful mask generation model.",id:"Zigeng/SlimSAM-uniform-50"},{description:"Very strong mask generation model.",id:"facebook/sam2-hiera-large"}],spaces:[{description:"An application that combines a mask generation model with a zero-shot object detection model for text-guided image segmentation.",id:"merve/OWLSAM2"},{description:"An application that compares the performance of a large and a small mask generation model.",id:"merve/slimsam"},{description:"An application based on an improved mask generation model.",id:"SkalskiP/segment-anything-model-2"},{description:"An application to remove objects from videos using mask generation models.",id:"SkalskiP/SAM_and_ProPainter"}],summary:"Mask generation is the task of generating masks that identify a specific object or region of interest in a given image. Masks are often used in segmentation tasks, where they provide a precise way to isolate the object of interest for further processing or analysis.",widgetModels:[],youtubeId:""},ws=vs,_s={datasets:[{description:"Widely used benchmark dataset for multiple vision tasks.",id:"merve/coco2017"},{description:"Multi-task computer vision benchmark.",id:"merve/pascal-voc"}],demo:{inputs:[{filename:"object-detection-input.jpg",type:"img"}],outputs:[{filename:"object-detection-output.jpg",type:"img"}]},metrics:[{description:"The Average Precision (AP) metric is the Area Under the PR Curve (AUC-PR). It is calculated for each class separately",id:"Average Precision"},{description:"The Mean Average Precision (mAP) metric is the overall average of the AP values",id:"Mean Average Precision"},{description:"The APα metric is the Average Precision at the IoU threshold of a α value, for example, AP50 and AP75",id:"APα"}],models:[{description:"Solid object detection model pre-trained on the COCO 2017 dataset.",id:"facebook/detr-resnet-50"},{description:"Accurate object detection model.",id:"IDEA-Research/dab-detr-resnet-50"},{description:"Fast and accurate object detection model.",id:"PekingU/rtdetr_v2_r50vd"},{description:"Object detection model for low-lying objects.",id:"StephanST/WALDO30"}],spaces:[{description:"Real-time object detection demo.",id:"Roboflow/RF-DETR"},{description:"An application that contains various object detection models to try from.",id:"Gradio-Blocks/Object-Detection-With-DETR-and-YOLOS"},{description:"A cutting-edge object detection application.",id:"sunsmarterjieleaf/yolov12"},{description:"An object tracking, segmentation and inpainting application.",id:"VIPLab/Track-Anything"},{description:"Very fast object tracking application based on object detection.",id:"merve/RT-DETR-tracking-coco"}],summary:"Object Detection models allow users to identify objects of certain defined classes. Object detection models receive an image as input and output the images with bounding boxes and labels on detected objects.",widgetModels:["facebook/detr-resnet-50"],youtubeId:"WdAeKSOpxhw"},xs=_s,ks={datasets:[{description:"NYU Depth V2 Dataset: Video dataset containing both RGB and depth sensor data.",id:"sayakpaul/nyu_depth_v2"},{description:"Monocular depth estimation benchmark based without noise and errors.",id:"depth-anything/DA-2K"}],demo:{inputs:[{filename:"depth-estimation-input.jpg",type:"img"}],outputs:[{filename:"depth-estimation-output.png",type:"img"}]},metrics:[],models:[{description:"Cutting-edge depth estimation model.",id:"depth-anything/Depth-Anything-V2-Large"},{description:"A strong monocular depth estimation model.",id:"jingheya/lotus-depth-g-v1-0"},{description:"A depth estimation model that predicts depth in videos.",id:"tencent/DepthCrafter"},{description:"A robust depth estimation model.",id:"apple/DepthPro-hf"}],spaces:[{description:"An application that predicts the depth of an image and then reconstruct the 3D model as voxels.",id:"radames/dpt-depth-estimation-3d-voxels"},{description:"An application for bleeding-edge depth estimation.",id:"akhaliq/depth-pro"},{description:"An application on cutting-edge depth estimation in videos.",id:"tencent/DepthCrafter"},{description:"A human-centric depth estimation application.",id:"facebook/sapiens-depth"}],summary:"Depth estimation is the task of predicting depth of the objects present in an image.",widgetModels:[""],youtubeId:""},As=ks,Ss={datasets:[],demo:{inputs:[],outputs:[]},isPlaceholder:!0,metrics:[],models:[],spaces:[],summary:"",widgetModels:[],youtubeId:void 0,canonicalId:void 0},Is=Ss,Ts={datasets:[{description:"A curation of widely used datasets for Data Driven Deep Reinforcement Learning (D4RL)",id:"edbeeching/decision_transformer_gym_replay"}],demo:{inputs:[{label:"State",content:"Red traffic light, pedestrians are about to pass.",type:"text"}],outputs:[{label:"Action",content:"Stop the car.",type:"text"},{label:"Next State",content:"Yellow light, pedestrians have crossed.",type:"text"}]},metrics:[{description:"Accumulated reward across all time steps discounted by a factor that ranges between 0 and 1 and determines how much the agent optimizes for future relative to immediate rewards. Measures how good is the policy ultimately found by a given algorithm considering uncertainty over the future.",id:"Discounted Total Reward"},{description:"Average return obtained after running the policy for a certain number of evaluation episodes. As opposed to total reward, mean reward considers how much reward a given algorithm receives while learning.",id:"Mean Reward"},{description:"Measures how good a given algorithm is after a predefined time. Some algorithms may be guaranteed to converge to optimal behavior across many time steps. However, an agent that reaches an acceptable level of optimality after a given time horizon may be preferable to one that ultimately reaches optimality but takes a long time.",id:"Level of Performance After Some Time"}],models:[{description:"A Reinforcement Learning model trained on expert data from the Gym Hopper environment",id:"edbeeching/decision-transformer-gym-hopper-expert"},{description:"A PPO agent playing seals/CartPole-v0 using the stable-baselines3 library and the RL Zoo.",id:"HumanCompatibleAI/ppo-seals-CartPole-v0"}],spaces:[{description:"An application for a cute puppy agent learning to catch a stick.",id:"ThomasSimonini/Huggy"},{description:"An application to play Snowball Fight with a reinforcement learning agent.",id:"ThomasSimonini/SnowballFight"}],summary:"Reinforcement learning is the computational approach of learning from action by interacting with an environment through trial and error and receiving rewards (negative or positive) as feedback",widgetModels:[],youtubeId:"q0BiUn5LiBc"},Cs=Ts,Es={datasets:[{description:"A famous question answering dataset based on English articles from Wikipedia.",id:"squad_v2"},{description:"A dataset of aggregated anonymized actual queries issued to the Google search engine.",id:"natural_questions"}],demo:{inputs:[{label:"Question",content:"Which name is also used to describe the Amazon rainforest in English?",type:"text"},{label:"Context",content:"The Amazon rainforest, also known in English as Amazonia or the Amazon Jungle",type:"text"}],outputs:[{label:"Answer",content:"Amazonia",type:"text"}]},metrics:[{description:"Exact Match is a metric based on the strict character match of the predicted answer and the right answer. For answers predicted correctly, the Exact Match will be 1. Even if only one character is different, Exact Match will be 0",id:"exact-match"},{description:" The F1-Score metric is useful if we value both false positives and false negatives equally. The F1-Score is calculated on each word in the predicted sequence against the correct answer",id:"f1"}],models:[{description:"A robust baseline model for most question answering domains.",id:"deepset/roberta-base-squad2"},{description:"Small yet robust model that can answer questions.",id:"distilbert/distilbert-base-cased-distilled-squad"},{description:"A special model that can answer questions from tables.",id:"google/tapas-base-finetuned-wtq"}],spaces:[{description:"An application that can answer a long question from Wikipedia.",id:"deepset/wikipedia-assistant"}],summary:"Question Answering models can retrieve the answer to a question from a given text, which is useful for searching for an answer in a document. Some question answering models can generate answers without context!",widgetModels:["deepset/roberta-base-squad2"],youtubeId:"ajPx5LwJD-I"},Ps=Es,Rs={datasets:[{description:"Bing queries with relevant passages from various web sources.",id:"microsoft/ms_marco"}],demo:{inputs:[{label:"Source sentence",content:"Machine learning is so easy.",type:"text"},{label:"Sentences to compare to",content:"Deep learning is so straightforward.",type:"text"},{label:"",content:"This is so difficult, like rocket science.",type:"text"},{label:"",content:"I can't believe how much I struggled with this.",type:"text"}],outputs:[{type:"chart",data:[{label:"Deep learning is so straightforward.",score:.623},{label:"This is so difficult, like rocket science.",score:.413},{label:"I can't believe how much I struggled with this.",score:.256}]}]},metrics:[{description:"Reciprocal Rank is a measure used to rank the relevancy of documents given a set of documents. Reciprocal Rank is the reciprocal of the rank of the document retrieved, meaning, if the rank is 3, the Reciprocal Rank is 0.33. If the rank is 1, the Reciprocal Rank is 1",id:"Mean Reciprocal Rank"},{description:"The similarity of the embeddings is evaluated mainly on cosine similarity. It is calculated as the cosine of the angle between two vectors. It is particularly useful when your texts are not the same length",id:"Cosine Similarity"}],models:[{description:"This model works well for sentences and paragraphs and can be used for clustering/grouping and semantic searches.",id:"sentence-transformers/all-mpnet-base-v2"},{description:"A multilingual robust sentence similarity model.",id:"BAAI/bge-m3"},{description:"A robust sentence similarity model.",id:"HIT-TMG/KaLM-embedding-multilingual-mini-instruct-v1.5"}],spaces:[{description:"An application that leverages sentence similarity to answer questions from YouTube videos.",id:"Gradio-Blocks/Ask_Questions_To_YouTube_Videos"},{description:"An application that retrieves relevant PubMed abstracts for a given online article which can be used as further references.",id:"Gradio-Blocks/pubmed-abstract-retriever"},{description:"An application that leverages sentence similarity to summarize text.",id:"nickmuchi/article-text-summarizer"},{description:"A guide that explains how Sentence Transformers can be used for semantic search.",id:"sentence-transformers/Sentence_Transformers_for_semantic_search"}],summary:"Sentence Similarity is the task of determining how similar two texts are. Sentence similarity models convert input texts into vectors (embeddings) that capture semantic information and calculate how close (similar) they are between them. This task is particularly useful for information retrieval and clustering/grouping.",widgetModels:["sentence-transformers/all-MiniLM-L6-v2"],youtubeId:"VCZq5AkbNEU"},Ls=Rs,Us={canonicalId:"text-generation",datasets:[{description:"News articles in five different languages along with their summaries. Widely used for benchmarking multilingual summarization models.",id:"mlsum"},{description:"English conversations and their summaries. Useful for benchmarking conversational agents.",id:"samsum"}],demo:{inputs:[{label:"Input",content:"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. It was the first structure to reach a height of 300 metres. Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.",type:"text"}],outputs:[{label:"Output",content:"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building. It was the first structure to reach a height of 300 metres.",type:"text"}]},metrics:[{description:"The generated sequence is compared against its summary, and the overlap of tokens are counted. ROUGE-N refers to overlap of N subsequent tokens, ROUGE-1 refers to overlap of single tokens and ROUGE-2 is the overlap of two subsequent tokens.",id:"rouge"}],models:[{description:"A strong summarization model trained on English news articles. Excels at generating factual summaries.",id:"facebook/bart-large-cnn"},{description:"A summarization model trained on medical articles.",id:"Falconsai/medical_summarization"}],spaces:[{description:"An application that can summarize long paragraphs.",id:"pszemraj/summarize-long-text"},{description:"A much needed summarization application for terms and conditions.",id:"ml6team/distilbart-tos-summarizer-tosdr"},{description:"An application that summarizes long documents.",id:"pszemraj/document-summarization"},{description:"An application that can detect errors in abstractive summarization.",id:"ml6team/post-processing-summarization"}],summary:"Summarization is the task of producing a shorter version of a document while preserving its important information. Some models can extract text from the original input, while other models can generate entirely new text.",widgetModels:["facebook/bart-large-cnn"],youtubeId:"yHnr5Dk2zCI"},$s=Us,Ms={datasets:[{description:"The WikiTableQuestions dataset is a large-scale dataset for the task of question answering on semi-structured tables.",id:"wikitablequestions"},{description:"WikiSQL is a dataset of 80654 hand-annotated examples of questions and SQL queries distributed across 24241 tables from Wikipedia.",id:"wikisql"}],demo:{inputs:[{table:[["Rank","Name","No.of reigns","Combined days"],["1","lou Thesz","3","3749"],["2","Ric Flair","8","3103"],["3","Harley Race","7","1799"]],type:"tabular"},{label:"Question",content:"What is the number of reigns for Harley Race?",type:"text"}],outputs:[{label:"Result",content:"7",type:"text"}]},metrics:[{description:"Checks whether the predicted answer(s) is the same as the ground-truth answer(s).",id:"Denotation Accuracy"}],models:[{description:"A table question answering model that is capable of neural SQL execution, i.e., employ TAPEX to execute a SQL query on a given table.",id:"microsoft/tapex-base"},{description:"A robust table question answering model.",id:"google/tapas-base-finetuned-wtq"}],spaces:[{description:"An application that answers questions based on table CSV files.",id:"katanaml/table-query"}],summary:"Table Question Answering (Table QA) is the answering a question about an information on a given table.",widgetModels:["google/tapas-base-finetuned-wtq"]},Ds=Ms,Bs={datasets:[{description:"A comprehensive curation of datasets covering all benchmarks.",id:"inria-soda/tabular-benchmark"}],demo:{inputs:[{table:[["Glucose","Blood Pressure ","Skin Thickness","Insulin","BMI"],["148","72","35","0","33.6"],["150","50","30","0","35.1"],["141","60","29","1","39.2"]],type:"tabular"}],outputs:[{table:[["Diabetes"],["1"],["1"],["0"]],type:"tabular"}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"Breast cancer prediction model based on decision trees.",id:"scikit-learn/cancer-prediction-trees"}],spaces:[{description:"An application that can predict defective products on a production line.",id:"scikit-learn/tabular-playground"},{description:"An application that compares various tabular classification techniques on different datasets.",id:"scikit-learn/classification"}],summary:"Tabular classification is the task of classifying a target category (a group) based on set of attributes.",widgetModels:["scikit-learn/tabular-playground"],youtubeId:""},js=Bs,Ns={datasets:[{description:"A comprehensive curation of datasets covering all benchmarks.",id:"inria-soda/tabular-benchmark"}],demo:{inputs:[{table:[["Car Name","Horsepower","Weight"],["ford torino","140","3,449"],["amc hornet","97","2,774"],["toyota corolla","65","1,773"]],type:"tabular"}],outputs:[{table:[["MPG (miles per gallon)"],["17"],["18"],["31"]],type:"tabular"}]},metrics:[{description:"",id:"mse"},{description:"Coefficient of determination (or R-squared) is a measure of how well the model fits the data. Higher R-squared is considered a better fit.",id:"r-squared"}],models:[{description:"Fish weight prediction based on length measurements and species.",id:"scikit-learn/Fish-Weight"}],spaces:[{description:"An application that can predict weight of a fish based on set of attributes.",id:"scikit-learn/fish-weight-prediction"}],summary:"Tabular regression is the task of predicting a numerical value given a set of attributes.",widgetModels:["scikit-learn/Fish-Weight"],youtubeId:""},Os=Ns,qs={datasets:[{description:"RedCaps is a large-scale dataset of 12M image-text pairs collected from Reddit.",id:"red_caps"},{description:"Conceptual Captions is a dataset consisting of ~3.3M images annotated with captions.",id:"conceptual_captions"},{description:"12M image-caption pairs.",id:"Spawning/PD12M"}],demo:{inputs:[{label:"Input",content:"A city above clouds, pastel colors, Victorian style",type:"text"}],outputs:[{filename:"image.jpeg",type:"img"}]},metrics:[{description:"The Inception Score (IS) measure assesses diversity and meaningfulness. It uses a generated image sample to predict its label. A higher score signifies more diverse and meaningful images.",id:"IS"},{description:"The Fréchet Inception Distance (FID) calculates the distance between distributions between synthetic and real samples. A lower FID score indicates better similarity between the distributions of real and generated images.",id:"FID"},{description:"R-precision assesses how the generated image aligns with the provided text description. It uses the generated images as queries to retrieve relevant text descriptions. The top 'r' relevant descriptions are selected and used to calculate R-precision as r/R, where 'R' is the number of ground truth descriptions associated with the generated images. A higher R-precision value indicates a better model.",id:"R-Precision"}],models:[{description:"One of the most powerful image generation models that can generate realistic outputs.",id:"black-forest-labs/FLUX.1-Krea-dev"},{description:"A powerful image generation model.",id:"Qwen/Qwen-Image"},{description:"Powerful and fast image generation model.",id:"ByteDance/SDXL-Lightning"},{description:"A powerful text-to-image model.",id:"ByteDance/Hyper-SD"}],spaces:[{description:"A powerful text-to-image application.",id:"stabilityai/stable-diffusion-3-medium"},{description:"A text-to-image application to generate comics.",id:"jbilcke-hf/ai-comic-factory"},{description:"An application to match multiple custom image generation models.",id:"multimodalart/flux-lora-lab"},{description:"A powerful yet very fast image generation application.",id:"latent-consistency/lcm-lora-for-sdxl"},{description:"A gallery to explore various text-to-image models.",id:"multimodalart/LoraTheExplorer"},{description:"An application for `text-to-image`, `image-to-image` and image inpainting.",id:"ArtGAN/Stable-Diffusion-ControlNet-WebUI"},{description:"An application to generate realistic images given photos of a person and a prompt.",id:"InstantX/InstantID"}],summary:"Text-to-image is the task of generating images from input text. These pipelines can also be used to modify and edit images based on text prompts.",widgetModels:["black-forest-labs/FLUX.1-dev"],youtubeId:""},Fs=qs,Hs={canonicalId:"text-to-audio",datasets:[{description:"10K hours of multi-speaker English dataset.",id:"parler-tts/mls_eng_10k"},{description:"Multi-speaker English dataset.",id:"mythicinfinity/libritts_r"},{description:"Multi-lingual dataset.",id:"facebook/multilingual_librispeech"}],demo:{inputs:[{label:"Input",content:"I love audio models on the Hub!",type:"text"}],outputs:[{filename:"audio.wav",type:"audio"}]},metrics:[{description:"The Mel Cepstral Distortion (MCD) metric is used to calculate the quality of generated speech.",id:"mel cepstral distortion"}],models:[{description:"Small yet powerful TTS model.",id:"KittenML/kitten-tts-nano-0.1"},{description:"Bleeding edge TTS model.",id:"ResembleAI/chatterbox"},{description:"A massively multi-lingual TTS model.",id:"fishaudio/fish-speech-1.5"},{description:"A text-to-dialogue model.",id:"nari-labs/Dia-1.6B-0626"}],spaces:[{description:"An application for generate high quality speech in different languages.",id:"hexgrad/Kokoro-TTS"},{description:"A multilingual text-to-speech application.",id:"fishaudio/fish-speech-1"},{description:"Performant TTS application.",id:"ResembleAI/Chatterbox"},{description:"An application to compare different TTS models.",id:"TTS-AGI/TTS-Arena-V2"},{description:"An application that generates podcast episodes.",id:"ngxson/kokoro-podcast-generator"}],summary:"Text-to-Speech (TTS) is the task of generating natural sounding speech given text input. TTS models can be extended to have a single model that generates speech for multiple speakers and multiple languages.",widgetModels:["suno/bark"],youtubeId:"NW62DpzJ274"},Vs=Hs,Ks={datasets:[{description:"A widely used dataset useful to benchmark named entity recognition models.",id:"eriktks/conll2003"},{description:"A multilingual dataset of Wikipedia articles annotated for named entity recognition in over 150 different languages.",id:"unimelb-nlp/wikiann"}],demo:{inputs:[{label:"Input",content:"My name is Omar and I live in Zürich.",type:"text"}],outputs:[{text:"My name is Omar and I live in Zürich.",tokens:[{type:"PERSON",start:11,end:15},{type:"GPE",start:30,end:36}],type:"text-with-tokens"}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"A robust performance model to identify people, locations, organizations and names of miscellaneous entities.",id:"dslim/bert-base-NER"},{description:"A strong model to identify people, locations, organizations and names in multiple languages.",id:"FacebookAI/xlm-roberta-large-finetuned-conll03-english"},{description:"A token classification model specialized on medical entity recognition.",id:"blaze999/Medical-NER"},{description:"Flair models are typically the state of the art in named entity recognition tasks.",id:"flair/ner-english"}],spaces:[{description:"An application that can recognizes entities, extracts noun chunks and recognizes various linguistic features of each token.",id:"spacy/gradio_pipeline_visualizer"}],summary:"Token classification is a natural language understanding task in which a label is assigned to some tokens in a text. Some popular token classification subtasks are Named Entity Recognition (NER) and Part-of-Speech (PoS) tagging. NER models could be trained to identify specific entities in a text, such as dates, individuals and places; and PoS tagging would identify, for example, which words in a text are verbs, nouns, and punctuation marks.",widgetModels:["FacebookAI/xlm-roberta-large-finetuned-conll03-english"],youtubeId:"wVHdVlPScxA"},zs=Ks,Ws={canonicalId:"text-generation",datasets:[{description:"A dataset of copyright-free books translated into 16 different languages.",id:"Helsinki-NLP/opus_books"},{description:"An example of translation between programming languages. This dataset consists of functions in Java and C#.",id:"google/code_x_glue_cc_code_to_code_trans"}],demo:{inputs:[{label:"Input",content:"My name is Omar and I live in Zürich.",type:"text"}],outputs:[{label:"Output",content:"Mein Name ist Omar und ich wohne in Zürich.",type:"text"}]},metrics:[{description:"BLEU score is calculated by counting the number of shared single or subsequent tokens between the generated sequence and the reference. Subsequent n tokens are called “n-grams”. Unigram refers to a single token while bi-gram refers to token pairs and n-grams refer to n subsequent tokens. The score ranges from 0 to 1, where 1 means the translation perfectly matched and 0 did not match at all",id:"bleu"},{description:"",id:"sacrebleu"}],models:[{description:"Very powerful model that can translate many languages between each other, especially low-resource languages.",id:"facebook/nllb-200-1.3B"},{description:"A general-purpose Transformer that can be used to translate from English to German, French, or Romanian.",id:"google-t5/t5-base"}],spaces:[{description:"An application that can translate between 100 languages.",id:"Iker/Translate-100-languages"},{description:"An application that can translate between many languages.",id:"Geonmo/nllb-translation-demo"}],summary:"Translation is the task of converting text from one language to another.",widgetModels:["facebook/mbart-large-50-many-to-many-mmt"],youtubeId:"1JvfrvZgi6c"},Xs=Ws,Qs={datasets:[{description:"A widely used dataset used to benchmark multiple variants of text classification.",id:"nyu-mll/glue"},{description:"A text classification dataset used to benchmark natural language inference models",id:"stanfordnlp/snli"}],demo:{inputs:[{label:"Input",content:"I love Hugging Face!",type:"text"}],outputs:[{type:"chart",data:[{label:"POSITIVE",score:.9},{label:"NEUTRAL",score:.1},{label:"NEGATIVE",score:0}]}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"The F1 metric is the harmonic mean of the precision and recall. It can be calculated as: F1 = 2 * (precision * recall) / (precision + recall)",id:"f1"}],models:[{description:"A robust model trained for sentiment analysis.",id:"distilbert/distilbert-base-uncased-finetuned-sst-2-english"},{description:"A sentiment analysis model specialized in financial sentiment.",id:"ProsusAI/finbert"},{description:"A sentiment analysis model specialized in analyzing tweets.",id:"cardiffnlp/twitter-roberta-base-sentiment-latest"},{description:"A model that can classify languages.",id:"papluca/xlm-roberta-base-language-detection"},{description:"A model that can classify text generation attacks.",id:"meta-llama/Prompt-Guard-86M"}],spaces:[{description:"An application that can classify financial sentiment.",id:"IoannisTr/Tech_Stocks_Trading_Assistant"},{description:"A dashboard that contains various text classification tasks.",id:"miesnerjacob/Multi-task-NLP"},{description:"An application that analyzes user reviews in healthcare.",id:"spacy/healthsea-demo"}],summary:"Text Classification is the task of assigning a label or class to a given text. Some use cases are sentiment analysis, natural language inference, and assessing grammatical correctness.",widgetModels:["distilbert/distilbert-base-uncased-finetuned-sst-2-english"],youtubeId:"leNG9fN9FQU"},Js=Qs,Ys={datasets:[{description:"Multilingual dataset used to evaluate text generation models.",id:"CohereForAI/Global-MMLU"},{description:"High quality multilingual data used to train text-generation models.",id:"HuggingFaceFW/fineweb-2"},{description:"Truly open-source, curated and cleaned dialogue dataset.",id:"HuggingFaceH4/ultrachat_200k"},{description:"A reasoning dataset.",id:"open-r1/OpenThoughts-114k-math"},{description:"A multilingual instruction dataset with preference ratings on responses.",id:"allenai/tulu-3-sft-mixture"},{description:"A large synthetic dataset for alignment of text generation models.",id:"HuggingFaceTB/smoltalk"},{description:"A dataset made for training text generation models solving math questions.",id:"HuggingFaceTB/finemath"}],demo:{inputs:[{label:"Input",content:"Once upon a time,",type:"text"}],outputs:[{label:"Output",content:"Once upon a time, we knew that our ancestors were on the verge of extinction. The great explorers and poets of the Old World, from Alexander the Great to Chaucer, are dead and gone. A good many of our ancient explorers and poets have",type:"text"}]},metrics:[{description:"Cross Entropy is a metric that calculates the difference between two probability distributions. Each probability distribution is the distribution of predicted words",id:"Cross Entropy"},{description:"The Perplexity metric is the exponential of the cross-entropy loss. It evaluates the probabilities assigned to the next word by the model. Lower perplexity indicates better performance",id:"Perplexity"}],models:[{description:"A text-generation model trained to follow instructions.",id:"google/gemma-2-2b-it"},{description:"Powerful text generation model for coding.",id:"Qwen/Qwen3-Coder-480B-A35B-Instruct"},{description:"Great text generation model with top-notch tool calling capabilities.",id:"openai/gpt-oss-120b"},{description:"Powerful text generation model.",id:"zai-org/GLM-4.5"},{description:"A powerful small model with reasoning capabilities.",id:"Qwen/Qwen3-4B-Thinking-2507"},{description:"Strong conversational model that supports very long instructions.",id:"Qwen/Qwen2.5-7B-Instruct-1M"},{description:"Text generation model used to write code.",id:"Qwen/Qwen2.5-Coder-32B-Instruct"},{description:"Powerful reasoning based open large language model.",id:"deepseek-ai/DeepSeek-R1"}],spaces:[{description:"An application that writes and executes code from text instructions and supports many models.",id:"akhaliq/anycoder"},{description:"An application that builds websites from natural language prompts.",id:"enzostvs/deepsite"},{description:"A leaderboard for comparing chain-of-thought performance of models.",id:"logikon/open_cot_leaderboard"},{description:"An text generation based application based on a very powerful LLaMA2 model.",id:"ysharma/Explore_llamav2_with_TGI"},{description:"An text generation based application to converse with Zephyr model.",id:"HuggingFaceH4/zephyr-chat"},{description:"A leaderboard that ranks text generation models based on blind votes from people.",id:"lmsys/chatbot-arena-leaderboard"},{description:"An chatbot to converse with a very powerful text generation model.",id:"mlabonne/phixtral-chat"}],summary:"Generating text is the task of generating new text given another text. These models can, for example, fill in incomplete text or paraphrase.",widgetModels:["mistralai/Mistral-Nemo-Instruct-2407"],youtubeId:"e9gNEAlsOvU"},Zs=Ys,Gs={datasets:[{description:"Bing queries with relevant passages from various web sources.",id:"microsoft/ms_marco"}],demo:{inputs:[{label:"Source sentence",content:"Machine learning is so easy.",type:"text"},{label:"Sentences to compare to",content:"Deep learning is so straightforward.",type:"text"},{label:"",content:"This is so difficult, like rocket science.",type:"text"},{label:"",content:"I can't believe how much I struggled with this.",type:"text"}],outputs:[{type:"chart",data:[{label:"Deep learning is so straightforward.",score:2.2006407},{label:"This is so difficult, like rocket science.",score:-6.2634873},{label:"I can't believe how much I struggled with this.",score:-10.251488}]}]},metrics:[{description:"Discounted Cumulative Gain (DCG) measures the gain, or usefulness, of search results discounted by their position. The normalization is done by dividing the DCG by the ideal DCG, which is the DCG of the perfect ranking.",id:"Normalized Discounted Cumulative Gain"},{description:"Reciprocal Rank is a measure used to rank the relevancy of documents given a set of documents. Reciprocal Rank is the reciprocal of the rank of the document retrieved, meaning, if the rank is 3, the Reciprocal Rank is 0.33. If the rank is 1, the Reciprocal Rank is 1",id:"Mean Reciprocal Rank"},{description:"Mean Average Precision (mAP) is the overall average of the Average Precision (AP) values, where AP is the Area Under the PR Curve (AUC-PR)",id:"Mean Average Precision"}],models:[{description:"An extremely efficient text ranking model trained on a web search dataset.",id:"cross-encoder/ms-marco-MiniLM-L6-v2"},{description:"A strong multilingual text reranker model.",id:"Alibaba-NLP/gte-multilingual-reranker-base"},{description:"An efficient text ranking model that punches above its weight.",id:"Alibaba-NLP/gte-reranker-modernbert-base"}],spaces:[],summary:"Text Ranking is the task of ranking a set of texts based on their relevance to a query. Text ranking models are trained on large datasets of queries and relevant documents to learn how to rank documents based on their relevance to the query. This task is particularly useful for search engines and information retrieval systems.",widgetModels:["cross-encoder/ms-marco-MiniLM-L6-v2"],youtubeId:""},el=Gs,tl={datasets:[{description:"Microsoft Research Video to Text is a large-scale dataset for open domain video captioning",id:"iejMac/CLIP-MSR-VTT"},{description:"UCF101 Human Actions dataset consists of 13,320 video clips from YouTube, with 101 classes.",id:"quchenyuan/UCF101-ZIP"},{description:"A high-quality dataset for human action recognition in YouTube videos.",id:"nateraw/kinetics"},{description:"A dataset of video clips of humans performing pre-defined basic actions with everyday objects.",id:"HuggingFaceM4/something_something_v2"},{description:"This dataset consists of text-video pairs and contains noisy samples with irrelevant video descriptions",id:"HuggingFaceM4/webvid"},{description:"A dataset of short Flickr videos for the temporal localization of events with descriptions.",id:"iejMac/CLIP-DiDeMo"}],demo:{inputs:[{label:"Input",content:"Darth Vader is surfing on the waves.",type:"text"}],outputs:[{filename:"text-to-video-output.gif",type:"img"}]},metrics:[{description:"Inception Score uses an image classification model that predicts class labels and evaluates how distinct and diverse the images are. A higher score indicates better video generation.",id:"is"},{description:"Frechet Inception Distance uses an image classification model to obtain image embeddings. The metric compares mean and standard deviation of the embeddings of real and generated images. A smaller score indicates better video generation.",id:"fid"},{description:"Frechet Video Distance uses a model that captures coherence for changes in frames and the quality of each frame. A smaller score indicates better video generation.",id:"fvd"},{description:"CLIPSIM measures similarity between video frames and text using an image-text similarity model. A higher score indicates better video generation.",id:"clipsim"}],models:[{description:"A strong model for consistent video generation.",id:"tencent/HunyuanVideo"},{description:"A text-to-video model with high fidelity motion and strong prompt adherence.",id:"Lightricks/LTX-Video"},{description:"A text-to-video model focusing on physics-aware applications like robotics.",id:"nvidia/Cosmos-1.0-Diffusion-7B-Text2World"},{description:"Very fast model for video generation.",id:"Lightricks/LTX-Video-0.9.8-13B-distilled"}],spaces:[{description:"An application that generates video from text.",id:"VideoCrafter/VideoCrafter"},{description:"Consistent video generation application.",id:"Wan-AI/Wan2.1"},{description:"A cutting edge video generation application.",id:"Pyramid-Flow/pyramid-flow"}],summary:"Text-to-video models can be used in any application that requires generating consistent sequence of images from text. ",widgetModels:["Wan-AI/Wan2.2-TI2V-5B"],youtubeId:void 0},al=tl,nl={datasets:[{description:"The CIFAR-100 dataset consists of 60000 32x32 colour images in 100 classes, with 600 images per class.",id:"cifar100"},{description:"Multiple images of celebrities, used for facial expression translation.",id:"CelebA"}],demo:{inputs:[{label:"Seed",content:"42",type:"text"},{label:"Number of images to generate:",content:"4",type:"text"}],outputs:[{filename:"unconditional-image-generation-output.jpeg",type:"img"}]},metrics:[{description:"The inception score (IS) evaluates the quality of generated images. It measures the diversity of the generated images (the model predictions are evenly distributed across all possible labels) and their 'distinction' or 'sharpness' (the model confidently predicts a single label for each image).",id:"Inception score (IS)"},{description:"The Fréchet Inception Distance (FID) evaluates the quality of images created by a generative model by calculating the distance between feature vectors for real and generated images.",id:"Frećhet Inception Distance (FID)"}],models:[{description:"High-quality image generation model trained on the CIFAR-10 dataset. It synthesizes images of the ten classes presented in the dataset using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",id:"google/ddpm-cifar10-32"},{description:"High-quality image generation model trained on the 256x256 CelebA-HQ dataset. It synthesizes images of faces using diffusion probabilistic models, a class of latent variable models inspired by considerations from nonequilibrium thermodynamics.",id:"google/ddpm-celebahq-256"}],spaces:[{description:"An application that can generate realistic faces.",id:"CompVis/celeba-latent-diffusion"}],summary:"Unconditional image generation is the task of generating images with no condition in any context (like a prompt text or another image). Once trained, the model will create images that resemble its training data distribution.",widgetModels:[""],youtubeId:""},il=nl,ol={datasets:[{description:"Benchmark dataset used for video classification with videos that belong to 400 classes.",id:"kinetics400"}],demo:{inputs:[{filename:"video-classification-input.gif",type:"img"}],outputs:[{type:"chart",data:[{label:"Playing Guitar",score:.514},{label:"Playing Tennis",score:.193},{label:"Cooking",score:.068}]}]},metrics:[{description:"",id:"accuracy"},{description:"",id:"recall"},{description:"",id:"precision"},{description:"",id:"f1"}],models:[{description:"Strong Video Classification model trained on the Kinetics 400 dataset.",id:"google/vivit-b-16x2-kinetics400"},{description:"Strong Video Classification model trained on the Kinetics 400 dataset.",id:"microsoft/xclip-base-patch32"}],spaces:[{description:"An application that classifies video at different timestamps.",id:"nateraw/lavila"},{description:"An application that classifies video.",id:"fcakyon/video-classification"}],summary:"Video classification is the task of assigning a label or class to an entire video. Videos are expected to have only one class for each video. Video classification models take a video as input and return a prediction about which class the video belongs to.",widgetModels:[],youtubeId:""},rl=ol,sl={datasets:[{description:"A large dataset used to train visual document retrieval models.",id:"vidore/colpali_train_set"}],demo:{inputs:[{filename:"input.png",type:"img"},{label:"Question",content:"Is the model in this paper the fastest for inference?",type:"text"}],outputs:[{type:"chart",data:[{label:"Page 10",score:.7},{label:"Page 11",score:.06},{label:"Page 9",score:.003}]}]},isPlaceholder:!1,metrics:[{description:"NDCG@k scores ranked recommendation lists for top-k results. 0 is the worst, 1 is the best.",id:"Normalized Discounted Cumulative Gain at K"}],models:[{description:"Very accurate visual document retrieval model for multilingual queries and documents.",id:"vidore/colqwen2-v1.0"},{description:"Very fast and efficient visual document retrieval model that can also take in other modalities like audio.",id:"Tevatron/OmniEmbed-v0.1"}],spaces:[{description:"A leaderboard of visual document retrieval models.",id:"vidore/vidore-leaderboard"},{description:"Visual retrieval augmented generation demo based on ColQwen2 model.",id:"vidore/visual-rag-tool"}],summary:"Visual document retrieval is the task of searching for relevant image-based documents, such as PDFs. These models take a text query and multiple documents as input and return the top-most relevant documents and relevancy scores as output.",widgetModels:[""],youtubeId:""},ll=sl,cl={datasets:[{description:"A widely used dataset containing questions (with answers) about images.",id:"Graphcore/vqa"},{description:"A dataset to benchmark visual reasoning based on text in images.",id:"facebook/textvqa"}],demo:{inputs:[{filename:"elephant.jpeg",type:"img"},{label:"Question",content:"What is in this image?",type:"text"}],outputs:[{type:"chart",data:[{label:"elephant",score:.97},{label:"elephants",score:.06},{label:"animal",score:.003}]}]},isPlaceholder:!1,metrics:[{description:"",id:"accuracy"},{description:"Measures how much a predicted answer differs from the ground truth based on the difference in their semantic meaning.",id:"wu-palmer similarity"}],models:[{description:"A visual question answering model trained to convert charts and plots to text.",id:"google/deplot"},{description:"A visual question answering model trained for mathematical reasoning and chart derendering from images.",id:"google/matcha-base"},{description:"A strong visual question answering that answers questions from book covers.",id:"google/pix2struct-ocrvqa-large"}],spaces:[{description:"An application that compares visual question answering models across different tasks.",id:"merve/pix2struct"},{description:"An application that can answer questions based on images.",id:"nielsr/vilt-vqa"},{description:"An application that can caption images and answer questions about a given image. ",id:"Salesforce/BLIP"},{description:"An application that can caption images and answer questions about a given image. ",id:"vumichien/Img2Prompt"}],summary:"Visual Question Answering is the task of answering open-ended questions based on an image. They output natural language responses to natural language questions.",widgetModels:["dandelin/vilt-b32-finetuned-vqa"],youtubeId:""},dl=cl,pl={datasets:[{description:"A widely used dataset used to benchmark multiple variants of text classification.",id:"nyu-mll/glue"},{description:"The Multi-Genre Natural Language Inference (MultiNLI) corpus is a crowd-sourced collection of 433k sentence pairs annotated with textual entailment information.",id:"nyu-mll/multi_nli"},{description:"FEVER is a publicly available dataset for fact extraction and verification against textual sources.",id:"fever/fever"}],demo:{inputs:[{label:"Text Input",content:"Dune is the best movie ever.",type:"text"},{label:"Candidate Labels",content:"CINEMA, ART, MUSIC",type:"text"}],outputs:[{type:"chart",data:[{label:"CINEMA",score:.9},{label:"ART",score:.1},{label:"MUSIC",score:0}]}]},metrics:[],models:[{description:"Powerful zero-shot text classification model.",id:"facebook/bart-large-mnli"},{description:"Cutting-edge zero-shot multilingual text classification model.",id:"MoritzLaurer/ModernBERT-large-zeroshot-v2.0"},{description:"Zero-shot text classification model that can be used for topic and sentiment classification.",id:"knowledgator/gliclass-modern-base-v2.0-init"}],spaces:[],summary:"Zero-shot text classification is a task in natural language processing where a model is trained on a set of labeled examples but is then able to classify new examples from previously unseen classes.",widgetModels:["facebook/bart-large-mnli"]},ul=pl,ml={datasets:[{description:"",id:""}],demo:{inputs:[{filename:"image-classification-input.jpeg",type:"img"},{label:"Classes",content:"cat, dog, bird",type:"text"}],outputs:[{type:"chart",data:[{label:"Cat",score:.664},{label:"Dog",score:.329},{label:"Bird",score:.008}]}]},metrics:[{description:"Computes the number of times the correct label appears in top K labels predicted",id:"top-K accuracy"}],models:[{description:"Multilingual image classification model for 80 languages.",id:"visheratin/mexma-siglip"},{description:"Strong zero-shot image classification model.",id:"google/siglip2-base-patch16-224"},{description:"Robust zero-shot image classification model.",id:"intfloat/mmE5-mllama-11b-instruct"},{description:"Powerful zero-shot image classification model supporting 94 languages.",id:"jinaai/jina-clip-v2"},{description:"Strong image classification model for biomedical domain.",id:"microsoft/BiomedCLIP-PubMedBERT_256-vit_base_patch16_224"}],spaces:[{description:"An application that leverages zero-shot image classification to find best captions to generate an image. ",id:"pharma/CLIP-Interrogator"},{description:"An application to compare different zero-shot image classification models. ",id:"merve/compare_clip_siglip"}],summary:"Zero-shot image classification is the task of classifying previously unseen classes during training of a model.",widgetModels:["google/siglip-so400m-patch14-224"],youtubeId:""},fl=ml,gl={datasets:[],demo:{inputs:[{filename:"zero-shot-object-detection-input.jpg",type:"img"},{label:"Classes",content:"cat, dog, bird",type:"text"}],outputs:[{filename:"zero-shot-object-detection-output.jpg",type:"img"}]},metrics:[{description:"The Average Precision (AP) metric is the Area Under the PR Curve (AUC-PR). It is calculated for each class separately",id:"Average Precision"},{description:"The Mean Average Precision (mAP) metric is the overall average of the AP values",id:"Mean Average Precision"},{description:"The APα metric is the Average Precision at the IoU threshold of a α value, for example, AP50 and AP75",id:"APα"}],models:[{description:"Solid zero-shot object detection model.",id:"openmmlab-community/mm_grounding_dino_large_all"},{description:"Cutting-edge zero-shot object detection model.",id:"fushh7/LLMDet"}],spaces:[{description:"A demo to compare different zero-shot object detection models per output and latency.",id:"ariG23498/zero-shot-od"},{description:"A demo that combines a zero-shot object detection and mask generation model for zero-shot segmentation.",id:"merve/OWLSAM"}],summary:"Zero-shot object detection is a computer vision task to detect objects and their classes in images, without any prior training or knowledge of the classes. Zero-shot object detection models receive an image as input, as well as a list of candidate classes, and output the bounding boxes and labels where the objects have been detected.",widgetModels:[],youtubeId:""},hl=gl,yl={datasets:[{description:"A large dataset of over 10 million 3D objects.",id:"allenai/objaverse-xl"},{description:"A dataset of isolated object images for evaluating image-to-3D models.",id:"dylanebert/iso3d"}],demo:{inputs:[{filename:"image-to-3d-image-input.png",type:"img"}],outputs:[{label:"Result",content:"image-to-3d-3d-output-filename.glb",type:"text"}]},metrics:[],models:[{description:"Fast image-to-3D mesh model by Tencent.",id:"TencentARC/InstantMesh"},{description:"3D world generation model.",id:"tencent/HunyuanWorld-1"},{description:"A scaled up image-to-3D mesh model derived from TripoSR.",id:"hwjiang/Real3D"},{description:"Consistent image-to-3d generation model.",id:"stabilityai/stable-point-aware-3d"}],spaces:[{description:"Leaderboard to evaluate image-to-3D models.",id:"dylanebert/3d-arena"},{description:"Image-to-3D demo with mesh outputs.",id:"TencentARC/InstantMesh"},{description:"Image-to-3D demo.",id:"stabilityai/stable-point-aware-3d"},{description:"Image-to-3D demo with mesh outputs.",id:"hwjiang/Real3D"},{description:"Image-to-3D demo with splat outputs.",id:"dylanebert/LGM-mini"}],summary:"Image-to-3D models take in image input and produce 3D output.",widgetModels:[],youtubeId:""},bl=yl,vl={datasets:[{description:"A large dataset of over 10 million 3D objects.",id:"allenai/objaverse-xl"},{description:"Descriptive captions for 3D objects in Objaverse.",id:"tiange/Cap3D"}],demo:{inputs:[{label:"Prompt",content:"a cat statue",type:"text"}],outputs:[{label:"Result",content:"text-to-3d-3d-output-filename.glb",type:"text"}]},metrics:[],models:[{description:"Text-to-3D mesh model by OpenAI",id:"openai/shap-e"},{description:"Generative 3D gaussian splatting model.",id:"ashawkey/LGM"}],spaces:[{description:"Text-to-3D demo with mesh outputs.",id:"hysts/Shap-E"},{description:"Text/image-to-3D demo with splat outputs.",id:"ashawkey/LGM"}],summary:"Text-to-3D models take in text input and produce 3D output.",widgetModels:[],youtubeId:""},wl=vl,_l={datasets:[{description:"A dataset of hand keypoints of over 500k examples.",id:"Vincent-luo/hagrid-mediapipe-hands"}],demo:{inputs:[{filename:"keypoint-detection-input.png",type:"img"}],outputs:[{filename:"keypoint-detection-output.png",type:"img"}]},metrics:[],models:[{description:"A robust keypoint detection model.",id:"magic-leap-community/superpoint"},{description:"A robust keypoint matching model.",id:"magic-leap-community/superglue_outdoor"},{description:"Strong keypoint detection model used to detect human pose.",id:"qualcomm/RTMPose-Body2d"},{description:"Powerful keypoint matching model.",id:"ETH-CVG/lightglue_disk"}],spaces:[{description:"An application that detects hand keypoints in real-time.",id:"datasciencedojo/Hand-Keypoint-Detection-Realtime"},{description:"An application for keypoint detection and matching.",id:"ETH-CVG/LightGlue"}],summary:"Keypoint detection is the task of identifying meaningful distinctive points or features in an image.",widgetModels:[],youtubeId:""},xl=_l,kl={datasets:[{description:"Multiple-choice questions and answers about videos.",id:"lmms-lab/Video-MME"},{description:"A dataset of instructions and question-answer pairs about videos.",id:"lmms-lab/VideoChatGPT"},{description:"Large video understanding dataset.",id:"HuggingFaceFV/finevideo"}],demo:{inputs:[{filename:"video-text-to-text-input.gif",type:"img"},{label:"Text Prompt",content:"What is happening in this video?",type:"text"}],outputs:[{label:"Answer",content:"The video shows a series of images showing a fountain with water jets and a variety of colorful flowers and butterflies in the background.",type:"text"}]},metrics:[],models:[{description:"A robust video-text-to-text model.",id:"Vision-CAIR/LongVU_Qwen2_7B"},{description:"Strong video-text-to-text model with reasoning capabilities.",id:"GoodiesHere/Apollo-LMMs-Apollo-7B-t32"},{description:"Strong video-text-to-text model.",id:"HuggingFaceTB/SmolVLM2-2.2B-Instruct"}],spaces:[{description:"An application to chat with a video-text-to-text model.",id:"llava-hf/video-llava"},{description:"A leaderboard for various video-text-to-text models.",id:"opencompass/openvlm_video_leaderboard"},{description:"An application to generate highlights from a video.",id:"HuggingFaceTB/SmolVLM2-HighlightGenerator"}],summary:"Video-text-to-text models take in a video and a text prompt and output text. These models are also called video-language models.",widgetModels:[""],youtubeId:""},Al=kl,Sl={datasets:[{description:"Dataset with detailed annotations for training and benchmarking video instance editing.",id:"suimu/VIRESET"},{description:"Dataset to evaluate models on long video generation and understanding.",id:"zhangsh2001/LongV-EVAL"},{description:"Collection of 104 demo videos from the SeedVR/SeedVR2 series showcasing model outputs.",id:"Iceclear/SeedVR_VideoDemos"}],demo:{inputs:[{filename:"input.gif",type:"img"}],outputs:[{filename:"output.gif",type:"img"}]},metrics:[],models:[{description:"Model for editing outfits, character, and scenery in videos.",id:"decart-ai/Lucy-Edit-Dev"},{description:"Framework that uses 3D mesh proxies for precise, consistent video editing.",id:"LeoLau/Shape-for-Motion"},{description:"Model for generating physics-aware videos from input videos and control conditions.",id:"nvidia/Cosmos-Transfer2.5-2B"},{description:"A model to upscale videos at input, designed for seamless use with ComfyUI.",id:"numz/SeedVR2_comfyUI"}],spaces:[{description:"Interactive demo space for Lucy-Edit-Dev video editing.",id:"decart-ai/lucy-edit-dev"},{description:"Demo space for SeedVR2-3B showcasing video upscaling and restoration.",id:"ByteDance-Seed/SeedVR2-3B"}],summary:"Video-to-video models take one or more videos as input and generate new videos as output. They can enhance quality, interpolate frames, modify styles, or create new motion dynamics, enabling creative applications, video production, and research.",widgetModels:[],youtubeId:""},Il=Sl,Tl={"audio-classification":["speechbrain","transformers","transformers.js"],"audio-to-audio":["asteroid","fairseq","speechbrain"],"automatic-speech-recognition":["espnet","nemo","speechbrain","transformers","transformers.js"],"audio-text-to-text":["transformers"],"depth-estimation":["transformers","transformers.js"],"document-question-answering":["transformers","transformers.js"],"feature-extraction":["sentence-transformers","transformers","transformers.js"],"fill-mask":["transformers","transformers.js"],"graph-ml":["transformers"],"image-classification":["keras","timm","transformers","transformers.js"],"image-feature-extraction":["timm","transformers"],"image-segmentation":["transformers","transformers.js"],"image-text-to-text":["transformers"],"image-to-image":["diffusers","transformers","transformers.js"],"image-to-text":["transformers","transformers.js"],"image-to-video":["diffusers"],"keypoint-detection":["transformers"],"video-classification":["transformers"],"mask-generation":["transformers"],"multiple-choice":["transformers"],"object-detection":["transformers","transformers.js","ultralytics"],other:[],"question-answering":["adapter-transformers","allennlp","transformers","transformers.js"],robotics:[],"reinforcement-learning":["transformers","stable-baselines3","ml-agents","sample-factory"],"sentence-similarity":["sentence-transformers","spacy","transformers.js"],summarization:["transformers","transformers.js"],"table-question-answering":["transformers"],"table-to-text":["transformers"],"tabular-classification":["sklearn"],"tabular-regression":["sklearn"],"tabular-to-text":["transformers"],"text-classification":["adapter-transformers","setfit","spacy","transformers","transformers.js"],"text-generation":["transformers","transformers.js"],"text-ranking":["sentence-transformers","transformers"],"text-retrieval":[],"text-to-image":["diffusers"],"text-to-speech":["espnet","tensorflowtts","transformers","transformers.js"],"text-to-audio":["transformers","transformers.js"],"text-to-video":["diffusers"],"time-series-forecasting":[],"token-classification":["adapter-transformers","flair","spacy","span-marker","stanza","transformers","transformers.js"],translation:["transformers","transformers.js"],"unconditional-image-generation":["diffusers"],"video-text-to-text":["transformers"],"visual-question-answering":["transformers","transformers.js"],"voice-activity-detection":[],"zero-shot-classification":["transformers","transformers.js"],"zero-shot-image-classification":["transformers","transformers.js"],"zero-shot-object-detection":["transformers","transformers.js"],"text-to-3d":["diffusers"],"image-to-3d":["diffusers"],"any-to-any":["transformers"],"visual-document-retrieval":["transformers"],"video-to-video":["diffusers"]};function S(e,t=Is){return{...t,id:e,label:Dt[e].name,libraries:Tl[e]}}S("any-to-any",Vr),S("audio-classification",zr),S("audio-to-audio",Jr),S("audio-text-to-text",Xr),S("automatic-speech-recognition",Zr),S("depth-estimation",As),S("document-question-answering",es),S("visual-document-retrieval",ll),S("feature-extraction",as),S("fill-mask",is),S("image-classification",rs),S("image-feature-extraction",ls),S("image-segmentation",hs),S("image-to-image",ds),S("image-text-to-text",fs),S("image-to-text",us),S("image-to-video",bs),S("keypoint-detection",xl),S("mask-generation",ws),S("object-detection",xs),S("video-classification",rl),S("question-answering",Ps),S("reinforcement-learning",Cs),S("sentence-similarity",Ls),S("summarization",$s),S("table-question-answering",Ds),S("tabular-classification",js),S("tabular-regression",Os),S("text-classification",Js),S("text-generation",Zs),S("text-ranking",el),S("text-to-image",Fs),S("text-to-speech",Vs),S("text-to-video",al),S("token-classification",zs),S("translation",Xs),S("unconditional-image-generation",il),S("video-text-to-text",Al),S("video-to-video",Il),S("visual-question-answering",dl),S("zero-shot-classification",ul),S("zero-shot-image-classification",fl),S("zero-shot-object-detection",hl),S("text-to-3d",wl),S("image-to-3d",bl);var Cl=()=>'"Hi, I recently bought a device from your company but it is not working as advertised and I would like to get reimbursed!"',El=()=>'"Меня зовут Вольфганг и я живу в Берлине"',Pl=()=>'"The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct."',Rl=()=>`{
    "query": "How many stars does the transformers repository have?",
    "table": {
        "Repository": ["Transformers", "Datasets", "Tokenizers"],
        "Stars": ["36542", "4512", "3934"],
        "Contributors": ["651", "77", "34"],
        "Programming language": [
            "Python",
            "Python",
            "Rust, Python and NodeJS"
        ]
    }
}`,Ll=()=>`{
        "image": "cat.png",
        "question": "What is in this image?"
    }`,Ul=()=>`{
    "question": "What is my name?",
    "context": "My name is Clara and I live in Berkeley."
}`,$l=()=>'"I like you. I love you"',Ml=()=>'"My name is Sarah Jessica Parker but you can call me Jessica"',ia=e=>e.tags.includes("conversational")?e.pipeline_tag==="text-generation"?[{role:"user",content:"What is the capital of France?"}]:[{role:"user",content:[{type:"text",text:"Describe this image in one sentence."},{type:"image_url",image_url:{url:"https://cdn.britannica.com/61/93061-050-99147DCE/Statue-of-Liberty-Island-New-York-Bay.jpg"}}]}]:'"Can you please let us know more details about your "',Dl=e=>`"The answer to the universe is ${e.mask_token}."`,Bl=()=>`{
    "source_sentence": "That is a happy person",
    "sentences": [
        "That is a happy dog",
        "That is a very happy person",
        "Today is a sunny day"
    ]
}`,jl=()=>'"Today is a sunny day and I will get some ice cream."',Nl=()=>'"cats.jpg"',Ol=()=>'"cats.jpg"',ql=()=>`{
    "image": "cat.png",
    "prompt": "Turn the cat into a tiger."
}`,Fl=()=>`{
    "image": "cat.png",
    "prompt": "The cat starts to dance"
}`,Hl=()=>'"cats.jpg"',Vl=()=>'"cats.jpg"',Kl=()=>'"sample1.flac"',zl=()=>'"sample1.flac"',Wl=()=>'"Astronaut riding a horse"',Xl=()=>'"A young man walking on the street"',Ql=()=>'"The answer to the universe is 42"',Jl=()=>'"liquid drum and bass, atmospheric synths, airy sounds"',Yl=()=>'"sample1.flac"',oa=()=>`'{"Height":[11.52,12.48],"Length1":[23.2,24.0],"Length2":[25.4,26.3],"Species": ["Bream","Bream"]}'`,Zl=()=>'"cats.jpg"',Gl={"audio-to-audio":Kl,"audio-classification":zl,"automatic-speech-recognition":Yl,"document-question-answering":Ll,"feature-extraction":jl,"fill-mask":Dl,"image-classification":Nl,"image-to-text":Ol,"image-to-image":ql,"image-to-video":Fl,"image-segmentation":Hl,"object-detection":Vl,"question-answering":Ul,"sentence-similarity":Bl,summarization:Pl,"table-question-answering":Rl,"tabular-regression":oa,"tabular-classification":oa,"text-classification":$l,"text-generation":ia,"image-text-to-text":ia,"text-to-image":Wl,"text-to-video":Xl,"text-to-speech":Ql,"text-to-audio":Jl,"token-classification":Ml,translation:El,"zero-shot-classification":Cl,"zero-shot-image-classification":Zl};function Be(e,t=!1,a=!1){if(e.pipeline_tag){const n=Gl[e.pipeline_tag];if(n){let i=n(e);if(typeof i=="string"&&(t&&(i=i.replace(/(?:(?:\r?\n|\r)\t*)|\t+/g," ")),a)){const o=/^"(.+)"$/s,r=i.match(o);i=r?r[1]:i}return i}}return"No input example has been defined for this model task."}function ec(e,t){let a=JSON.stringify(e,null,"	");return t!=null&&t.indent&&(a=a.replaceAll(`
`,`
${t.indent}`)),t!=null&&t.attributeKeyQuotes||(a=a.replace(/"([^"]+)":/g,"$1:")),t!=null&&t.customContentEscaper&&(a=t.customContentEscaper(a)),a}var Na="custom_code";function Se(e){const t=e.split("/");return t.length===1?t[0]:t[1]}var tc=e=>JSON.stringify(e).slice(1,-1),ac=e=>{var t,a;return[`from adapters import AutoAdapterModel

model = AutoAdapterModel.from_pretrained("${(a=(t=e.config)==null?void 0:t.adapter_transformers)==null?void 0:a.model_name}")
model.load_adapter("${e.id}", set_active=True)`]},nc=e=>[`import allennlp_models
from allennlp.predictors.predictor import Predictor

predictor = Predictor.from_path("hf://${e.id}")`],ic=e=>[`import allennlp_models
from allennlp.predictors.predictor import Predictor

predictor = Predictor.from_path("hf://${e.id}")
predictor_input = {"passage": "My name is Wolfgang and I live in Berlin", "question": "Where do I live?"}
predictions = predictor.predict_json(predictor_input)`],oc=e=>e.tags.includes("question-answering")?ic(e):nc(e),rc=e=>[`from araclip import AraClip

model = AraClip.from_pretrained("${e.id}")`],sc=e=>[`from asteroid.models import BaseModel

model = BaseModel.from_pretrained("${e.id}")`],lc=e=>{const t=`# Watermark Generator
from audioseal import AudioSeal

model = AudioSeal.load_generator("${e.id}")
# pass a tensor (tensor_wav) of shape (batch, channels, samples) and a sample rate
wav, sr = tensor_wav, 16000
	
watermark = model.get_watermark(wav, sr)
watermarked_audio = wav + watermark`,a=`# Watermark Detector
from audioseal import AudioSeal

detector = AudioSeal.load_detector("${e.id}")
	
result, message = detector.detect_watermark(watermarked_audio, sr)`;return[t,a]};function ze(e){var t,a;return((a=(t=e.cardData)==null?void 0:t.base_model)==null?void 0:a.toString())??"fill-in-base-model"}function je(e){var a,n,i;const t=((n=(a=e.widgetData)==null?void 0:a[0])==null?void 0:n.text)??((i=e.cardData)==null?void 0:i.instance_prompt);if(t)return tc(t)}var cc=e=>[`import requests
from PIL import Image
from ben2 import AutoModel

url = "https://huggingface.co/datasets/mishig/sample_images/resolve/main/teapot.jpg"
image = Image.open(requests.get(url, stream=True).raw)

model = AutoModel.from_pretrained("${e.id}")
model.to("cuda").eval()
foreground = model.inference(image)
`],dc=e=>[`from bertopic import BERTopic

model = BERTopic.load("${e.id}")`],pc=e=>[`from bm25s.hf import BM25HF

retriever = BM25HF.load_from_hub("${e.id}")`],uc=()=>[`# pip install chatterbox-tts
import torchaudio as ta
from chatterbox.tts import ChatterboxTTS

model = ChatterboxTTS.from_pretrained(device="cuda")

text = "Ezreal and Jinx teamed up with Ahri, Yasuo, and Teemo to take down the enemy's Nexus in an epic late-game pentakill."
wav = model.generate(text)
ta.save("test-1.wav", wav, model.sr)

# If you want to synthesize with a different voice, specify the audio prompt
AUDIO_PROMPT_PATH="YOUR_FILE.wav"
wav = model.generate(text, audio_prompt_path=AUDIO_PROMPT_PATH)
ta.save("test-2.wav", wav, model.sr)`],mc=e=>{const t="pip install chronos-forecasting",a=`import pandas as pd
from chronos import BaseChronosPipeline

pipeline = BaseChronosPipeline.from_pretrained("${e.id}", device_map="cuda")

# Load historical data
context_df = pd.read_csv("https://autogluon.s3.us-west-2.amazonaws.com/datasets/timeseries/misc/AirPassengers.csv")

# Generate predictions
pred_df = pipeline.predict_df(
    context_df,
    prediction_length=36,  # Number of steps to forecast
    quantile_levels=[0.1, 0.5, 0.9],  # Quantiles for probabilistic forecast
    id_column="item_id",  # Column identifying different time series
    timestamp_column="Month",  # Column with datetime information
    target="#Passengers",  # Column(s) with time series values to predict
)`;return[t,a]},fc=()=>["pip install git+https://github.com/SAP-samples/sap-rpt-1-oss",`# Run a classification task
from sklearn.datasets import load_breast_cancer
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

from sap_rpt_oss import SAP_RPT_OSS_Classifier

# Load sample data
X, y = load_breast_cancer(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# Initialize a classifier, 8k context and 8-fold bagging gives best performance, reduce if running out of memory
clf = SAP_RPT_OSS_Classifier(max_context_size=8192, bagging=8)

clf.fit(X_train, y_train)

# Predict probabilities
prediction_probabilities = clf.predict_proba(X_test)
# Predict labels
predictions = clf.predict(X_test)
print("Accuracy", accuracy_score(y_test, predictions))`,`# Run a regression task
from sklearn.datasets import fetch_openml
from sklearn.metrics import r2_score
from sklearn.model_selection import train_test_split

from sap_rpt_oss import SAP_RPT_OSS_Regressor

# Load sample data
df = fetch_openml(data_id=531, as_frame=True)
X = df.data
y = df.target.astype(float)

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.5, random_state=42)

# Initialize the regressor, 8k context and 8-fold bagging gives best performance, reduce if running out of memory
regressor = SAP_RPT_OSS_Regressor(max_context_size=8192, bagging=8)

regressor.fit(X_train, y_train)

# Predict on the test set
predictions = regressor.predict(X_test)

r2 = r2_score(y_test, predictions)
print("R² Score:", r2)`],gc=()=>[`# pip install git+https://github.com/Google-Health/cxr-foundation.git#subdirectory=python

# Load image as grayscale (Stillwaterising, CC0, via Wikimedia Commons)
import requests
from PIL import Image
from io import BytesIO
image_url = "https://upload.wikimedia.org/wikipedia/commons/c/c8/Chest_Xray_PA_3-8-2010.png"
img = Image.open(requests.get(image_url, headers={'User-Agent': 'Demo'}, stream=True).raw).convert('L')

# Run inference
from clientside.clients import make_hugging_face_client
cxr_client = make_hugging_face_client('cxr_model')
print(cxr_client.get_image_embeddings_from_images([img]))`],hc=e=>{let t,a,n;return t="<ENCODER>",a="<NUMBER_OF_FEATURES>",n="<OUT_CHANNELS>",e.id==="depth-anything/Depth-Anything-V2-Small"?(t="vits",a="64",n="[48, 96, 192, 384]"):e.id==="depth-anything/Depth-Anything-V2-Base"?(t="vitb",a="128",n="[96, 192, 384, 768]"):e.id==="depth-anything/Depth-Anything-V2-Large"&&(t="vitl",a="256",n="[256, 512, 1024, 1024"),[`
# Install from https://github.com/DepthAnything/Depth-Anything-V2

# Load the model and infer depth from an image
import cv2
import torch

from depth_anything_v2.dpt import DepthAnythingV2

# instantiate the model
model = DepthAnythingV2(encoder="${t}", features=${a}, out_channels=${n})

# load the weights
filepath = hf_hub_download(repo_id="${e.id}", filename="depth_anything_v2_${t}.pth", repo_type="model")
state_dict = torch.load(filepath, map_location="cpu")
model.load_state_dict(state_dict).eval()

raw_img = cv2.imread("your/image/path")
depth = model.infer_image(raw_img) # HxW raw depth map in numpy
    `]},yc=e=>[`# Download checkpoint
pip install huggingface-hub
huggingface-cli download --local-dir checkpoints ${e.id}`,`import depth_pro

# Load model and preprocessing transform
model, transform = depth_pro.create_model_and_transforms()
model.eval()

# Load and preprocess an image.
image, _, f_px = depth_pro.load_rgb("example.png")
image = transform(image)

# Run inference.
prediction = model.infer(image, f_px=f_px)

# Results: 1. Depth in meters
depth = prediction["depth"]
# Results: 2. Focal length in pixels
focallength_px = prediction["focallength_px"]`],bc=()=>[`from huggingface_hub import from_pretrained_keras
import tensorflow as tf, requests

# Load and format input
IMAGE_URL = "https://storage.googleapis.com/dx-scin-public-data/dataset/images/3445096909671059178.png"
input_tensor = tf.train.Example(
    features=tf.train.Features(
        feature={
            "image/encoded": tf.train.Feature(
                bytes_list=tf.train.BytesList(value=[requests.get(IMAGE_URL, stream=True).content])
            )
        }
    )
).SerializeToString()

# Load model and run inference
loaded_model = from_pretrained_keras("google/derm-foundation")
infer = loaded_model.signatures["serving_default"]
print(infer(inputs=tf.constant([input_tensor])))`],vc=e=>[`import soundfile as sf
from dia.model import Dia

model = Dia.from_pretrained("${e.id}")
text = "[S1] Dia is an open weights text to dialogue model. [S2] You get full control over scripts and voices. [S1] Wow. Amazing. (laughs) [S2] Try it now on Git hub or Hugging Face."
output = model.generate(text)

sf.write("simple.mp3", output, 44100)`],wc=e=>[`# pip install git+https://github.com/NVlabs/describe-anything
from huggingface_hub import snapshot_download
from dam import DescribeAnythingModel

snapshot_download(${e.id}, local_dir="checkpoints")

dam = DescribeAnythingModel(
	model_path="checkpoints",
	conv_mode="v1",
	prompt_mode="focal_prompt",
)`],_c="pip install -U diffusers transformers accelerate",Oa="Astronaut in a jungle, cold color palette, muted colors, detailed, 8k",qa="Turn this cat into a dog",Bt="A man with short gray hair plays a red electric guitar.",xc=e=>[`import torch
from diffusers import DiffusionPipeline

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${e.id}", dtype=torch.bfloat16, device_map="cuda")

prompt = "${je(e)??Oa}"
image = pipe(prompt).images[0]`],kc=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${e.id}", dtype=torch.bfloat16, device_map="cuda")

prompt = "${je(e)??qa}"
input_image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/cat.png")

image = pipe(image=input_image, prompt=prompt).images[0]`],Ac=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image, export_to_video

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${e.id}", dtype=torch.bfloat16, device_map="cuda")
pipe.to("cuda")

prompt = "${je(e)??Bt}"
image = load_image(
    "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/guitar-man.png"
)

output = pipe(image=image, prompt=prompt).frames[0]
export_to_video(output, "output.mp4")`],Sc=e=>[`from diffusers import ControlNetModel, StableDiffusionControlNetPipeline

controlnet = ControlNetModel.from_pretrained("${e.id}")
pipe = StableDiffusionControlNetPipeline.from_pretrained(
	"${ze(e)}", controlnet=controlnet
)`],Ic=e=>[`import torch
from diffusers import DiffusionPipeline

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${ze(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_lora_weights("${e.id}")

prompt = "${je(e)??Oa}"
image = pipe(prompt).images[0]`],Tc=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${ze(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_lora_weights("${e.id}")

prompt = "${je(e)??qa}"
input_image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/cat.png")

image = pipe(image=input_image, prompt=prompt).images[0]`],Cc=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import export_to_video

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${ze(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_lora_weights("${e.id}")

prompt = "${je(e)??Bt}"

output = pipe(prompt=prompt).frames[0]
export_to_video(output, "output.mp4")`],Ec=e=>[`import torch
from diffusers import DiffusionPipeline
from diffusers.utils import load_image, export_to_video

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${ze(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_lora_weights("${e.id}")

prompt = "${je(e)??Bt}"
input_image = load_image("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/diffusers/guitar-man.png")

image = pipe(image=input_image, prompt=prompt).frames[0]
export_to_video(output, "output.mp4")`],Pc=e=>[`import torch
from diffusers import DiffusionPipeline

# switch to "mps" for apple devices
pipe = DiffusionPipeline.from_pretrained("${ze(e)}", dtype=torch.bfloat16, device_map="cuda")
pipe.load_textual_inversion("${e.id}")`],Rc=e=>[`import torch
from diffusers import FluxFillPipeline
from diffusers.utils import load_image

image = load_image("https://huggingface.co/datasets/diffusers/diffusers-images-docs/resolve/main/cup.png")
mask = load_image("https://huggingface.co/datasets/diffusers/diffusers-images-docs/resolve/main/cup_mask.png")

# switch to "mps" for apple devices
pipe = FluxFillPipeline.from_pretrained("${e.id}", dtype=torch.bfloat16, device_map="cuda")
image = pipe(
    prompt="a white paper cup",
    image=image,
    mask_image=mask,
    height=1632,
    width=1232,
    guidance_scale=30,
    num_inference_steps=50,
    max_sequence_length=512,
    generator=torch.Generator("cpu").manual_seed(0)
).images[0]
image.save(f"flux-fill-dev.png")`],Lc=e=>[`import torch
from diffusers import AutoPipelineForInpainting
from diffusers.utils import load_image

# switch to "mps" for apple devices
pipe = AutoPipelineForInpainting.from_pretrained("${e.id}", dtype=torch.float16, variant="fp16", device_map="cuda")

img_url = "https://raw.githubusercontent.com/CompVis/latent-diffusion/main/data/inpainting_examples/overture-creations-5sI6fQgYIuo.png"
mask_url = "https://raw.githubusercontent.com/CompVis/latent-diffusion/main/data/inpainting_examples/overture-creations-5sI6fQgYIuo_mask.png"

image = load_image(img_url).resize((1024, 1024))
mask_image = load_image(mask_url).resize((1024, 1024))

prompt = "a tiger sitting on a park bench"
generator = torch.Generator(device="cuda").manual_seed(0)

image = pipe(
  prompt=prompt,
  image=image,
  mask_image=mask_image,
  guidance_scale=8.0,
  num_inference_steps=20,  # steps between 15 and 30 work well for us
  strength=0.99,  # make sure to use \`strength\` below 1.0
  generator=generator,
).images[0]`],Fa=e=>{let t;return e.tags.includes("StableDiffusionInpaintPipeline")||e.tags.includes("StableDiffusionXLInpaintPipeline")?t=Lc(e):e.tags.includes("controlnet")?t=Sc(e):e.tags.includes("lora")?e.pipeline_tag==="image-to-image"?t=Tc(e):e.pipeline_tag==="image-to-video"?t=Ec(e):e.pipeline_tag==="text-to-video"?t=Cc(e):t=Ic(e):e.tags.includes("textual_inversion")?t=Pc(e):e.tags.includes("FluxFillPipeline")?t=Rc(e):e.pipeline_tag==="image-to-video"?t=Ac(e):e.pipeline_tag==="image-to-image"?t=kc(e):t=xc(e),[_c,...t]},Uc=e=>{const t=`# Pipeline for Stable Diffusion 3
from diffusionkit.mlx import DiffusionPipeline

pipeline = DiffusionPipeline(
	shift=3.0,
	use_t5=False,
	model_version=${e.id},
	low_memory_mode=True,
	a16=True,
	w16=True,
)`,a=`# Pipeline for Flux
from diffusionkit.mlx import FluxPipeline

pipeline = FluxPipeline(
  shift=1.0,
  model_version=${e.id},
  low_memory_mode=True,
  a16=True,
  w16=True,
)`,n=`# Image Generation
HEIGHT = 512
WIDTH = 512
NUM_STEPS = ${e.tags.includes("flux")?4:50}
CFG_WEIGHT = ${e.tags.includes("flux")?0:5}

image, _ = pipeline.generate_image(
  "a photo of a cat",
  cfg_weight=CFG_WEIGHT,
  num_steps=NUM_STEPS,
  latent_size=(HEIGHT // 8, WIDTH // 8),
)`;return[e.tags.includes("flux")?a:t,n]},$c=e=>[`# pip install --no-binary :all: cartesia-pytorch
from cartesia_pytorch import ReneLMHeadModel
from transformers import AutoTokenizer

model = ReneLMHeadModel.from_pretrained("${e.id}")
tokenizer = AutoTokenizer.from_pretrained("allenai/OLMo-1B-hf")

in_message = ["Rene Descartes was"]
inputs = tokenizer(in_message, return_tensors="pt")

outputs = model.generate(inputs.input_ids, max_length=50, top_k=100, top_p=0.99)
out_message = tokenizer.batch_decode(outputs, skip_special_tokens=True)[0]

print(out_message)
)`],Mc=e=>[`import mlx.core as mx
import cartesia_mlx as cmx

model = cmx.from_pretrained("${e.id}")
model.set_dtype(mx.float32)   

prompt = "Rene Descartes was"

for text in model.generate(
    prompt,
    max_tokens=500,
    eval_every_n=5,
    verbose=True,
    top_p=0.99,
    temperature=0.85,
):
    print(text, end="", flush=True)
`],Dc=e=>{const t=Se(e.id).replaceAll("-","_");return[`# Load it from the Hub directly
import edsnlp
nlp = edsnlp.load("${e.id}")
`,`# Or install it as a package
!pip install git+https://huggingface.co/${e.id}

# and import it as a module
import ${t}

nlp = ${t}.load()  # or edsnlp.load("${t}")
`]},Bc=e=>[`from espnet2.bin.tts_inference import Text2Speech

model = Text2Speech.from_pretrained("${e.id}")

speech, *_ = model("text to generate speech from")`],jc=e=>[`from espnet2.bin.asr_inference import Speech2Text

model = Speech2Text.from_pretrained(
  "${e.id}"
)

speech, rate = soundfile.read("speech.wav")
text, *_ = model(speech)[0]`],Nc=()=>["unknown model type (must be text-to-speech or automatic-speech-recognition)"],Oc=e=>e.tags.includes("text-to-speech")?Bc(e):e.tags.includes("automatic-speech-recognition")?jc(e):Nc(),qc=e=>[`from fairseq.checkpoint_utils import load_model_ensemble_and_task_from_hf_hub

models, cfg, task = load_model_ensemble_and_task_from_hf_hub(
    "${e.id}"
)`],Fc=e=>[`from flair.models import SequenceTagger

tagger = SequenceTagger.load("${e.id}")`],Hc=e=>[`from gliner import GLiNER

model = GLiNER.from_pretrained("${e.id}")`],Vc=e=>[`from gliner2 import GLiNER2

model = GLiNER2.from_pretrained("${e.id}")

# Extract entities
text = "Apple CEO Tim Cook announced iPhone 15 in Cupertino yesterday."
result = extractor.extract_entities(text, ["company", "person", "product", "location"])

print(result)`],Kc=e=>[`# Download model
from huggingface_hub import snapshot_download

snapshot_download(${e.id}, local_dir="checkpoints")

from indextts.infer import IndexTTS

# Ensure config.yaml is present in the checkpoints directory
tts = IndexTTS(model_dir="checkpoints", cfg_path="checkpoints/config.yaml")

voice = "path/to/your/reference_voice.wav"  # Path to the voice reference audio file
text = "Hello, how are you?"
output_path = "output_index.wav"

tts.infer(voice, text, output_path)`],zc=e=>[`# CLI usage
# see docs: https://ai-riksarkivet.github.io/htrflow/latest/getting_started/quick_start.html
htrflow pipeline <path/to/pipeline.yaml> <path/to/image>`,`# Python usage
from htrflow.pipeline.pipeline import Pipeline
from htrflow.pipeline.steps import Task
from htrflow.models.framework.model import ModelClass

pipeline = Pipeline(
    [
        Task(
            ModelClass, {"model": "${e.id}"}, {}
        ),
    ])`],Wc=e=>[`# Available backend options are: "jax", "torch", "tensorflow".
import os
os.environ["KERAS_BACKEND"] = "jax"
	
import keras

model = keras.saving.load_model("hf://${e.id}")
`],Xc=e=>`
import keras_hub

# Load CausalLM model (optional: use half precision for inference)
causal_lm = keras_hub.models.CausalLM.from_preset("hf://${e}", dtype="bfloat16")
causal_lm.compile(sampler="greedy")  # (optional) specify a sampler

# Generate text
causal_lm.generate("Keras: deep learning for", max_length=64)
`,Qc=e=>`
import keras_hub

# Load TextToImage model (optional: use half precision for inference)
text_to_image = keras_hub.models.TextToImage.from_preset("hf://${e}", dtype="bfloat16")

# Generate images with a TextToImage model.
text_to_image.generate("Astronaut in a jungle")
`,Jc=e=>`
import keras_hub

# Load TextClassifier model
text_classifier = keras_hub.models.TextClassifier.from_preset(
    "hf://${e}",
    num_classes=2,
)
# Fine-tune
text_classifier.fit(x=["Thilling adventure!", "Total snoozefest."], y=[1, 0])
# Classify text
text_classifier.predict(["Not my cup of tea."])
`,Yc=e=>`
import keras_hub
import keras

# Load ImageClassifier model
image_classifier = keras_hub.models.ImageClassifier.from_preset(
    "hf://${e}",
    num_classes=2,
)
# Fine-tune
image_classifier.fit(
    x=keras.random.randint((32, 64, 64, 3), 0, 256),
    y=keras.random.randint((32, 1), 0, 2),
)
# Classify image
image_classifier.predict(keras.random.randint((1, 64, 64, 3), 0, 256))
`,ra={CausalLM:Xc,TextToImage:Qc,TextClassifier:Jc,ImageClassifier:Yc},Zc=(e,t)=>`
import keras_hub

# Create a ${e} model
task = keras_hub.models.${e}.from_preset("hf://${t}")
`,Gc=e=>`
import keras_hub

# Create a Backbone model unspecialized for any task
backbone = keras_hub.models.Backbone.from_preset("hf://${e}")
`,ed=e=>{var i,o;const t=e.id,a=((o=(i=e.config)==null?void 0:i.keras_hub)==null?void 0:o.tasks)??[],n=[];for(const[r,l]of Object.entries(ra))a.includes(r)&&n.push(l(t));for(const r of a)Object.keys(ra).includes(r)||n.push(Zc(r,t));return n.push(Gc(t)),n},td=e=>[`# !pip install kernels

from kernels import get_kernel

kernel = get_kernel("${e.id}")`],ad=e=>[`# Example usage for KimiAudio
# pip install git+https://github.com/MoonshotAI/Kimi-Audio.git

from kimia_infer.api.kimia import KimiAudio

model = KimiAudio(model_path="${e.id}", load_detokenizer=True)

sampling_params = {
    "audio_temperature": 0.8,
    "audio_top_k": 10,
    "text_temperature": 0.0,
    "text_top_k": 5,
}

# For ASR
asr_audio = "asr_example.wav"
messages_asr = [
    {"role": "user", "message_type": "text", "content": "Please transcribe the following audio:"},
    {"role": "user", "message_type": "audio", "content": asr_audio}
]
_, text = model.generate(messages_asr, **sampling_params, output_type="text")
print(text)

# For Q&A
qa_audio = "qa_example.wav"
messages_conv = [{"role": "user", "message_type": "audio", "content": qa_audio}]
wav, text = model.generate(messages_conv, **sampling_params, output_type="both")
sf.write("output_audio.wav", wav.cpu().view(-1).numpy(), 24000)
print(text)
`],nd=e=>[`from kittentts import KittenTTS
m = KittenTTS("${e.id}")

audio = m.generate("This high quality TTS model works without a GPU")

# Save the audio
import soundfile as sf
sf.write('output.wav', audio, 24000)`],id=e=>e.tags.includes("bi-encoder")?[`#install from https://github.com/webis-de/lightning-ir

from lightning_ir import BiEncoderModule
model = BiEncoderModule("${e.id}")

model.score("query", ["doc1", "doc2", "doc3"])`]:e.tags.includes("cross-encoder")?[`#install from https://github.com/webis-de/lightning-ir

from lightning_ir import CrossEncoderModule
model = CrossEncoderModule("${e.id}")

model.score("query", ["doc1", "doc2", "doc3"])`]:[`#install from https://github.com/webis-de/lightning-ir

from lightning_ir import BiEncoderModule, CrossEncoderModule

# depending on the model type, use either BiEncoderModule or CrossEncoderModule
model = BiEncoderModule("${e.id}") 
# model = CrossEncoderModule("${e.id}")

model.score("query", ["doc1", "doc2", "doc3"])`],od=e=>{const t=[`# !pip install llama-cpp-python

from llama_cpp import Llama

llm = Llama.from_pretrained(
	repo_id="${e.id}",
	filename="{{GGUF_FILE}}",
)
`];if(e.tags.includes("conversational")){const a=Be(e);t.push(`llm.create_chat_completion(
	messages = ${ec(a,{attributeKeyQuotes:!0,indent:"	"})}
)`)}else t.push(`output = llm(
	"Once upon a time,",
	max_tokens=512,
	echo=True
)
print(output)`);return t},rd=e=>{if(e.tags.includes("smolvla")){const t=[`# See https://github.com/huggingface/lerobot?tab=readme-ov-file#installation for more details
git clone https://github.com/huggingface/lerobot.git
cd lerobot
pip install -e .[smolvla]`,`# Launch finetuning on your dataset
python lerobot/scripts/train.py \\
--policy.path=${e.id} \\
--dataset.repo_id=lerobot/svla_so101_pickplace \\ 
--batch_size=64 \\
--steps=20000 \\
--output_dir=outputs/train/my_smolvla \\
--job_name=my_smolvla_training \\
--policy.device=cuda \\
--wandb.enable=true`];return e.id!=="lerobot/smolvla_base"&&t.push(`# Run the policy using the record function	
python -m lerobot.record \\
  --robot.type=so101_follower \\
  --robot.port=/dev/ttyACM0 \\ # <- Use your port
  --robot.id=my_blue_follower_arm \\ # <- Use your robot id
  --robot.cameras="{ front: {type: opencv, index_or_path: 8, width: 640, height: 480, fps: 30}}" \\ # <- Use your cameras
  --dataset.single_task="Grasp a lego block and put it in the bin." \\ # <- Use the same task description you used in your dataset recording
  --dataset.repo_id=HF_USER/dataset_name \\  # <- This will be the dataset name on HF Hub
  --dataset.episode_time_s=50 \\
  --dataset.num_episodes=10 \\
  --policy.path=${e.id}`),t}return[]},sd=e=>[`# Note: 'keras<3.x' or 'tf_keras' must be installed (legacy)
# See https://github.com/keras-team/tf-keras for more details.
from huggingface_hub import from_pretrained_keras

model = from_pretrained_keras("${e.id}")
`],ld=e=>[`from mamba_ssm import MambaLMHeadModel

model = MambaLMHeadModel.from_pretrained("${e.id}")`],cd=e=>[`# Install from https://github.com/Camb-ai/MARS5-TTS

from inference import Mars5TTS
mars5 = Mars5TTS.from_pretrained("${e.id}")`],dd=e=>[`# Install from https://github.com/pq-yang/MatAnyone.git

from matanyone.model.matanyone import MatAnyone
model = MatAnyone.from_pretrained("${e.id}")`,`
from matanyone import InferenceCore
processor = InferenceCore("${e.id}")`],pd=()=>[`# Install from https://github.com/buaacyw/MeshAnything.git

from MeshAnything.models.meshanything import MeshAnything

# refer to https://github.com/buaacyw/MeshAnything/blob/main/main.py#L91 on how to define args
# and https://github.com/buaacyw/MeshAnything/blob/main/app.py regarding usage
model = MeshAnything(args)`],ud=e=>[`import open_clip

model, preprocess_train, preprocess_val = open_clip.create_model_and_transforms('hf-hub:${e.id}')
tokenizer = open_clip.get_tokenizer('hf-hub:${e.id}')`],md=e=>{var t,a;if((a=(t=e.config)==null?void 0:t.architectures)!=null&&a[0]){const n=e.config.architectures[0];return[[`from paddlenlp.transformers import AutoTokenizer, ${n}`,"",`tokenizer = AutoTokenizer.from_pretrained("${e.id}", from_hf_hub=True)`,`model = ${n}.from_pretrained("${e.id}", from_hf_hub=True)`].join(`
`)]}else return[["# ⚠️ Type of model unknown","from paddlenlp.transformers import AutoTokenizer, AutoModel","",`tokenizer = AutoTokenizer.from_pretrained("${e.id}", from_hf_hub=True)`,`model = AutoModel.from_pretrained("${e.id}", from_hf_hub=True)`].join(`
`)]},fd=e=>{const t={textline_detection:{className:"TextDetection"},textline_recognition:{className:"TextRecognition"},seal_text_detection:{className:"SealTextDetection"},doc_img_unwarping:{className:"TextImageUnwarping"},doc_img_orientation_classification:{className:"DocImgOrientationClassification"},textline_orientation_classification:{className:"TextLineOrientationClassification"},chart_parsing:{className:"ChartParsing"},formula_recognition:{className:"FormulaRecognition"},layout_detection:{className:"LayoutDetection"},table_cells_detection:{className:"TableCellsDetection"},wired_table_classification:{className:"TableClassification"},table_structure_recognition:{className:"TableStructureRecognition"}};if(e.tags.includes("doc_vlm"))return[`# 1. See https://www.paddlepaddle.org.cn/en/install to install paddlepaddle
# 2. pip install paddleocr

from paddleocr import DocVLM
model = DocVLM(model_name="${Se(e.id)}")
output = model.predict(
    input={"image": "path/to/image.png", "query": "Parsing this image and output the content in Markdown format."},
    batch_size=1
)
for res in output:
    res.print()
    res.save_to_json(save_path="./output/res.json")`];if(e.tags.includes("document-parse"))return[`# See https://www.paddleocr.ai/latest/version3.x/pipeline_usage/PaddleOCR-VL.html to installation

from paddleocr import PaddleOCRVL
pipeline = PaddleOCRVL()
output = pipeline.predict("path/to/document_image.png")
for res in output:
	res.print()
	res.save_to_json(save_path="output")
	res.save_to_markdown(save_path="output")`];for(const a of e.tags)if(a in t){const{className:n}=t[a];return[`# 1. See https://www.paddlepaddle.org.cn/en/install to install paddlepaddle
# 2. pip install paddleocr

from paddleocr import ${n}
model = ${n}(model_name="${Se(e.id)}")
output = model.predict(input="path/to/image.png", batch_size=1)
for res in output:
    res.print()
    res.save_to_img(save_path="./output/")
    res.save_to_json(save_path="./output/res.json")`]}return[`# Please refer to the document for information on how to use the model. 
# https://paddlepaddle.github.io/PaddleOCR/latest/en/version3.x/module_usage/module_overview.html`]},gd=e=>{const t=`# Use PE-Core models as CLIP models
import core.vision_encoder.pe as pe

model = pe.CLIP.from_config("${e.id}", pretrained=True)`,a=`# Use any PE model as a vision encoder
import core.vision_encoder.pe as pe

model = pe.VisionTransformer.from_config("${e.id}", pretrained=True)`;return e.id.includes("Core")?[t,a]:[a]},hd=e=>[`from huggingface_hub import snapshot_download
from phantom_wan import WANI2V, configs

checkpoint_dir = snapshot_download("${e.id}")
wan_i2v = WanI2V(
            config=configs.WAN_CONFIGS['i2v-14B'],
            checkpoint_dir=checkpoint_dir,
        )
 video = wan_i2v.generate(text_prompt, image_prompt)`],yd=e=>[`from pyannote.audio import Pipeline
  
pipeline = Pipeline.from_pretrained("${e.id}")

# inference on the whole file
pipeline("file.wav")

# inference on an excerpt
from pyannote.core import Segment
excerpt = Segment(start=2.0, end=5.0)

from pyannote.audio import Audio
waveform, sample_rate = Audio().crop("file.wav", excerpt)
pipeline({"waveform": waveform, "sample_rate": sample_rate})`],bd=e=>[`from pyannote.audio import Model, Inference

model = Model.from_pretrained("${e.id}")
inference = Inference(model)

# inference on the whole file
inference("file.wav")

# inference on an excerpt
from pyannote.core import Segment
excerpt = Segment(start=2.0, end=5.0)
inference.crop("file.wav", excerpt)`],vd=e=>e.tags.includes("pyannote-audio-pipeline")?yd(e):bd(e),wd=e=>[`from relik import Relik
 
relik = Relik.from_pretrained("${e.id}")`],_d=e=>[`# Install from https://github.com/microsoft/renderformer

from renderformer import RenderFormerRenderingPipeline
pipeline = RenderFormerRenderingPipeline.from_pretrained("${e.id}")`],xd=e=>[`from tensorflow_tts.inference import AutoProcessor, TFAutoModel

processor = AutoProcessor.from_pretrained("${e.id}")
model = TFAutoModel.from_pretrained("${e.id}")
`],kd=e=>[`from tensorflow_tts.inference import TFAutoModel

model = TFAutoModel.from_pretrained("${e.id}")
audios = model.inference(mels)
`],Ad=e=>[`from tensorflow_tts.inference import TFAutoModel

model = TFAutoModel.from_pretrained("${e.id}")
`],Sd=e=>e.tags.includes("text-to-mel")?xd(e):e.tags.includes("mel-to-wav")?kd(e):Ad(e),Id=e=>[`import timm

model = timm.create_model("hf_hub:${e.id}", pretrained=True)`],Td=()=>[`# pip install sae-lens
from sae_lens import SAE

sae, cfg_dict, sparsity = SAE.from_pretrained(
    release = "RELEASE_ID", # e.g., "gpt2-small-res-jb". See other options in https://github.com/jbloomAus/SAELens/blob/main/sae_lens/pretrained_saes.yaml
    sae_id = "SAE_ID", # e.g., "blocks.8.hook_resid_pre". Won't always be a hook point
)`],Cd=()=>[`# seed_story_cfg_path refers to 'https://github.com/TencentARC/SEED-Story/blob/master/configs/clm_models/agent_7b_sft.yaml'
# llm_cfg_path refers to 'https://github.com/TencentARC/SEED-Story/blob/master/configs/clm_models/llama2chat7b_lora.yaml'
from omegaconf import OmegaConf
import hydra

# load Llama2
llm_cfg = OmegaConf.load(llm_cfg_path)
llm = hydra.utils.instantiate(llm_cfg, torch_dtype="fp16")

# initialize seed_story
seed_story_cfg = OmegaConf.load(seed_story_cfg_path)
seed_story = hydra.utils.instantiate(seed_story_cfg, llm=llm) `],Ed=(e,t)=>[`import joblib
from skops.hub_utils import download
download("${e.id}", "path_to_folder")
model = joblib.load(
	"${t}"
)
# only load pickle files from sources you trust
# read more about it here https://skops.readthedocs.io/en/stable/persistence.html`],Pd=(e,t)=>[`from skops.hub_utils import download
from skops.io import load
download("${e.id}", "path_to_folder")
# make sure model file is in skops format
# if model is a pickle file, make sure it's from a source you trust
model = load("path_to_folder/${t}")`],Rd=e=>[`from huggingface_hub import hf_hub_download
import joblib
model = joblib.load(
	hf_hub_download("${e.id}", "sklearn_model.joblib")
)
# only load pickle files from sources you trust
# read more about it here https://skops.readthedocs.io/en/stable/persistence.html`],Ld=e=>{var t,a,n,i,o;if(e.tags.includes("skops")){const r=(n=(a=(t=e.config)==null?void 0:t.sklearn)==null?void 0:a.model)==null?void 0:n.file,l=(o=(i=e.config)==null?void 0:i.sklearn)==null?void 0:o.model_format;return r?l==="pickle"?Ed(e,r):Pd(e,r):["# ⚠️ Model filename not specified in config.json"]}else return Rd(e)},Ud=e=>[`import torch
import torchaudio
from einops import rearrange
from stable_audio_tools import get_pretrained_model
from stable_audio_tools.inference.generation import generate_diffusion_cond

device = "cuda" if torch.cuda.is_available() else "cpu"

# Download model
model, model_config = get_pretrained_model("${e.id}")
sample_rate = model_config["sample_rate"]
sample_size = model_config["sample_size"]

model = model.to(device)

# Set up text and timing conditioning
conditioning = [{
	"prompt": "128 BPM tech house drum loop",
}]

# Generate stereo audio
output = generate_diffusion_cond(
	model,
	conditioning=conditioning,
	sample_size=sample_size,
	device=device
)

# Rearrange audio batch to a single sequence
output = rearrange(output, "b d n -> d (b n)")

# Peak normalize, clip, convert to int16, and save to file
output = output.to(torch.float32).div(torch.max(torch.abs(output))).clamp(-1, 1).mul(32767).to(torch.int16).cpu()
torchaudio.save("output.wav", output, sample_rate)`],$d=e=>[`from huggingface_hub import from_pretrained_fastai

learn = from_pretrained_fastai("${e.id}")`],Md=e=>{const t=`# Use SAM2 with images
import torch
from sam2.sam2_image_predictor import SAM2ImagePredictor

predictor = SAM2ImagePredictor.from_pretrained(${e.id})

with torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):
    predictor.set_image(<your_image>)
    masks, _, _ = predictor.predict(<input_prompts>)`,a=`# Use SAM2 with videos
import torch
from sam2.sam2_video_predictor import SAM2VideoPredictor
	
predictor = SAM2VideoPredictor.from_pretrained(${e.id})

with torch.inference_mode(), torch.autocast("cuda", dtype=torch.bfloat16):
    state = predictor.init_state(<your_video>)

    # add new prompts and instantly get the output on the same frame
    frame_idx, object_ids, masks = predictor.add_new_points(state, <your_prompts>):

    # propagate the prompts to get masklets throughout the video
    for frame_idx, object_ids, masks in predictor.propagate_in_video(state):
        ...`;return[t,a]},Dd=e=>[`python -m sample_factory.huggingface.load_from_hub -r ${e.id} -d ./train_dir`];function Bd(e){var a,n;const t=(a=e.widgetData)==null?void 0:a[0];if(t!=null&&t.source_sentence&&((n=t==null?void 0:t.sentences)!=null&&n.length))return[t.source_sentence,...t.sentences]}var jd=e=>{const t=e.tags.includes(Na)?", trust_remote_code=True":"";if(e.tags.includes("PyLate"))return[`from pylate import models

queries = [
    "Which planet is known as the Red Planet?",
    "What is the largest planet in our solar system?",
]

documents = [
    ["Mars is the Red Planet.", "Venus is Earth's twin."],
    ["Jupiter is the largest planet.", "Saturn has rings."],
]

model = models.ColBERT(model_name_or_path="${e.id}")

queries_emb = model.encode(queries, is_query=True)
docs_emb = model.encode(documents, is_query=False)`];if(e.tags.includes("cross-encoder")||e.pipeline_tag=="text-ranking")return[`from sentence_transformers import CrossEncoder

model = CrossEncoder("${e.id}"${t})

query = "Which planet is known as the Red Planet?"
passages = [
	"Venus is often called Earth's twin because of its similar size and proximity.",
	"Mars, known for its reddish appearance, is often referred to as the Red Planet.",
	"Jupiter, the largest planet in our solar system, has a prominent red spot.",
	"Saturn, famous for its rings, is sometimes mistaken for the Red Planet."
]

scores = model.predict([(query, passage) for passage in passages])
print(scores)`];const a=Bd(e)??["The weather is lovely today.","It's so sunny outside!","He drove to the stadium."];return[`from sentence_transformers import SentenceTransformer

model = SentenceTransformer("${e.id}"${t})

sentences = ${JSON.stringify(a,null,4)}
embeddings = model.encode(sentences)

similarities = model.similarity(embeddings, embeddings)
print(similarities.shape)
# [${a.length}, ${a.length}]`]},Nd=e=>[`from setfit import SetFitModel

model = SetFitModel.from_pretrained("${e.id}")`],Od=e=>[`!pip install https://huggingface.co/${e.id}/resolve/main/${Se(e.id)}-any-py3-none-any.whl

# Using spacy.load().
import spacy
nlp = spacy.load("${Se(e.id)}")

# Importing as module.
import ${Se(e.id)}
nlp = ${Se(e.id)}.load()`],qd=e=>[`from span_marker import SpanMarkerModel

model = SpanMarkerModel.from_pretrained("${e.id}")`],Fd=e=>[`import stanza

stanza.download("${Se(e.id).replace("stanza-","")}")
nlp = stanza.Pipeline("${Se(e.id).replace("stanza-","")}")`],Hd=e=>{switch(e){case"EncoderClassifier":return"classify_file";case"EncoderDecoderASR":case"EncoderASR":return"transcribe_file";case"SpectralMaskEnhancement":return"enhance_file";case"SepformerSeparation":return"separate_file";default:return}},Vd=e=>{var n,i;const t=(i=(n=e.config)==null?void 0:n.speechbrain)==null?void 0:i.speechbrain_interface;if(t===void 0)return["# interface not specified in config.json"];const a=Hd(t);return a===void 0?["# interface in config.json invalid"]:[`from speechbrain.pretrained import ${t}
model = ${t}.from_hparams(
  "${e.id}"
)
model.${a}("file.wav")`]},Kd=e=>[`from terratorch.registry import BACKBONE_REGISTRY

model = BACKBONE_REGISTRY.build("${e.id}")`],zd=e=>{var t,a,n,i,o;return((a=(t=e.config)==null?void 0:t.tokenizer_config)==null?void 0:a.chat_template)!==void 0||((i=(n=e.config)==null?void 0:n.processor_config)==null?void 0:i.chat_template)!==void 0||((o=e.config)==null?void 0:o.chat_template_jinja)!==void 0},Ha=e=>{var i;const t=e.transformersInfo;if(!t)return["# ⚠️ Type of model unknown"];const a=e.tags.includes(Na)?", trust_remote_code=True":"",n=[];if(t.processor){const o=t.processor==="AutoTokenizer"?"tokenizer":t.processor==="AutoFeatureExtractor"?"extractor":"processor";n.push("# Load model directly",`from transformers import ${t.processor}, ${t.auto_model}`,"",`${o} = ${t.processor}.from_pretrained("${e.id}"`+a+")",`model = ${t.auto_model}.from_pretrained("${e.id}"`+a+")"),e.tags.includes("conversational")&&zd(e)&&(e.tags.includes("image-text-to-text")?n.push("messages = [",["    {",'        "role": "user",','        "content": [','            {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},','            {"type": "text", "text": "What animal is on the candy?"}',"        ]","    },"].join(`
`),"]"):n.push("messages = [",'    {"role": "user", "content": "Who are you?"},',"]"),n.push(`inputs = ${o}.apply_chat_template(`,"	messages,","	add_generation_prompt=True,","	tokenize=True,","	return_dict=True,",'	return_tensors="pt",',").to(model.device)","","outputs = model.generate(**inputs, max_new_tokens=40)",`print(${o}.decode(outputs[0][inputs["input_ids"].shape[-1]:]))`))}else n.push("# Load model directly",`from transformers import ${t.auto_model}`,`model = ${t.auto_model}.from_pretrained("${e.id}"`+a+', dtype="auto")');if(e.pipeline_tag&&((i=qr.transformers)!=null&&i.includes(e.pipeline_tag))){const o=["# Use a pipeline as a high-level helper","from transformers import pipeline","",`pipe = pipeline("${e.pipeline_tag}", model="${e.id}"`+a+")"];return e.tags.includes("conversational")?e.tags.includes("image-text-to-text")?(o.push("messages = [",["    {",'        "role": "user",','        "content": [','            {"type": "image", "url": "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/p-blog/candy.JPG"},','            {"type": "text", "text": "What animal is on the candy?"}',"        ]","    },"].join(`
`),"]"),o.push("pipe(text=messages)")):(o.push("messages = [",'    {"role": "user", "content": "Who are you?"},',"]"),o.push("pipe(messages)")):e.pipeline_tag==="zero-shot-image-classification"?o.push("pipe(",'    "https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parrots.png",','    candidate_labels=["animals", "humans", "landscape"],',")"):e.pipeline_tag==="image-classification"&&o.push('pipe("https://huggingface.co/datasets/huggingface/documentation-images/resolve/main/hub/parrots.png")'),[o.join(`
`),n.join(`
`)]}return[n.join(`
`)]},Wd=e=>{if(!e.pipeline_tag)return["// ⚠️ Unknown pipeline tag"];const t="@huggingface/transformers";return[`// npm i ${t}
import { pipeline } from '${t}';

// Allocate pipeline
const pipe = await pipeline('${e.pipeline_tag}', '${e.id}');`]},Xd=e=>{switch(e){case"CAUSAL_LM":return"CausalLM";case"SEQ_2_SEQ_LM":return"Seq2SeqLM";case"TOKEN_CLS":return"TokenClassification";case"SEQ_CLS":return"SequenceClassification";default:return}},Qd=e=>{var i;const{base_model_name_or_path:t,task_type:a}=((i=e.config)==null?void 0:i.peft)??{},n=Xd(a);return n?t?[`from peft import PeftModel
from transformers import AutoModelFor${n}

base_model = AutoModelFor${n}.from_pretrained("${t}")
model = PeftModel.from_pretrained(base_model, "${e.id}")`]:["Base model is not found."]:["Task type is invalid."]},Jd=e=>[`from huggingface_hub import hf_hub_download
import fasttext

model = fasttext.load_model(hf_hub_download("${e.id}", "model.bin"))`],Yd=e=>[`from huggingface_sb3 import load_from_hub
checkpoint = load_from_hub(
	repo_id="${e.id}",
	filename="{MODEL FILENAME}.zip",
)`],Zd=(e,t)=>{switch(e){case"ASR":return[`import nemo.collections.asr as nemo_asr
asr_model = nemo_asr.models.ASRModel.from_pretrained("${t.id}")

transcriptions = asr_model.transcribe(["file.wav"])`];default:return}},Gd=e=>[`mlagents-load-from-hf --repo-id="${e.id}" --local-dir="./download: string[]s"`],ep=()=>[`string modelName = "[Your model name here].sentis";
Model model = ModelLoader.Load(Application.streamingAssetsPath + "/" + modelName);
IWorker engine = WorkerFactory.CreateWorker(BackendType.GPUCompute, model);
// Please see provided C# file for more details
`],tp=e=>[`
# Load the model and infer image from text
import torch
from app.sana_pipeline import SanaPipeline
from torchvision.utils import save_image

sana = SanaPipeline("configs/sana_config/1024ms/Sana_1600M_img1024.yaml")
sana.from_pretrained("hf://${e.id}")

image = sana(
    prompt='a cyberpunk cat with a neon sign that says "Sana"',
    height=1024,
    width=1024,
    guidance_scale=5.0,
    pag_guidance_scale=2.0,
    num_inference_steps=18,
) `],ap=e=>[`import torch, soundfile as sf, librosa, numpy as np
from vibevoice.processor.vibevoice_processor import VibeVoiceProcessor
from vibevoice.modular.modeling_vibevoice_inference import VibeVoiceForConditionalGenerationInference

# Load voice sample (should be 24kHz mono)
voice, sr = sf.read("path/to/voice_sample.wav")
if voice.ndim > 1: voice = voice.mean(axis=1)
if sr != 24000: voice = librosa.resample(voice, sr, 24000)

processor = VibeVoiceProcessor.from_pretrained("${e.id}")
model = VibeVoiceForConditionalGenerationInference.from_pretrained(
    "${e.id}", torch_dtype=torch.bfloat16
).to("cuda").eval()
model.set_ddpm_inference_steps(5)

inputs = processor(text=["Speaker 0: Hello!\\nSpeaker 1: Hi there!"],
                   voice_samples=[[voice]], return_tensors="pt")
audio = model.generate(**inputs, cfg_scale=1.3,
                       tokenizer=processor.tokenizer).speech_outputs[0]
sf.write("output.wav", audio.cpu().numpy().squeeze(), 24000)`],np=e=>[`# Install from https://github.com/google-deepmind/videoprism
import jax
from videoprism import models as vp

flax_model = vp.get_model("${e.id}")
loaded_state = vp.load_pretrained_weights("${e.id}")

@jax.jit
def forward_fn(inputs, train=False):
  return flax_model.apply(loaded_state, inputs, train=train)`],ip=e=>[`from Trainer_finetune import Model

model = Model.from_pretrained("${e.id}")`],op=e=>[`from huggingface_hub import hf_hub_download
	 from inference_onnx import LVFaceONNXInferencer

model_path = hf_hub_download("${e.id}", "LVFace-L_Glint360K/LVFace-L_Glint360K.onnx")
inferencer = LVFaceONNXInferencer(model_path, use_gpu=True, timeout=300)
img_path = 'path/to/image1.jpg'
embedding = inferencer.infer_from_image(img_path)`],rp=e=>[`from voicecraft import VoiceCraft

model = VoiceCraft.from_pretrained("${e.id}")`],sp=e=>[`import soundfile as sf
from voxcpm import VoxCPM

model = VoxCPM.from_pretrained("${e.id}")

wav = model.generate(
    text="VoxCPM is an innovative end-to-end TTS model from ModelBest, designed to generate highly expressive speech.",
    prompt_wav_path=None,      # optional: path to a prompt speech for voice cloning
    prompt_text=None,          # optional: reference text
    cfg_value=2.0,             # LM guidance on LocDiT, higher for better adherence to the prompt, but maybe worse
    inference_timesteps=10,   # LocDiT inference timesteps, higher for better result, lower for fast speed
    normalize=True,           # enable external TN tool
    denoise=True,             # enable external Denoise tool
    retry_badcase=True,        # enable retrying mode for some bad cases (unstoppable)
    retry_badcase_max_times=3,  # maximum retrying times
    retry_badcase_ratio_threshold=6.0, # maximum length restriction for bad case detection (simple but effective), it could be adjusted for slow pace speech
)

sf.write("output.wav", wav, 16000)
print("saved: output.wav")`],lp=()=>[`# !pip install git+https://github.com/fluxions-ai/vui

import torchaudio

from vui.inference import render
from vui.model import Vui,

model = Vui.from_pretrained().cuda()
waveform = render(
    model,
    "Hey, here is some random stuff, usually something quite long as the shorter the text the less likely the model can cope!",
)
print(waveform.shape)
torchaudio.save("out.opus", waveform[0], 22050)
`],cp=()=>[`import ChatTTS
import torchaudio

chat = ChatTTS.Chat()
chat.load_models(compile=False) # Set to True for better performance

texts = ["PUT YOUR TEXT HERE",]

wavs = chat.infer(texts, )

torchaudio.save("output1.wav", torch.from_numpy(wavs[0]), 24000)`],sa=e=>{const t=e.tags.find(i=>i.match(/^yolov\d+$/)),a=t?`YOLOv${t.slice(4)}`:"YOLOvXX";return[(t?"":`# Couldn't find a valid YOLO version tag.
# Replace XX with the correct version.
`)+`from ultralytics import ${a}

model = ${a}.from_pretrained("${e.id}")
source = 'http://images.cocodataset.org/val2017/000000039769.jpg'
model.predict(source=source, save=True)`]},dp=e=>[`# Option 1: use with transformers

from transformers import AutoModelForImageSegmentation
birefnet = AutoModelForImageSegmentation.from_pretrained("${e.id}", trust_remote_code=True)
`,`# Option 2: use with BiRefNet

# Install from https://github.com/ZhengPeng7/BiRefNet

from models.birefnet import BiRefNet
model = BiRefNet.from_pretrained("${e.id}")`],pp=e=>[`from swarmformer import SwarmFormerModel

model = SwarmFormerModel.from_pretrained("${e.id}")
`],up=e=>[`# Follow installation instructions at https://github.com/PKU-YuanGroup/UniWorld-V1

from univa.models.qwen2p5vl.modeling_univa_qwen2p5vl import UnivaQwen2p5VLForConditionalGeneration
	model = UnivaQwen2p5VLForConditionalGeneration.from_pretrained(
        "${e.id}",
        torch_dtype=torch.bfloat16,
        attn_implementation="flash_attention_2",
    ).to("cuda")
	processor = AutoProcessor.from_pretrained("${e.id}")
`],mp=e=>[`# Download the model from the Hub
pip install huggingface_hub[hf_xet]

huggingface-cli download --local-dir ${Se(e.id)} ${e.id}`],fp=e=>[`# Make sure mlx-lm is installed
# pip install --upgrade mlx-lm
# if on a CUDA device, also pip install mlx[cuda]

# Generate text with mlx-lm
from mlx_lm import load, generate

model, tokenizer = load("${e.id}")

prompt = "Once upon a time in"
text = generate(model, tokenizer, prompt=prompt, verbose=True)`],gp=e=>[`# Make sure mlx-lm is installed
# pip install --upgrade mlx-lm

# Generate text with mlx-lm
from mlx_lm import load, generate

model, tokenizer = load("${e.id}")

prompt = "Write a story about Einstein"
messages = [{"role": "user", "content": prompt}]
prompt = tokenizer.apply_chat_template(
    messages, add_generation_prompt=True
)

text = generate(model, tokenizer, prompt=prompt, verbose=True)`],hp=e=>[`# Make sure mlx-vlm is installed
# pip install --upgrade mlx-vlm

from mlx_vlm import load, generate
from mlx_vlm.prompt_utils import apply_chat_template
from mlx_vlm.utils import load_config

# Load the model
model, processor = load("${e.id}")
config = load_config("${e.id}")

# Prepare input
image = ["http://images.cocodataset.org/val2017/000000039769.jpg"]
prompt = "Describe this image."

# Apply chat template
formatted_prompt = apply_chat_template(
    processor, config, prompt, num_images=1
)

# Generate output
output = generate(model, processor, formatted_prompt, image)
print(output)`],yp=e=>[`from mlxim.model import create_model

model = create_model(${e.id})`],bp=e=>e.pipeline_tag==="image-text-to-text"?hp(e):e.pipeline_tag==="text-generation"?e.tags.includes("conversational")?gp(e):fp(e):mp(e),vp=e=>[`from model2vec import StaticModel

model = StaticModel.from_pretrained("${e.id}")`],wp=e=>{let t;e.tags.includes("diffusers")?t=_p(e):e.tags.includes("transformers")?t=xp(e):t=kp(e);const a=n=>/^from pruna import PrunaModel/m.test(n)?n:`from pruna import PrunaModel
${n}`;return t=t.map(a),e.tags.includes("pruna_pro-ai")?t.map(n=>n.replace(/\bpruna\b/g,"pruna_pro").replace(/\bPrunaModel\b/g,"PrunaProModel")):t},_p=e=>Fa(e).map(a=>a.replace(/\b\w*Pipeline\w*\b/g,"PrunaModel").replace(/from diffusers import ([^,\n]*PrunaModel[^,\n]*)/g,"").replace(/from diffusers import ([^,\n]+),?\s*([^,\n]*PrunaModel[^,\n]*)/g,"from diffusers import $1").replace(/from diffusers import\s*(\n|$)/g,"").replace(/from diffusers import PrunaModel/g,"from pruna import PrunaModel").replace(/from diffusers import ([^,\n]+), PrunaModel/g,"from diffusers import $1").replace(/from diffusers import PrunaModel, ([^,\n]+)/g,"from diffusers import $1").replace(/\n\n+/g,`
`).trim()),xp=e=>{const t=e.transformersInfo;let n=Ha(e).map(i=>i.replace(/from transformers import pipeline/g,"from pruna import PrunaModel").replace(/pipeline\([^)]*\)/g,`PrunaModel.from_pretrained("${e.id}")`));return t!=null&&t.auto_model&&(n=n.map(i=>i.replace(new RegExp(`from transformers import ${t.auto_model}
?`,"g"),"").replace(new RegExp(`${t.auto_model}.from_pretrained`,"g"),"PrunaModel.from_pretrained").replace(new RegExp(`^.*from.*import.*(, *${t.auto_model})+.*$`,"gm"),o=>o.replace(new RegExp(`, *${t.auto_model}`,"g"),"")))),n},kp=e=>[`from pruna import PrunaModel
model = PrunaModel.from_pretrained("${e.id}")
`],Ap=e=>{let t;return e.tags.includes("automatic-speech-recognition")&&(t=Zd("ASR",e)),t??["# tag did not correspond to a valid NeMo domain."]},Sp=e=>{const t=e.tags??[];return t.includes("gguf")||t.includes("onnx")?[]:[`
  import outetts
  
  enum = outetts.Models("${e.id}".split("/", 1)[1])       # VERSION_1_0_SIZE_1B
  cfg  = outetts.ModelConfig.auto_config(enum, outetts.Backend.HF)
  tts  = outetts.Interface(cfg)
  
  speaker = tts.load_default_speaker("EN-FEMALE-1-NEUTRAL")
  tts.generate(
	  outetts.GenerationConfig(
		  text="Hello there, how are you doing?",
		  speaker=speaker,
	  )
  ).save("output.wav")
  `]},Ip=e=>[`from pxia import AutoModel

model = AutoModel.from_pretrained("${e.id}")`],Tp=e=>[`from pythae.models import AutoModel

model = AutoModel.load_from_hf_hub("${e.id}")`],Cp=e=>[`from audiocraft.models import MusicGen

model = MusicGen.get_pretrained("${e.id}")

descriptions = ['happy rock', 'energetic EDM', 'sad jazz']
wav = model.generate(descriptions)  # generates 3 samples.`],Ep=e=>[`from audiocraft.models import MAGNeT
	
model = MAGNeT.get_pretrained("${e.id}")

descriptions = ['disco beat', 'energetic EDM', 'funky groove']
wav = model.generate(descriptions)  # generates 3 samples.`],Pp=e=>[`from audiocraft.models import AudioGen
	
model = AudioGen.get_pretrained("${e.id}")
model.set_generation_params(duration=5)  # generate 5 seconds.
descriptions = ['dog barking', 'sirene of an emergency vehicle', 'footsteps in a corridor']
wav = model.generate(descriptions)  # generates 3 samples.`],Rp=e=>[`from anemoi.inference.runners.default import DefaultRunner
from anemoi.inference.config.run import RunConfiguration
# Create Configuration
config = RunConfiguration(checkpoint = {"huggingface":"${e.id}"})
# Load Runner
runner = DefaultRunner(config)`],Lp=e=>e.tags.includes("musicgen")?Cp(e):e.tags.includes("audiogen")?Pp(e):e.tags.includes("magnet")?Ep(e):["# Type of model unknown."],Up=()=>[`# Install CLI with Homebrew on macOS device
brew install whisperkit-cli

# View all available inference options
whisperkit-cli transcribe --help
	
# Download and run inference using whisper base model
whisperkit-cli transcribe --audio-path /path/to/audio.mp3

# Or use your preferred model variant
whisperkit-cli transcribe --model "large-v3" --model-prefix "distil" --audio-path /path/to/audio.mp3 --verbose`],$p=e=>[`from threedtopia_xl.models import threedtopia_xl

model = threedtopia_xl.from_pretrained("${e.id}")
model.generate(cond="path/to/image.png")`],Mp=e=>[`# pip install git+https://github.com/Zyphra/Zonos.git
import torchaudio
from zonos.model import Zonos
from zonos.conditioning import make_cond_dict

model = Zonos.from_pretrained("${e.id}", device="cuda")

wav, sr = torchaudio.load("speaker.wav")           # 5-10s reference clip
speaker = model.make_speaker_embedding(wav, sr)

cond  = make_cond_dict(text="Hello, world!", speaker=speaker, language="en-us")
codes = model.generate(model.prepare_conditioning(cond))

audio = model.autoencoder.decode(codes)[0].cpu()
torchaudio.save("sample.wav", audio, model.autoencoder.sampling_rate)
`],Dp={acestep:{prettyLabel:"ACE-Step",repoName:"ACE-Step",repoUrl:"https://github.com/ace-step/ACE-Step",filter:!1,countDownloads:'path:"ace_step_transformer/config.json"'},"adapter-transformers":{prettyLabel:"Adapters",repoName:"adapters",repoUrl:"https://github.com/Adapter-Hub/adapters",docsUrl:"https://huggingface.co/docs/hub/adapters",snippets:ac,filter:!0,countDownloads:'path:"adapter_config.json"'},allennlp:{prettyLabel:"AllenNLP",repoName:"AllenNLP",repoUrl:"https://github.com/allenai/allennlp",docsUrl:"https://huggingface.co/docs/hub/allennlp",snippets:oc,filter:!0},anemoi:{prettyLabel:"AnemoI",repoName:"AnemoI",repoUrl:"https://github.com/ecmwf/anemoi-inference",docsUrl:"https://anemoi.readthedocs.io/en/latest/",filter:!1,countDownloads:'path_extension:"ckpt"',snippets:Rp},araclip:{prettyLabel:"AraClip",repoName:"AraClip",repoUrl:"https://huggingface.co/Arabic-Clip/araclip",filter:!1,snippets:rc},asteroid:{prettyLabel:"Asteroid",repoName:"Asteroid",repoUrl:"https://github.com/asteroid-team/asteroid",docsUrl:"https://huggingface.co/docs/hub/asteroid",snippets:sc,filter:!0,countDownloads:'path:"pytorch_model.bin"'},audiocraft:{prettyLabel:"Audiocraft",repoName:"audiocraft",repoUrl:"https://github.com/facebookresearch/audiocraft",snippets:Lp,filter:!1,countDownloads:'path:"state_dict.bin"'},audioseal:{prettyLabel:"AudioSeal",repoName:"audioseal",repoUrl:"https://github.com/facebookresearch/audioseal",filter:!1,countDownloads:'path_extension:"pth"',snippets:lc},"bagel-mot":{prettyLabel:"Bagel",repoName:"Bagel",repoUrl:"https://github.com/ByteDance-Seed/Bagel/",filter:!1,countDownloads:'path:"llm_config.json"'},bboxmaskpose:{prettyLabel:"BBoxMaskPose",repoName:"BBoxMaskPose",repoUrl:"https://github.com/MiraPurkrabek/BBoxMaskPose",filter:!1,countDownloads:'path_extension:"pth"'},ben2:{prettyLabel:"BEN2",repoName:"BEN2",repoUrl:"https://github.com/PramaLLC/BEN2",snippets:cc,filter:!1},bertopic:{prettyLabel:"BERTopic",repoName:"BERTopic",repoUrl:"https://github.com/MaartenGr/BERTopic",snippets:dc,filter:!0},big_vision:{prettyLabel:"Big Vision",repoName:"big_vision",repoUrl:"https://github.com/google-research/big_vision",filter:!1,countDownloads:'path_extension:"npz"'},birder:{prettyLabel:"Birder",repoName:"Birder",repoUrl:"https://gitlab.com/birder/birder",filter:!1,countDownloads:'path_extension:"pt"'},birefnet:{prettyLabel:"BiRefNet",repoName:"BiRefNet",repoUrl:"https://github.com/ZhengPeng7/BiRefNet",snippets:dp,filter:!1},bm25s:{prettyLabel:"BM25S",repoName:"bm25s",repoUrl:"https://github.com/xhluca/bm25s",snippets:pc,filter:!1,countDownloads:'path:"params.index.json"'},boltzgen:{prettyLabel:"BoltzGen",repoName:"BoltzGen",repoUrl:"https://github.com/HannesStark/boltzgen",filter:!1,countDownloads:'path:"boltzgen1_diverse.ckpt"'},champ:{prettyLabel:"Champ",repoName:"Champ",repoUrl:"https://github.com/fudan-generative-vision/champ",countDownloads:'path:"champ/motion_module.pth"'},chatterbox:{prettyLabel:"Chatterbox",repoName:"Chatterbox",repoUrl:"https://github.com/resemble-ai/chatterbox",snippets:uc,countDownloads:'path:"tokenizer.json"',filter:!1},chat_tts:{prettyLabel:"ChatTTS",repoName:"ChatTTS",repoUrl:"https://github.com/2noise/ChatTTS.git",snippets:cp,filter:!1,countDownloads:'path:"asset/GPT.pt"'},"chronos-forecasting":{prettyLabel:"Chronos",repoName:"Chronos",repoUrl:"https://github.com/amazon-science/chronos-forecasting",snippets:mc},"cloud-agents":{prettyLabel:"Cloud Agents",repoName:"Cloud Agents",repoUrl:"https://huggingface.co/OpenPeerAI/Cloud-Agents",filter:!1,countDownloads:'path:"setup.py"'},colpali:{prettyLabel:"ColPali",repoName:"ColPali",repoUrl:"https://github.com/ManuelFay/colpali",filter:!1,countDownloads:'path:"adapter_config.json"'},comet:{prettyLabel:"COMET",repoName:"COMET",repoUrl:"https://github.com/Unbabel/COMET/",countDownloads:'path:"hparams.yaml"'},cosmos:{prettyLabel:"Cosmos",repoName:"Cosmos",repoUrl:"https://github.com/NVIDIA/Cosmos",countDownloads:'path:"config.json" OR path_extension:"pt"'},"cxr-foundation":{prettyLabel:"CXR Foundation",repoName:"cxr-foundation",repoUrl:"https://github.com/google-health/cxr-foundation",snippets:gc,filter:!1,countDownloads:'path:"precomputed_embeddings/embeddings.npz" OR path:"pax-elixr-b-text/saved_model.pb"'},deepforest:{prettyLabel:"DeepForest",repoName:"deepforest",docsUrl:"https://deepforest.readthedocs.io/en/latest/",repoUrl:"https://github.com/weecology/DeepForest"},"depth-anything-v2":{prettyLabel:"DepthAnythingV2",repoName:"Depth Anything V2",repoUrl:"https://github.com/DepthAnything/Depth-Anything-V2",snippets:hc,filter:!1,countDownloads:'path_extension:"pth"'},"depth-pro":{prettyLabel:"Depth Pro",repoName:"Depth Pro",repoUrl:"https://github.com/apple/ml-depth-pro",countDownloads:'path_extension:"pt"',snippets:yc,filter:!1},"derm-foundation":{prettyLabel:"Derm Foundation",repoName:"derm-foundation",repoUrl:"https://github.com/google-health/derm-foundation",snippets:bc,filter:!1,countDownloads:'path:"scin_dataset_precomputed_embeddings.npz" OR path:"saved_model.pb"'},"describe-anything":{prettyLabel:"Describe Anything",repoName:"Describe Anything",repoUrl:"https://github.com/NVlabs/describe-anything",snippets:wc,filter:!1},"dia-tts":{prettyLabel:"Dia",repoName:"Dia",repoUrl:"https://github.com/nari-labs/dia",snippets:vc,filter:!1},"diff-interpretation-tuning":{prettyLabel:"Diff Interpretation Tuning",repoName:"Diff Interpretation Tuning",repoUrl:"https://github.com/Aviously/diff-interpretation-tuning",filter:!1,countDownloads:'path_extension:"pt"'},diffree:{prettyLabel:"Diffree",repoName:"Diffree",repoUrl:"https://github.com/OpenGVLab/Diffree",filter:!1,countDownloads:'path:"diffree-step=000010999.ckpt"'},diffusers:{prettyLabel:"Diffusers",repoName:"🤗/diffusers",repoUrl:"https://github.com/huggingface/diffusers",docsUrl:"https://huggingface.co/docs/hub/diffusers",snippets:Fa,filter:!0},diffusionkit:{prettyLabel:"DiffusionKit",repoName:"DiffusionKit",repoUrl:"https://github.com/argmaxinc/DiffusionKit",snippets:Uc},doctr:{prettyLabel:"docTR",repoName:"doctr",repoUrl:"https://github.com/mindee/doctr"},cartesia_pytorch:{prettyLabel:"Cartesia Pytorch",repoName:"Cartesia Pytorch",repoUrl:"https://github.com/cartesia-ai/cartesia_pytorch",snippets:$c},cartesia_mlx:{prettyLabel:"Cartesia MLX",repoName:"Cartesia MLX",repoUrl:"https://github.com/cartesia-ai/cartesia_mlx",snippets:Mc},clipscope:{prettyLabel:"clipscope",repoName:"clipscope",repoUrl:"https://github.com/Lewington-pitsos/clipscope",filter:!1,countDownloads:'path_extension:"pt"'},cosyvoice:{prettyLabel:"CosyVoice",repoName:"CosyVoice",repoUrl:"https://github.com/FunAudioLLM/CosyVoice",filter:!1,countDownloads:'path_extension:"onnx" OR path_extension:"pt"'},cotracker:{prettyLabel:"CoTracker",repoName:"CoTracker",repoUrl:"https://github.com/facebookresearch/co-tracker",filter:!1,countDownloads:'path_extension:"pth"'},edsnlp:{prettyLabel:"EDS-NLP",repoName:"edsnlp",repoUrl:"https://github.com/aphp/edsnlp",docsUrl:"https://aphp.github.io/edsnlp/latest/",filter:!1,snippets:Dc,countDownloads:'path_filename:"config" AND path_extension:"cfg"'},elm:{prettyLabel:"ELM",repoName:"elm",repoUrl:"https://github.com/slicex-ai/elm",filter:!1,countDownloads:'path_filename:"slicex_elm_config" AND path_extension:"json"'},espnet:{prettyLabel:"ESPnet",repoName:"ESPnet",repoUrl:"https://github.com/espnet/espnet",docsUrl:"https://huggingface.co/docs/hub/espnet",snippets:Oc,filter:!0},fairseq:{prettyLabel:"Fairseq",repoName:"fairseq",repoUrl:"https://github.com/pytorch/fairseq",snippets:qc,filter:!0},fastai:{prettyLabel:"fastai",repoName:"fastai",repoUrl:"https://github.com/fastai/fastai",docsUrl:"https://huggingface.co/docs/hub/fastai",snippets:$d,filter:!0},fastprint:{prettyLabel:"Fast Print",repoName:"Fast Print",repoUrl:"https://huggingface.co/OpenPeerAI/FastPrint",countDownloads:'path_extension:"cs"'},fasttext:{prettyLabel:"fastText",repoName:"fastText",repoUrl:"https://fasttext.cc/",snippets:Jd,filter:!0,countDownloads:'path_extension:"bin"'},fixer:{prettyLabel:"Fixer",repoName:"Fixer",repoUrl:"https://github.com/nv-tlabs/Fixer",filter:!1,countDownloads:'path:"pretrained/pretrained_fixer.pkl"'},flair:{prettyLabel:"Flair",repoName:"Flair",repoUrl:"https://github.com/flairNLP/flair",docsUrl:"https://huggingface.co/docs/hub/flair",snippets:Fc,filter:!0,countDownloads:'path:"pytorch_model.bin"'},fme:{prettyLabel:"Full Model Emulation",repoName:"Full Model Emulation",repoUrl:"https://github.com/ai2cm/ace",docsUrl:"https://ai2-climate-emulator.readthedocs.io/en/latest/",filter:!1,countDownloads:'path_extension:"tar"'},"gemma.cpp":{prettyLabel:"gemma.cpp",repoName:"gemma.cpp",repoUrl:"https://github.com/google/gemma.cpp",filter:!1,countDownloads:'path_extension:"sbs"'},"geometry-crafter":{prettyLabel:"GeometryCrafter",repoName:"GeometryCrafter",repoUrl:"https://github.com/TencentARC/GeometryCrafter",countDownloads:'path:"point_map_vae/diffusion_pytorch_model.safetensors"'},gliner:{prettyLabel:"GLiNER",repoName:"GLiNER",repoUrl:"https://github.com/urchade/GLiNER",snippets:Hc,filter:!1,countDownloads:'path:"gliner_config.json"'},gliner2:{prettyLabel:"GLiNER2",repoName:"GLiNER2",repoUrl:"https://github.com/fastino-ai/GLiNER2",snippets:Vc,filter:!1},"glyph-byt5":{prettyLabel:"Glyph-ByT5",repoName:"Glyph-ByT5",repoUrl:"https://github.com/AIGText/Glyph-ByT5",filter:!1,countDownloads:'path:"checkpoints/byt5_model.pt"'},grok:{prettyLabel:"Grok",repoName:"Grok",repoUrl:"https://github.com/xai-org/grok-1",filter:!1,countDownloads:'path:"ckpt/tensor00000_000" OR path:"ckpt-0/tensor00000_000"'},hallo:{prettyLabel:"Hallo",repoName:"Hallo",repoUrl:"https://github.com/fudan-generative-vision/hallo",countDownloads:'path:"hallo/net.pth"'},hermes:{prettyLabel:"HERMES",repoName:"HERMES",repoUrl:"https://github.com/LMD0311/HERMES",filter:!1,countDownloads:'path:"ckpt/hermes_final.pth"'},hezar:{prettyLabel:"Hezar",repoName:"Hezar",repoUrl:"https://github.com/hezarai/hezar",docsUrl:"https://hezarai.github.io/hezar",countDownloads:'path:"model_config.yaml" OR path:"embedding/embedding_config.yaml"'},htrflow:{prettyLabel:"HTRflow",repoName:"HTRflow",repoUrl:"https://github.com/AI-Riksarkivet/htrflow",docsUrl:"https://ai-riksarkivet.github.io/htrflow",snippets:zc},"hunyuan-dit":{prettyLabel:"HunyuanDiT",repoName:"HunyuanDiT",repoUrl:"https://github.com/Tencent/HunyuanDiT",countDownloads:'path:"pytorch_model_ema.pt" OR path:"pytorch_model_distill.pt"'},"hunyuan3d-2":{prettyLabel:"Hunyuan3D-2",repoName:"Hunyuan3D-2",repoUrl:"https://github.com/Tencent/Hunyuan3D-2",countDownloads:'path_filename:"model_index" OR path_filename:"config"'},"hunyuanworld-voyager":{prettyLabel:"HunyuanWorld-voyager",repoName:"HunyuanWorld-voyager",repoUrl:"https://github.com/Tencent-Hunyuan/HunyuanWorld-Voyager"},"image-matching-models":{prettyLabel:"Image Matching Models",repoName:"Image Matching Models",repoUrl:"https://github.com/alexstoken/image-matching-models",filter:!1,countDownloads:'path_extension:"safetensors"'},imstoucan:{prettyLabel:"IMS Toucan",repoName:"IMS-Toucan",repoUrl:"https://github.com/DigitalPhonetics/IMS-Toucan",countDownloads:'path:"embedding_gan.pt" OR path:"Vocoder.pt" OR path:"ToucanTTS.pt"'},"index-tts":{prettyLabel:"IndexTTS",repoName:"IndexTTS",repoUrl:"https://github.com/index-tts/index-tts",snippets:Kc,filter:!1},infinitetalk:{prettyLabel:"InfiniteTalk",repoName:"InfiniteTalk",repoUrl:"https://github.com/MeiGen-AI/InfiniteTalk",filter:!1,countDownloads:'path_extension:"safetensors"'},"infinite-you":{prettyLabel:"InfiniteYou",repoName:"InfiniteYou",repoUrl:"https://github.com/bytedance/InfiniteYou",filter:!1,countDownloads:'path:"infu_flux_v1.0/sim_stage1/image_proj_model.bin" OR path:"infu_flux_v1.0/aes_stage2/image_proj_model.bin"'},keras:{prettyLabel:"Keras",repoName:"Keras",repoUrl:"https://github.com/keras-team/keras",docsUrl:"https://huggingface.co/docs/hub/keras",snippets:Wc,filter:!0,countDownloads:'path:"config.json" OR path_extension:"keras"'},"tf-keras":{prettyLabel:"TF-Keras",repoName:"TF-Keras",repoUrl:"https://github.com/keras-team/tf-keras",docsUrl:"https://huggingface.co/docs/hub/tf-keras",snippets:sd,countDownloads:'path:"saved_model.pb"'},"keras-hub":{prettyLabel:"KerasHub",repoName:"KerasHub",repoUrl:"https://github.com/keras-team/keras-hub",docsUrl:"https://keras.io/keras_hub/",snippets:ed,filter:!0},kernels:{prettyLabel:"Kernels",repoName:"Kernels",repoUrl:"https://github.com/huggingface/kernels",docsUrl:"https://huggingface.co/docs/kernels",snippets:td,countDownloads:'path_filename:"_ops" AND path_extension:"py"'},"kimi-audio":{prettyLabel:"KimiAudio",repoName:"KimiAudio",repoUrl:"https://github.com/MoonshotAI/Kimi-Audio",snippets:ad,filter:!1},kittentts:{prettyLabel:"KittenTTS",repoName:"KittenTTS",repoUrl:"https://github.com/KittenML/KittenTTS",snippets:nd},kronos:{prettyLabel:"KRONOS",repoName:"KRONOS",repoUrl:"https://github.com/mahmoodlab/KRONOS",filter:!1,countDownloads:'path_extension:"pt"'},k2:{prettyLabel:"K2",repoName:"k2",repoUrl:"https://github.com/k2-fsa/k2"},"lightning-ir":{prettyLabel:"Lightning IR",repoName:"Lightning IR",repoUrl:"https://github.com/webis-de/lightning-ir",snippets:id},litert:{prettyLabel:"LiteRT",repoName:"LiteRT",repoUrl:"https://github.com/google-ai-edge/LiteRT",filter:!1,countDownloads:'path_extension:"tflite"'},"litert-lm":{prettyLabel:"LiteRT-LM",repoName:"LiteRT-LM",repoUrl:"https://github.com/google-ai-edge/LiteRT-LM",filter:!1,countDownloads:'path_extension:"litertlm" OR path_extension:"task"'},lerobot:{prettyLabel:"LeRobot",repoName:"LeRobot",repoUrl:"https://github.com/huggingface/lerobot",docsUrl:"https://huggingface.co/docs/lerobot",filter:!1,snippets:rd},lightglue:{prettyLabel:"LightGlue",repoName:"LightGlue",repoUrl:"https://github.com/cvg/LightGlue",filter:!1,countDownloads:'path_extension:"pth" OR path:"config.json"'},liveportrait:{prettyLabel:"LivePortrait",repoName:"LivePortrait",repoUrl:"https://github.com/KwaiVGI/LivePortrait",filter:!1,countDownloads:'path:"liveportrait/landmark.onnx"'},"llama-cpp-python":{prettyLabel:"llama-cpp-python",repoName:"llama-cpp-python",repoUrl:"https://github.com/abetlen/llama-cpp-python",snippets:od},"mini-omni2":{prettyLabel:"Mini-Omni2",repoName:"Mini-Omni2",repoUrl:"https://github.com/gpt-omni/mini-omni2",countDownloads:'path:"model_config.yaml"'},mindspore:{prettyLabel:"MindSpore",repoName:"mindspore",repoUrl:"https://github.com/mindspore-ai/mindspore"},"magi-1":{prettyLabel:"MAGI-1",repoName:"MAGI-1",repoUrl:"https://github.com/SandAI-org/MAGI-1",countDownloads:'path:"ckpt/vae/config.json"'},"magenta-realtime":{prettyLabel:"Magenta RT",repoName:"Magenta RT",repoUrl:"https://github.com/magenta/magenta-realtime",countDownloads:'path:"checkpoints/llm_base_x4286_c1860k.tar" OR path:"checkpoints/llm_large_x3047_c1860k.tar" OR path:"checkpoints/llm_large_x3047_c1860k/checkpoint"'},"mamba-ssm":{prettyLabel:"MambaSSM",repoName:"MambaSSM",repoUrl:"https://github.com/state-spaces/mamba",filter:!1,snippets:ld},"mars5-tts":{prettyLabel:"MARS5-TTS",repoName:"MARS5-TTS",repoUrl:"https://github.com/Camb-ai/MARS5-TTS",filter:!1,countDownloads:'path:"mars5_ar.safetensors"',snippets:cd},matanyone:{prettyLabel:"MatAnyone",repoName:"MatAnyone",repoUrl:"https://github.com/pq-yang/MatAnyone",snippets:dd,filter:!1},"mesh-anything":{prettyLabel:"MeshAnything",repoName:"MeshAnything",repoUrl:"https://github.com/buaacyw/MeshAnything",filter:!1,countDownloads:'path:"MeshAnything_350m.pth"',snippets:pd},merlin:{prettyLabel:"Merlin",repoName:"Merlin",repoUrl:"https://github.com/StanfordMIMI/Merlin",filter:!1,countDownloads:'path_extension:"pt"'},medvae:{prettyLabel:"MedVAE",repoName:"MedVAE",repoUrl:"https://github.com/StanfordMIMI/MedVAE",filter:!1,countDownloads:'path_extension:"ckpt"'},mitie:{prettyLabel:"MITIE",repoName:"MITIE",repoUrl:"https://github.com/mit-nlp/MITIE",countDownloads:'path_filename:"total_word_feature_extractor"'},"ml-agents":{prettyLabel:"ml-agents",repoName:"ml-agents",repoUrl:"https://github.com/Unity-Technologies/ml-agents",docsUrl:"https://huggingface.co/docs/hub/ml-agents",snippets:Gd,filter:!0,countDownloads:'path_extension:"onnx"'},mlx:{prettyLabel:"MLX",repoName:"MLX",repoUrl:"https://github.com/ml-explore/mlx-examples/tree/main",snippets:bp,filter:!0},"mlx-image":{prettyLabel:"mlx-image",repoName:"mlx-image",repoUrl:"https://github.com/riccardomusmeci/mlx-image",docsUrl:"https://huggingface.co/docs/hub/mlx-image",snippets:yp,filter:!1,countDownloads:'path:"model.safetensors"'},"mlc-llm":{prettyLabel:"MLC-LLM",repoName:"MLC-LLM",repoUrl:"https://github.com/mlc-ai/mlc-llm",docsUrl:"https://llm.mlc.ai/docs/",filter:!1,countDownloads:'path:"mlc-chat-config.json"'},model2vec:{prettyLabel:"Model2Vec",repoName:"model2vec",repoUrl:"https://github.com/MinishLab/model2vec",snippets:vp,filter:!1},moshi:{prettyLabel:"Moshi",repoName:"Moshi",repoUrl:"https://github.com/kyutai-labs/moshi",filter:!1,countDownloads:'path:"tokenizer-e351c8d8-checkpoint125.safetensors"'},mtvcraft:{prettyLabel:"MTVCraft",repoName:"MTVCraft",repoUrl:"https://github.com/baaivision/MTVCraft",filter:!1,countDownloads:'path:"vae/3d-vae.pt"'},nemo:{prettyLabel:"NeMo",repoName:"NeMo",repoUrl:"https://github.com/NVIDIA/NeMo",snippets:Ap,filter:!0,countDownloads:'path_extension:"nemo" OR path:"model_config.yaml" OR path_extension:"json"'},"open-oasis":{prettyLabel:"open-oasis",repoName:"open-oasis",repoUrl:"https://github.com/etched-ai/open-oasis",countDownloads:'path:"oasis500m.safetensors"'},open_clip:{prettyLabel:"OpenCLIP",repoName:"OpenCLIP",repoUrl:"https://github.com/mlfoundations/open_clip",snippets:ud,filter:!0,countDownloads:`path:"open_clip_model.safetensors"
			OR path:"model.safetensors"
			OR path:"open_clip_pytorch_model.bin"
			OR path:"pytorch_model.bin"`},openpeerllm:{prettyLabel:"OpenPeerLLM",repoName:"OpenPeerLLM",repoUrl:"https://huggingface.co/openpeerai/openpeerllm",docsUrl:"https://huggingface.co/OpenPeerAI/OpenPeerLLM/blob/main/README.md",countDownloads:'path:".meta-huggingface.json"',filter:!1},"open-sora":{prettyLabel:"Open-Sora",repoName:"Open-Sora",repoUrl:"https://github.com/hpcaitech/Open-Sora",filter:!1,countDownloads:'path:"Open_Sora_v2.safetensors"'},outetts:{prettyLabel:"OuteTTS",repoName:"OuteTTS",repoUrl:"https://github.com/edwko/OuteTTS",snippets:Sp,filter:!1},paddlenlp:{prettyLabel:"paddlenlp",repoName:"PaddleNLP",repoUrl:"https://github.com/PaddlePaddle/PaddleNLP",docsUrl:"https://huggingface.co/docs/hub/paddlenlp",snippets:md,filter:!0,countDownloads:'path:"model_config.json"'},PaddleOCR:{prettyLabel:"PaddleOCR",repoName:"PaddleOCR",repoUrl:"https://github.com/PaddlePaddle/PaddleOCR",docsUrl:"https://www.paddleocr.ai/",snippets:fd,filter:!0,countDownloads:'path_extension:"safetensors" OR path:"inference.pdiparams"'},peft:{prettyLabel:"PEFT",repoName:"PEFT",repoUrl:"https://github.com/huggingface/peft",snippets:Qd,filter:!0,countDownloads:'path:"adapter_config.json"'},"perception-encoder":{prettyLabel:"PerceptionEncoder",repoName:"PerceptionModels",repoUrl:"https://github.com/facebookresearch/perception_models",filter:!1,snippets:gd,countDownloads:'path_extension:"pt"'},"phantom-wan":{prettyLabel:"Phantom",repoName:"Phantom",repoUrl:"https://github.com/Phantom-video/Phantom",snippets:hd,filter:!1,countDownloads:'path_extension:"pth"'},"pruna-ai":{prettyLabel:"Pruna AI",repoName:"Pruna AI",repoUrl:"https://github.com/PrunaAI/pruna",snippets:wp,docsUrl:"https://docs.pruna.ai"},pxia:{prettyLabel:"pxia",repoName:"pxia",repoUrl:"https://github.com/not-lain/pxia",snippets:Ip,filter:!1},"pyannote-audio":{prettyLabel:"pyannote.audio",repoName:"pyannote-audio",repoUrl:"https://github.com/pyannote/pyannote-audio",snippets:vd,filter:!0},"py-feat":{prettyLabel:"Py-Feat",repoName:"Py-Feat",repoUrl:"https://github.com/cosanlab/py-feat",docsUrl:"https://py-feat.org/",filter:!1},pythae:{prettyLabel:"pythae",repoName:"pythae",repoUrl:"https://github.com/clementchadebec/benchmark_VAE",snippets:Tp,filter:!1},quantumpeer:{prettyLabel:"QuantumPeer",repoName:"QuantumPeer",repoUrl:"https://github.com/OpenPeer-AI/QuantumPeer",filter:!1,countDownloads:'path_extension:"setup.py"'},recurrentgemma:{prettyLabel:"RecurrentGemma",repoName:"recurrentgemma",repoUrl:"https://github.com/google-deepmind/recurrentgemma",filter:!1,countDownloads:'path:"tokenizer.model"'},relik:{prettyLabel:"Relik",repoName:"Relik",repoUrl:"https://github.com/SapienzaNLP/relik",snippets:wd,filter:!1},refiners:{prettyLabel:"Refiners",repoName:"Refiners",repoUrl:"https://github.com/finegrain-ai/refiners",docsUrl:"https://refine.rs/",filter:!1,countDownloads:'path:"model.safetensors"'},renderformer:{prettyLabel:"RenderFormer",repoName:"RenderFormer",repoUrl:"https://github.com/microsoft/renderformer",snippets:_d,filter:!1},reverb:{prettyLabel:"Reverb",repoName:"Reverb",repoUrl:"https://github.com/revdotcom/reverb",filter:!1},rkllm:{prettyLabel:"RKLLM",repoName:"RKLLM",repoUrl:"https://github.com/airockchip/rknn-llm",countDownloads:'path_extension:"rkllm"'},saelens:{prettyLabel:"SAELens",repoName:"SAELens",repoUrl:"https://github.com/jbloomAus/SAELens",snippets:Td,filter:!1},sam2:{prettyLabel:"sam2",repoName:"sam2",repoUrl:"https://github.com/facebookresearch/segment-anything-2",filter:!1,snippets:Md,countDownloads:'path_extension:"pt"'},"sample-factory":{prettyLabel:"sample-factory",repoName:"sample-factory",repoUrl:"https://github.com/alex-petrenko/sample-factory",docsUrl:"https://huggingface.co/docs/hub/sample-factory",snippets:Dd,filter:!0,countDownloads:'path:"cfg.json"'},"sap-rpt-1-oss":{prettyLabel:"sap-rpt-1-oss",repoName:"sap-rpt-1-oss",repoUrl:"https://github.com/SAP-samples/sap-rpt-1-oss",countDownloads:'path_extension:"pt"',snippets:fc},sapiens:{prettyLabel:"sapiens",repoName:"sapiens",repoUrl:"https://github.com/facebookresearch/sapiens",filter:!1,countDownloads:'path_extension:"pt2" OR path_extension:"pth" OR path_extension:"onnx"'},seedvr:{prettyLabel:"SeedVR",repoName:"SeedVR",repoUrl:"https://github.com/ByteDance-Seed/SeedVR",filter:!1,countDownloads:'path_extension:"pth"'},"self-forcing":{prettyLabel:"SelfForcing",repoName:"SelfForcing",repoUrl:"https://github.com/guandeh17/Self-Forcing",filter:!1,countDownloads:'path_extension:"pt"'},"sentence-transformers":{prettyLabel:"sentence-transformers",repoName:"sentence-transformers",repoUrl:"https://github.com/UKPLab/sentence-transformers",docsUrl:"https://huggingface.co/docs/hub/sentence-transformers",snippets:jd,filter:!0},setfit:{prettyLabel:"setfit",repoName:"setfit",repoUrl:"https://github.com/huggingface/setfit",docsUrl:"https://huggingface.co/docs/hub/setfit",snippets:Nd,filter:!0},sklearn:{prettyLabel:"Scikit-learn",repoName:"Scikit-learn",repoUrl:"https://github.com/scikit-learn/scikit-learn",snippets:Ld,filter:!0,countDownloads:'path:"sklearn_model.joblib"'},spacy:{prettyLabel:"spaCy",repoName:"spaCy",repoUrl:"https://github.com/explosion/spaCy",docsUrl:"https://huggingface.co/docs/hub/spacy",snippets:Od,filter:!0,countDownloads:'path_extension:"whl"'},"span-marker":{prettyLabel:"SpanMarker",repoName:"SpanMarkerNER",repoUrl:"https://github.com/tomaarsen/SpanMarkerNER",docsUrl:"https://huggingface.co/docs/hub/span_marker",snippets:qd,filter:!0},speechbrain:{prettyLabel:"speechbrain",repoName:"speechbrain",repoUrl:"https://github.com/speechbrain/speechbrain",docsUrl:"https://huggingface.co/docs/hub/speechbrain",snippets:Vd,filter:!0,countDownloads:'path:"hyperparams.yaml"'},"ssr-speech":{prettyLabel:"SSR-Speech",repoName:"SSR-Speech",repoUrl:"https://github.com/WangHelin1997/SSR-Speech",filter:!1,countDownloads:'path_extension:".pth"'},"stable-audio-tools":{prettyLabel:"Stable Audio Tools",repoName:"stable-audio-tools",repoUrl:"https://github.com/Stability-AI/stable-audio-tools.git",filter:!1,countDownloads:'path:"model.safetensors"',snippets:Ud},monkeyocr:{prettyLabel:"MonkeyOCR",repoName:"monkeyocr",repoUrl:"https://github.com/Yuliang-Liu/MonkeyOCR",filter:!1,countDownloads:'path:"Recognition/config.json"'},"diffusion-single-file":{prettyLabel:"Diffusion Single File",repoName:"diffusion-single-file",repoUrl:"https://github.com/comfyanonymous/ComfyUI",filter:!1,countDownloads:'path_extension:"safetensors"'},"seed-story":{prettyLabel:"SEED-Story",repoName:"SEED-Story",repoUrl:"https://github.com/TencentARC/SEED-Story",filter:!1,countDownloads:'path:"cvlm_llama2_tokenizer/tokenizer.model"',snippets:Cd},soloaudio:{prettyLabel:"SoloAudio",repoName:"SoloAudio",repoUrl:"https://github.com/WangHelin1997/SoloAudio",filter:!1,countDownloads:'path:"soloaudio_v2.pt"'},songbloom:{prettyLabel:"SongBloom",repoName:"SongBloom",repoUrl:"https://github.com/Cypress-Yang/SongBloom",filter:!1,countDownloads:'path_extension:"pt"'},"stable-baselines3":{prettyLabel:"stable-baselines3",repoName:"stable-baselines3",repoUrl:"https://github.com/huggingface/huggingface_sb3",docsUrl:"https://huggingface.co/docs/hub/stable-baselines3",snippets:Yd,filter:!0,countDownloads:'path_extension:"zip"'},stanza:{prettyLabel:"Stanza",repoName:"stanza",repoUrl:"https://github.com/stanfordnlp/stanza",docsUrl:"https://huggingface.co/docs/hub/stanza",snippets:Fd,filter:!0,countDownloads:'path:"models/default.zip"'},swarmformer:{prettyLabel:"SwarmFormer",repoName:"SwarmFormer",repoUrl:"https://github.com/takara-ai/SwarmFormer",snippets:pp,filter:!1},"f5-tts":{prettyLabel:"F5-TTS",repoName:"F5-TTS",repoUrl:"https://github.com/SWivid/F5-TTS",filter:!1,countDownloads:'path_extension:"safetensors" OR path_extension:"pt"'},genmo:{prettyLabel:"Genmo",repoName:"Genmo",repoUrl:"https://github.com/genmoai/models",filter:!1,countDownloads:'path:"vae_stats.json"'},"tencent-song-generation":{prettyLabel:"SongGeneration",repoName:"SongGeneration",repoUrl:"https://github.com/tencent-ailab/songgeneration",filter:!1,countDownloads:'path:"ckpt/songgeneration_base/model.pt"'},tensorflowtts:{prettyLabel:"TensorFlowTTS",repoName:"TensorFlowTTS",repoUrl:"https://github.com/TensorSpeech/TensorFlowTTS",snippets:Sd},tensorrt:{prettyLabel:"TensorRT",repoName:"TensorRT",repoUrl:"https://github.com/NVIDIA/TensorRT",countDownloads:'path_extension:"onnx"'},tabpfn:{prettyLabel:"TabPFN",repoName:"TabPFN",repoUrl:"https://github.com/PriorLabs/TabPFN"},terratorch:{prettyLabel:"TerraTorch",repoName:"TerraTorch",repoUrl:"https://github.com/IBM/terratorch",docsUrl:"https://ibm.github.io/terratorch/",filter:!1,countDownloads:'path_extension:"pt" OR path_extension:"ckpt"',snippets:Kd},"tic-clip":{prettyLabel:"TiC-CLIP",repoName:"TiC-CLIP",repoUrl:"https://github.com/apple/ml-tic-clip",filter:!1,countDownloads:'path_extension:"pt" AND path_prefix:"checkpoints/"'},timesfm:{prettyLabel:"TimesFM",repoName:"timesfm",repoUrl:"https://github.com/google-research/timesfm",filter:!1,countDownloads:'path:"checkpoints/checkpoint_1100000/state/checkpoint" OR path:"checkpoints/checkpoint_2150000/state/checkpoint" OR path_extension:"ckpt"'},timm:{prettyLabel:"timm",repoName:"pytorch-image-models",repoUrl:"https://github.com/rwightman/pytorch-image-models",docsUrl:"https://huggingface.co/docs/hub/timm",snippets:Id,filter:!0,countDownloads:'path:"pytorch_model.bin" OR path:"model.safetensors"'},tirex:{prettyLabel:"TiRex",repoName:"TiRex",repoUrl:"https://github.com/NX-AI/tirex",countDownloads:'path_extension:"ckpt"'},torchgeo:{prettyLabel:"TorchGeo",repoName:"TorchGeo",repoUrl:"https://github.com/microsoft/torchgeo",docsUrl:"https://torchgeo.readthedocs.io/",filter:!1,countDownloads:'path_extension:"pt" OR path_extension:"pth"'},transformers:{prettyLabel:"Transformers",repoName:"🤗/transformers",repoUrl:"https://github.com/huggingface/transformers",docsUrl:"https://huggingface.co/docs/hub/transformers",snippets:Ha,filter:!0},"transformers.js":{prettyLabel:"Transformers.js",repoName:"transformers.js",repoUrl:"https://github.com/huggingface/transformers.js",docsUrl:"https://huggingface.co/docs/hub/transformers-js",snippets:Wd,filter:!0},trellis:{prettyLabel:"Trellis",repoName:"Trellis",repoUrl:"https://github.com/microsoft/TRELLIS",countDownloads:'path_extension:"safetensors"'},ultralytics:{prettyLabel:"ultralytics",repoName:"ultralytics",repoUrl:"https://github.com/ultralytics/ultralytics",docsUrl:"https://github.com/ultralytics/ultralytics",filter:!1,countDownloads:'path_extension:"pt"',snippets:sa},univa:{prettyLabel:"univa",repoName:"univa",repoUrl:"https://github.com/PKU-YuanGroup/UniWorld-V1",snippets:up,filter:!0,countDownloads:'path:"config.json"'},"uni-3dar":{prettyLabel:"Uni-3DAR",repoName:"Uni-3DAR",repoUrl:"https://github.com/dptech-corp/Uni-3DAR",docsUrl:"https://github.com/dptech-corp/Uni-3DAR",countDownloads:'path_extension:"pt"'},"unity-sentis":{prettyLabel:"unity-sentis",repoName:"unity-sentis",repoUrl:"https://github.com/Unity-Technologies/sentis-samples",snippets:ep,filter:!0,countDownloads:'path_extension:"sentis"'},sana:{prettyLabel:"Sana",repoName:"Sana",repoUrl:"https://github.com/NVlabs/Sana",countDownloads:'path_extension:"pth"',snippets:tp},videoprism:{prettyLabel:"VideoPrism",repoName:"VideoPrism",repoUrl:"https://github.com/google-deepmind/videoprism",countDownloads:'path_extension:"npz"',snippets:np},"vfi-mamba":{prettyLabel:"VFIMamba",repoName:"VFIMamba",repoUrl:"https://github.com/MCG-NJU/VFIMamba",countDownloads:'path_extension:"pkl"',snippets:ip},lvface:{prettyLabel:"LVFace",repoName:"LVFace",repoUrl:"https://github.com/bytedance/LVFace",countDownloads:'path_extension:"pt" OR path_extension:"onnx"',snippets:op},voicecraft:{prettyLabel:"VoiceCraft",repoName:"VoiceCraft",repoUrl:"https://github.com/jasonppy/VoiceCraft",docsUrl:"https://github.com/jasonppy/VoiceCraft",snippets:rp},voxcpm:{prettyLabel:"VoxCPM",repoName:"VoxCPM",repoUrl:"https://github.com/OpenBMB/VoxCPM",snippets:sp,filter:!1},vui:{prettyLabel:"Vui",repoName:"Vui",repoUrl:"https://github.com/vui-ai/vui",countDownloads:'path_extension:"pt"',snippets:lp},vibevoice:{prettyLabel:"VibeVoice",repoName:"VibeVoice",repoUrl:"https://github.com/microsoft/VibeVoice",snippets:ap,filter:!1},"wan2.2":{prettyLabel:"Wan2.2",repoName:"Wan2.2",repoUrl:"https://github.com/Wan-Video/Wan2.2",countDownloads:'path_filename:"config" AND path_extension:"json"'},wham:{prettyLabel:"WHAM",repoName:"wham",repoUrl:"https://huggingface.co/microsoft/wham",docsUrl:"https://huggingface.co/microsoft/wham/blob/main/README.md",countDownloads:'path_extension:"ckpt"'},whisperkit:{prettyLabel:"WhisperKit",repoName:"WhisperKit",repoUrl:"https://github.com/argmaxinc/WhisperKit",docsUrl:"https://github.com/argmaxinc/WhisperKit?tab=readme-ov-file#homebrew",snippets:Up,countDownloads:'path_filename:"model" AND path_extension:"mil" AND _exists_:"path_prefix"'},yolov10:{prettyLabel:"YOLOv10",repoName:"YOLOv10",repoUrl:"https://github.com/THU-MIG/yolov10",docsUrl:"https://github.com/THU-MIG/yolov10",countDownloads:'path_extension:"pt" OR path_extension:"safetensors"',snippets:sa},zonos:{prettyLabel:"Zonos",repoName:"Zonos",repoUrl:"https://github.com/Zyphra/Zonos",docsUrl:"https://github.com/Zyphra/Zonos",snippets:Mp,filter:!1},"3dtopia-xl":{prettyLabel:"3DTopia-XL",repoName:"3DTopia-XL",repoUrl:"https://github.com/3DTopia/3DTopia-XL",filter:!1,countDownloads:'path:"model_vae_fp16.pt"',snippets:$p}};Object.entries(Dp).filter(([e,t])=>t.filter).map(([e])=>e);var A;(function(e){e[e.F32=0]="F32",e[e.F16=1]="F16",e[e.Q4_0=2]="Q4_0",e[e.Q4_1=3]="Q4_1",e[e.Q4_1_SOME_F16=4]="Q4_1_SOME_F16",e[e.Q4_2=5]="Q4_2",e[e.Q4_3=6]="Q4_3",e[e.Q8_0=7]="Q8_0",e[e.Q5_0=8]="Q5_0",e[e.Q5_1=9]="Q5_1",e[e.Q2_K=10]="Q2_K",e[e.Q3_K_S=11]="Q3_K_S",e[e.Q3_K_M=12]="Q3_K_M",e[e.Q3_K_L=13]="Q3_K_L",e[e.Q4_K_S=14]="Q4_K_S",e[e.Q4_K_M=15]="Q4_K_M",e[e.Q5_K_S=16]="Q5_K_S",e[e.Q5_K_M=17]="Q5_K_M",e[e.Q6_K=18]="Q6_K",e[e.IQ2_XXS=19]="IQ2_XXS",e[e.IQ2_XS=20]="IQ2_XS",e[e.Q2_K_S=21]="Q2_K_S",e[e.IQ3_XS=22]="IQ3_XS",e[e.IQ3_XXS=23]="IQ3_XXS",e[e.IQ1_S=24]="IQ1_S",e[e.IQ4_NL=25]="IQ4_NL",e[e.IQ3_S=26]="IQ3_S",e[e.IQ3_M=27]="IQ3_M",e[e.IQ2_S=28]="IQ2_S",e[e.IQ2_M=29]="IQ2_M",e[e.IQ4_XS=30]="IQ4_XS",e[e.IQ1_M=31]="IQ1_M",e[e.BF16=32]="BF16",e[e.Q4_0_4_4=33]="Q4_0_4_4",e[e.Q4_0_4_8=34]="Q4_0_4_8",e[e.Q4_0_8_8=35]="Q4_0_8_8",e[e.TQ1_0=36]="TQ1_0",e[e.TQ2_0=37]="TQ2_0",e[e.MXFP4_MOE=38]="MXFP4_MOE",e[e.Q2_K_XL=1e3]="Q2_K_XL",e[e.Q3_K_XL=1001]="Q3_K_XL",e[e.Q4_K_XL=1002]="Q4_K_XL",e[e.Q5_K_XL=1003]="Q5_K_XL",e[e.Q6_K_XL=1004]="Q6_K_XL",e[e.Q8_K_XL=1005]="Q8_K_XL"})(A||(A={}));var Bp=Object.values(A).filter(e=>typeof e=="string");new RegExp(`(?<quant>${Bp.join("|")})(_(?<sizeVariation>[A-Z]+))?`);A.F32,A.BF16,A.F16,A.Q8_K_XL,A.Q8_0,A.Q6_K_XL,A.Q6_K,A.Q5_K_XL,A.Q5_K_M,A.Q5_K_S,A.Q5_0,A.Q5_1,A.Q4_K_XL,A.Q4_K_M,A.Q4_K_S,A.IQ4_NL,A.IQ4_XS,A.Q4_0_4_4,A.Q4_0_4_8,A.Q4_0_8_8,A.Q4_1_SOME_F16,A.Q4_0,A.Q4_1,A.Q4_2,A.Q4_3,A.MXFP4_MOE,A.Q3_K_XL,A.Q3_K_L,A.Q3_K_M,A.Q3_K_S,A.IQ3_M,A.IQ3_S,A.IQ3_XS,A.IQ3_XXS,A.Q2_K_XL,A.Q2_K,A.Q2_K_S,A.IQ2_M,A.IQ2_S,A.IQ2_XS,A.IQ2_XXS,A.IQ1_S,A.IQ1_M,A.TQ1_0,A.TQ2_0;var la;(function(e){e[e.F32=0]="F32",e[e.F16=1]="F16",e[e.Q4_0=2]="Q4_0",e[e.Q4_1=3]="Q4_1",e[e.Q5_0=6]="Q5_0",e[e.Q5_1=7]="Q5_1",e[e.Q8_0=8]="Q8_0",e[e.Q8_1=9]="Q8_1",e[e.Q2_K=10]="Q2_K",e[e.Q3_K=11]="Q3_K",e[e.Q4_K=12]="Q4_K",e[e.Q5_K=13]="Q5_K",e[e.Q6_K=14]="Q6_K",e[e.Q8_K=15]="Q8_K",e[e.IQ2_XXS=16]="IQ2_XXS",e[e.IQ2_XS=17]="IQ2_XS",e[e.IQ3_XXS=18]="IQ3_XXS",e[e.IQ1_S=19]="IQ1_S",e[e.IQ4_NL=20]="IQ4_NL",e[e.IQ3_S=21]="IQ3_S",e[e.IQ2_S=22]="IQ2_S",e[e.IQ4_XS=23]="IQ4_XS",e[e.I8=24]="I8",e[e.I16=25]="I16",e[e.I32=26]="I32",e[e.I64=27]="I64",e[e.F64=28]="F64",e[e.IQ1_M=29]="IQ1_M",e[e.BF16=30]="BF16",e[e.TQ1_0=34]="TQ1_0",e[e.TQ2_0=35]="TQ2_0",e[e.MXFP4=39]="MXFP4"})(la||(la={}));var jp=["python","js","sh"],Va={js:{fetch:{basic:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,basicAudio:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "audio/flac",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,basicImage:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});`,conversational:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

query({ 
{{ autoInputs.asTsString }}
}).then((response) => {
    console.log(JSON.stringify(response));
});`,imageToImage:`const image = fs.readFileSync("{{inputs.asObj.inputs}}");

async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: {
				"inputs": \`data:image/png;base64,\${data.inputs.encode("base64")}\`,
				"parameters": data.parameters,
			}
		}
	);
	const result = await response.json();
	return result;
}

query({ 
	inputs: image,
	parameters: {
		prompt: "{{ inputs.asObj.parameters.prompt }}",
	}
}).then((response) => {
    console.log(JSON.stringify(response));
});`,imageToVideo:`const image = fs.readFileSync("{{inputs.asObj.inputs}}");

async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "image/jpeg",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: {
				"image_url": \`data:image/png;base64,\${data.image.encode("base64")}\`,
				"prompt": data.prompt,
			}
		}
	);
	const result = await response.json();
	return result;
}

query({
	"image": image,
	"prompt": "{{inputs.asObj.parameters.prompt}}",
}).then((response) => {
    // Use video
});`,textToAudio:`{% if model.library_name == "transformers" %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
    return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    // Returns a byte object of the Audio wavform. Use it directly!
});
{% else %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
    const result = await response.json();
    return result;
}

query({ inputs: {{ providerInputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});
{% endif %} `,textToImage:`async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}


query({ {{ providerInputs.asTsString }} }).then((response) => {
    // Use image
});`,textToSpeech:`{% if model.library_name == "transformers" %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
{% if billTo %}
				"X-HF-Bill-To": "{{ billTo }}",
{% endif %}			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
    return result;
}

query({ text: {{ inputs.asObj.inputs }} }).then((response) => {
    // Returns a byte object of the Audio wavform. Use it directly!
});
{% else %}
async function query(data) {
	const response = await fetch(
		"{{ fullUrl }}",
		{
			headers: {
				Authorization: "{{ authorizationHeader }}",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
    const result = await response.json();
    return result;
}

query({ text: {{ inputs.asObj.inputs }} }).then((response) => {
    console.log(JSON.stringify(response));
});
{% endif %} `,zeroShotClassification:`async function query(data) {
    const response = await fetch(
		"{{ fullUrl }}",
        {
            headers: {
				Authorization: "{{ authorizationHeader }}",
                "Content-Type": "application/json",
{% if billTo %}
                "X-HF-Bill-To": "{{ billTo }}",
{% endif %}         },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}

query({
    inputs: {{ providerInputs.asObj.inputs }},
    parameters: { candidate_labels: ["refund", "legal", "faq"] }
}).then((response) => {
    console.log(JSON.stringify(response));
});`},"huggingface.js":{basic:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,basicAudio:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync({{inputs.asObj.inputs}});

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	data,
	model: "{{ model.id }}",
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,basicImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync({{inputs.asObj.inputs}});

const output = await client.{{ methodName }}({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
	data,
	model: "{{ model.id }}",
	provider: "{{ provider }}",
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

console.log(output);`,conversational:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const chatCompletion = await client.chatCompletion({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
{% if directRequest %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
{% else %}
    model: "{{ providerModelId }}",
{% endif %}
{{ inputs.asTsString }}
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});

console.log(chatCompletion.choices[0].message);`,conversationalStream:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

let out = "";

const stream = client.chatCompletionStream({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    model: "{{ providerModelId }}",
{{ inputs.asTsString }}
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});

for await (const chunk of stream) {
	if (chunk.choices && chunk.choices.length > 0) {
		const newContent = chunk.choices[0].delta.content;
		out += newContent;
		console.log(newContent);
	}
}`,imageToImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync("{{inputs.asObj.inputs}}");

const image = await client.imageToImage({
{% if endpointUrl %}
	endpointUrl: "{{ endpointUrl }}",
{% endif %}
	provider: "{{provider}}",
	model: "{{model.id}}",
	inputs: data,
	parameters: { prompt: "{{inputs.asObj.parameters.prompt}}", },
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});
/// Use the generated image (it's a Blob)
// For example, you can save it to a file or display it in an image element
`,imageToVideo:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const data = fs.readFileSync("{{inputs.asObj.inputs}}");

const video = await client.imageToVideo({
{% if endpointUrl %}
	endpointUrl: "{{ endpointUrl }}",
{% endif %}
	provider: "{{provider}}",
	model: "{{model.id}}",
	inputs: data,
	parameters: { prompt: "{{inputs.asObj.parameters.prompt}}", },
}{% if billTo %}, {
	billTo: "{{ billTo }}",
}{% endif %});

/// Use the generated video (it's a Blob)
// For example, you can save it to a file or display it in a video element
`,textToImage:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const image = await client.textToImage({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
	parameters: { num_inference_steps: 5 },
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
/// Use the generated image (it's a Blob)`,textToSpeech:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const audio = await client.textToSpeech({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
// Use the generated audio (it's a Blob)`,textToVideo:`import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("{{ accessToken }}");

const video = await client.textToVideo({
{% if endpointUrl %}
    endpointUrl: "{{ endpointUrl }}",
{% endif %}
    provider: "{{ provider }}",
    model: "{{ model.id }}",
	inputs: {{ inputs.asObj.inputs }},
}{% if billTo %}, {
    billTo: "{{ billTo }}",
}{% endif %});
// Use the generated video (it's a Blob)`},openai:{conversational:`import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "{{ baseUrl }}",
	apiKey: "{{ accessToken }}",
{% if billTo %}
	defaultHeaders: {
		"X-HF-Bill-To": "{{ billTo }}" 
	}
{% endif %}
});

const chatCompletion = await client.chat.completions.create({
	model: "{{ providerModelId }}",
{{ inputs.asTsString }}
});

console.log(chatCompletion.choices[0].message);`,conversationalStream:`import { OpenAI } from "openai";

const client = new OpenAI({
	baseURL: "{{ baseUrl }}",
	apiKey: "{{ accessToken }}",
{% if billTo %}
    defaultHeaders: {
		"X-HF-Bill-To": "{{ billTo }}" 
	}
{% endif %}
});

const stream = await client.chat.completions.create({
    model: "{{ providerModelId }}",
{{ inputs.asTsString }}
    stream: true,
});

for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`}},python:{fal_client:{imageToImage:`{%if provider == "fal-ai" %}
import fal_client
import base64

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

with open("{{inputs.asObj.inputs}}", "rb") as image_file:
    image_base_64 = base64.b64encode(image_file.read()).decode('utf-8')

result = fal_client.subscribe(
    "fal-ai/flux-kontext/dev",
    arguments={
        "prompt": f"data:image/png;base64,{image_base_64}",
        "image_url": "{{ providerInputs.asObj.inputs }}",
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
{%endif%}
`,imageToVideo:`{%if provider == "fal-ai" %}
import fal_client
import base64

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

with open("{{inputs.asObj.inputs}}", "rb") as image_file:
    image_base_64 = base64.b64encode(image_file.read()).decode('utf-8')

result = fal_client.subscribe(
    "{{model.id}}",
    arguments={
        "image_url": f"data:image/png;base64,{image_base_64}",
        "prompt": "{{inputs.asObj.parameters.prompt}}",
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
{%endif%}
`,textToImage:`{% if provider == "fal-ai" %}
import fal_client

{% if providerInputs.asObj.loras is defined and providerInputs.asObj.loras != none %}
result = fal_client.subscribe(
    "{{ providerModelId }}",
    arguments={
        "prompt": {{ inputs.asObj.inputs }},
        "loras":{{ providerInputs.asObj.loras | tojson }},
    },
)
{% else %}
result = fal_client.subscribe(
    "{{ providerModelId }}",
    arguments={
        "prompt": {{ inputs.asObj.inputs }},
    },
)
{% endif %} 
print(result)
{% endif %} `},huggingface_hub:{basic:`result = client.{{ methodName }}(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
)`,basicAudio:'output = client.{{ methodName }}({{ inputs.asObj.inputs }}, model="{{ model.id }}")',basicImage:'output = client.{{ methodName }}({{ inputs.asObj.inputs }}, model="{{ model.id }}")',conversational:`completion = client.chat.completions.create(
{% if directRequest %}
    model="{{ model.id }}",
{% else %}
    model="{{ providerModelId }}",
{% endif %}
{{ inputs.asPythonString }}
)

print(completion.choices[0].message) `,conversationalStream:`stream = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="") `,documentQuestionAnswering:`output = client.document_question_answering(
    "{{ inputs.asObj.image }}",
    question="{{ inputs.asObj.question }}",
    model="{{ model.id }}",
) `,imageToImage:`with open("{{ inputs.asObj.inputs }}", "rb") as image_file:
   input_image = image_file.read()

# output is a PIL.Image object
image = client.image_to_image(
    input_image,
    prompt="{{ inputs.asObj.parameters.prompt }}",
    model="{{ model.id }}",
)
`,imageToVideo:`with open("{{ inputs.asObj.inputs }}", "rb") as image_file:
   input_image = image_file.read()

video = client.image_to_video(
    input_image,
    prompt="{{ inputs.asObj.parameters.prompt }}",
    model="{{ model.id }}",
) 
`,importInferenceClient:`from huggingface_hub import InferenceClient

client = InferenceClient(
{% if endpointUrl %}
    base_url="{{ baseUrl }}",
{% endif %}
{% if task != "conversational" or directRequest %}
    provider="{{ provider }}",
{% endif %}
    api_key="{{ accessToken }}",
{% if billTo %}
    bill_to="{{ billTo }}",
{% endif %}
)`,questionAnswering:`answer = client.question_answering(
    question="{{ inputs.asObj.question }}",
    context="{{ inputs.asObj.context }}",
    model="{{ model.id }}",
) `,tableQuestionAnswering:`answer = client.table_question_answering(
    query="{{ inputs.asObj.query }}",
    table={{ inputs.asObj.table }},
    model="{{ model.id }}",
) `,textToImage:`# output is a PIL.Image object
image = client.text_to_image(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) `,textToSpeech:`# audio is returned as bytes
audio = client.text_to_speech(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) 
`,textToVideo:`video = client.text_to_video(
    {{ inputs.asObj.inputs }},
    model="{{ model.id }}",
) `},openai:{conversational:`from openai import OpenAI

client = OpenAI(
    base_url="{{ baseUrl }}",
    api_key="{{ accessToken }}",
{% if billTo %}
    default_headers={
        "X-HF-Bill-To": "{{ billTo }}"
    }
{% endif %}
)

completion = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
)

print(completion.choices[0].message) `,conversationalStream:`from openai import OpenAI

client = OpenAI(
    base_url="{{ baseUrl }}",
    api_key="{{ accessToken }}",
{% if billTo %}
    default_headers={
        "X-HF-Bill-To": "{{ billTo }}"
    }
{% endif %}
)

stream = client.chat.completions.create(
    model="{{ providerModelId }}",
{{ inputs.asPythonString }}
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content, end="")`},requests:{basic:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {{ providerInputs.asObj.inputs }},
}) `,basicAudio:`def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers={"Content-Type": "audio/flac", **headers}, data=data)
    return response.json()

output = query({{ providerInputs.asObj.inputs }})`,basicImage:`def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers={"Content-Type": "image/jpeg", **headers}, data=data)
    return response.json()

output = query({{ providerInputs.asObj.inputs }})`,conversational:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

response = query({
{{ autoInputs.asJsonString }}
})

print(response["choices"][0]["message"])`,conversationalStream:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload, stream=True)
    for line in response.iter_lines():
        if not line.startswith(b"data:"):
            continue
        if line.strip() == b"data: [DONE]":
            return
        yield json.loads(line.decode("utf-8").lstrip("data:").rstrip("/n"))

chunks = query({
{{ autoInputs.asJsonString }},
    "stream": True,
})

for chunk in chunks:
    print(chunk["choices"][0]["delta"]["content"], end="")`,documentQuestionAnswering:`def query(payload):
    with open(payload["image"], "rb") as f:
        img = f.read()
        payload["image"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {
        "image": "{{ inputs.asObj.image }}",
        "question": "{{ inputs.asObj.question }}",
    },
}) `,imageToImage:`
def query(payload):
    with open(payload["inputs"], "rb") as f:
        img = f.read()
        payload["inputs"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

image_bytes = query({
{{ providerInputs.asJsonString }}
})

# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes)) `,imageToVideo:`
def query(payload):
    with open(payload["inputs"], "rb") as f:
        img = f.read()
        payload["inputs"] = base64.b64encode(img).decode("utf-8")
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

video_bytes = query({
{{ inputs.asJsonString }}
})
`,importRequests:`{% if importBase64 %}
import base64
{% endif %}
{% if importJson %}
import json
{% endif %}
import requests

API_URL = "{{ fullUrl }}"
headers = {
    "Authorization": "{{ authorizationHeader }}",
{% if billTo %}
    "X-HF-Bill-To": "{{ billTo }}"
{% endif %}
}`,tabular:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

response = query({
    "inputs": {
        "data": {{ providerInputs.asObj.inputs }}
    },
}) `,textToAudio:`{% if model.library_name == "transformers" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

audio_bytes = query({
    "inputs": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio_bytes)
{% else %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

audio, sampling_rate = query({
    "inputs": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio, rate=sampling_rate)
{% endif %} `,textToImage:`{% if provider == "hf-inference" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

image_bytes = query({
    "inputs": {{ providerInputs.asObj.inputs }},
})

# You can access the image with PIL.Image for example
import io
from PIL import Image
image = Image.open(io.BytesIO(image_bytes))
{% endif %}`,textToSpeech:`{% if model.library_name == "transformers" %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content

audio_bytes = query({
    "text": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio_bytes)
{% else %}
def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

audio, sampling_rate = query({
    "text": {{ inputs.asObj.inputs }},
})
# You can access the audio with IPython.display for example
from IPython.display import Audio
Audio(audio, rate=sampling_rate)
{% endif %} `,zeroShotClassification:`def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "inputs": {{ providerInputs.asObj.inputs }},
    "parameters": {"candidate_labels": ["refund", "legal", "faq"]},
}) `,zeroShotImageClassification:`def query(data):
    with open(data["image_path"], "rb") as f:
        img = f.read()
    payload={
        "parameters": data["parameters"],
        "inputs": base64.b64encode(img).decode("utf-8")
    }
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

output = query({
    "image_path": {{ providerInputs.asObj.inputs }},
    "parameters": {"candidate_labels": ["cat", "dog", "llama"]},
}) `}},sh:{curl:{basic:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ providerInputs.asCurlString }}
    }'`,basicAudio:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: audio/flac' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    --data-binary @{{ providerInputs.asObj.inputs }}`,basicImage:`curl {{ fullUrl }} \\
    -X POST \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: image/jpeg' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    --data-binary @{{ providerInputs.asObj.inputs }}`,conversational:`curl {{ fullUrl }} \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ autoInputs.asCurlString }},
        "stream": false
    }'`,conversationalStream:`curl {{ fullUrl }} \\
    -H 'Authorization: {{ authorizationHeader }}' \\
    -H 'Content-Type: application/json' \\
{% if billTo %}
    -H 'X-HF-Bill-To: {{ billTo }}' \\
{% endif %}
    -d '{
{{ autoInputs.asCurlString }},
        "stream": true
    }'`,zeroShotClassification:`curl {{ fullUrl }} \\
    -X POST \\
    -d '{"inputs": {{ providerInputs.asObj.inputs }}, "parameters": {"candidate_labels": ["refund", "legal", "faq"]}}' \\
    -H 'Content-Type: application/json' \\
    -H 'Authorization: {{ authorizationHeader }}'
{% if billTo %} \\
    -H 'X-HF-Bill-To: {{ billTo }}'
{% endif %}`}}},Np=["openai","huggingface_hub","fal_client","requests"],Op=["openai","huggingface.js","fetch"],qp=["curl"],Fp={js:[...Op],python:[...Np],sh:[...qp]},Hp={js:["huggingface.js"],python:["huggingface_hub"]},Vp=(e,t,a)=>{var n,i;return((i=(n=Va[e])==null?void 0:n[t])==null?void 0:i[a])!==void 0},jt=(e,t,a)=>{var i,o;const n=(o=(i=Va[e])==null?void 0:i[t])==null?void 0:o[a];if(!n)throw new Error(`Template not found: ${e}/${t}/${a}`);return r=>new Or(n).render({...r})},Kp=jt("python","huggingface_hub","importInferenceClient"),zp=jt("python","requests","importRequests"),ca={"audio-classification":"audio_classification","audio-to-audio":"audio_to_audio","automatic-speech-recognition":"automatic_speech_recognition","document-question-answering":"document_question_answering","feature-extraction":"feature_extraction","fill-mask":"fill_mask","image-classification":"image_classification","image-segmentation":"image_segmentation","image-to-image":"image_to_image","image-to-text":"image_to_text","object-detection":"object_detection","question-answering":"question_answering","sentence-similarity":"sentence_similarity",summarization:"summarization","table-question-answering":"table_question_answering","tabular-classification":"tabular_classification","tabular-regression":"tabular_regression","text-classification":"text_classification","text-generation":"text_generation","text-to-image":"text_to_image","text-to-speech":"text_to_speech","text-to-video":"text_to_video","token-classification":"token_classification",translation:"translation","visual-question-answering":"visual_question_answering","zero-shot-classification":"zero_shot_classification","zero-shot-image-classification":"zero_shot_image_classification"},da={"automatic-speech-recognition":"automaticSpeechRecognition","feature-extraction":"featureExtraction","fill-mask":"fillMask","image-classification":"imageClassification","question-answering":"questionAnswering","sentence-similarity":"sentenceSimilarity",summarization:"summarization","table-question-answering":"tableQuestionAnswering","text-classification":"textClassification","text-generation":"textGeneration","token-classification":"tokenClassification","text-to-speech":"textToSpeech",translation:"translation"},Wp="hf_token_placeholder",Xp="not_hf_token_placeholder",M=(e,t)=>(a,n,i,o)=>{var ve;const r=He(),l=(i==null?void 0:i.providerId)??a.id;let s=a.pipeline_tag;a.pipeline_tag&&["text-generation","image-text-to-text"].includes(a.pipeline_tag)&&a.tags.includes("conversational")&&(e=o!=null&&o.streaming?"conversationalStream":"conversational",t=Jp,s="conversational");let d;try{d=L(n,s)}catch(Z){return r.error(`Failed to get provider helper for ${n} (${s})`,Z),[]}const p=o!=null&&o.directRequest?Xp:Wp,u=(o==null?void 0:o.accessToken)??p,y=o!=null&&o.inputs?{inputs:o.inputs}:t?t(a,o):{inputs:Be(a)},b=xt(l,d,{accessToken:u,provider:n,endpointUrl:(o==null?void 0:o.endpointUrl)??(n==="auto"?ht:void 0),...y},i,{task:s,billTo:o==null?void 0:o.billTo});let k=y;const C=b.info.body;if(typeof C=="string")try{k=JSON.parse(C)}catch(Z){r.error("Failed to parse body as JSON",Z)}const q=!(o!=null&&o.endpointUrl)&&!(o!=null&&o.directRequest)?n!=="auto"?{...y,model:`${a.id}:${n}`}:{...y,model:`${a.id}`}:k,F={accessToken:u,authorizationHeader:(ve=b.info.headers)==null?void 0:ve.Authorization,baseUrl:s==="conversational"&&!(o!=null&&o.endpointUrl)&&!(o!=null&&o.directRequest)?ht:eu(b.url,"/chat/completions"),fullUrl:s==="conversational"&&!(o!=null&&o.endpointUrl)&&!(o!=null&&o.directRequest)?ht+"/chat/completions":b.url,inputs:{asObj:y,asCurlString:fe(y,"curl"),asJsonString:fe(y,"json"),asPythonString:fe(y,"python"),asTsString:fe(y,"ts")},providerInputs:{asObj:k,asCurlString:fe(k,"curl"),asJsonString:fe(k,"json"),asPythonString:fe(k,"python"),asTsString:fe(k,"ts")},autoInputs:{asObj:q,asCurlString:fe(q,"curl"),asJsonString:fe(q,"json"),asPythonString:fe(q,"python"),asTsString:fe(q,"ts")},model:a,provider:n,providerModelId:s==="conversational"&&!(o!=null&&o.endpointUrl)&&!(o!=null&&o.directRequest)?n!=="auto"?`${a.id}:${n}`:a.id:l??a.id,billTo:o==null?void 0:o.billTo,endpointUrl:o==null?void 0:o.endpointUrl,task:s,directRequest:!!(o!=null&&o.directRequest)},pe=n==="auto"&&s!=="conversational"?Hp:Fp;return jp.map(Z=>(pe[Z]??[]).map(V=>{if(!Vp(Z,V,e))return;const we=jt(Z,V,e);if(V==="huggingface_hub"&&e.includes("basic")){if(!(a.pipeline_tag&&a.pipeline_tag in ca))return;F.methodName=ca[a.pipeline_tag]}if(V==="huggingface.js"&&e.includes("basic")){if(!(a.pipeline_tag&&a.pipeline_tag in da))return;F.methodName=da[a.pipeline_tag]}let Y=we(F).trim();if(Y)return V==="huggingface_hub"?Y=`${Kp({...F})}

${Y}`:V==="requests"&&(Y=`${zp({...F,importBase64:Y.includes("base64"),importJson:Y.includes("json.")})}

${Y}`),Y.includes(p)&&(Y=tu(o==null?void 0:o.directRequest,p,Y,Z,n,o==null?void 0:o.endpointUrl)),{language:Z,client:V,content:Y}}).filter(V=>V!==void 0)).flat()},Qp=e=>JSON.parse(Be(e)),pa=e=>{const t=JSON.parse(Be(e));return{inputs:t.image,parameters:{prompt:t.prompt}}},Jp=(e,t)=>({messages:(t==null?void 0:t.messages)??Be(e),...t!=null&&t.temperature?{temperature:t==null?void 0:t.temperature}:void 0,...t!=null&&t.max_tokens?{max_tokens:t==null?void 0:t.max_tokens}:void 0,...t!=null&&t.top_p?{top_p:t==null?void 0:t.top_p}:void 0}),Yp=e=>{const t=JSON.parse(Be(e));return{question:t.question,context:t.context}},Zp=e=>{const t=JSON.parse(Be(e));return{query:t.query,table:JSON.stringify(t.table)}},it={"audio-classification":M("basicAudio"),"audio-to-audio":M("basicAudio"),"automatic-speech-recognition":M("basicAudio"),"document-question-answering":M("documentQuestionAnswering",Qp),"feature-extraction":M("basic"),"fill-mask":M("basic"),"image-classification":M("basicImage"),"image-segmentation":M("basicImage"),"image-text-to-text":M("conversational"),"image-to-image":M("imageToImage",pa),"image-to-text":M("basicImage"),"image-to-video":M("imageToVideo",pa),"object-detection":M("basicImage"),"question-answering":M("questionAnswering",Yp),"sentence-similarity":M("basic"),summarization:M("basic"),"tabular-classification":M("tabular"),"tabular-regression":M("tabular"),"table-question-answering":M("tableQuestionAnswering",Zp),"text-classification":M("basic"),"text-generation":M("basic"),"text-to-audio":M("textToAudio"),"text-to-image":M("textToImage"),"text-to-speech":M("textToSpeech"),"text-to-video":M("textToVideo"),"token-classification":M("basic"),translation:M("basic"),"zero-shot-classification":M("zeroShotClassification"),"zero-shot-image-classification":M("zeroShotImageClassification")};function Gp(e,t,a,n){var i;return e.pipeline_tag&&e.pipeline_tag in it?((i=it[e.pipeline_tag])==null?void 0:i.call(it,e,t,a,n))??[]:[]}function fe(e,t){switch(t){case"curl":return ua(fe(e,"json"));case"json":return JSON.stringify(e,null,4).split(`
`).slice(1,-1).join(`
`);case"python":return ua(Object.entries(e).map(([a,n])=>{const i=JSON.stringify(n,null,4).replace(/"/g,'"');return`${a}=${i},`}).join(`
`));case"ts":return At(e).split(`
`).slice(1,-1).join(`
`);default:throw new Error(`Unsupported format: ${t}`)}}function At(e,t){return t=t??0,typeof e!="object"||e===null?JSON.stringify(e):Array.isArray(e)?`[
${e.map(o=>{const r=At(o,t+1);return`${" ".repeat(4*(t+1))}${r},`}).join(`
`)}
${" ".repeat(4*t)}]`:`{
${Object.entries(e).map(([i,o])=>{const r=At(o,t+1),l=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(i)?i:`"${i}"`;return`${" ".repeat(4*(t+1))}${l}: ${r},`}).join(`
`)}
${" ".repeat(4*t)}}`}function ua(e){return e.split(`
`).map(t=>" ".repeat(4)+t).join(`
`)}function eu(e,t){return e.endsWith(t)?e.slice(0,-t.length):e}function tu(e,t,a,n,i,o){const l=!o&&(i=="hf-inference"||!e&&(a.includes("InferenceClient")||a.includes("https://router.huggingface.co")))?"HF_TOKEN":o?"API_TOKEN":i.toUpperCase().replace("-","_")+"_API_KEY";return n==="sh"?a=a.replace(`'Authorization: Bearer ${t}'`,`"Authorization: Bearer $${l}"`):n==="python"?(a=`import os
`+a,a=a.replace(`"${t}"`,`os.environ["${l}"]`),a=a.replace(`"Bearer ${t}"`,`f"Bearer {os.environ['${l}']}"`),a=a.replace(`"Key ${t}"`,`f"Key {os.environ['${l}']}"`),a=a.replace(`"X-Key ${t}"`,`f"X-Key {os.environ['${l}']}"`)):n==="js"&&(a=a.replace(`"${t}"`,`process.env.${l}`),a=a.replace(`Authorization: "Bearer ${t}",`,`Authorization: \`Bearer \${process.env.${l}}\`,`),a=a.replace(`Authorization: "Key ${t}",`,`Authorization: \`Key \${process.env.${l}}\`,`),a=a.replace(`Authorization: "X-Key ${t}",`,`Authorization: \`X-Key \${process.env.${l}}\`,`)),a}async function au(e,t){let a="",n={},i=r=>[];switch(e){case"openai":a="https://api.openai.com/v1/models",n={Authorization:`Bearer ${t.apiKey}`},i=d=>d.data.map(p=>p.id).filter(p=>p.startsWith("gpt")).sort();break;case"openrouter":a="https://openrouter.ai/api/v1/models",n={Authorization:`Bearer ${t.apiKey}`},i=d=>d.data.map(p=>p.id).sort();break;case"huggingface":return["meta-llama/Llama-3.2-3B-Instruct","meta-llama/Llama-3.1-8B-Instruct","Qwen/Qwen2.5-72B-Instruct","mistralai/Mistral-7B-Instruct-v0.3","deepseek-ai/DeepSeek-R1-Distill-Qwen-32B","google/gemma-2-9b-it"];case"anthropic":return["claude-sonnet-4-20250514","claude-3-5-sonnet-20241022","claude-3-5-haiku-20241022","claude-3-opus-20240229","claude-3-haiku-20240307"];case"ollama":a=`${t.endpoint.replace(/\/$/,"")}/api/tags`,i=d=>d.models.map(p=>p.name);break;case"bedrock":const l=t.region||"us-east-1";a=`https://bedrock.${l}.amazonaws.com/foundation-models?byOutputModality=TEXT`,n=await ka({method:"GET",url:a,headers:{"content-type":"application/json"},accessKey:t.accessKey,secretKey:t.secretKey,sessionToken:t.sessionToken,region:l,service:"bedrock"}),i=d=>d.modelSummaries.map(p=>p.modelId).sort();break;default:throw new Error("Unknown provider")}const o=await fetch(a,{headers:n});if(!o.ok){const r=await o.text();throw new Error(`API Error ${o.status}: ${r}`)}return i(await o.json())}async function*nu(e,t,a){var b,k,C,q,F,pe,ve,Z,he,V,we,Y;console.log("[DEBUG] streamChatApi called",{provider:e.provider,model:e.model});const{provider:n,model:i,temperature:o,systemPrompt:r}=e,l=((b=e.sessions.find(W=>W.id===e.currentSessionId))==null?void 0:b.messages)||[];console.log("[DEBUG] Getting credentials for provider:",n);const s=an();if(!s)throw console.error("[DEBUG] No credentials found for provider:",n),new Error(`No credentials configured for provider: ${n}`);console.log("[DEBUG] Credentials:",s);let d="",p={"Content-Type":"application/json"};const u=[];r&&n!=="bedrock"&&u.push({role:"system",content:r});const y=l.map(W=>({role:W.role,content:W.content}));if(y.push({role:"user",content:t}),n==="openai"||n==="openrouter"){s.apiKey&&(p.Authorization=`Bearer ${s.apiKey}`),u.push(...y),d=n==="openai"?"https://api.openai.com/v1/chat/completions":"https://openrouter.ai/api/v1/chat/completions";const re=await fetch(d,{method:"POST",headers:p,body:JSON.stringify({model:i,messages:u,stream:!0,temperature:o}),signal:a});if(!re.ok)throw new Error(await re.text());const G=re.body.getReader(),se=new TextDecoder;for(;;){const{done:ye,value:B}=await G.read();if(ye)break;const me=se.decode(B,{stream:!0}).split(`
`);for(const j of me)if(j.startsWith("data: ")&&!j.includes("[DONE]"))try{const g=((q=(C=(k=JSON.parse(j.replace("data: ","")).choices)==null?void 0:k[0])==null?void 0:C.delta)==null?void 0:q.content)||"";g&&(yield g)}catch{}}}else if(n==="ollama"){d=`${s.endpoint?s.endpoint.replace(/\/$/,""):"http://localhost:11434"}/api/chat`;const re=y.map(ne=>{if(Array.isArray(ne.content)){let me="";return ne.content.forEach(j=>{j.type==="text"&&(me+=j.text)}),{role:ne.role,content:me}}return ne}),G={model:i,messages:re,stream:!0};r&&(G.system=r),o!==void 0&&(G.options={temperature:o});const se=await fetch(d,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(G),signal:a});if(!se.ok){const ne=await se.text();throw new Error(`Ollama error ${se.status}: ${ne}`)}const ye=se.body.getReader(),B=new TextDecoder;for(;;){const{done:ne,value:me}=await ye.read();if(ne)break;const f=B.decode(me,{stream:!0}).split(`
`);for(const g of f)if(g.trim())try{const v=JSON.parse(g);(F=v.message)!=null&&F.content&&(yield v.message.content)}catch{}}}else if(n==="bedrock"){const W=s.region||"us-east-1";d=`https://bedrock-runtime.${W}.amazonaws.com/model/${i}/converse`;const G={messages:y.map(j=>{const f=[];return Array.isArray(j.content)?j.content.forEach(g=>{g.type==="text"&&f.push({text:g.text})}):f.push({text:j.content}),{role:j.role,content:f}}),inferenceConfig:{temperature:o,maxTokens:2048}};r&&(G.system=[{text:r}]);const se=JSON.stringify(G),ye=await ka({method:"POST",url:d,headers:{"content-type":"application/json"},body:se,accessKey:s.accessKey,secretKey:s.secretKey,sessionToken:s.sessionToken,region:W,service:"bedrock"}),B=await fetch(d,{method:"POST",headers:ye,body:se,signal:a});if(!B.ok)throw new Error(await B.text());yield((he=(Z=(ve=(pe=(await B.json()).output)==null?void 0:pe.message)==null?void 0:ve.content)==null?void 0:Z[0])==null?void 0:he.text)||""}else if(n==="huggingface"){d="https://router.huggingface.co/v1/chat/completions";const W=y.map(B=>{var me;const ne=Array.isArray(B.content)?(me=B.content.find(j=>j.type==="text"))==null?void 0:me.text:B.content;return{role:B.role,content:ne}});r&&W.unshift({role:"system",content:r});const re={model:i,messages:W,max_tokens:2048,temperature:o,stream:!0},G=await fetch(d,{method:"POST",headers:{Authorization:`Bearer ${s.apiKey}`,"Content-Type":"application/json"},body:JSON.stringify(re),signal:a});if(!G.ok){const B=await G.text();throw G.status===404||G.status===422?new Error(`Model "${i}" not found. Check the model name and provider format.`):new Error(`Hugging Face API error (${G.status}): ${B}`)}const se=G.body.getReader(),ye=new TextDecoder;for(;;){const{done:B,value:ne}=await se.read();if(B)break;const j=ye.decode(ne,{stream:!0}).split(`
`);for(const f of j)if(f.startsWith("data: ")&&!f.includes("[DONE]"))try{const v=((Y=(we=(V=JSON.parse(f.replace("data: ","")).choices)==null?void 0:V[0])==null?void 0:we.delta)==null?void 0:Y.content)||"";v&&(yield v)}catch{}}}}async function iu(e,t,a,n={}){const i=new Ve(a),o=n.provider||"auto",r=await i.textToImage({provider:o,model:e,inputs:t,parameters:{guidance_scale:n.guidanceScale||7.5,num_inference_steps:n.steps||5,width:n.width||512,height:n.height||512,negative_prompt:n.negativePrompt||""}});return new Promise((l,s)=>{const d=new FileReader;d.onloadend=()=>l(d.result),d.onerror=s,d.readAsDataURL(r)})}async function ou(e,t,a,n,i={}){const o=new Ve(n),r=i.provider||"fal-ai";let l;if(typeof t=="string"&&t.startsWith("data:")){const d=t.split(",")[1],p=t.split(";")[0].split(":")[1]||"image/png",u=Uint8Array.from(atob(d),y=>y.charCodeAt(0));l=new Blob([u],{type:p})}else t instanceof Blob?l=t:l=new Blob([t],{type:"image/png"});const s=await o.imageToImage({provider:r,model:e,inputs:l,parameters:{prompt:a,guidance_scale:i.guidanceScale||7.5,num_inference_steps:i.steps||25,strength:i.strength||.8,negative_prompt:i.negativePrompt||""}});return new Promise((d,p)=>{const u=new FileReader;u.onloadend=()=>d(u.result),u.onerror=p,u.readAsDataURL(s)})}async function ru(e,t,a,n={}){const i=new Ve(a),o=n.provider||"auto";let r;if(typeof t=="string"&&t.startsWith("data:")){const s=t.split(",")[1],d=t.split(";")[0].split(":")[1],p=Uint8Array.from(atob(s),u=>u.charCodeAt(0));r=new Blob([p],{type:d})}else t instanceof Blob?r=t:r=new Blob([t]);const l=await i.imageToText({provider:o,model:e,data:r});return l.generated_text||JSON.stringify(l)}async function su(e,t,a,n={}){const i=new Ve(a),o=n.provider||"auto",r=await i.textToSpeech({provider:o,model:e,inputs:t});return new Promise((l,s)=>{const d=new FileReader;d.onloadend=()=>l(d.result),d.onerror=s,d.readAsDataURL(r)})}async function lu(e,t,a,n={}){const i=new Ve(a),o=n.provider||"auto";let r;if(typeof t=="string"&&t.startsWith("data:")){const s=t.split(",")[1],d=t.split(";")[0].split(":")[1]||"audio/flac",p=Uint8Array.from(atob(s),u=>u.charCodeAt(0));r=new Blob([p],{type:d})}else t instanceof Blob?r=t:r=new Blob([t],{type:"audio/flac"});const l=await i.automaticSpeechRecognition({provider:o,model:e,data:r});return l.text||JSON.stringify(l)}async function cu(e,t,a,n={}){const i=new Ve(a),o=n.provider||"auto",r=await i.textToVideo({provider:o,model:e,inputs:t,parameters:{num_frames:n.numFrames||16,num_inference_steps:n.steps||25,guidance_scale:n.guidanceScale||9,negative_prompt:n.negativePrompt||"low quality, blurry, distorted"}});return new Promise((l,s)=>{const d=new FileReader;d.onloadend=()=>l(d.result),d.onerror=s,d.readAsDataURL(r)})}en();let Oe=null,_e=null,Q=[];document.addEventListener("DOMContentLoaded",async()=>{if(await nn(),ga(h.theme),pn(),h.provider&&(c.providerSelect.value=h.provider,za(h.provider),Xa(h.provider)),h.systemPrompt&&(c.systemPromptInput.value=h.systemPrompt),h.temperature&&(c.temperatureInput.value=h.temperature,c.tempValueLabel.textContent=h.temperature),h.quickPrompts&&(c.quickPromptsInput.value=h.quickPrompts),h.autoRead&&(c.autoReadInput.checked=h.autoRead),h.model){const e=Fe();e&&e.messages.length>0&&(c.modelSelect.innerHTML=`<option value="${h.model}" selected>${h.model}</option>`,c.modelSelectionDiv.classList.remove("hidden"),c.advancedSettings.classList.remove("hidden"),c.startChatBtn.classList.remove("hidden"),We())}});c.providerSelect.addEventListener("change",e=>Xa(e.target.value));function Ka(){const e=h.provider;if(!e)return;let t={};switch(e){case"openai":case"openrouter":case"anthropic":case"huggingface":t.apiKey=c.apiKeyInput.value.trim();break;case"ollama":t.endpoint=c.endpointInput.value.trim();break;case"bedrock":t.accessKey=c.awsAccessKey.value.trim(),t.secretKey=c.awsSecretKey.value.trim(),t.sessionToken=c.awsSessionToken.value.trim(),t.region=c.awsRegion.value.trim();break}$e(e,t)}function za(e){const t=Me(e);if(t){switch(c.apiKeyInput.value="",c.endpointInput.value="",c.awsAccessKey.value="",c.awsSecretKey.value="",c.awsSessionToken.value="",c.awsRegion.value="us-east-1",e){case"openai":case"openrouter":case"anthropic":case"huggingface":t.apiKey&&(c.apiKeyInput.value=t.apiKey);break;case"ollama":t.endpoint&&(c.endpointInput.value=t.endpoint);break;case"bedrock":t.accessKey&&(c.awsAccessKey.value=t.accessKey),t.secretKey&&(c.awsSecretKey.value=t.secretKey),t.sessionToken&&(c.awsSessionToken.value=t.sessionToken),t.region&&(c.awsRegion.value=t.region);break}t.models&&t.models.length>0&&(Ct(t.models),c.modelSelectionDiv.classList.remove("hidden"),c.advancedSettings.classList.remove("hidden"),c.startChatBtn.classList.remove("hidden"),t.selectedModel&&(c.modelSelect.value=t.selectedModel))}}function du(e){if(c.apiKeyGroup.classList.add("hidden"),c.endpointGroup.classList.add("hidden"),c.awsGroup.classList.add("hidden"),c.hfTaskGroup.classList.add("hidden"),c.hfProviderGroup.classList.add("hidden"),e==="ollama"?c.endpointGroup.classList.remove("hidden"):e==="bedrock"?c.awsGroup.classList.remove("hidden"):c.apiKeyGroup.classList.remove("hidden"),e==="huggingface"){c.hfTaskGroup.classList.remove("hidden"),c.hfProviderGroup.classList.remove("hidden");const t=Me(e);t!=null&&t.task&&(c.hfTaskSelect.value=t.task),t!=null&&t.hfProvider&&(c.hfProviderSelect.value=t.hfProvider)}}const pu=["huggingface","anthropic"];function uu(e){if(pu.includes(e))if(c.manualModelGroup.classList.remove("hidden"),e==="huggingface"){const t=c.hfTaskSelect.value||"chat";Wa(t)}else e==="anthropic"&&(c.modelHint.innerHTML="e.g., <code>claude-sonnet-4-20250514</code>, <code>claude-3-5-haiku-20241022</code>");else c.manualModelGroup.classList.add("hidden")}function Wa(e){const t={chat:"e.g., <code>meta-llama/Llama-3.2-3B-Instruct</code>, <code>deepseek-ai/DeepSeek-V3:novita</code>","text-to-image":"e.g., <code>black-forest-labs/FLUX.1-dev</code>, <code>Tongyi-MAI/Z-Image-Turbo</code>","image-to-image":"e.g., <code>black-forest-labs/FLUX.1-dev</code> (attach an image + enter transformation prompt)","text-to-video":"e.g., <code>ali-vilab/text-to-video-ms-1.7b</code>, <code>cerspense/zeroscope_v2_576w</code>","image-to-text":"e.g., <code>Salesforce/blip-image-captioning-large</code>","text-to-speech":"e.g., <code>facebook/mms-tts-eng</code>, <code>suno/bark-small</code>","speech-to-text":"e.g., <code>openai/whisper-large-v3</code>"};c.modelHint.innerHTML=t[e]||t.chat}c.hfTaskSelect.addEventListener("change",()=>{const e=c.hfTaskSelect.value;$e("huggingface",{task:e}),Wa(e);const t=tn[e]||[];Ct(t),t.length>0&&(c.modelSelectionDiv.classList.remove("hidden"),c.advancedSettings.classList.remove("hidden"),c.startChatBtn.classList.remove("hidden")),$e("huggingface",{models:t})});c.hfProviderSelect.addEventListener("change",()=>{const e=c.hfProviderSelect.value;$e("huggingface",{hfProvider:e})});function Xa(e){Ka(),St({provider:e}),za(e),du(e),uu(e),c.modelSelectionDiv.classList.add("hidden"),c.advancedSettings.classList.add("hidden"),c.startChatBtn.classList.add("hidden")}c.themeBtn.addEventListener("click",()=>{const e=h.theme==="light"?"dark":"light";St({theme:e}),ga(e)});c.expandBtn&&c.expandBtn.addEventListener("click",()=>{chrome.tabs.create({url:chrome.runtime.getURL("sidepanel.html")}),window.close&&window.close()});c.collapseBtn&&c.collapseBtn.addEventListener("click",()=>{alert(`To return to sidebar mode:

1. Close this tab
2. Click the extension icon in your browser toolbar

The sidebar will open with your chat history preserved.`)});document.querySelectorAll(".gallery-tab").forEach(e=>{e.addEventListener("click",()=>{document.querySelectorAll(".gallery-tab").forEach(n=>n.classList.remove("active")),e.classList.add("active");const t=e.dataset.filter,a=Fe();a&&un(a.messages,t)})});c.settingsBtn.addEventListener("click",()=>ha("config"));c.startChatBtn.addEventListener("click",()=>{const e=c.modelSelect.value;if(!e)return ce("Please select a model.","error");St({model:e,systemPrompt:c.systemPromptInput.value.trim(),temperature:parseFloat(c.temperatureInput.value),quickPrompts:c.quickPromptsInput.value.trim(),autoRead:c.autoReadInput.checked}),We()});c.historyBtn.addEventListener("click",()=>{Tt(h.sessions,h.currentSessionId,Nt,Ot),It(!0)});c.closeSidebarBtn.addEventListener("click",()=>It(!1));c.newChatBtn.addEventListener("click",()=>{et(),We()});c.clearHistoryBtn.addEventListener("click",()=>{confirm("Delete all history? This cannot be undone.")&&(sn(),Tt(h.sessions,h.currentSessionId,Nt,Ot),We())});function Nt(e){rn(e),We(),It(!1)}function Ot(e){confirm("Delete this chat?")&&(on(e),Tt(h.sessions,h.currentSessionId,Nt,Ot),h.currentSessionId!==e&&We())}c.exportBtn.addEventListener("click",()=>{const e=Fe();if(!e||e.messages.length===0)return alert("No history to export.");let t=`# ${e.title}

`;e.messages.forEach(o=>{var r;if(Array.isArray(o.content)){const l=((r=o.content.find(s=>s.type==="text"))==null?void 0:r.text)||"";t+=`### ${o.role}
${l}
[Image Attached]

`}else t+=`### ${o.role}
${o.content}

`});const a=new Blob([t],{type:"text/markdown"}),n=URL.createObjectURL(a),i=document.createElement("a");i.href=n,i.download=`chat-${e.id}.md`,i.click(),URL.revokeObjectURL(n)});c.fileBtn.addEventListener("click",()=>c.fileInput.click());c.fileInput.addEventListener("change",async e=>{const t=e.target.files[0];if(t){if(t.type.startsWith("image/")){const a=new FileReader;a.onload=n=>{const i=n.target.result;Q.push({type:"image_url",base64:i}),Ce(Q,o=>{Q.splice(o,1),Ce(Q,()=>{})})},a.readAsDataURL(t),e.target.value="";return}if(t.type.startsWith("audio/")){const a=new FileReader;a.onload=n=>{const i=n.target.result;Q.push({type:"audio",base64:i,name:t.name}),Ce(Q,o=>{Q.splice(o,1),Ce(Q,()=>{})})},a.readAsDataURL(t),e.target.value="";return}try{const a=await dn(t);if(/[\x00-\x08\x0E-\x1F]/.test(a))throw new Error("File content appears to be binary.");const n=`

[File Attachment: ${t.name}]
\`\`\`
${a}
\`\`\``;c.messageInput.value+=n,tt()}catch(a){alert("Failed to read file. Please upload images, audio, or text files."),console.error(a)}e.target.value=""}});c.fetchModelsBtn.addEventListener("click",async()=>{const e=c.providerSelect.value;if(!e)return ce("Select a provider.","error");Ka();const t=Me(e);if(e==="bedrock"){if(!t.accessKey||!t.secretKey)return ce("Enter AWS Credentials.","error")}else if(e!=="ollama"&&!t.apiKey)return ce("Enter API Key.","error");ce("Fetching...","info");try{const a=await au(e,t);if(!a.length)throw new Error("No models found.");Ct(a),ce(`Found ${a.length} models.`,"success"),c.modelSelectionDiv.classList.remove("hidden"),c.advancedSettings.classList.remove("hidden"),c.startChatBtn.classList.remove("hidden"),$e(e,{models:a})}catch(a){ce(`Error: ${a.message}`,"error")}});c.modelSelect.addEventListener("change",()=>{const e=h.provider,t=c.modelSelect.value;e&&t&&$e(e,{selectedModel:t})});c.saveModelBtn.addEventListener("click",()=>{const e=c.manualModelInput.value.trim();if(!e){ce("Please enter a model name.","error");return}const t=h.provider;mn(e);const n=Me(t).models||[];n.includes(e)||n.push(e),$e(t,{models:n,selectedModel:e}),c.modelSelectionDiv.classList.remove("hidden"),c.advancedSettings.classList.remove("hidden"),c.startChatBtn.classList.remove("hidden"),c.manualModelInput.value="",ce(`Model "${e}" added.`,"success")});c.manualModelInput.addEventListener("keypress",e=>{e.key==="Enter"&&(e.preventDefault(),c.saveModelBtn.click())});c.temperatureInput.addEventListener("input",e=>c.tempValueLabel.textContent=e.target.value);c.messageInput.addEventListener("input",tt);c.messageInput.addEventListener("keypress",e=>{e.key==="Enter"&&!e.shiftKey&&(e.preventDefault(),Qa())});c.sendBtn.addEventListener("click",Qa);c.stopBtn.addEventListener("click",()=>{Oe&&(Oe.abort(),Oe=null,_a(),Te(!1))});c.micBtn.addEventListener("click",()=>{if(!("webkitSpeechRecognition"in window))return alert("Voice not supported.");if(_e){_e.stop();return}_e=new webkitSpeechRecognition,_e.continuous=!1,_e.interimResults=!0,_e.lang="en-US",_e.onstart=()=>{c.micBtn.classList.add("listening"),c.messageInput.placeholder="Listening..."},_e.onresult=e=>{let t="";for(let a=e.resultIndex;a<e.results.length;++a)t+=e.results[a][0].transcript;c.messageInput.value=t,tt()},_e.onend=()=>{c.micBtn.classList.remove("listening"),_e=null,c.messageInput.placeholder="Type your message..."},_e.start()});function We(){ha("chat"),fn(h.quickPrompts,t=>{c.messageInput.value=t+" ",c.messageInput.focus()});const e=Fe();gn(e?e.messages:[],h.model),c.expandBtn&&!ba()&&c.expandBtn.classList.remove("hidden")}async function Qa(){var d;const e=c.messageInput.value.trim();if(!e&&Q.length===0)return;const t=Fe();if(!t)return;_a();const a=c.includePageContent.checked;let n=e;if(Te(!0),a){const p=await ln();p&&(n+=`

[Page Content]:
${p}`)}const i=h.provider,o=i==="huggingface"?((d=Me("huggingface"))==null?void 0:d.task)||"chat":null;if(i==="huggingface"&&o!=="chat"){await mu(o,n,t);return}let r;Q.length>0?(r=[],n&&r.push({type:"text",text:n}),Q.forEach(p=>{r.push({type:"image_url",image_url:{url:p.base64}})})):r=n,t.messages.push({role:"user",content:r}),le(t.messages),H("user",r),c.messageInput.value="",c.includePageContent.checked=!1,tt(),Q=[],Ce([],()=>{});const l="msg-"+Date.now();H("assistant",null,l,!0),Oe=new AbortController;let s="";try{const p=nu(h,r,Oe.signal);for await(const u of p)s+=u,hn(l,s);t.messages.push({role:"assistant",content:s}),le(t.messages),xa(t.messages),Ht(l,s),h.autoRead&&wa(s)}catch(p){p.name!=="AbortError"?(Re(l),H("error",`Error: ${p.message}`)):s&&(t.messages.push({role:"assistant",content:s}),le(t.messages),Ht(l,s))}finally{Te(!1),Oe=null}}async function mu(e,t,a){const n=Me("huggingface"),i=h.model,o=n.apiKey,r=n.hfProvider||"auto";c.messageInput.value="",tt();try{switch(e){case"text-to-image":{a.messages.push({role:"user",content:t}),le(a.messages),H("user",t);const l="msg-"+Date.now();H("assistant",null,l,!0);const s=await iu(i,t,o,{provider:r});Re(l);const d=[{type:"generated_image",url:s,prompt:t}];a.messages.push({role:"assistant",content:d}),le(a.messages),H("assistant",d);break}case"image-to-image":{if(Q.length===0){ce("Please attach an image first.","error"),Te(!1);return}if(!t){ce('Please enter a transformation prompt (e.g., "Turn the cat into a tiger").',"error"),Te(!1);return}const l=Q[0].base64,s=[{type:"text",text:t},{type:"image_url",image_url:{url:l}}];a.messages.push({role:"user",content:s}),le(a.messages),H("user",s),Q=[],Ce([],()=>{});const d="msg-"+Date.now();H("assistant",null,d,!0);const p=await ou(i,l,t,o,{provider:r});Re(d);const u=[{type:"generated_image",url:p,prompt:t}];a.messages.push({role:"assistant",content:u}),le(a.messages),H("assistant",u);break}case"image-to-text":{if(Q.length===0){ce("Please attach an image first.","error"),Te(!1);return}const l=Q[0].base64,s=[{type:"text",text:t||"Describe this image"},{type:"image_url",image_url:{url:l}}];a.messages.push({role:"user",content:s}),le(a.messages),H("user",s),Q=[],Ce([],()=>{});const d="msg-"+Date.now();H("assistant",null,d,!0);const p=await ru(i,l,o,{provider:r});Re(d),a.messages.push({role:"assistant",content:p}),le(a.messages),H("assistant",p);break}case"text-to-video":{a.messages.push({role:"user",content:t}),le(a.messages),H("user",t);const l="msg-"+Date.now();H("assistant",null,l,!0),ce("Generating video... This may take 30-120 seconds.","info");const s=await cu(i,t,o,{provider:r});Re(l);const d=[{type:"generated_video",url:s,prompt:t}];a.messages.push({role:"assistant",content:d}),le(a.messages),H("assistant",d);break}case"text-to-speech":{a.messages.push({role:"user",content:t}),le(a.messages),H("user",t);const l="msg-"+Date.now();H("assistant",null,l,!0);const s=await su(i,t,o,{provider:r});Re(l);const d=[{type:"generated_audio",url:s}];a.messages.push({role:"assistant",content:d}),le(a.messages),H("assistant",d);break}case"speech-to-text":{if(Q.length===0){ce("Please attach an audio file first.","error"),Te(!1);return}const l=Q[0].base64,s=[{type:"audio_input",url:l}];a.messages.push({role:"user",content:s}),le(a.messages),H("user",s),Q=[],Ce([],()=>{});const d="msg-"+Date.now();H("assistant",null,d,!0);const p=await lu(i,l,o,{provider:r});Re(d),a.messages.push({role:"assistant",content:p}),le(a.messages),H("assistant",p);break}default:ce(`Unknown task: ${e}`,"error")}}catch(l){H("error",`Error: ${l.message}`)}finally{Te(!1)}}
