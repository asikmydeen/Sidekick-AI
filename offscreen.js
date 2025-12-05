// Offscreen document for speech recognition
// This runs in a context that properly supports getUserMedia and SpeechRecognition

let recognition = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen') return;

  switch (message.action) {
    case 'startSpeechRecognition':
      startRecognition();
      break;
    case 'stopSpeechRecognition':
      stopRecognition();
      break;
  }
});

async function startRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    chrome.runtime.sendMessage({ 
      action: 'speechError', 
      error: 'Speech recognition not supported' 
    });
    return;
  }

  if (recognition) {
    recognition.stop();
    return;
  }

  // Request microphone permission
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
  } catch (err) {
    chrome.runtime.sendMessage({ 
      action: 'speechError', 
      error: err.name === 'NotAllowedError' 
        ? 'Microphone permission denied. Click the mic icon in the address bar to allow.'
        : `Microphone error: ${err.message}`
    });
    return;
  }

  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = () => {
    chrome.runtime.sendMessage({ action: 'speechStarted' });
  };

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    chrome.runtime.sendMessage({ 
      action: 'speechResult', 
      transcript,
      isFinal: event.results[event.results.length - 1].isFinal
    });
  };

  recognition.onerror = (event) => {
    let errorMsg = 'Speech recognition error';
    if (event.error === 'not-allowed') {
      errorMsg = 'Microphone access denied';
    } else if (event.error === 'network') {
      errorMsg = 'Network error - speech recognition requires internet';
    } else if (event.error === 'no-speech') {
      errorMsg = 'No speech detected';
    }
    chrome.runtime.sendMessage({ action: 'speechError', error: errorMsg });
  };

  recognition.onend = () => {
    recognition = null;
    chrome.runtime.sendMessage({ action: 'speechEnded' });
  };

  recognition.start();
}

function stopRecognition() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
}

