const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getMaterialsByCourse,
  getMaterialById,
  getMaterialsByModule,
  getCourseContent,
} = require('../controllers/materialController');

const router = express.Router();

// Get all materials for a course
router.get('/course/:courseId', authMiddleware, getMaterialsByCourse);

// Get course content (materials + quizzes + structure)
router.get('/course/:courseId/content', authMiddleware, getCourseContent);

// Get materials by module
router.get('/course/:courseId/module/:module', authMiddleware, getMaterialsByModule);

// Get single material
router.get('/:materialId', authMiddleware, getMaterialById);

module.exports = router;
