const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('pong');
    return;
  }

  if (parsedUrl.pathname === '/callback') {
    const query = parsedUrl.query;

    if (query.error) {
      console.error('❌ OAuth Error:', query.error_description);
      res.writeHead(400);
      res.end('OAuth Error: ' + query.error_description);
      return;
    }

    const code = query.code;
    const state = query.state;

    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Authorization code not found in URL');
      return;
    }

    console.log('✅ Authorization code received:', code);
    console.log('State:', state);

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Authorization Code Received\n\nCode: ${code}\nState: ${state}`);
  }
});

server.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
  console.log('🔗 Waiting for LinkedIn callback...');
}); 