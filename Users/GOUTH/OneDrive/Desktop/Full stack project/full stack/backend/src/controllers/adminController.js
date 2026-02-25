const User = require('../models/User');

// Get all users (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    const filter = {};

    if (role) filter.role = role;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter).select('-password');

    res.json({
      message: 'Users retrieved',
      users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error: error.message });
  }
};

// Change user role (Admin only)
const changeUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    const validRoles = ['admin', 'instructor', 'student', 'content_creator'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true }).select(
      '-password'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User role updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user role', error: error.message });
  }
};

// Deactivate user (Admin only)
const deactivateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true }).select(
      '-password'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User deactivated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error deactivating user', error: error.message });
  }
};

// Get platform statistics (Admin only)
const getPlatformStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const instructors = await User.countDocuments({ role: 'instructor' });
    const students = await User.countDocuments({ role: 'student' });
    const contentCreators = await User.countDocuments({ role: 'content_creator' });

    const Course = require('../models/Course');
    const totalCourses = await Course.countDocuments();
    const publishedCourses = await Course.countDocuments({ isPublished: true });

    const Enrollment = require('../models/Enrollment');
    const totalEnrollments = await Enrollment.countDocuments();

    res.json({
      message: 'Platform statistics retrieved',
      stats: {
        totalUsers,
        instructors,
        students,
        contentCreators,
        totalCourses,
        publishedCourses,
        totalEnrollments,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving statistics', error: error.message });
  }
};

module.exports = {
  getAllUsers,
  changeUserRole,
  deactivateUser,
  getPlatformStats,
};
