const MockQuizService = require('../config/mockQuizService');
const MockCourseService = require('../config/mockCourseService');
const MockMaterialService = require('../config/mockMaterialService');

// Get all quizzes for a course
const getQuizzesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Verify course exists
    const course = MockCourseService.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Get all quizzes for the course
    const quizzes = MockQuizService.find({ courseId });

    res.json({
      message: 'Quizzes retrieved',
      quizzes,
      count: quizzes.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quizzes', error: error.message });
  }
};

// Get single quiz
const getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = MockQuizService.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({
      message: 'Quiz retrieved',
      quiz,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving quiz', error: error.message });
  }
};

// Submit quiz answers
const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;
    const studentId = req.user.userId;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers array is required' });
    }

    const quiz = MockQuizService.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    // Calculate score
    let score = 0;
    const feedback = [];

    quiz.questions.forEach((question, index) => {
      const studentAnswer = answers[index];
      const isCorrect = studentAnswer === question.correctAnswer;

      if (isCorrect) {
        score += question.points;
      }

      feedback.push({
        question: question.question,
        studentAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0,
      });
    });

    const passed = score >= quiz.passingScore;

    // Record the result
    MockQuizService.submitQuiz(quizId, studentId, answers, score);

    res.json({
      message: 'Quiz submitted successfully',
      score,
      totalPoints: quiz.totalPoints,
      percentage: Math.round((score / quiz.totalPoints) * 100),
      passed,
      passingScore: quiz.passingScore,
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting quiz', error: error.message });
  }
};

// Get quiz results for a student
const getQuizResults = async (req, res) => {
  try {
    const { quizId } = req.params;
    const studentId = req.user.userId;

    const results = MockQuizService.getQuizResults(quizId, studentId);

    res.json({
      message: 'Quiz results retrieved',
      results,
      attempts: results.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving results', error: error.message });
  }
};

module.exports = {
  getQuizzesByCourse,
  getQuizById,
  submitQuiz,
  getQuizResults,
};
