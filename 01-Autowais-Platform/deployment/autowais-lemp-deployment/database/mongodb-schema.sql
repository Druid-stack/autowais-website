-- MongoDB Schema for AUTOWAIS Application
-- This file contains the database schema and indexes for MongoDB

-- Database: autowais
-- Collections: users, posts, content_performance, conversations, interactions

-- =====================================================
-- USERS COLLECTION
-- =====================================================

-- Create users collection with schema validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "password", "name"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email must be a valid email address"
        },
        password: {
          bsonType: "string",
          minLength: 8,
          description: "Password must be at least 8 characters"
        },
        name: {
          bsonType: "string",
          maxLength: 100,
          description: "Name cannot exceed 100 characters"
        },
        role: {
          enum: ["user", "admin", "moderator"],
          description: "Role must be one of: user, admin, moderator"
        },
        isActive: {
          bsonType: "bool"
        },
        lastLogin: {
          bsonType: "date"
        },
        passwordChangedAt: {
          bsonType: "date"
        },
        loginAttempts: {
          bsonType: "int",
          minimum: 0
        },
        lockUntil: {
          bsonType: "date"
        },
        services: {
          bsonType: "array",
          items: {
            bsonType: "object",
            required: ["type", "credentials"],
            properties: {
              type: {
                bsonType: "string"
              },
              credentials: {
                bsonType: "object"
              },
              addedAt: {
                bsonType: "date"
              }
            }
          }
        }
      }
    }
  }
});

-- Create indexes for users collection
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "isActive": 1 });
db.users.createIndex({ "lastLogin": -1 });
db.users.createIndex({ "loginAttempts": 1 });

-- =====================================================
-- POSTS COLLECTION
-- =====================================================

-- Create posts collection
db.createCollection("posts", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "content", "authorId"],
      properties: {
        title: {
          bsonType: "string",
          maxLength: 500
        },
        content: {
          bsonType: "string"
        },
        authorId: {
          bsonType: "objectId"
        },
        topic: {
          bsonType: "string"
        },
        linkedinPostId: {
          bsonType: "string"
        },
        engagementScore: {
          bsonType: "double",
          minimum: 0,
          maximum: 10
        },
        views: {
          bsonType: "int",
          minimum: 0
        },
        likes: {
          bsonType: "int",
          minimum: 0
        },
        comments: {
          bsonType: "int",
          minimum: 0
        },
        shares: {
          bsonType: "int",
          minimum: 0
        },
        status: {
          enum: ["draft", "published", "archived"],
          description: "Post status"
        },
        tags: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        }
      }
    }
  }
});

-- Create indexes for posts collection
db.posts.createIndex({ "authorId": 1 });
db.posts.createIndex({ "topic": 1 });
db.posts.createIndex({ "status": 1 });
db.posts.createIndex({ "createdAt": -1 });
db.posts.createIndex({ "engagementScore": -1 });
db.posts.createIndex({ "linkedinPostId": 1 });

-- =====================================================
-- CONTENT_PERFORMANCE COLLECTION
-- =====================================================

-- Create content_performance collection
db.createCollection("content_performance", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["date", "title", "topic"],
      properties: {
        date: {
          bsonType: "date"
        },
        title: {
          bsonType: "string"
        },
        topic: {
          bsonType: "string"
        },
        strategy: {
          bsonType: "string"
        },
        wordCount: {
          bsonType: "int",
          minimum: 1
        },
        seoScore: {
          bsonType: "int",
          minimum: 0,
          maximum: 100
        },
        linkedinPostId: {
          bsonType: "string"
        },
        expectedEngagement: {
          enum: ["low", "medium", "high"]
        },
        actualEngagement: {
          bsonType: "double",
          minimum: 0
        },
        driveFileId: {
          bsonType: "string"
        },
        aiStrategyReasoning: {
          bsonType: "string"
        },
        hashtags: {
          bsonType: "string"
        },
        contentPillars: {
          bsonType: "string"
        }
      }
    }
  }
});

-- Create indexes for content_performance collection
db.content_performance.createIndex({ "date": -1 });
db.content_performance.createIndex({ "topic": 1 });
db.content_performance.createIndex({ "strategy": 1 });
db.content_performance.createIndex({ "actualEngagement": -1 });

-- =====================================================
-- CONVERSATIONS COLLECTION
-- =====================================================

-- Create conversations collection for customer service
db.createCollection("conversations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["conversationId", "channelType", "userId"],
      properties: {
        conversationId: {
          bsonType: "string"
        },
        channelType: {
          enum: ["email", "whatsapp", "telegram", "slack", "web"]
        },
        userId: {
          bsonType: "string"
        },
        lastMessage: {
          bsonType: "string"
        },
        lastTimestamp: {
          bsonType: "date"
        },
        messageCount: {
          bsonType: "int",
          minimum: 0
        },
        status: {
          enum: ["active", "resolved", "escalated"],
          description: "Conversation status"
        },
        assignedAgent: {
          bsonType: "string"
        },
        priority: {
          enum: ["low", "medium", "high", "urgent"]
        },
        tags: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        }
      }
    }
  }
});

