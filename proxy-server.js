// Simple proxy server to bypass CORS issues with Ollama
// Run this with: node proxy-server.js

const http = require('http');

const OLLAMA_HOST = 'localhost';
const OLLAMA_PORT = 11434;
const PROXY_PORT = 11435;

const server = http.createServer((req, res) => {
  console.log(`[Proxy] ${req.method} ${req.url}`);

  // Set CORS headers to allow extension access
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Collect request body
  let body = [];
  req.on('data', chunk => body.push(chunk));
  req.on('end', () => {
    const requestBody = Buffer.concat(body).toString();

    // Forward request to Ollama
    const options = {
      hostname: OLLAMA_HOST,
      port: OLLAMA_PORT,
      path: req.url,
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody || '')
      }
    };

    const proxyReq = http.request(options, (proxyRes) => {
      console.log(`[Proxy] Ollama responded: ${proxyRes.statusCode}`);

      // Forward Ollama response headers
      res.writeHead(proxyRes.statusCode, proxyRes.headers);

      // Stream response back to extension
      proxyRes.pipe(res);
    });

    proxyReq.on('error', (error) => {
      console.error(`[Proxy] Error forwarding to Ollama:`, error.message);
      res.writeHead(500);
      res.end(JSON.stringify({ error: error.message }));
    });

    // Send request body to Ollama
    if (requestBody) {
      proxyReq.write(requestBody);
    }
    proxyReq.end();
  });
});

server.listen(PROXY_PORT, () => {
  console.log(`[Proxy] Running on http://localhost:${PROXY_PORT}`);
  console.log(`[Proxy] Forwarding requests to Ollama at http://${OLLAMA_HOST}:${OLLAMA_PORT}`);
  console.log('[Proxy] Extension can now connect without CORS issues!');
});