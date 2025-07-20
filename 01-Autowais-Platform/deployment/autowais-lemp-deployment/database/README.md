# AUTOWAIS Database Package

## 🗄️ Complete Database Setup for AUTOWAIS Application

This package contains all database schemas, models, and setup scripts for both MongoDB and PostgreSQL databases used in the AUTOWAIS application.

## 📦 Package Contents

```
database/
├── README.md                    # This file
├── database-setup.sh            # Automated database setup script
├── setup-test-database.sql      # PostgreSQL schema and test data
├── mongodb-schema.sql           # MongoDB schema and collections
├── User.js                      # MongoDB User model
└── User-backend.js              # Backend User model
```

## 🎯 Quick Start

### 1. Setup Both Databases

```bash
chmod +x database-setup.sh
./database-setup.sh
```

### 2. Setup MongoDB Only

```bash
./database-setup.sh --mongodb-only
```

### 3. Setup PostgreSQL Only

```bash
./database-setup.sh --postgresql-only
```

### 4. Create Environment File

```bash
./database-setup.sh --env-only
```

## 🗃️ Database Architecture

### MongoDB Collections

#### 1. Users Collection

- **Purpose**: User authentication and management
- **Key Fields**: email, password, name, role, isActive
- **Indexes**: email (unique), role, isActive, lastLogin
- **Features**: Password hashing, account lockout, service connections

#### 2. Posts Collection

- **Purpose**: Content management and social media posts
- **Key Fields**: title, content, authorId, topic, linkedinPostId
- **Indexes**: authorId, topic, status, createdAt, engagementScore
- **Features**: Engagement tracking, status management, tagging

#### 3. Content Performance Collection

- **Purpose**: Analytics and performance tracking
- **Key Fields**: date, title, topic, strategy, actualEngagement
- **Indexes**: date, topic, strategy, actualEngagement
- **Features**: SEO scoring, engagement analysis, strategy tracking

#### 4. Conversations Collection

- **Purpose**: Customer service conversation tracking
- **Key Fields**: conversationId, channelType, userId, status
- **Indexes**: conversationId (unique), userId, channelType, status
- **Features**: Multi-channel support, priority management, agent assignment

#### 5. Interactions Collection

- **Purpose**: AI interaction logging and analysis
- **Key Fields**: interactionId, conversationId, userMessage, aiResponse
- **Indexes**: interactionId (unique), conversationId, intent, sentiment
- **Features**: Intent recognition, sentiment analysis, response tracking

#### 6. Content Topics Collection

- **Purpose**: Content topic management and performance
- **Key Fields**: topic, performanceScore, engagementRate
- **Indexes**: topic (unique), performanceScore, engagementRate
- **Features**: Topic categorization, performance tracking, tagging

### PostgreSQL Tables

#### 1. content_topics

- **Purpose**: Content topic management
- **Columns**: id, topic, performance_score, engagement_rate, last_used
- **Indexes**: performance_score, engagement_rate, topic

#### 2. posts

- **Purpose**: Content post management
- **Columns**: id, topic, title, content, linkedin_post_id, engagement_score
- **Indexes**: topic, created_at, engagement_score

#### 3. content_performance

- **Purpose**: Content performance analytics
- **Columns**: id, date, title, topic, strategy, word_count, seo_score
- **Indexes**: date, topic, strategy, actual_engagement

#### 4. users

- **Purpose**: Audience analytics and user management
- **Columns**: id, name, industry, company_size, interests, engagement_score
- **Indexes**: active, engagement_score, industry

## 🔧 Setup Options

### Automated Setup

The `database-setup.sh` script provides several options:

```bash
# Full setup (both databases)
./database-setup.sh

# MongoDB only
./database-setup.sh --mongodb-only

# PostgreSQL only
./database-setup.sh --postgresql-only

# Create backups
./database-setup.sh --backup

# Verify setup
./database-setup.sh --verify

# Create environment file only
./database-setup.sh --env-only
```

### Manual Setup

#### MongoDB Setup

```bash
# Start MongoDB
sudo systemctl start mongod

# Create database and collections
mongosh --eval "use autowais; $(cat mongodb-schema.sql)"
```

#### PostgreSQL Setup

```bash
# Start PostgreSQL
sudo systemctl start postgresql

# Create database and user
sudo -u postgres psql -c "CREATE DATABASE ai_content_system;"
sudo -u postgres psql -c "CREATE USER autowais_user WITH PASSWORD 'autowais_password_2024';"

# Run schema script
psql -h localhost -U autowais_user -d ai_content_system -f setup-test-database.sql
```

