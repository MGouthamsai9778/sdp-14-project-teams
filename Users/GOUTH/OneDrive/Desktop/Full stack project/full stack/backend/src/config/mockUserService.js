// In-memory user storage for development/testing without MongoDB
// This is temporary - once MongoDB is set up, it will use the real database

const users = [];

class MockUserService {
  // Find user by email
  static findOne(query) {
    if (query.email) {
      return users.find(u => u.email === query.email);
    }
    return null;
  }

  // Find user by ID
  static findById(id) {
    return users.find(u => u._id === id);
  }

  // Create new user
  static create(userData) {
    const newUser = {
      _id: Math.random().toString(36).substring(7),
      ...userData,
      createdAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  }

  // Get all users
  static find(query = {}) {
    return users.filter(u => {
      if (query.role) return u.role === query.role;
      return true;
    });
  }

  // Update user
  static findByIdAndUpdate(id, updateData) {
    const user = users.find(u => u._id === id);
    if (user) {
      Object.assign(user, updateData);
      return user;
    }
    return null;
  }
}

module.exports = MockUserService;
