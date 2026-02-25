const User = require('../models/User');
const MockUserService = require('../config/mockUserService');
const { generateToken } = require('../config/jwt');
const bcrypt = require('bcryptjs');

let dbConnected = false;

// Register
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    let userExists = null;
    let user = null;

    // Try using real database first
    try {
      userExists = await User.findOne({ email });
      dbConnected = true;
    } catch (dbError) {
      // Fallback to mock service
      dbConnected = false;
      userExists = MockUserService.findOne({ email });
    }

    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    if (dbConnected) {
      // Use real database
      user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || 'student',
      });
      await user.save();
    } else {
      // Use mock service
      user = MockUserService.create({
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
        role: role || 'student',
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message: dbConnected 
        ? 'User registered successfully' 
        : 'User registered (using temporary storage - set up MongoDB for persistence)',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration', error: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    let user = null;
    let isPasswordValid = false;

    // Try real database first
    try {
      user = await User.findOne({ email });
      if (user) {
        isPasswordValid = await user.comparePassword(password);
      } else {
        // Try mock service
        user = MockUserService.findOne({ email });
        if (user) {
          isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        }
      }
    } catch (dbError) {
      // Fallback to mock service
      user = MockUserService.findOne({ email });
      if (user) {
        isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      }
    }

    if (!user || !isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User profile retrieved',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving profile', error: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, bio, phone, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { firstName, lastName, bio, phone, avatar },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
};