## 🔐 Security Features

### MongoDB Security

- **Schema Validation**: All collections have strict schema validation
- **Index Optimization**: Performance-optimized indexes
- **Password Hashing**: bcrypt password hashing
- **Account Lockout**: Automatic lockout after failed attempts
- **Role-Based Access**: User, admin, moderator roles

### PostgreSQL Security

- **User Isolation**: Dedicated database user
- **Password Protection**: Secure password configuration
- **Connection Limits**: Configurable connection limits
- **SSL Support**: Encrypted connections

## 📊 Data Models

### User Model (MongoDB)

```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  role: String (enum: 'user', 'admin', 'moderator'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  loginAttempts: Number,
  lockUntil: Date,
  services: Array (service connections)
}
```

### Post Model (MongoDB)

```javascript
{
  title: String (required),
  content: String,
  authorId: ObjectId (required),
  topic: String,
  linkedinPostId: String,
  engagementScore: Number (0-10),
  views: Number,
  likes: Number,
  comments: Number,
  shares: Number,
  status: String (enum: 'draft', 'published', 'archived'),
  tags: Array
}
```

## 🔄 Backup and Restore

### Automated Backups

```bash
# Create backups
./database-setup.sh --backup

# Backups are stored in: /var/backups/autowais/database/
```

### Manual Backups

```bash
# MongoDB backup
mongodump --db autowais --out /backup/path

# PostgreSQL backup
pg_dump -h localhost -U autowais_user ai_content_system > backup.sql
```

### Restore

```bash
# MongoDB restore
mongorestore --db autowais /backup/path/autowais

# PostgreSQL restore
psql -h localhost -U autowais_user -d ai_content_system < backup.sql
```

## 🌐 Environment Configuration

The setup script creates a `database.env` file with all necessary connection strings:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/autowais
MONGODB_DB=autowais

# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=ai_content_system
POSTGRES_USER=autowais_user
POSTGRES_PASSWORD=autowais_password_2024
POSTGRES_URI=postgresql://autowais_user:autowais_password_2024@localhost:5432/ai_content_system
```

## 📈 Performance Optimization

### MongoDB Indexes

- **Unique Indexes**: email, conversationId, interactionId
- **Performance Indexes**: role, isActive, lastLogin, topic, status
- **Analytics Indexes**: engagementScore, performanceScore, date

### PostgreSQL Indexes

- **Primary Keys**: All tables have auto-incrementing primary keys
- **Foreign Keys**: Proper referential integrity
- **Performance Indexes**: date, topic, engagement_score, active status

### Views (PostgreSQL)

- **high_performing_topics**: Top performing content topics
- **audience_insights**: User engagement analytics
- **content_performance_summary**: Monthly performance summaries

## 🧪 Testing

### Test Data

The PostgreSQL setup includes comprehensive test data:

- 15 content topics with performance metrics
- 10 sample posts with engagement data
- 20 user profiles with industry distribution
- 15 content performance records

### Verification

```bash
# Verify database setup
./database-setup.sh --verify

# Check collection counts
mongosh --eval "use autowais; db.getCollectionNames().forEach(c => print(c + ': ' + db[c].count()))"

# Check table counts
psql -h localhost -U autowais_user -d ai_content_system -c "SELECT 'content_topics' as table_name, COUNT(*) as count FROM content_topics UNION ALL SELECT 'posts', COUNT(*) FROM posts;"
```

## 🚨 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**

   ```bash
   sudo systemctl status mongod
   sudo systemctl start mongod
   ```

2. **PostgreSQL Connection Failed**

   ```bash
   sudo systemctl status postgresql
   sudo systemctl start postgresql
   ```

3. **Permission Issues**

   ```bash
   sudo chown -R $USER:$USER /var/backups/autowais
   ```

4. **Schema Validation Errors**
   - Check data format against schema requirements
   - Verify required fields are present
   - Ensure enum values are correct

### Logs

- **MongoDB**: `/var/log/mongodb/mongod.log`
- **PostgreSQL**: `/var/log/postgresql/postgresql-*.log`

## 📞 Support

For database issues:

1. Check the troubleshooting section above
2. Verify database services are running
3. Check connection strings in environment file
4. Review database logs for errors

---

**Database Package Version**: 1.0.0  
**Compatible With**: MongoDB 6.0+, PostgreSQL 12+  
**Last Updated**: $(date)
