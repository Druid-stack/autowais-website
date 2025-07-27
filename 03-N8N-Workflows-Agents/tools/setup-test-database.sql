-- AI Agent Test Database Setup Script
-- This script creates the required tables and inserts mock data for testing

-- Create database (run this separately if needed)
-- CREATE DATABASE ai_content_system;

-- Connect to the database
\c ai_content_system;

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS content_performance CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS content_topics CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create content_topics table
CREATE TABLE content_topics (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) NOT NULL UNIQUE,
    performance_score DECIMAL(3,2) DEFAULT 0.0 CHECK (performance_score >= 0 AND performance_score <= 1),
    engagement_rate DECIMAL(5,2) DEFAULT 0.0 CHECK (engagement_rate >= 0),
    last_used TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(255) REFERENCES content_topics(topic),
    title TEXT NOT NULL,
    content TEXT,
    linkedin_post_id VARCHAR(255),
    engagement_score DECIMAL(5,2) DEFAULT 0.0,
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create content_performance table
CREATE TABLE content_performance (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    title TEXT NOT NULL,
    topic VARCHAR(255),
    strategy VARCHAR(100),
    word_count INTEGER CHECK (word_count > 0),
    seo_score INTEGER CHECK (seo_score >= 0 AND seo_score <= 100),
    linkedin_post_id VARCHAR(255),
    expected_engagement VARCHAR(50),
    actual_engagement DECIMAL(5,2),
    drive_file_id VARCHAR(255),
    ai_strategy_reasoning TEXT,
    hashtags TEXT,
    content_pillars TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table (audience analytics)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    company_size VARCHAR(50),
    interests TEXT,
    last_engagement TIMESTAMP,
    preferred_content_type VARCHAR(100),
    engagement_score DECIMAL(5,2) DEFAULT 0.0 CHECK (engagement_score >= 0 AND engagement_score <= 10),
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert mock data for content_topics
INSERT INTO content_topics (topic, performance_score, engagement_rate, last_used) VALUES
('AI Automation', 0.85, 12.5, '2024-01-10 09:00:00'),
('Digital Transformation', 0.78, 10.2, '2024-01-08 09:00:00'),
('Workflow Optimization', 0.92, 15.8, '2024-01-05 09:00:00'),
('Business Intelligence', 0.76, 9.4, '2024-01-03 09:00:00'),
('API Integration', 0.83, 11.7, '2024-01-12 09:00:00'),
('Cloud Migration', 0.71, 8.9, '2024-01-01 09:00:00'),
('Data Analytics', 0.88, 13.2, '2024-01-07 09:00:00'),
('Cybersecurity', 0.79, 10.8, '2024-01-09 09:00:00'),
('Remote Work Tools', 0.74, 9.1, '2024-01-06 09:00:00'),
('E-commerce Solutions', 0.82, 12.1, '2024-01-11 09:00:00'),
('Machine Learning', 0.87, 14.3, '2024-01-04 09:00:00'),
('Process Automation', 0.90, 16.2, '2024-01-13 09:00:00'),
('Customer Experience', 0.75, 9.7, '2024-01-02 09:00:00'),
('DevOps', 0.81, 11.4, '2024-01-14 09:00:00'),
('Data Science', 0.86, 13.8, '2024-01-15 09:00:00');

-- Insert mock data for posts
INSERT INTO posts (topic, title, content, linkedin_post_id, engagement_score, views, likes, comments, shares) VALUES
('AI Automation', 'How AI is Revolutionizing Business Operations', 'Comprehensive guide to AI implementation...', 'li_post_001', 8.5, 1250, 89, 23, 15),
('Digital Transformation', 'The Future of Digital Business', 'Digital transformation strategies for 2024...', 'li_post_002', 7.2, 980, 67, 18, 12),
('Workflow Optimization', 'Streamlining Your Business Processes', 'Best practices for workflow optimization...', 'li_post_003', 9.1, 1450, 102, 31, 22),
('Business Intelligence', 'Data-Driven Decision Making', 'Leveraging BI for competitive advantage...', 'li_post_004', 6.8, 875, 54, 14, 8),
('API Integration', 'Building Connected Systems', 'API integration strategies and best practices...', 'li_post_005', 8.2, 1100, 78, 20, 16),
('Machine Learning', 'ML Applications in Business', 'Practical machine learning implementations...', 'li_post_006', 8.9, 1320, 94, 27, 19),
('Process Automation', 'Automating for Efficiency', 'Process automation success stories...', 'li_post_007', 9.3, 1580, 115, 35, 28),
('Cybersecurity', 'Protecting Your Digital Assets', 'Cybersecurity best practices for 2024...', 'li_post_008', 7.8, 1050, 72, 19, 13),
('Data Analytics', 'Turning Data into Insights', 'Advanced analytics techniques...', 'li_post_009', 8.7, 1280, 91, 25, 18),
('Cloud Migration', 'Moving to the Cloud Successfully', 'Cloud migration strategies and pitfalls...', 'li_post_010', 7.4, 920, 61, 16, 10);

-- Insert mock data for users (audience analytics)
INSERT INTO users (name, industry, company_size, interests, last_engagement, preferred_content_type, engagement_score) VALUES
('Tech Leader Alpha', 'Technology', 'Enterprise', 'AI, Automation, Innovation, Leadership', '2024-01-12 15:30:00', 'thought_leadership', 8.5),
('Business Analyst Beta', 'Finance', 'Mid-Market', 'Analytics, BI, Data Science, Reporting', '2024-01-11 14:20:00', 'how_to_guide', 7.2),
('Startup Founder Gamma', 'SaaS', 'Startup', 'Growth, Scaling, Technology, Funding', '2024-01-13 10:15:00', 'case_study', 9.1),
('CTO Delta', 'Healthcare', 'Enterprise', 'Digital Transformation, Security, Compliance', '2024-01-10 16:45:00', 'industry_analysis', 8.8),
('Product Manager Epsilon', 'E-commerce', 'Mid-Market', 'Product Development, User Experience, Analytics', '2024-01-14 11:30:00', 'best_practices', 7.9),
('Data Scientist Zeta', 'Consulting', 'Large', 'Machine Learning, Data Analytics, AI', '2024-01-09 13:20:00', 'technical_deep_dive', 9.2),
('Operations Director Eta', 'Manufacturing', 'Enterprise', 'Process Optimization, Automation, Efficiency', '2024-01-08 09:45:00', 'success_story', 8.1),
('Marketing Manager Theta', 'Marketing', 'Mid-Market', 'Digital Marketing, Analytics, Customer Experience', '2024-01-15 14:10:00', 'trend_analysis', 7.6),
('DevOps Engineer Iota', 'Technology', 'Large', 'DevOps, Cloud, Infrastructure, Automation', '2024-01-07 12:00:00', 'how_to_guide', 8.4),
('CEO Kappa', 'Professional Services', 'Mid-Market', 'Business Strategy, Leadership, Digital Transformation', '2024-01-12 17:30:00', 'thought_leadership', 9.0),
('Security Analyst Lambda', 'Cybersecurity', 'Large', 'Security, Compliance, Risk Management', '2024-01-11 10:20:00', 'industry_analysis', 8.3),
('Sales Director Mu', 'Sales', 'Enterprise', 'Sales Automation, CRM, Customer Success', '2024-01-13 15:45:00', 'case_study', 7.8),
('HR Manager Nu', 'Human Resources', 'Mid-Market', 'Remote Work, Employee Experience, HR Tech', '2024-01-10 11:15:00', 'best_practices', 7.4),
('Financial Analyst Xi', 'Finance', 'Large', 'Financial Analytics, Reporting, Business Intelligence', '2024-01-14 16:20:00', 'technical_deep_dive', 8.6),
('Innovation Manager Omicron', 'Innovation', 'Enterprise', 'Innovation, R&D, Emerging Technologies', '2024-01-09 14:30:00', 'trend_analysis', 8.9),
('Customer Success Manager Pi', 'Customer Success', 'Mid-Market', 'Customer Experience, Retention, Analytics', '2024-01-08 13:45:00', 'success_story', 7.7),
('IT Director Rho', 'IT', 'Large', 'IT Infrastructure, Cloud, Digital Transformation', '2024-01-15 09:30:00', 'how_to_guide', 8.2),
('Business Development Manager Sigma', 'Business Development', 'Startup', 'Growth, Partnerships, Strategy', '2024-01-12 12:40:00', 'case_study', 8.7),
('Quality Assurance Manager Tau', 'Quality', 'Mid-Market', 'Quality Management, Process Improvement, Testing', '2024-01-11 15:50:00', 'best_practices', 7.3),
('Research Director Upsilon', 'Research', 'Enterprise', 'Research, Data Science, Innovation', '2024-01-13 11:25:00', 'technical_deep_dive', 9.3);

-- Insert mock data for content_performance (historical data)
INSERT INTO content_performance (date, title, topic, strategy, word_count, seo_score, linkedin_post_id, expected_engagement, actual_engagement, hashtags, content_pillars) VALUES
('2024-01-01', 'AI Automation Trends for 2024', 'AI Automation', 'trend_prediction', 1200, 85, 'li_post_001', 'high', 8.5, '#AIAutomation #TechTrends #BusinessInnovation', 'AI, Automation'),
('2024-01-02', 'Digital Transformation Success Stories', 'Digital Transformation', 'case_study', 1150, 78, 'li_post_002', 'medium', 7.2, '#DigitalTransformation #BusinessSuccess #Innovation', 'Digital, Transformation'),
('2024-01-03', 'Workflow Optimization Best Practices', 'Workflow Optimization', 'best_practices', 1300, 92, 'li_post_003', 'high', 9.1, '#WorkflowOptimization #ProcessImprovement #Efficiency', 'Workflow, Optimization'),
('2024-01-04', 'Business Intelligence Implementation Guide', 'Business Intelligence', 'how_to_guide', 1100, 76, 'li_post_004', 'medium', 6.8, '#BusinessIntelligence #DataAnalytics #Implementation', 'BI, Analytics'),
('2024-01-05', 'API Integration Strategies', 'API Integration', 'technical_deep_dive', 1250, 83, 'li_post_005', 'high', 8.2, '#APIIntegration #TechStrategy #Development', 'API, Integration'),
('2024-01-06', 'Machine Learning in Business', 'Machine Learning', 'industry_analysis', 1180, 87, 'li_post_006', 'high', 8.9, '#MachineLearning #AI #BusinessApplications', 'ML, Business'),
('2024-01-07', 'Process Automation Success Stories', 'Process Automation', 'success_story', 1220, 90, 'li_post_007', 'high', 9.3, '#ProcessAutomation #BusinessSuccess #Efficiency', 'Process, Automation'),
('2024-01-08', 'Cybersecurity Trends and Challenges', 'Cybersecurity', 'trend_analysis', 1080, 79, 'li_post_008', 'medium', 7.8, '#Cybersecurity #InfoSec #TechTrends', 'Security, Cybersecurity'),
('2024-01-09', 'Data Analytics Best Practices', 'Data Analytics', 'best_practices', 1160, 88, 'li_post_009', 'high', 8.7, '#DataAnalytics #BusinessIntelligence #DataScience', 'Data, Analytics'),
('2024-01-10', 'Cloud Migration Strategies', 'Cloud Migration', 'how_to_guide', 1090, 71, 'li_post_010', 'medium', 7.4, '#CloudMigration #CloudStrategy #DigitalTransformation', 'Cloud, Migration'),
('2024-01-11', 'Remote Work Technology Solutions', 'Remote Work Tools', 'tool_comparison', 1140, 74, 'li_post_011', 'medium', 7.1, '#RemoteWork #WorkFromHome #ProductivityTools', 'Remote, Tools'),
('2024-01-12', 'E-commerce Innovation Trends', 'E-commerce Solutions', 'trend_prediction', 1200, 82, 'li_post_012', 'high', 8.4, '#Ecommerce #OnlineRetail #DigitalCommerce', 'Ecommerce, Innovation'),
('2024-01-13', 'Customer Experience Optimization', 'Customer Experience', 'best_practices', 1170, 75, 'li_post_013', 'medium', 7.6, '#CustomerExperience #CX #BusinessGrowth', 'CX, Customer'),
('2024-01-14', 'DevOps Implementation Guide', 'DevOps', 'how_to_guide', 1210, 81, 'li_post_014', 'high', 8.1, '#DevOps #SoftwareDevelopment #Automation', 'DevOps, Development'),
('2024-01-15', 'Data Science Applications in Business', 'Data Science', 'case_study', 1280, 86, 'li_post_015', 'high', 8.8, '#DataScience #BusinessAnalytics #AI', 'DataScience, Business');

-- Create indexes for better performance
CREATE INDEX idx_content_topics_performance ON content_topics(performance_score DESC);
CREATE INDEX idx_content_topics_engagement ON content_topics(engagement_rate DESC);
CREATE INDEX idx_posts_topic ON posts(topic);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_users_active ON users(active) WHERE active = true;
CREATE INDEX idx_users_engagement ON users(engagement_score DESC);
CREATE INDEX idx_users_industry ON users(industry);
CREATE INDEX idx_content_performance_date ON content_performance(date DESC);
CREATE INDEX idx_content_performance_topic ON content_performance(topic);

-- Create views for common queries
CREATE VIEW high_performing_topics AS
SELECT 
    topic,
    performance_score,
    engagement_rate,
    COUNT(*) as post_count,
    AVG(engagement_score) as avg_engagement
FROM content_topics ct
LEFT JOIN posts p ON ct.topic = p.topic
WHERE performance_score > 0.7
GROUP BY topic, performance_score, engagement_rate
ORDER BY performance_score DESC, engagement_rate DESC;

CREATE VIEW audience_insights AS
SELECT 
    industry,
    company_size,
    preferred_content_type,
    COUNT(*) as user_count,
    AVG(engagement_score) as avg_engagement_score,
    MAX(last_engagement) as latest_engagement
FROM users
WHERE active = true
GROUP BY industry, company_size, preferred_content_type
ORDER BY avg_engagement_score DESC;

CREATE VIEW content_performance_summary AS
SELECT 
    DATE_TRUNC('month', date) as month,
    topic,
    COUNT(*) as post_count,
    AVG(seo_score) as avg_seo_score,
    AVG(actual_engagement) as avg_engagement,
    AVG(word_count) as avg_word_count
FROM content_performance
GROUP BY DATE_TRUNC('month', date), topic
ORDER BY month DESC, avg_engagement DESC;

-- Grant permissions (adjust as needed)
-- GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO your_n8n_user;
-- GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO your_n8n_user;

-- Display summary statistics
SELECT 'Content Topics' as table_name, COUNT(*) as record_count FROM content_topics
UNION ALL
SELECT 'Posts', COUNT(*) FROM posts
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Content Performance', COUNT(*) FROM content_performance;

-- Display top performing topics
SELECT 
    topic,
    performance_score,
    engagement_rate,
    last_used
FROM content_topics
ORDER BY performance_score DESC
LIMIT 5;

-- Display audience distribution
SELECT 
    industry,
    COUNT(*) as user_count,
    AVG(engagement_score) as avg_engagement
FROM users
WHERE active = true
GROUP BY industry
ORDER BY avg_engagement DESC;

COMMIT; 