# Learning Management System (LMS)

A comprehensive full-stack Learning Management System designed to manage online education with support for multiple user roles, course creation, content management, and student progress tracking.

## Features

### Platform-wide Features
- User authentication and authorization
- Role-based access control
- Profile management
- Course discovery and browsing

### Admin Features
- Manage all platform users
- Change user roles
- View platform statistics
- Deactivate users
- Monitor system health

### Instructor Features
- Create and manage courses
- Add course modules and lessons
- Create assignments
- Grade student submissions
- View student progress
- Track course analytics

### Content Creator Features
- Develop course materials
- Update content
- Manage course structure
- Ensure educational quality

### Student Features
- Enroll in courses
- Access course materials
- Submit assignments
- Track learning progress
- View course grades
- Access certificates

## Project Structure

```
lms/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   ├── Module.js
│   │   │   ├── Lesson.js
│   │   │   ├── Assignment.js
│   │   │   ├── Enrollment.js
│   │   │   └── Quiz.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── courseController.js
│   │   │   ├── enrollmentController.js
│   │   │   ├── assignmentController.js
│   │   │   └── adminController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   ├── enrollmentRoutes.js
│   │   │   ├── assignmentRoutes.js
│   │   │   └── adminRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── jwt.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── apiClient.js
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   └── CourseCard.js
    │   ├── context/
    │   │   ├── AuthContext.js
    │   │   └── CourseContext.js
    │   ├── pages/
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Dashboard.js
    │   │   ├── CreateCourse.js
    │   │   └── Admin.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Navbar.css
    │   │   ├── CourseCard.css
    │   │   ├── Dashboard.css
    │   │   ├── Auth.css
    │   │   ├── CreateCourse.css
    │   │   └── Admin.css
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── public/
    │   └── index.html
    └── package.json
```

## Setup Instructions

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables:**
   Edit `.env` with your settings:
   ```
   MONGODB_URI=mongodb://localhost:27017/lms
   JWT_SECRET=your_secret_key_here
   JWT_EXPIRY=7d
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:3000
   ```

5. **Start MongoDB (if using local instance):**
   ```bash
   mongod
   ```

6. **Run backend server:**
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start frontend development server:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (auth required)
- `PUT /api/auth/profile` - Update user profile (auth required)

### Courses
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (instructor/content_creator)
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `PUT /api/courses/:id/publish` - Publish course

### Enrollments
- `POST /api/enrollments/enroll` - Enroll in course (student)
- `GET /api/enrollments/my-courses` - Get enrolled courses
- `GET /api/enrollments/:courseId/progress` - Get enrollment progress
- `PUT /api/enrollments/mark-complete` - Mark lesson as complete
- `GET /api/enrollments/:courseId/students` - Get course students

### Assignments
- `POST /api/assignments` - Create assignment (instructor)
- `GET /api/assignments/course/:courseId` - Get course assignments
- `POST /api/assignments/:assignmentId/submit` - Submit assignment
- `PUT /api/assignments/:assignmentId/grade` - Grade assignment
- `GET /api/assignments/:assignmentId/submissions` - Get submissions

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/role` - Change user role
- `PUT /api/admin/users/:userId/deactivate` - Deactivate user
- `GET /api/admin/stats` - Get platform statistics

## User Roles

### Admin
- Full platform access
- User management
- System settings
- Platform monitoring

### Instructor
- Create and manage courses
- Grade assignments
- View student progress
- Track course analytics

### Content Creator
- Develop course materials
- Update content
- Ensure educational quality
- Work alongside instructors

### Student
- Enroll in courses
- Access materials
- Submit assignments
- Track progress
- View certificates

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt for password hashing

### Frontend
- React.js
- React Router
- Axios
- Context API

## Future Enhancements

- Video streaming integration
- Live class functionality
- Certificate generation
- Payment integration
- Discussion forums
- Advanced analytics
- Mobile app
- Notifications system
- Email integration
- File upload system

## Contributing

Please follow the project structure and coding standards when contributing.

## License

This project is licensed under the MIT License.

## Support

For support, please create an issue in the repository or contact the development team.
