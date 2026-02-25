const express = require('express');
const {
  enrollCourse,
  getMyCourses,
  getEnrollmentProgress,
  markLessonComplete,
  getStudentsInCourse,
} = require('../controllers/enrollmentController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/enroll', authMiddleware, roleMiddleware('student'), enrollCourse);
router.get('/my-courses', authMiddleware, roleMiddleware('student'), getMyCourses);
router.get('/:courseId/progress', authMiddleware, roleMiddleware('student'), getEnrollmentProgress);
router.put('/mark-complete', authMiddleware, roleMiddleware('student'), markLessonComplete);
router.get('/:courseId/students', authMiddleware, roleMiddleware('instructor'), getStudentsInCourse);

module.exports = router;
