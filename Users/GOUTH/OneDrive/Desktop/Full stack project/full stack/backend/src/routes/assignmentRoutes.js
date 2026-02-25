const express = require('express');
const {
  createAssignment,
  getAssignmentsByCourse,
  submitAssignment,
  gradeAssignment,
  getAssignmentSubmissions,
} = require('../controllers/assignmentController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('instructor'), createAssignment);
router.get('/course/:courseId', authMiddleware, getAssignmentsByCourse);
router.post('/:assignmentId/submit', authMiddleware, roleMiddleware('student'), submitAssignment);
router.put('/:assignmentId/grade', authMiddleware, roleMiddleware('instructor'), gradeAssignment);
router.get('/:assignmentId/submissions', authMiddleware, roleMiddleware('instructor'), getAssignmentSubmissions);

module.exports = router;
