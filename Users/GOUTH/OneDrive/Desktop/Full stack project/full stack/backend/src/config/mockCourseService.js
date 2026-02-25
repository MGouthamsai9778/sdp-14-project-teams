// In-memory course storage for development/testing without MongoDB
// Sample courses are pre-loaded

const courses = [
  {
    _id: 'course-001',
    title: 'Introduction to Web Development',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Perfect for beginners.',
    instructor: { _id: 'instructor-001', firstName: 'Jane', lastName: 'Smith', email: 'jane@lms.com' },
    category: 'Web Development',
    thumbnail: 'https://via.placeholder.com/300x200?text=Web+Dev',
    level: 'beginner',
    price: 0,
    isPaid: false,
    isPublished: true,
    totalEnrollments: 245,
    rating: 4.8,
    duration: 30,
    materials: ['HTML Basics', 'CSS Styling', 'JavaScript Fundamentals'],
    modules: [],
    prerequisites: [],
    createdAt: new Date('2025-01-15'),
  },
  {
    _id: 'course-002',
    title: 'Backend Development with Node.js',
    description: 'Master backend development using Node.js and Express. Build scalable server applications.',
    instructor: { _id: 'instructor-002', firstName: 'John', lastName: 'Developer', email: 'john@lms.com' },
    category: 'Backend',
    thumbnail: 'https://via.placeholder.com/300x200?text=Node.js',
    level: 'intermediate',
    price: 49.99,
    isPaid: true,
    isPublished: true,
    totalEnrollments: 156,
    rating: 4.9,
    duration: 40,
    materials: ['Express.js', 'REST APIs', 'Database Design'],
    modules: [],
    prerequisites: ['Introduction to Web Development'],
    createdAt: new Date('2025-02-01'),
  },
  {
    _id: 'course-003',
    title: 'React.js Masterclass',
    description: 'Build modern interactive UIs with React. Learn hooks, state management, and component design.',
    instructor: { _id: 'instructor-003', firstName: 'Sarah', lastName: 'Frontend', email: 'sarah@lms.com' },
    category: 'Frontend',
    thumbnail: 'https://via.placeholder.com/300x200?text=React',
    level: 'intermediate',
    price: 59.99,
    isPaid: true,
    isPublished: true,
    totalEnrollments: 423,
    rating: 4.7,
    duration: 35,
    materials: ['Components', 'Hooks', 'State Management', 'Routing'],
    modules: [],
    prerequisites: ['Introduction to Web Development'],
    createdAt: new Date('2025-01-20'),
  },
  {
    _id: 'course-004',
    title: 'Database Design & SQL',
    description: 'Learn database fundamentals, SQL queries, and database design patterns.',
    instructor: { _id: 'instructor-004', firstName: 'Mike', lastName: 'Data', email: 'mike@lms.com' },
    category: 'Database',
    thumbnail: 'https://via.placeholder.com/300x200?text=SQL',
    level: 'beginner',
    price: 0,
    isPaid: false,
    isPublished: true,
    totalEnrollments: 312,
    rating: 4.6,
    duration: 25,
    materials: ['SQL Basics', 'Queries', 'Database Design', 'Optimization'],
    modules: [],
    prerequisites: [],
    createdAt: new Date('2025-02-05'),
  },
  {
    _id: 'course-005',
    title: 'Python for Data Science',
    description: 'Explore data science with Python. Learn pandas, numpy, and data visualization.',
    instructor: { _id: 'instructor-005', firstName: 'Alex', lastName: 'Science', email: 'alex@lms.com' },
    category: 'Data Science',
    thumbnail: 'https://via.placeholder.com/300x200?text=Python',
    level: 'intermediate',
    price: 79.99,
    isPaid: true,
    isPublished: true,
    totalEnrollments: 189,
    rating: 4.9,
    duration: 45,
    materials: ['Pandas', 'NumPy', 'Visualization', 'Machine Learning Basics'],
    modules: [],
    prerequisites: [],
    createdAt: new Date('2025-01-25'),
  },
  {
    _id: 'course-006',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps with React Native for iOS and Android.',
    instructor: { _id: 'instructor-003', firstName: 'Sarah', lastName: 'Frontend', email: 'sarah@lms.com' },
    category: 'Mobile',
    thumbnail: 'https://via.placeholder.com/300x200?text=Mobile',
    level: 'advanced',
    price: 89.99,
    isPaid: true,
    isPublished: true,
    totalEnrollments: 98,
    rating: 4.8,
    duration: 40,
    materials: ['React Native', 'Mobile UI', 'Platform APIs', 'Deployment'],
    modules: [],
    prerequisites: ['React.js Masterclass'],
    createdAt: new Date('2025-02-10'),
  },
  {
    _id: 'course-007',
    title: 'Cloud Deployment with AWS',
    description: 'Deploy applications on AWS. Learn EC2, S3, databases, and scaling.',
    instructor: { _id: 'instructor-002', firstName: 'John', lastName: 'Developer', email: 'john@lms.com' },
    category: 'Cloud',
    thumbnail: 'https://via.placeholder.com/300x200?text=AWS',
    level: 'advanced',
    price: 69.99,
    isPaid: true,
    isPublished: true,
    totalEnrollments: 145,
    rating: 4.7,
    duration: 30,
    materials: ['EC2', 'S3', 'RDS', 'Scaling', 'Monitoring'],
    modules: [],
    prerequisites: ['Backend Development with Node.js'],
    createdAt: new Date('2025-02-08'),
  },
  {
    _id: 'course-008',
    title: 'Full Stack Development Bootcamp',
    description: 'Complete full stack development course. Frontend, backend, database, and deployment.',
    instructor: { _id: 'instructor-001', firstName: 'Jane', lastName: 'Smith', email: 'jane@lms.com' },
    category: 'Full Stack',
    thumbnail: 'https://via.placeholder.com/300x200?text=Full+Stack',
    level: 'advanced',
    price: 129.99,
    isPaid: true,
    isPublished: true,
    totalEnrollments: 567,
    rating: 4.9,
    duration: 60,
    materials: ['Frontend', 'Backend', 'Database', 'Deployment', 'Best Practices'],
    modules: [],
    prerequisites: [],
    createdAt: new Date('2025-01-10'),
  },
];

