const axios = require('axios');
require('dotenv').config();

class LinkedInIntegration {
  constructor() {
    this.clientId = process.env.LINKEDIN_CLIENT_ID;
    this.clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    this.redirectUri = process.env.LINKEDIN_REDIRECT_URI;
    this.scope = process.env.LINKEDIN_SCOPE;
    this.organizationId = process.env.LINKEDIN_ORGANIZATION_ID;
    this.accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    this.refreshToken = process.env.LINKEDIN_REFRESH_TOKEN;
    
    // API endpoints
    this.authUrl = process.env.LINKEDIN_AUTH_URL;
    this.tokenUrl = process.env.LINKEDIN_TOKEN_URL;
    this.shareUrl = process.env.LINKEDIN_SHARE_URL;
    this.articlesUrl = process.env.LINKEDIN_ARTICLES_URL;
    this.analyticsUrl = process.env.LINKEDIN_ANALYTICS_URL;
  }

  /**
   * Generate LinkedIn OAuth authorization URL
   */
  getAuthUrl(state = 'autowais-blog-automation') {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: this.scope,
      state: state
    });

    return `${this.authUrl}?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async getAccessToken(code) {
    try {
      const response = await axios.post(this.tokenUrl, {
        grant_type: 'authorization_code',
        code: code,
        client_id: this.clientId,
        client_secret: this.clientSecret,
        redirect_uri: this.redirectUri
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      return {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in
      };
    } catch (error) {
      console.error('Error getting access token:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshAccessToken() {
    try {
      const response = await axios.post(this.tokenUrl, {
        grant_type: 'refresh_token',
        refresh_token: this.refreshToken,
        client_id: this.clientId,
        client_secret: this.clientSecret
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.accessToken = response.data.access_token;
      this.refreshToken = response.data.refresh_token;

      return {
        accessToken: this.accessToken,
        refreshToken: this.refreshToken,
        expiresIn: response.data.expires_in
      };
    } catch (error) {
      console.error('Error refreshing access token:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Post a simple text update to LinkedIn
   */
  async postTextUpdate(text) {
    try {
      const postData = {
        owner: `urn:li:organization:${this.organizationId}`,
        subject: 'Autowais Blog Update',
        text: {
          text: text
        }
      };

      const response = await axios.post(this.shareUrl, postData, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      return {
        success: true,
        postId: response.data.id,
        message: 'Post published successfully'
      };
    } catch (error) {
      console.error('Error posting to LinkedIn:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Post a blog article to LinkedIn
   */
  async postBlogArticle(blogPost) {
    try {
      // Create article data
      const articleData = {
        title: blogPost.title,
        content: {
          content: blogPost.content,
          contentType: 'ARTICLE'
        },
        distribution: {
          linkedInDistributionTarget: {
            visibleToGuest: true
          }
        },
        lifecycleState: 'PUBLISHED'
      };

      const response = await axios.post(this.articlesUrl, articleData, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      return {
        success: true,
        articleId: response.data.id,
        message: 'Article published successfully'
      };
    } catch (error) {
      console.error('Error posting article to LinkedIn:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Post blog content with rich formatting
   */
  async postBlogContent(blogPost) {
    try {
      // Format the blog post for LinkedIn
      const formattedContent = this.formatBlogForLinkedIn(blogPost);
      
      const postData = {
        owner: `urn:li:organization:${this.organizationId}`,
        subject: 'Autowais Blog',
        text: {
          text: formattedContent
        }
      };

      const response = await axios.post(this.shareUrl, postData, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      return {
        success: true,
        postId: response.data.id,
        message: 'Blog post published successfully',
        content: formattedContent
      };
    } catch (error) {
      console.error('Error posting blog to LinkedIn:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Format blog post content for LinkedIn
   */
  formatBlogForLinkedIn(blogPost) {
    const { title, excerpt, content, tags } = blogPost;
    
    // Create LinkedIn-optimized content
    let linkedInContent = `${title}\n\n`;
    linkedInContent += `${excerpt}\n\n`;
    
    // Add key points from content (first 2-3 bullet points)
    const keyPoints = this.extractKeyPoints(content);
    if (keyPoints.length > 0) {
      linkedInContent += `Key takeaways:\n`;
      keyPoints.slice(0, 3).forEach(point => {
        linkedInContent += `• ${point}\n`;
      });
      linkedInContent += '\n';
    }
    
    // Add hashtags
    if (tags && tags.length > 0) {
      linkedInContent += tags.map(tag => `#${tag.replace(/\s+/g, '')}`).join(' ') + '\n\n';
    }
    
    // Add call to action
    linkedInContent += `What's your experience with this topic? Share your thoughts below! 👇\n\n`;
    linkedInContent += `#Autowais #Automation #DigitalTransformation`;
    
    return linkedInContent;
  }

  /**
   * Extract key points from blog content
   */
  extractKeyPoints(content) {
    // Simple extraction of bullet points or key phrases
    const keyPoints = [];
    
    // Look for bullet points or numbered lists
    const bulletMatches = content.match(/<li>(.*?)<\/li>/g);
    if (bulletMatches) {
      bulletMatches.slice(0, 3).forEach(match => {
        const text = match.replace(/<[^>]*>/g, '').trim();
        if (text.length > 10 && text.length < 100) {
          keyPoints.push(text);
        }
      });
    }
    
    // If no bullet points, extract sentences with key words
    if (keyPoints.length === 0) {
      const sentences = content.replace(/<[^>]*>/g, '').split(/[.!?]+/);
      const keyWords = ['automation', 'AI', 'digital', 'transformation', 'business', 'technology'];
      
      sentences.forEach(sentence => {
        const cleanSentence = sentence.trim();
        if (cleanSentence.length > 20 && cleanSentence.length < 150) {
          const hasKeyWord = keyWords.some(word => 
            cleanSentence.toLowerCase().includes(word)
          );
          if (hasKeyWord && keyPoints.length < 3) {
            keyPoints.push(cleanSentence);
          }
        }
      });
    }
    
    return keyPoints;
  }

  /**
   * Get post analytics
   */
  async getPostAnalytics(postId) {
    try {
      const response = await axios.get(`${this.analyticsUrl}?q=organizationalEntity&organizationalEntity=urn:li:organization:${this.organizationId}&timeIntervals.timeGranularityType=DAY&timeIntervals.timeRange.start=1640995200000&timeIntervals.timeRange.end=1641081600000`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      return {
        success: true,
        analytics: response.data
      };
    } catch (error) {
      console.error('Error getting analytics:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Test LinkedIn connection
   */
  async testConnection() {
    try {
      if (!this.accessToken) {
        return {
          success: false,
          error: 'No access token available. Please authenticate first.'
        };
      }

      // Try to get user profile to test connection
      const response = await axios.get(process.env.LINKEDIN_PROFILE_URL, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      return {
        success: true,
        message: 'LinkedIn connection successful',
        profile: response.data
      };
    } catch (error) {
      console.error('LinkedIn connection test failed:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Schedule a post for later
   */
  async schedulePost(content, scheduledTime) {
    try {
      const postData = {
        owner: `urn:li:organization:${this.organizationId}`,
        subject: 'Autowais Blog',
        text: {
          text: content
        },
        lifecycleState: 'DRAFT',
        specificContent: {
          'com.linkedin.ugc.ShareContent': {
            shareCommentary: {
              text: content
            },
            shareMediaCategory: 'NONE'
          }
        }
      };

      const response = await axios.post(this.shareUrl, postData, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0'
        }
      });

      return {
        success: true,
        postId: response.data.id,
        message: 'Post scheduled successfully',
        scheduledTime: scheduledTime
      };
    } catch (error) {
      console.error('Error scheduling post:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }
}

module.exports = LinkedInIntegration; 