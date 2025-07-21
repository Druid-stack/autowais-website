const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/ping') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('pong');
    return;
  }

  if (parsedUrl.pathname === '/callback' || parsedUrl.pathname === '/api/auth/callback') {
    const query = parsedUrl.query;

    if (query.error) {
      console.error('❌ OAuth Error:', query.error);
      console.error('❌ Error Description:', query.error_description);
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end(`OAuth Error: ${query.error}\nDescription: ${query.error_description}`);
      return;
    }

    const code = query.code;
    const state = query.state;

    if (!code) {
      console.error('❌ No authorization code found in URL');
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Authorization code not found in URL');
      return;
    }

    console.log('✅ Authorization code received:', code);
    console.log('State:', state);
    console.log('🔗 Ready to exchange for access token');

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Authorization Code Received Successfully!\n\nCode: ${code}\nState: ${state}\n\nYou can now use this code to get an access token.`);
  }
});

server.listen(3000, () => {
  console.log('✅ Server running on http://localhost:3000');
  console.log('🔗 Waiting for LinkedIn callback...');
}); 