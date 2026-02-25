const express = require('express');
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  publishCourse,
} = require('../controllers/courseController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes
router.post('/', authMiddleware, roleMiddleware('instructor', 'content_creator'), createCourse);
router.put('/:id', authMiddleware, roleMiddleware('instructor', 'content_creator'), updateCourse);
router.delete('/:id', authMiddleware, roleMiddleware('instructor', 'content_creator'), deleteCourse);
router.put('/:id/publish', authMiddleware, roleMiddleware('instructor', 'content_creator'), publishCourse);

module.exports = router;
