const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const {
  getQuizzesByCourse,
  getQuizById,
  submitQuiz,
  getQuizResults,
} = require('../controllers/quizController');

const router = express.Router();

// Get all quizzes for a course
router.get('/course/:courseId', authMiddleware, getQuizzesByCourse);

// Get single quiz
router.get('/:quizId', authMiddleware, getQuizById);

// Submit quiz answers
router.post('/:quizId/submit', authMiddleware, submitQuiz);

// Get quiz results for student
router.get('/:quizId/results', authMiddleware, getQuizResults);

module.exports = router;
