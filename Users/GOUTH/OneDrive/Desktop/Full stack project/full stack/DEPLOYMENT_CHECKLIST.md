# Deployment Checklist ✅

## Step 1: Set Up MongoDB Atlas (Free Tier Available)
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Create account & create `M0 Free Cluster`
- [ ] Create database user
- [ ] Get connection string: `mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/lms`
- [ ] Whitelist your IP (or use 0.0.0.0 for all IPs - not recommended for production)

## Step 2: Backend Deployment (Heroku - Free Tier)

### Prerequisites
```bash
npm install -g heroku
heroku login
```

### Deploy
```bash
cd backend
heroku create your-app-name
```

### Set Environment Variables
```bash
heroku config:set MONGODB_URI="mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/lms"
heroku config:set JWT_SECRET="your_secure_secret_key_here"
heroku config:set FRONTEND_URL="https://your-frontend-url.com"
heroku config:set NODE_ENV="production"
```

### Push to Heroku
```bash
git push heroku master
```

### Verify deployment
```bash
heroku logs --tail
```

---

## Step 3: Frontend Deployment (Vercel or Netlify - Free)

### For Vercel
```bash
npm install -g vercel
cd frontend
vercel
```
Set environment variable during deployment:
- `REACT_APP_API_URL = YOUR_HEROKU_BACKEND_URL/api`

### For Netlify
- Connect GitHub repo to Netlify
- Build command: `npm run build`
- Publish directory: `build`
- Add environment variable: `REACT_APP_API_URL = YOUR_HEROKU_BACKEND_URL/api`

---

## Step 4: Update Frontend API URL

Edit [frontend/src/api/apiClient.js](frontend/src/api/apiClient.js):
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## Step 5: Test Deployment

1. Check backend health:
   ```
   https://your-app-name.herokuapp.com/api/health
   ```

2. Check if frontend can connect to backend
   - Should see successful API calls in Network tab (browser DevTools)

---

## Common Issues & Fixes

### ❌ "Cannot POST /api/auth/login"
- **Fix**: Make sure `FRONTEND_URL` is set correctly in Heroku

### ❌ "CORS error"
- **Fix**: Update backend CORS in [backend/src/server.js](backend/src/server.js):
  ```javascript
  app.use(cors({ 
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true 
  }));
  ```

### ❌ "MongoDB connection timeout"
- **Fix**: Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for testing)

### ❌ "Cannot find module"
- **Fix**: Ensure `node_modules` is installed:
  ```bash
  npm install
  ```

---

## Environment Variables Quick Reference

### Backend (.env or Heroku config)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/lms
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.com
```

### Frontend (.env.production or Vercel/Netlify config)
```
REACT_APP_API_URL=https://your-backend-url.com/api
```
