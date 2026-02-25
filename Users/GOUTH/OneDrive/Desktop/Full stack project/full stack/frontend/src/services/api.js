import apiClient from '../api/apiClient';

export const authService = {
  register: async (firstName, lastName, email, password, role = 'student') => {
    const response = await apiClient.post('/auth/register', {
      firstName,
      lastName,
      email,
      password,
      role,
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await apiClient.put('/auth/profile', userData);
    return response.data;
  },
};

export const courseService = {
  getAllCourses: async (filters = {}) => {
    const response = await apiClient.get('/courses', { params: filters });
    return response.data;
  },

  getCourseById: async (id) => {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await apiClient.post('/courses', courseData);
    return response.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await apiClient.put(`/courses/${id}`, courseData);
    return response.data;
  },

  deleteCourse: async (id) => {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
  },

  publishCourse: async (id) => {
    const response = await apiClient.put(`/courses/${id}/publish`);
    return response.data;
  },
};

export const enrollmentService = {
  enrollCourse: async (courseId) => {
    const response = await apiClient.post('/enrollments/enroll', { courseId });
    return response.data;
  },

  getMyCourses: async () => {
    const response = await apiClient.get('/enrollments/my-courses');
    return response.data;
  },

  getProgress: async (courseId) => {
    const response = await apiClient.get(`/enrollments/${courseId}/progress`);
    return response.data;
  },

  markLessonComplete: async (courseId, lessonId) => {
    const response = await apiClient.put('/enrollments/mark-complete', {
      courseId,
      lessonId,
    });
    return response.data;
  },

  getStudentsInCourse: async (courseId) => {
    const response = await apiClient.get(`/enrollments/${courseId}/students`);
    return response.data;
  },
};

export const assignmentService = {
  createAssignment: async (assignmentData) => {
    const response = await apiClient.post('/assignments', assignmentData);
    return response.data;
  },

  getAssignmentsByCourse: async (courseId) => {
    const response = await apiClient.get(`/assignments/course/${courseId}`);
    return response.data;
  },

  submitAssignment: async (assignmentId, submissionData) => {
    const response = await apiClient.post(`/assignments/${assignmentId}/submit`, submissionData);
    return response.data;
  },

  gradeAssignment: async (assignmentId, gradingData) => {
    const response = await apiClient.put(`/assignments/${assignmentId}/grade`, gradingData);
    return response.data;
  },

  getSubmissions: async (assignmentId) => {
    const response = await apiClient.get(`/assignments/${assignmentId}/submissions`);
    return response.data;
  },
};

export const adminService = {
  getAllUsers: async (filters = {}) => {
    const response = await apiClient.get('/admin/users', { params: filters });
    return response.data;
  },

  changeUserRole: async (userId, newRole) => {
    const response = await apiClient.put('/admin/users/role', {
      userId,
      newRole,
    });
    return response.data;
  },

  deactivateUser: async (userId) => {
    const response = await apiClient.put(`/admin/users/${userId}/deactivate`);
    return response.data;
  },

  getPlatformStats: async () => {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  },
};
