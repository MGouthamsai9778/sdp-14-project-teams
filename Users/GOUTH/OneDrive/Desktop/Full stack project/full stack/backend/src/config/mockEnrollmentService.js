// In-memory enrollment storage for development/testing without MongoDB

const enrollments = [];

class MockEnrollmentService {
  // Find enrollments with query
  static find(query = {}) {
    let filtered = [...enrollments];

    if (query.studentId) {
      filtered = filtered.filter(e => e.studentId === query.studentId);
    }

    if (query.courseId) {
      filtered = filtered.filter(e => e.courseId === query.courseId);
    }

    return filtered;
  }

  // Find one enrollment
  static findOne(query = {}) {
    const results = this.find(query);
    return results.length > 0 ? results[0] : null;
  }

  // Create enrollment
  static create(enrollmentData) {
    const newEnrollment = {
      _id: 'enrollment-' + Math.random().toString(36).substring(7),
      ...enrollmentData,
      enrollmentDate: new Date(),
      progressPercentage: 0,
      completedLessons: [],
      isCompleted: false,
      certificateUrl: null,
      quiz_scores: [],
    };
    enrollments.push(newEnrollment);
    return newEnrollment;
  }

  // Find by ID
  static findById(id) {
    return enrollments.find(e => e._id === id);
  }

  // Update enrollment
  static findByIdAndUpdate(id, updateData) {
    const enrollment = this.findById(id);
    if (enrollment) {
      Object.assign(enrollment, updateData);
      return enrollment;
    }
    return null;
  }

  // Count documents
  static countDocuments(query = {}) {
    return this.find(query).length;
  }
}

module.exports = MockEnrollmentService;
