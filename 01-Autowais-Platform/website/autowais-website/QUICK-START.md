# AUTOWAIS Website - Quick Start Guide

## 🚀 Get Your Website Running in 5 Minutes

This guide will get your AUTOWAIS website up and running quickly for development or production.

## 📋 Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **npm or yarn** - Comes with Node.js
- **Git** - [Download here](https://git-scm.com/)

## ⚡ Quick Setup

### 1. Install Dependencies

```bash
# Install all dependencies (frontend + backend)
npm install
```

### 2. Environment Setup

```bash
# Copy environment template
cp env.example .env.local

# Edit the file with your settings
nano .env.local
```

**Minimum required settings:**

```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/autowais
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Start Development Server

```bash
# Start frontend only (recommended for first run)
npm run dev

# OR start both frontend and backend
npm run dev:full
```

### 4. Open Your Browser

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api/health

## 🎯 What You Get

### ✅ Complete Website

- **Homepage** with hero section and features
- **About page** with company information
- **Services page** with offerings
- **Blog system** with dynamic content
- **Contact form** with email integration
- **Admin dashboard** for content management

### ✅ Modern Tech Stack

- **Next.js 13+** with App Router
- **React 18** with hooks
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Node.js/Express** backend
- **MongoDB** database

### ✅ Production Ready

- **SEO optimized** with meta tags
- **Performance optimized** with code splitting
- **Security hardened** with headers
- **Mobile responsive** design
- **Accessibility compliant** components

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start frontend dev server
npm run server           # Start backend server
npm run dev:full         # Start both frontend and backend

# Building
npm run build            # Build for production
npm run start            # Start production server
npm run export           # Export static site

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run type-check       # TypeScript type checking

# Testing
npm test                 # Run tests
npm run test:watch       # Watch mode tests
npm run test:coverage    # Test coverage
npm run test:e2e         # End-to-end tests

# Utilities
npm run clean            # Clean build files
npm run analyze          # Bundle analysis
npm run setup            # Setup admin user
```

## 📱 Pages Overview

| Page      | URL            | Description                         |
| --------- | -------------- | ----------------------------------- |
| Homepage  | `/`            | Landing page with hero and features |
| About     | `/about`       | Company information and team        |
| Services  | `/services`    | Service offerings                   |
| Blog      | `/blog`        | Blog listing                        |
| Blog Post | `/blog/[slug]` | Individual blog posts               |
| Contact   | `/contact`     | Contact form                        |
| Dashboard | `/dashboard`   | User dashboard (protected)          |
| Admin     | `/admin`       | Admin panel (admin only)            |

## 🔌 API Endpoints

| Endpoint             | Method | Description             |
| -------------------- | ------ | ----------------------- |
| `/api/health`        | GET    | Health check            |
| `/api/auth/login`    | POST   | User login              |
| `/api/auth/register` | POST   | User registration       |
| `/api/auth/me`       | GET    | Get current user        |
| `/api/contact`       | POST   | Contact form submission |
| `/api/users`         | GET    | Get users (admin)       |

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize your brand colors:

```javascript
colors: {
  primary: {
    500: '#3b82f6', // Your brand blue
  },
  secondary: {
    500: '#6b7280', // Your brand gray
  },
}
```

### Content

- **Blog posts**: Edit `src/data/blogPosts.ts`
- **Services**: Edit `src/data/services.ts`
- **Company info**: Edit `src/data/company.ts`

### Styling

- **Global styles**: Edit `src/app/globals.css`
- **Component styles**: Use Tailwind classes in components
- **Custom CSS**: Add to `src/app/globals.css`

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Netlify

```bash
# Build the site
npm run build

# Deploy to Netlify
# Upload the .next folder to Netlify
```

### Docker

```bash
# Build image
docker build -t autowais-website .

# Run container
docker run -p 3000:3000 autowais-website
```

## 🔐 Security

### Environment Variables

- Never commit `.env.local` to version control
- Use strong, unique secrets in production
- Rotate secrets regularly

### Admin Access

Default admin account (change after first login):

- **Email**: karl.hallis@autowais.com
- **Password**: TempPassword123!

### Security Headers

The website includes security headers:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

## 📊 Performance

### Optimization Features

- **Code splitting**: Automatic route-based splitting
- **Image optimization**: Next.js Image component
- **Lazy loading**: Component and image lazy loading
- **Caching**: Static generation and caching
- **Bundle analysis**: Run `npm run analyze`

### Performance Monitoring

- **Lighthouse**: Run audits in Chrome DevTools
- **Web Vitals**: Monitor Core Web Vitals
- **Bundle size**: Use `npm run analyze`

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Kill process on port 3000
   lsof -ti:3000 | xargs kill -9
   ```

2. **MongoDB connection failed**

   ```bash
   # Start MongoDB
   sudo systemctl start mongod
   # OR
   brew services start mongodb-community
   ```

3. **Build errors**

   ```bash
   # Clean and rebuild
   npm run clean
   npm install
   npm run build
   ```

4. **TypeScript errors**
   ```bash
   # Check types
   npm run type-check
   ```

### Getting Help

- Check the console for error messages
- Review the browser's Network tab
- Check the terminal output
- Verify environment variables are set correctly

## 📞 Support

- **Documentation**: Check the main README.md
- **Issues**: Report bugs on GitHub
- **Email**: support@autowais.com

---

**Your AUTOWAIS website is ready! 🎉**

Visit http://localhost:3000 to see your website in action.
