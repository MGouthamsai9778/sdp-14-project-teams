const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');
const MockEnrollmentService = require('../config/mockEnrollmentService');
const MockCourseService = require('../config/mockCourseService');
const MockUserService = require('../config/mockUserService');

// Enroll in course
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const studentId = req.user.userId;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    let existingEnrollment = null;
    let enrollment = null;

    // Try real database first
    try {
      existingEnrollment = await Enrollment.findOne({ studentId, courseId });
      if (existingEnrollment) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }

      enrollment = new Enrollment({ studentId, courseId });
      await enrollment.save();

      await User.findByIdAndUpdate(studentId, {
        $push: { enrolledCourses: courseId },
      });

      await Course.findByIdAndUpdate(courseId, {
        $inc: { totalEnrollments: 1 },
      });
    } catch (dbError) {
      // Fallback to mock service
      existingEnrollment = MockEnrollmentService.findOne({ studentId, courseId });
      if (existingEnrollment) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }

      enrollment = MockEnrollmentService.create({ studentId, courseId });

      // Update mock user enrolled courses
      const user = MockUserService.findById(studentId);
      if (user && !user.enrolledCourses) {
        user.enrolledCourses = [];
      }
      if (user && !user.enrolledCourses.includes(courseId)) {
        user.enrolledCourses.push(courseId);
      }

      // Update mock course enrollments
      const course = MockCourseService.findById(courseId);
      if (course) {
        course.totalEnrollments = (course.totalEnrollments || 0) + 1;
      }
    }

    res.status(201).json({
      message: 'Enrolled successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in course', error: error.message });
  }
};

// Get my courses
const getMyCourses = async (req, res) => {
  try {
    let enrollments = null;

    // Try real database first
    try {
      enrollments = await Enrollment.find({ studentId: req.user.userId })
        .populate('courseId')
        .sort({ enrollmentDate: -1 });
    } catch (dbError) {
      // Fallback to mock service
      enrollments = MockEnrollmentService.find({ studentId: req.user.userId });
      
      // Populate course data for mock enrollments
      enrollments = enrollments.map(e => ({
        ...e,
        courseId: MockCourseService.findById(e.courseId),
      }));
    }

    res.json({
      message: 'Courses retrieved',
      courses: enrollments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving courses', error: error.message });
  }
};

// Get enrollment progress
const getEnrollmentProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({
      studentId: req.user.userId,
      courseId,
    }).populate('courseId');

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({
      message: 'Enrollment progress retrieved',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving progress', error: error.message });
  }
};

// Mark lesson as complete
const markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;

    const enrollment = await Enrollment.findOne({
      studentId: req.user.userId,
      courseId,
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    // Calculate progress percentage
    const course = await Course.findById(courseId).populate('modules');
    let totalLessons = 0;
    course.modules.forEach((module) => {
      totalLessons += module.lessons.length;
    });

    enrollment.progressPercentage = Math.round(
      (enrollment.completedLessons.length / totalLessons) * 100
    );

    await enrollment.save();

    res.json({
      message: 'Lesson marked as complete',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error marking lesson complete', error: error.message });
  }
};

// Get students in course
const getStudentsInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollments = await Enrollment.find({ courseId })
      .populate('studentId', 'firstName lastName email')
      .sort({ enrollmentDate: -1 });

    res.json({
      message: 'Students retrieved',
      students: enrollments,
      count: enrollments.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving students', error: error.message });
  }
};

module.exports = {
  enrollCourse,
  getMyCourses,
  getEnrollmentProgress,
  markLessonComplete,
  getStudentsInCourse,
};
