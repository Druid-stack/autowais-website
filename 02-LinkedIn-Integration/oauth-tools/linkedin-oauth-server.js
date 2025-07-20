const express = require('express');
const http = require('http');
const url = require('url');

class LinkedInOAuthServer {
  constructor(port = 3000) {
    this.port = port;
    this.app = express();
    this.server = null;
    this.authCode = null;
    this.resolveAuth = null;
  }

  start() {
    return new Promise((resolve, reject) => {
      // Handle the OAuth callback
      this.app.get('/api/auth/linkedin/callback', (req, res) => {
        const query = url.parse(req.url, true).query;
        this.authCode = query.code;
        
        if (this.authCode) {
          console.log('\n✅ Authorization code received!');
          console.log(`Code: ${this.authCode}`);
          
          res.send(`
            <html>
              <head><title>LinkedIn Authorization Success</title></head>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: #0077b5;">✅ LinkedIn Authorization Successful!</h1>
                <p>You can now close this window and return to your terminal.</p>
                <p>The authorization code has been captured.</p>
                <script>
                  setTimeout(() => {
                    window.close();
                  }, 3000);
                </script>
              </body>
            </html>
          `);
          
          if (this.resolveAuth) {
            this.resolveAuth(this.authCode);
          }
        } else {
          res.send(`
            <html>
              <head><title>LinkedIn Authorization Error</title></head>
              <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
                <h1 style="color: #d32f2f;">❌ Authorization Error</h1>
                <p>No authorization code received.</p>
                <p>Please try again.</p>
              </body>
            </html>
          `);
        }
      });

      // Handle root path
      this.app.get('/', (req, res) => {
        res.send(`
          <html>
            <head><title>LinkedIn OAuth Server</title></head>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
              <h1>🔗 LinkedIn OAuth Server</h1>
              <p>This server is waiting for LinkedIn authorization callback.</p>
              <p>Please complete the authorization process.</p>
            </body>
          </html>
        `);
      });

      this.server = this.app.listen(this.port, () => {
        console.log(`🚀 OAuth server started on http://localhost:${this.port}`);
        resolve();
      });

      this.server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
          console.log(`⚠️  Port ${this.port} is in use. Trying port ${this.port + 1}...`);
          this.port += 1;
          this.start().then(resolve).catch(reject);
        } else {
          reject(error);
        }
      });
    });
  }

  waitForAuth() {
    return new Promise((resolve) => {
      this.resolveAuth = resolve;
    });
  }

  stop() {
    if (this.server) {
      this.server.close();
      console.log('🛑 OAuth server stopped');
    }
  }

  getAuthCode() {
    return this.authCode;
  }
}

module.exports = LinkedInOAuthServer; 