const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    moduleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
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
    content: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      default: null,
    },
    duration: {
      type: Number, // in minutes
      default: 0,
    },
    order: {
      type: Number,
      required: true,
    },
    resources: [
      {
        type: String, // URLs or file paths
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
