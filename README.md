# AUTOWAIS Backend API

A secure Node.js/Express backend API for AUTOWAIS with user authentication, role-based access control, and MongoDB integration.

## 🚀 Features

- **User Authentication**: JWT-based authentication with secure password hashing
- **Role-Based Access Control**: Admin, moderator, and user roles
- **Account Security**: Account lockout after failed attempts, password requirements
- **User Management**: Complete CRUD operations for users (admin only)
- **Password Management**: Secure password updates and admin reset functionality
- **Rate Limiting**: Protection against brute force attacks
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: Comprehensive validation and sanitization
- **Error Handling**: Centralized error handling with detailed logging

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## ⚙️ Installation

1. **Clone or navigate to the backend directory**
   ```bash
   cd autowais-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy the `.env` file and update values:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/autowais
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   
   # Admin User
   ADMIN_EMAIL=karl.hallis@autowais.com
   ADMIN_PASSWORD=TempPassword123!
   
   # Frontend URL
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   mongod
   ```

5. **Setup admin user**
   ```bash
   npm run setup
   ```

6. **Start the server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔐 Default Admin Account

After running `npm run setup`, you can login with:
- **Email**: `karl.hallis@autowais.com`
- **Password**: `TempPassword123!`

**⚠️ Important**: Change the default password immediately after first login!

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| POST | `/signup` | Register new user | Public |
| POST | `/login` | Login user | Public |
| POST | `/logout` | Logout user | Private |
| GET | `/me` | Get current user | Private |
| PUT | `/updatepassword` | Update password | Private |
| PUT | `/updateprofile` | Update profile | Private |

### User Management Routes (`/api/users`)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/` | Get all users | Admin |
| GET | `/stats` | Get user statistics | Admin |
| GET | `/:id` | Get single user | Admin |
| PUT | `/:id` | Update user | Admin |
| DELETE | `/:id` | Delete user | Admin |
| PUT | `/:id/reset-password` | Reset user password | Admin |
| PUT | `/:id/unlock` | Unlock user account | Admin |

### Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| GET | `/api/health` | Server health check | Public |

## 🔑 Authentication

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "karl.hallis@autowais.com",
  "password": "TempPassword123!"
}
```

### Using JWT Token
Include the token in the Authorization header:
```bash
Authorization: Bearer <your-jwt-token>
```

### Update Password (for karl.hallis@autowais.com)
```bash
PUT /api/auth/updatepassword
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "currentPassword": "TempPassword123!",
  "newPassword": "YourNewSecurePassword123!"
}
```

## 👥 User Roles

- **admin**: Full access to all endpoints and user management
- **moderator**: Limited admin access (future feature)
- **user**: Basic user access

## 🔒 Security Features

- **Password Requirements**: Minimum 8 characters
- **Account Lockout**: 5 failed attempts locks account for 2 hours
- **JWT Expiration**: 7 days (configurable)
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend domain
- **Helmet**: Security headers enabled

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: 'user', 'admin', 'moderator'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  passwordChangedAt: Date,
  loginAttempts: Number,
  lockUntil: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"karl.hallis@autowais.com","password":"TempPassword123!"}'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🚀 Production Deployment

1. **Set environment variables**:
   - Use a strong `JWT_SECRET`
   - Set `NODE_ENV=production`
   - Use MongoDB Atlas for database
   - Configure proper CORS origins

2. **Security considerations**:
   - Use HTTPS in production
   - Set up proper firewall rules
   - Use environment variables for secrets
   - Regular security updates

## 🛠️ Development

### Available Scripts
- `npm run dev`: Start development server with auto-restart
- `npm start`: Start production server
- `npm run setup`: Initialize admin user
- `npm test`: Run tests (to be implemented)

### Adding New Routes
1. Create route file in `/routes`
2. Add middleware in `/middleware`
3. Create models in `/models`
4. Import and use in `server.js`

## 📝 License

ISC License - AUTOWAIS

## 🆘 Support

For support or questions about the AUTOWAIS backend:
- Email: karl.hallis@autowais.com
- Check logs for detailed error messages
- Ensure MongoDB is running and accessible 