class MockCourseService {
  // Find all courses with optional filters
  static find(query = {}) {
    let filtered = [...courses];

    if (query.isPublished) {
      filtered = filtered.filter(c => c.isPublished === query.isPublished);
    }

    if (query.category) {
      filtered = filtered.filter(c => 
        c.category.toLowerCase().includes(query.category.toLowerCase())
      );
    }

    if (query.level) {
      filtered = filtered.filter(c => c.level === query.level);
    }

    if (query.search) {
      const search = query.search.toLowerCase();
      filtered = filtered.filter(c => 
        c.title.toLowerCase().includes(search) || 
        c.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  }

  // Find single course by ID
  static findById(id) {
    return courses.find(c => c._id === id);
  }

  // Find one with query
  static findOne(query = {}) {
    if (query._id) {
      return this.findById(query._id);
    }
    const results = this.find(query);
    return results.length > 0 ? results[0] : null;
  }

  // Create new course
  static create(courseData) {
    const newCourse = {
      _id: 'course-' + Math.random().toString(36).substring(7),
      ...courseData,
      totalEnrollments: 0,
      rating: 0,
      createdAt: new Date(),
      isPublished: false,
    };
    courses.push(newCourse);
    return newCourse;
  }

  // Update course
  static findByIdAndUpdate(id, updateData) {
    const course = this.findById(id);
    if (course) {
      Object.assign(course, updateData);
      return course;
    }
    return null;
  }

  // Delete course
  static findByIdAndDelete(id) {
    const index = courses.findIndex(c => c._id === id);
    if (index > -1) {
      return courses.splice(index, 1)[0];
    }
    return null;
  }

  // Count documents
  static countDocuments(query = {}) {
    return this.find(query).length;
  }

  // Publish course
  static publishCourse(id) {
    const course = this.findById(id);
    if (course) {
      course.isPublished = true;
      return course;
    }
    return null;
  }
}

module.exports = MockCourseService;
