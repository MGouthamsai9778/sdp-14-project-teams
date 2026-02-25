# API Documentation

## Authentication Endpoints

### Register User
**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Login
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Get User Profile
**Endpoint:** `GET /api/auth/profile`
**Auth Required:** Yes

**Response (200):**
```json
{
  "message": "User profile retrieved",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "student",
    "bio": "Student Bio",
    "enrolledCourses": ["course_id_1", "course_id_2"]
  }
}
```

### Update User Profile
**Endpoint:** `PUT /api/auth/profile`
**Auth Required:** Yes

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated Bio",
  "phone": "123-456-7890"
}
```

---

## Course Endpoints

### Get All Courses
**Endpoint:** `GET /api/courses`

**Query Parameters:**
- `category` (optional) - Filter by category
- `level` (optional) - Filter by level (beginner, intermediate, advanced)
- `search` (optional) - Search by title or description

**Response (200):**
```json
{
  "message": "Courses retrieved",
  "courses": [
    {
      "_id": "course_id",
      "title": "React Basics",
      "description": "Learn React fundamentals",
      "category": "Programming",
      "level": "beginner",
      "price": 29.99,
      "isPaid": true,
      "isPublished": true,
      "rating": 4.5,
      "instructor": {
        "_id": "instructor_id",
        "firstName": "Jane",
        "lastName": "Smith"
      }
    }
  ],
  "count": 5
}
```

### Get Course Details
**Endpoint:** `GET /api/courses/:id`

**Response (200):**
```json
{
  "message": "Course retrieved",
  "course": {
    "_id": "course_id",
    "title": "React Basics",
    "description": "Learn React fundamentals",
    "category": "Programming",
    "level": "beginner",
    "price": 29.99,
    "totalEnrollments": 150,
    "rating": 4.5,
    "duration": 10,
    "modules": [...]
  }
}
```

### Create Course
**Endpoint:** `POST /api/courses`
**Auth Required:** Yes (Instructor or Content Creator)

**Request Body:**
```json
{
  "title": "React Basics",
  "description": "Learn React fundamentals",
  "category": "Programming",
  "level": "beginner",
  "price": 29.99,
  "isPaid": true
}
```

### Update Course
**Endpoint:** `PUT /api/courses/:id`
**Auth Required:** Yes (Course Instructor)

**Request Body:**
```json
{
  "title": "React Basics Updated",
  "description": "Updated description",
  "category": "Programming"
}
```

### Publish Course
**Endpoint:** `PUT /api/courses/:id/publish`
**Auth Required:** Yes (Course Instructor)

**Response (200):**
```json
{
  "message": "Course published successfully",
  "course": {
    "isPublished": true
  }
}
```

### Delete Course
**Endpoint:** `DELETE /api/courses/:id`
**Auth Required:** Yes (Course Instructor)

---

## Enrollment Endpoints

### Enroll in Course
**Endpoint:** `POST /api/enrollments/enroll`
**Auth Required:** Yes (Student)

**Request Body:**
```json
{
  "courseId": "course_id"
}
```

**Response (201):**
```json
{
  "message": "Enrolled successfully",
  "enrollment": {
    "_id": "enrollment_id",
    "studentId": "student_id",
    "courseId": "course_id",
    "enrollmentDate": "2024-01-15T10:00:00Z",
    "progressPercentage": 0
  }
}
```

### Get My Courses
**Endpoint:** `GET /api/enrollments/my-courses`
**Auth Required:** Yes (Student)

**Response (200):**
```json
{
  "message": "Courses retrieved",
  "courses": [
    {
      "enrollmentDate": "2024-01-15T10:00:00Z",
      "progressPercentage": 25,
      "courseId": {...}
    }
  ]
}
```

### Get Enrollment Progress
**Endpoint:** `GET /api/enrollments/:courseId/progress`
**Auth Required:** Yes (Student)

**Response (200):**
```json
{
  "message": "Enrollment progress retrieved",
  "enrollment": {
    "progressPercentage": 50,
    "completedLessons": ["lesson_id_1", "lesson_id_2"],
    "isCompleted": false
  }
}
```

### Mark Lesson Complete
**Endpoint:** `PUT /api/enrollments/mark-complete`
**Auth Required:** Yes (Student)

**Request Body:**
```json
{
  "courseId": "course_id",
  "lessonId": "lesson_id"
}
```

### Get Course Students
**Endpoint:** `GET /api/enrollments/:courseId/students`
**Auth Required:** Yes (Instructor)

**Response (200):**
```json
{
  "message": "Students retrieved",
  "students": [
    {
      "studentId": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "enrollmentDate": "2024-01-15T10:00:00Z",
      "progressPercentage": 50
    }
  ],
  "count": 10
}
```

---

## Assignment Endpoints

### Create Assignment
**Endpoint:** `POST /api/assignments`
**Auth Required:** Yes (Instructor)

**Request Body:**
```json
{
  "courseId": "course_id",
  "title": "Assignment 1",
  "description": "Complete the following tasks",
  "dueDate": "2024-02-15T23:59:59Z",
  "maxScore": 100
}
```

### Get Assignment Submissions
**Endpoint:** `GET /api/assignments/:assignmentId/submissions`
**Auth Required:** Yes (Instructor)

**Response (200):**
```json
{
  "message": "Submissions retrieved",
  "submissions": [
    {
      "studentId": "student_id",
      "submissionDate": "2024-02-10T15:30:00Z",
      "content": "My submission",
      "score": 85,
      "isGraded": true
    }
  ]
}
```

### Submit Assignment
**Endpoint:** `POST /api/assignments/:assignmentId/submit`
**Auth Required:** Yes (Student)

**Request Body:**
```json
{
  "content": "My assignment submission",
  "fileUrl": "path/to/file.pdf"
}
```

### Grade Assignment
**Endpoint:** `PUT /api/assignments/:assignmentId/grade`
**Auth Required:** Yes (Instructor)

**Request Body:**
```json
{
  "submissionIndex": 0,
  "score": 85,
  "feedback": "Great work!"
}
```

---

## Admin Endpoints

### Get All Users
**Endpoint:** `GET /api/admin/users`
**Auth Required:** Yes (Admin)

**Query Parameters:**
- `role` (optional) - Filter by role
- `search` (optional) - Search by name or email

**Response (200):**
```json
{
  "message": "Users retrieved",
  "users": [
    {
      "_id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "role": "student",
      "isActive": true
    }
  ],
  "count": 50
}
```

### Change User Role
**Endpoint:** `PUT /api/admin/users/role`
**Auth Required:** Yes (Admin)

**Request Body:**
```json
{
  "userId": "user_id",
  "newRole": "instructor"
}
```

### Deactivate User
**Endpoint:** `PUT /api/admin/users/:userId/deactivate`
**Auth Required:** Yes (Admin)

**Response (200):**
```json
{
  "message": "User deactivated successfully",
  "user": {
    "isActive": false
  }
}
```

### Get Platform Statistics
**Endpoint:** `GET /api/admin/stats`
**Auth Required:** Yes (Admin)

**Response (200):**
```json
{
  "message": "Platform statistics retrieved",
  "stats": {
    "totalUsers": 150,
    "instructors": 10,
    "students": 135,
    "contentCreators": 5,
    "totalCourses": 20,
    "publishedCourses": 18,
    "totalEnrollments": 300
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Invalid input"
}
```

### 401 Unauthorized
```json
{
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "message": "You do not have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "message": "Course not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal Server Error",
  "error": "error details"
}
```

---

## Authentication Header

All protected endpoints require JWT token in Authorization header:

```
Authorization: Bearer <jwt_token>
```

## CORS Configuration

Frontend requests are allowed from `FRONTEND_URL` environment variable.
