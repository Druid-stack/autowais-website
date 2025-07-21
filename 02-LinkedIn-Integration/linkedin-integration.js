const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

class LinkedInIntegration {
  constructor() {
    this.clientId = process.env.LINKEDIN_CLIENT_ID;
    this.clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    this.accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    this.refreshToken = process.env.LINKEDIN_REFRESH_TOKEN;
    this.organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
  }

  getAuthUrl(redirectUri = 'http://localhost:3000/api/auth/callback') {
    const scopes = [
      'r_liteprofile',
      'w_member_social',
      'openid',
      'profile',
      'email'
    ].join(',');
    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=autowais_${Date.now()}`;
  }

  async getAccessToken(code, redirectUri = 'http://localhost:3000/api/auth/callback') {
    try {
      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', 
        new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          client_id: this.clientId,
          client_secret: this.clientSecret,
          redirect_uri: redirectUri
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token || '';
      return { accessToken: this.accessToken, refreshToken: this.refreshToken, expiresIn: response.data.expires_in };
    } catch (error) {
      console.error('LinkedIn API Error Details:', error.response?.data);
      throw new Error(`Token exchange failed: ${JSON.stringify(error.response?.data || error.message)}`);
    }
  }

  async refreshAccessToken() {
    if (!this.refreshToken) {
      throw new Error('No refresh token available');
    }
    try {
      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', 
        new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret
        }), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token || this.refreshToken;
      return { accessToken: this.accessToken, refreshToken: this.refreshToken };
    } catch (error) {
      throw new Error(`Token refresh failed: ${error.response?.data || error.message}`);
    }
  }

  async testConnection() {
    if (!this.accessToken) {
      return { success: false, error: 'No access token available' };
    }
    try {
      const response = await axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });
      return { success: true, profile: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  formatBlogForLinkedIn(blogPost) {
    return `${blogPost.title}

${blogPost.excerpt}

${blogPost.content}

#${blogPost.tags.join(' #')}`;
  }

  async postBlogContent(blogPost) {
    if (!this.accessToken) {
      return { success: false, error: 'Missing access token' };
    }
    const content = this.formatBlogForLinkedIn(blogPost);
    try {
      const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', {
        author: `urn:li:person:${this.getPersonId()}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: content },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        },
        timeout: 15000
      });
      return { success: true, postId: response.data.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async postTextUpdate(text) {
    if (!this.accessToken) {
      return { success: false, error: 'Missing access token' };
    }
    try {
      const response = await axios.post('https://api.linkedin.com/v2/ugcPosts', {
        author: `urn:li:person:${this.getPersonId()}`,
        lifecycleState: 'PUBLISHED',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: { text: text },
            shareMediaCategory: 'NONE'
          }
        },
        visibility: {
          'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
        }
      }, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });
      return { success: true, postId: response.data.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getPersonId() {
    try {
      const response = await axios.get('https://api.linkedin.com/v2/me', {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });
      return response.data.id;
    } catch (error) {
      throw new Error(`Failed to get person ID: ${error.message}`);
    }
  }

  async schedulePost(content, scheduledTime) {
    // Placeholder for scheduling logic
    return { success: false, error: 'Scheduling not implemented yet' };
  }
}

module.exports = LinkedInIntegration; 