-- Create indexes for conversations collection
db.conversations.createIndex({ "conversationId": 1 }, { unique: true });
db.conversations.createIndex({ "userId": 1 });
db.conversations.createIndex({ "channelType": 1 });
db.conversations.createIndex({ "status": 1 });
db.conversations.createIndex({ "lastTimestamp": -1 });
db.conversations.createIndex({ "assignedAgent": 1 });

-- =====================================================
-- INTERACTIONS COLLECTION
-- =====================================================

-- Create interactions collection for tracking AI responses
db.createCollection("interactions", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["interactionId", "conversationId", "channel", "userId"],
      properties: {
        interactionId: {
          bsonType: "string"
        },
        conversationId: {
          bsonType: "string"
        },
        channel: {
          enum: ["email", "whatsapp", "telegram", "slack", "web"]
        },
        userId: {
          bsonType: "string"
        },
        userMessage: {
          bsonType: "string"
        },
        aiResponse: {
          bsonType: "string"
        },
        intent: {
          bsonType: "string"
        },
        sentiment: {
          enum: ["positive", "neutral", "negative"]
        },
        urgency: {
          enum: ["low", "medium", "high", "urgent"]
        },
        requiredActions: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        },
        resolved: {
          bsonType: "bool"
        },
        responseTime: {
          bsonType: "int",
          description: "Response time in milliseconds"
        }
      }
    }
  }
});

-- Create indexes for interactions collection
db.interactions.createIndex({ "interactionId": 1 }, { unique: true });
db.interactions.createIndex({ "conversationId": 1 });
db.interactions.createIndex({ "userId": 1 });
db.interactions.createIndex({ "channel": 1 });
db.interactions.createIndex({ "timestamp": -1 });
db.interactions.createIndex({ "intent": 1 });
db.interactions.createIndex({ "sentiment": 1 });

-- =====================================================
-- CONTENT_TOPICS COLLECTION
-- =====================================================

-- Create content_topics collection
db.createCollection("content_topics", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["topic"],
      properties: {
        topic: {
          bsonType: "string"
        },
        performanceScore: {
          bsonType: "double",
          minimum: 0,
          maximum: 1
        },
        engagementRate: {
          bsonType: "double",
          minimum: 0
        },
        lastUsed: {
          bsonType: "date"
        },
        postCount: {
          bsonType: "int",
          minimum: 0
        },
        avgEngagement: {
          bsonType: "double",
          minimum: 0
        },
        category: {
          bsonType: "string"
        },
        tags: {
          bsonType: "array",
          items: {
            bsonType: "string"
          }
        }
      }
    }
  }
});

-- Create indexes for content_topics collection
db.content_topics.createIndex({ "topic": 1 }, { unique: true });
db.content_topics.createIndex({ "performanceScore": -1 });
db.content_topics.createIndex({ "engagementRate": -1 });
db.content_topics.createIndex({ "category": 1 });

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert sample content topics
db.content_topics.insertMany([
  {
    topic: "AI Automation",
    performanceScore: 0.85,
    engagementRate: 12.5,
    lastUsed: new Date("2024-01-10"),
    postCount: 15,
    avgEngagement: 8.5,
    category: "Technology",
    tags: ["AI", "Automation", "Business"]
  },
  {
    topic: "Digital Transformation",
    performanceScore: 0.78,
    engagementRate: 10.2,
    lastUsed: new Date("2024-01-08"),
    postCount: 12,
    avgEngagement: 7.2,
    category: "Business",
    tags: ["Digital", "Transformation", "Innovation"]
  },
  {
    topic: "Workflow Optimization",
    performanceScore: 0.92,
    engagementRate: 15.8,
    lastUsed: new Date("2024-01-05"),
    postCount: 18,
    avgEngagement: 9.1,
    category: "Operations",
    tags: ["Workflow", "Optimization", "Efficiency"]
  }
]);

-- =====================================================
-- DATABASE STATISTICS
-- =====================================================

-- Get collection statistics
print("Database Statistics:");
print("===================");

db.getCollectionNames().forEach(function(collectionName) {
  var count = db.getCollection(collectionName).count();
  print(collectionName + ": " + count + " documents");
});

-- =====================================================
-- BACKUP AND RESTORE COMMANDS
-- =====================================================

-- Backup database
-- mongodump --db autowais --out /backup/path

-- Restore database
-- mongorestore --db autowais /backup/path/autowais

-- Export specific collection
-- mongoexport --db autowais --collection users --out users.json

-- Import specific collection
-- mongoimport --db autowais --collection users --file users.json 