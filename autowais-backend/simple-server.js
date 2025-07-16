const http = require('http');
const url = require('url');

// Simple in-memory user store (demo)
const users = {
  'karl.hallis@autowais.com': {
    email: 'karl.hallis@autowais.com',
    name: 'Karl Hallis',
    password: 'PasswordKH@1978',
    role: 'admin'
  }
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json');

  // Handle preflight requests
  if (method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Health check
  if (path === '/api/health' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({
      status: 'OK',
      message: 'AUTOWAIS Backend is running',
      timestamp: new Date().toISOString(),
      port: 5001
    }));
    return;
  }

  // Login endpoint
  if (path === '/api/auth/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        const user = users[email];

        if (user && user.password === password) {
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'Login successful',
            user: {
              email: user.email,
              name: user.name,
              role: user.role
            },
            token: 'demo-jwt-token-' + Date.now()
          }));
        } else {
          res.writeHead(401);
          res.end(JSON.stringify({
            success: false,
            message: 'Invalid credentials'
          }));
        }
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: 'Invalid JSON'
        }));
      }
    });
    return;
  }

  // Update password endpoint
  if (path === '/api/auth/updatepassword' && method === 'PUT') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { email, currentPassword, newPassword } = JSON.parse(body);
        const user = users[email];

        if (user && user.password === currentPassword && newPassword) {
          user.password = newPassword;
          res.writeHead(200);
          res.end(JSON.stringify({
            success: true,
            message: 'Password updated successfully',
            user: {
              email: user.email,
              name: user.name,
              role: user.role
            }
          }));
        } else {
          res.writeHead(400);
          res.end(JSON.stringify({
            success: false,
            message: 'Invalid current password or missing fields'
          }));
        }
      } catch (error) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          message: 'Invalid JSON'
        }));
      }
    });
    return;
  }

  // 404 for all other routes
  res.writeHead(404);
  res.end(JSON.stringify({
    success: false,
    message: 'API endpoint not found'
  }));
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`🚀 AUTOWAIS Backend running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`👤 Demo login: karl.hallis@autowais.com / PasswordKH@1978`);
  console.log(`🔧 Password update: PUT /api/auth/updatepassword`);
});
