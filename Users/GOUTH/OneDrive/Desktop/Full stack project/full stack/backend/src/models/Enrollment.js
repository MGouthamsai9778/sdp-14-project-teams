const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    progressPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    completedLessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson',
      },
    ],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completionDate: {
      type: Date,
      default: null,
    },
    certificateUrl: {
      type: String,
      default: null,
    },
    quiz_scores: [
      {
        quizId: mongoose.Schema.Types.ObjectId,
        score: Number,
        attemptDate: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Enrollment', enrollmentSchema);
