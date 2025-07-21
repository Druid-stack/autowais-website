# AUTOWAIS Website Package

## 🌐 Complete AUTOWAIS Website with Backend API

This package contains the complete AUTOWAIS website including the Next.js frontend, Node.js backend API, and all supporting files for a full-stack web application.

## 📦 Package Contents

```
autowais-website/
├── README.md                           # This file
├── package.json                        # Frontend dependencies
├── server.js                           # Backend server
├── next.config.js                      # Next.js configuration
├── tailwind.config.js                  # Tailwind CSS configuration
├── postcss.config.js                   # PostCSS configuration
├── tsconfig.json                       # TypeScript configuration
├── src/                                # Frontend source code
│   ├── app/                            # Next.js 13+ app directory
│   │   ├── page.tsx                    # Homepage
│   │   ├── about/page.tsx              # About page
│   │   ├── services/page.tsx           # Services page
│   │   ├── blog/page.tsx               # Blog listing
│   │   ├── blog/[slug]/page.tsx        # Blog post pages
│   │   ├── contact/page.tsx            # Contact page
│   │   ├── admin/page.tsx              # Admin dashboard
│   │   ├── dashboard/page.tsx          # User dashboard
│   │   ├── api/                        # API routes
│   │   │   └── contact/route.ts        # Contact form API
│   │   ├── layout.tsx                  # Root layout
│   │   └── globals.css                 # Global styles
│   ├── components/                     # React components
│   │   ├── layout/                     # Layout components
│   │   │   ├── Header.tsx              # Navigation header
│   │   │   └── Footer.tsx              # Site footer
│   │   ├── sections/                   # Page sections
│   │   │   ├── Hero.tsx                # Hero section
│   │   │   ├── ServicesOverview.tsx    # Services section
│   │   │   └── WhyAutowais.tsx         # Features section
│   │   └── ui/                         # UI components
│   ├── data/                           # Static data
│   │   ├── blogPosts.ts                # Blog post data
│   │   └── industryBlogPosts.ts        # Industry blog data
│   ├── lib/                            # Utility libraries
│   └── types/                          # TypeScript types
├── public/                             # Static assets
│   ├── favicon.ico                     # Site favicon
│   └── images/                         # Image assets
│       ├── autowais-icon.svg           # Company icon
│       ├── autowais-logo.png           # Company logo
│       ├── blog/                       # Blog images
│       └── compliance/                 # Compliance images
├── models/                             # Database models
│   └── User.js                         # User model
├── routes/                             # Backend API routes
│   ├── auth.js                         # Authentication routes
│   └── users.js                        # User management routes
├── middleware/                         # Backend middleware
│   └── auth.js                         # Authentication middleware
├── utils/                              # Utility functions
│   └── setupAdmin.js                   # Admin setup utility
├── prompts/                            # AI prompts
│   ├── ai-reply-prompt.txt             # AI response prompt
│   ├── lead-qualification-prompt.txt   # Lead qualification
│   └── content-to-lead-magnet-prompt.txt # Content generation
└── scripts/                            # Setup scripts
    └── dev-setup.sh                    # Development setup
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (for backend functionality)

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies (if needed)
npm install express mongoose bcryptjs jsonwebtoken cors helmet
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Frontend Environment Variables
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Backend Environment Variables (if using backend)
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/autowais
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

### 3. Start Development Server

```bash
# Start frontend only
npm run dev

# Start backend only
node server.js

