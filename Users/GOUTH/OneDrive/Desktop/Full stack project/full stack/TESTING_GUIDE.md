# Testing Guide for LMS

## Test Accounts

### Admin Account
```
Email: admin@lms.com
Password: admin123
Role: admin
```

### Instructor Accounts
```
Email: instructor@lms.com
Password: instructor123
Role: instructor

Email: teacher@lms.com
Password: teacher123
Role: instructor
```

### Content Creator Accounts
```
Email: creator@lms.com
Password: creator123
Role: content_creator
```

### Student Accounts
```
Email: student1@lms.com
Password: student123
Role: student

Email: student2@lms.com
Password: student123
Role: student
```

## Testing Workflows

### 1. User Registration and Login Flow
1. Go to http://localhost:3000/register
2. Fill in registration form with new user details
3. Select role (Student, Instructor, Content Creator)
4. Submit form
5. Redirect to login page
6. Login with registered account

### 2. Course Creation Flow (as Instructor)
1. Login as instructor
2. Navigate to "Create Course" link
3. Fill course details:
   - Title
   - Description
   - Category
   - Level
   - Price (optional)
4. Submit form
5. Course should be created

### 3. Course Discovery and Enrollment Flow (as Student)
1. Login as student
2. View dashboard with available courses
3. Click "Enroll" button on any course
4. Should be added to enrolled courses list

### 4. Admin Panel Access
1. Login as admin user
2. Navigate to Admin link
3. View platform statistics:
   - Total users
   - Total courses
   - Total enrollments
4. View users management table

### 5. Profile Management
1. Login as any user
2. Click "Profile" link
3. View profile information
4. Update profile (name, bio, phone)
5. Changes should be saved

## API Testing with cURL

### Register New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "test123",
    "role": "student"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

### Create Course (requires token)
```bash
curl -X POST http://localhost:5000/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Test Course",
    "description": "A test course",
    "category": "Testing",
    "level": "beginner",
    "price": 0,
    "isPaid": false
  }'
```

### Get All Courses
```bash
curl http://localhost:5000/api/courses
```

### Enroll in Course (requires token)
```bash
curl -X POST http://localhost:5000/api/enrollments/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "courseId": "COURSE_ID"
  }'
```

### Get Platform Statistics (admin only)
```bash
curl http://localhost:5000/api/admin/stats \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

## Database Testing

### Check Database Connection
```javascript
// In backend server, check console output
// Should show: "MongoDB Connected: your_host"
```

### Create Test Data
Connect to MongoDB directly and insert test users:

```javascript
db.users.insertMany([
  {
    firstName: "Admin",
    lastName: "User",
    email: "admin@lms.com",
    password: "hashed_password",
    role: "admin"
  },
  {
    firstName: "Teacher",
    lastName: "Name",
    email: "teacher@lms.com",
    password: "hashed_password",
    role: "instructor"
  }
])
```

## Performance Testing

### Load Test Multiple Courses
1. Create 10+ test courses
2. Navigate to dashboard
3. Check page load time
4. Monitor browser network tab for API response times

### Concurrent User Test
1. Open multiple browser tabs
2. Login with different users
3. Perform actions simultaneously
4. Check for race conditions

## Error Testing

### Test 401 Unauthorized
- Access protected endpoint without token
- Should return: "No token provided"

### Test 403 Forbidden
- Login as student
- Try to create course
- Should return: "You do not have permission to access this resource"

### Test 404 Not Found
- Request non-existent course
- Should return: "Course not found"

### Test Invalid Credentials
- Login with wrong password
- Should return: "Invalid credentials"

## Browser DevTools Testing

1. **Console**: Check for JavaScript errors
2. **Network**: Monitor API calls and response times
3. **Application**: Verify JWT token is stored in localStorage
4. **Performance**: Check page load metrics

## Common Issues and Solutions

### Issue: Can't login
- Check credentials
- Verify backend is running
- Check REACT_APP_API_URL is correct

### Issue: Course not appearing after creation
- Refresh page
- Check if course is published
- Verify JWT token is valid

### Issue: Enrollment fails
- Check user is logged in
- Verify course ID is correct
- Check backend error logs

## Checklist for Full System Test

- [ ] User registration works
- [ ] User login works
- [ ] JWT token is stored
- [ ] Instructor can create courses
- [ ] Student can view courses
- [ ] Student can enroll in courses
- [ ] Admin can view platform stats
- [ ] User roles are enforced
- [ ] Protected routes redirect to login
- [ ] Profile updates work
- [ ] API errors handled gracefully
- [ ] Database transactions work correctly
- [ ] Performance is acceptable
- [ ] No console errors
- [ ] Responsive design works on mobile

## Next Steps

After testing, you can:
1. Add more features (modules, lessons, quizzes)
2. Implement video streaming
3. Add email notifications
4. Implement payment integration
5. Add discussion forums
6. Create mobile app
