# Quick Start Guide

## 5-Minute Setup

### Prerequisites
- Node.js 14+ installed
- MongoDB deployed (local or MongoDB Atlas)
- Code editor (VS Code recommended)

### Step 1: Clone Repository
```bash
cd "c:\Users\GOUTH\OneDrive\Desktop\Full stack project\full stack"
```

### Step 2: Setup Backend (Terminal 1)
```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:
```
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_secret_key_here
PORT=5000
FRONTEND_URL=http://localhost:3000
```

Start backend:
```bash
npm run dev
```

Expected output:
```
MongoDB Connected: localhost:27017
LMS Backend running on http://localhost:5000
```

### Step 3: Setup Frontend (Terminal 2)
```bash
cd frontend
npm install
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
npm start
```

Browser opens at `http://localhost:3000`

### Step 4: Test Application

1. **Register Account**
   - Go to http://localhost:3000/register
   - Fill form with:
     - First Name: Test
     - Last Name: User
     - Email: test@example.com
     - Password: test123
     - Role: student
   - Click Register

2. **Login**
   - Go to login page
   - Enter credentials
   - Click Login

3. **Explore Dashboard**
   - View available courses
   - See user profile
   - Navigate menu

## Project Structure Overview

```
backend/
├── src/
│   ├── models/          # Database schemas
│   ├── controllers/     # Business logic
│   ├── routes/         # API routes
│   ├── middleware/     # Auth & utilities
│   ├── config/         # Database & JWT config
│   └── server.js       # Entry point
└── package.json

frontend/
├── src/
│   ├── components/     # Reusable components
│   ├── pages/         # Page components
│   ├── context/       # State management
│   ├── services/      # API calls
│   ├── styles/        # CSS files
│   └── App.js         # Root component
└── package.json
```

## Key Features Available

✅ **User Authentication**
- Register with role selection
- Login with JWT token
- Profile management

✅ **Course Management**
- Create courses (Instructor/Creator)
- View all courses
- Publish courses

✅ **Student Features**
- Enroll in courses
- Track progress
- View enrolled courses

✅ **Admin Features**
- View platform statistics
- Manage users
- Monitor system

## Common Commands

### Backend
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Install dependencies
npm install
```

### Frontend
```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Install dependencies
npm install
```

## Available Routes

### Frontend Pages
- `/` - Home/Dashboard
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - Main dashboard
- `/create-course` - Create course (Instructor only)
- `/admin` - Admin panel (Admin only)

### Backend API
- `GET /api/health` - Health check
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- See API_DOCUMENTATION.md for complete list

## Default Test Credentials

### Admin
```
Email: admin@lms.com
Password: admin123
```

### Instructor
```
Email: instructor@lms.com
Password: instructor123
```

### Student
```
Email: student@lms.com
Password: student123
```

(You need to register these accounts first through the UI)

## Troubleshooting

### Backend won't start
1. Check MongoDB is running
2. Verify MONGODB_URI in .env
3. Check port 5000 is available
4. Clear node_modules and reinstall

### Frontend won't load
1. Check backend is running
2. Verify REACT_APP_API_URL in .env
3. Check port 3000 is available
4. Clear browser cache

### Can't login
1. Verify credentials are correct
2. Check backend error logs
3. Inspect browser network tab
4. Check JWT_SECRET matches

### CORS Error
1. Verify FRONTEND_URL in backend .env
2. Check request headers
3. Restart backend server
4. Clear browser cache

## Next Steps

1. **Add More Models**
   - Create Module model
   - Create Lesson model
   - Add Quiz model

2. **Implement Features**
   - Video upload
   - Rich text editor
   - File management
   - Email notifications

3. **Enhance Security**
   - Add rate limiting
   - Implement refresh tokens
   - Add CSRF protection
   - Validate all inputs

4. **Deploy**
   - Follow DEPLOYMENT_GUIDE.md
   - Setup production database
   - Configure environment variables

5. **Monitor**
   - Setup error tracking (Sentry)
   - Monitor performance (New Relic)
   - Track user analytics (Google Analytics)

## Resources

- **Backend Documentation**: [backend/SETUP.md](backend/SETUP.md)
- **Frontend Documentation**: [frontend/SETUP.md](frontend/SETUP.md)
- **API Documentation**: [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Testing Guide**: [TESTING_GUIDE.md](TESTING_GUIDE.md)
- **Deployment Guide**: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

## Need Help?

1. Check the README.md for overview
2. See SETUP.md files for detailed setup
3. Check API_DOCUMENTATION.md for API details
4. Review TESTING_GUIDE.md for testing examples
5. Consult code comments in source files

## Basic Workflow

```
1. Start Backend    → npm run dev
2. Start Frontend   → npm start
3. Register Account → /register
4. Login           → /login
5. Explore App     → Dashboard
6. Create Course   → /create-course (as instructor)
7. Enroll Course   → From dashboard (as student)
8. View Admin      → /admin (as admin)
```

## Performance Tips

- Use Chrome DevTools to inspect performance
- Check Network tab for slow API calls
- Monitor database queries
- Clear browser cache if issues occur
- Restart servers if experiencing lag

## Development Best Practices

1. **Always use .env for sensitive data**
2. **Test API routes with Postman first**
3. **Check console for errors and warnings**
4. **Use Git for version control**
5. **Comment complex logic**
6. **Follow the existing code style**
7. **Test authentication flows thoroughly**

Good luck with your LMS development! 🚀