# Start both (if you have concurrently installed)
npm run dev:full
```

### 4. Build for Production

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 🎯 Features

### Frontend (Next.js 13+)

- **Modern React**: Latest React features with hooks
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags, structured data
- **Performance**: Image optimization, code splitting
- **Accessibility**: WCAG compliant components

### Backend (Node.js/Express)

- **RESTful API**: Clean API design
- **Authentication**: JWT-based auth with bcrypt
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, CORS, rate limiting
- **Validation**: Input validation and sanitization
- **Error Handling**: Centralized error management

### Content Management

- **Blog System**: Dynamic blog with markdown support
- **Contact Forms**: Email integration
- **Admin Dashboard**: Content management interface
- **User Management**: Registration, login, profiles

## 📱 Pages & Routes

### Public Pages

- **Homepage** (`/`): Landing page with hero, services, features
- **About** (`/about`): Company information and team
- **Services** (`/services`): Service offerings and solutions
- **Blog** (`/blog`): Blog listing and individual posts
- **Contact** (`/contact`): Contact form and information
- **FAQ** (`/faq`): Frequently asked questions

### Protected Pages

- **Dashboard** (`/dashboard`): User dashboard
- **Admin** (`/admin`): Admin panel (admin only)

### API Routes

- **Authentication**: `/api/auth/*` - Login, register, profile
- **Users**: `/api/users/*` - User management
- **Contact**: `/api/contact` - Contact form submission
- **Health**: `/api/health` - API health check

## 🎨 Design System

### Colors

- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#6B7280)
- **Accent**: Green (#10B981)
- **Background**: White (#FFFFFF)
- **Text**: Dark Gray (#1F2937)

### Typography

- **Headings**: Inter font family
- **Body**: System font stack
- **Code**: Monospace font

### Components

- **Buttons**: Primary, secondary, outline variants
- **Cards**: Content cards with shadows
- **Forms**: Input fields, validation, error states
- **Navigation**: Header, footer, breadcrumbs
- **Layout**: Container, grid, flexbox utilities

## 🔧 Configuration

### Next.js Configuration

```javascript
// next.config.js
module.exports = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost"],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#6B7280",
      },
    },
  },
  plugins: [],
};
```

## 🗄️ Database Schema

### User Model

```javascript
{
  email: String (required, unique),
  password: String (required, hashed),
  name: String (required),
  role: String (enum: 'user', 'admin', 'moderator'),
  isActive: Boolean (default: true),
  lastLogin: Date,
  services: Array (service connections)
}
```

## 🔐 Security Features

### Frontend Security

- **CSP Headers**: Content Security Policy
- **XSS Protection**: Input sanitization
- **CSRF Protection**: Token-based protection
- **HTTPS Only**: Secure connections

### Backend Security

- **Password Hashing**: bcrypt with salt
- **JWT Tokens**: Secure authentication
- **Rate Limiting**: API protection
- **Input Validation**: Request sanitization
- **CORS**: Cross-origin protection

## 📊 Performance

### Frontend Optimization

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Component and image lazy loading
- **Caching**: Static generation and caching
- **Bundle Analysis**: Webpack bundle analyzer

### Backend Optimization

- **Database Indexing**: Optimized queries
- **Connection Pooling**: Database connection management
- **Caching**: Redis integration (optional)
- **Compression**: Gzip compression
- **Logging**: Structured logging

## 🧪 Testing

### Frontend Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

### Backend Testing

```bash
# Run API tests
npm run test:api

# Run integration tests
npm run test:integration
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Docker Deployment

```bash
# Build image
docker build -t autowais-website .

# Run container
docker run -p 3000:3000 autowais-website
```

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🔄 Development Workflow

### Git Workflow

1. **Feature Branch**: Create feature branch from main
2. **Development**: Develop and test locally
3. **Pull Request**: Create PR for review
4. **Code Review**: Review and approve changes
5. **Merge**: Merge to main branch
6. **Deploy**: Automatic deployment to staging/production

### Code Quality

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks
- **TypeScript**: Type checking

## 📞 Support

### Documentation

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com/docs

### Issues

- Check the troubleshooting section
- Review console logs and error messages
- Verify environment variables
- Test database connections

### Community

- **GitHub Issues**: Report bugs and feature requests
- **Discord**: Join our community server
- **Email**: support@autowais.com

---

**Website Package Version**: 1.0.0  
**Framework**: Next.js 13+ with App Router  
**Styling**: Tailwind CSS  
**Backend**: Node.js/Express  
**Database**: MongoDB  
**Last Updated**: $(date)

# Deployment Trigger

This line was added to trigger a new deployment on Vercel.
