# Backend Setup Guide

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create .env file with this content:**
   ```
   MONGODB_URI=mongodb://localhost:27017/lms
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   JWT_EXPIRY=7d
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

## Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

## Database Schema

### User Schema
- firstName (String)
- lastName (String)
- email (String, unique)
- password (String, bcrypt hashed)
- role (String: admin, instructor, student, content_creator)
- avatar (String)
- bio (String)
- phone (String)
- isActive (Boolean)
- enrolledCourses (Array of Course IDs)
- createdCourses (Array of Course IDs)

### Course Schema
- title (String)
- description (String)
- instructor (User ID)
- category (String)
- thumbnail (String)
- level (String: beginner, intermediate, advanced)
- price (Number)
- isPaid (Boolean)
- isPublished (Boolean)
- totalEnrollments (Number)
- rating (Number 0-5)
- duration (Number in hours)
- materials (Array of Material IDs)
- modules (Array of Module IDs)

### Module Schema
- courseId (Course ID)
- title (String)
- description (String)
- order (Number)
- lessons (Array of Lesson IDs)

### Lesson Schema
- moduleId (Module ID)
- title (String)
- description (String)
- content (String)
- videoUrl (String)
- duration (Number in minutes)
- order (Number)
- resources (Array of URLs)

### Assignment Schema
- courseId (Course ID)
- title (String)
- description (String)
- dueDate (Date)
- maxScore (Number)
- createdBy (User ID)
- submissions (Array of submission objects)

### Enrollment Schema
- studentId (User ID)
- courseId (Course ID)
- enrollmentDate (Date)
- progressPercentage (Number)
- completedLessons (Array of Lesson IDs)
- isCompleted (Boolean)
- completionDate (Date)
- certificateUrl (String)

## Testing API Endpoints

Use Postman or curl to test endpoints.

### Example: Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Example: Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## Environment Variables Explained

- **MONGODB_URI**: Connection string to MongoDB database
- **JWT_SECRET**: Secret key for JWT token generation
- **JWT_EXPIRY**: Token expiration time (e.g., 7d for 7 days)
- **NODE_ENV**: Environment (development/production)
- **PORT**: Server port
- **FRONTEND_URL**: Frontend URL for CORS configuration

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify MongoDB credentials if using Atlas

### Port Already in Use
- Change PORT in .env file
- Kill process using the port: `lsof -i :5000` (macOS/Linux)

### JWT Token Error
- Check JWT_SECRET is set correctly
- Ensure token is included in Authorization header as `Bearer <token>`
