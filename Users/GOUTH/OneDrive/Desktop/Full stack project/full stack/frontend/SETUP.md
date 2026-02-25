# Frontend Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file:**
   ```bash
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   ```

## Running the Application

**Development mode:**
```bash
npm start
```

Application will open at `http://localhost:3000`

**Build for production:**
```bash
npm run build
```

## Project Structure

```
src/
├── api/
│   └── apiClient.js          # Axios API client
├── components/
│   ├── Navbar.js             # Navigation bar
│   └── CourseCard.js         # Course display card
├── context/
│   ├── AuthContext.js        # Authentication state
│   └── CourseContext.js      # Course state management
├── pages/
│   ├── Login.js              # Login page
│   ├── Register.js           # Registration page
│   ├── Dashboard.js          # Main dashboard
│   ├── CreateCourse.js       # Course creation
│   └── Admin.js              # Admin panel
├── services/
│   └── api.js                # API service functions
├── styles/
│   ├── App.css               # App styles
│   ├── Navbar.css
│   ├── CourseCard.css
│   ├── Dashboard.css
│   ├── Auth.css
│   ├── CreateCourse.css
│   └── Admin.css
├── App.js                    # Main app component
├── index.js                  # React entry point
└── index.css                 # Global styles
```

## Key Features Implemented

### Authentication Context
- Manages user login/logout
- Stores JWT token
- Persists user data

### API Service Layer
All API calls go through centralized service layer:
- `authService` - Authentication endpoints
- `courseService` - Course management
- `enrollmentService` - Course enrollment
- `assignmentService` - Assignment management
- `adminService` - Admin functions

### Protected Routes
Routes are protected based on user roles:
- Public: Login, Register, Home
- Student: Dashboard, course access
- Instructor: Create/Edit courses
- Admin: Admin panel

### Responsive Design
- Mobile-friendly layouts
- CSS Grid for course display
- Flexbox for component layout

## Available Pages

### Public Pages
- `/` - Home/Dashboard
- `/login` - Login page
- `/register` - Registration page

### Protected Pages
- `/dashboard` - Main dashboard
- `/create-course` - Course creation (Instructor)
- `/admin` - Admin panel (Admin only)
- `/profile` - User profile

## Component Communication

### Props Flow
- Navbar receives auth context
- Course cards receive enrollment callback
- Forms submit to API services

### State Management
- AuthContext for global auth state
- CourseContext for course data
- Local component state for form data

## Styling Approach

- CSS files per component/page
- Gradient colors: #667eea to #764ba2
- Consistent spacing and sizing
- Hover effects on interactive elements
- Mobile responsive with media queries

## Troubleshooting

### API Connection Error
- Verify backend is running on http://localhost:5000
- Check REACT_APP_API_URL in .env file
- Check browser console for CORS errors

### Login/Authentication Issues
- Clear browser localStorage
- Check token is being saved
- Verify backend JWT_SECRET matches

### Styling Issues
- Check CSS files are imported
- Clear browser cache
- Restart development server

## Environment Variables

### Required
- `REACT_APP_API_URL` - Backend API base URL (default: http://localhost:5000/api)

## Build and Deploy

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

Creates optimized build in `build/` directory.

### Deploy to Netlify/Vercel
1. Push code to GitHub
2. Connect repository to Netlify/Vercel
3. Set `REACT_APP_API_URL` environment variable
4. Deploy

## Performance Optimization

- Code splitting with React Router
- Lazy loading of components
- Optimized API calls
- CSS minification in production
- Image optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
