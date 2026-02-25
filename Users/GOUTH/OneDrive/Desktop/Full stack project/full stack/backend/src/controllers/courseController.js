const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Enrollment = require('../models/Enrollment');
const MockCourseService = require('../config/mockCourseService');
const MockMaterialService = require('../config/mockMaterialService');
const MockQuizService = require('../config/mockQuizService');

// Create course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, level, price, isPaid } = req.body;

    const course = new Course({
      title,
      description,
      category,
      level,
      price,
      isPaid,
      instructor: req.user.userId,
    });

    await course.save();

    res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error: error.message });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const { category, level, search } = req.query;
    let courses = null;

    // Try real database first
    try {
      const filter = { isPublished: true };

      if (category) filter.category = category;
      if (level) filter.level = level;
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      courses = await Course.find(filter)
        .populate('instructor', 'firstName lastName email')
        .sort({ createdAt: -1 });
    } catch (dbError) {
      // Fallback to mock service
      console.log('Using mock course service');
      const filter = { isPublished: true };
      if (category) filter.category = category;
      if (level) filter.level = level;
      if (search) filter.search = search;

      courses = MockCourseService.find(filter);
    }

    res.json({
      message: 'Courses retrieved',
      courses,
      count: courses.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error: error.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    let course = null;

    // Try real database first
    try {
      course = await Course.findById(req.params.id)
        .populate('instructor', 'firstName lastName email bio')
        .populate('modules')
        .populate('materials');
    } catch (dbError) {
      // Fallback to mock service
      course = MockCourseService.findById(req.params.id);
    }

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Add materials and quizzes from mock service
    const materials = MockMaterialService.getByCourse(req.params.id);
    const quizzes = MockQuizService.find({ courseId: req.params.id });

    res.json({
      message: 'Course retrieved',
      course: {
        ...course.toObject ? course.toObject() : course,
        materials,
        quizzes: quizzes.map(q => ({
          _id: q._id,
          title: q.title,
          description: q.description,
          totalPoints: q.totalPoints,
          passingScore: q.passingScore,
          timeLimit: q.timeLimit,
          attempsAllowed: q.attempsAllowed,
          questionCount: q.questions.length,
        })),
        stats: {
          materialCount: materials.length,
          quizCount: quizzes.length,
        }
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course', error: error.message });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const { title, description, category, level, price, isPaid, thumbnail } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only update your own courses' });
    }

    Object.assign(course, { title, description, category, level, price, isPaid, thumbnail });
    await course.save();

    res.json({
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error: error.message });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only delete your own courses' });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Course deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};

// Publish course
const publishCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'You can only publish your own courses' });
    }

    course.isPublished = true;
    await course.save();

    res.json({
      message: 'Course published successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error publishing course', error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  publishCourse,
};
