const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    questions: [
      {
        question: String,
        type: {
          type: String,
          enum: ['multiple_choice', 'true_false', 'short_answer'],
        },
        options: [String],
        correctAnswer: String,
        points: Number,
      },
    ],
    totalPoints: {
      type: Number,
      default: 0,
    },
    passingScore: {
      type: Number,
      default: 70,
    },
    timeLimit: {
      type: Number, // in minutes
      default: 30,
    },
    attempts: {
      type: Number,
      default: 1,
    },
    results: [
      {
        studentId: mongoose.Schema.Types.ObjectId,
        score: Number,
        attemptNumber: Number,
        submittedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quiz', quizSchema);
