// Mock Materials/Resources Service - Academic PDFs and study materials

const materials = [
  {
    _id: 'material-001',
    courseId: 'course-001',
    title: 'HTML Complete Guide',
    type: 'pdf',
    description: 'Comprehensive guide to HTML5 with examples and best practices',
    fileUrl: 'https://example.com/pdfs/html-guide.pdf',
    fileSize: '2.5 MB',
    uploadedBy: 'Jane Smith',
    uploadedAt: new Date('2025-01-15'),
    module: 'HTML Basics',
    isPremium: false,
  },
  {
    _id: 'material-002',
    courseId: 'course-001',
    title: 'CSS Styling Masterclass',
    type: 'pdf',
    description: 'Advanced CSS techniques, flexbox, grid, and responsive design',
    fileUrl: 'https://example.com/pdfs/css-guide.pdf',
    fileSize: '3.1 MB',
    uploadedBy: 'Jane Smith',
    uploadedAt: new Date('2025-01-18'),
    module: 'CSS Styling',
    isPremium: false,
  },
  {
    _id: 'material-003',
    courseId: 'course-001',
    title: 'JavaScript Fundamentals',
    type: 'pdf',
    description: 'Learn JavaScript basics: variables, functions, loops, and DOM manipulation',
    fileUrl: 'https://example.com/pdfs/js-fundamentals.pdf',
    fileSize: '4.2 MB',
    uploadedBy: 'Jane Smith',
    uploadedAt: new Date('2025-01-20'),
    module: 'JavaScript Fundamentals',
    isPremium: false,
  },

  {
    _id: 'material-004',
    courseId: 'course-002',
    title: 'Node.js Architecture',
    type: 'pdf',
    description: 'Understanding Node.js architecture, event loop, and async programming',
    fileUrl: 'https://example.com/pdfs/nodejs-architecture.pdf',
    fileSize: '2.8 MB',
    uploadedBy: 'John Developer',
    uploadedAt: new Date('2025-02-01'),
    module: 'Node.js Basics',
    isPremium: false,
  },
  {
    _id: 'material-005',
    courseId: 'course-002',
    title: 'Express.js REST API Design',
    type: 'pdf',
    description: 'Building RESTful APIs with Express.js, routing, middleware, and error handling',
    fileUrl: 'https://example.com/pdfs/express-api-design.pdf',
    fileSize: '3.5 MB',
    uploadedBy: 'John Developer',
    uploadedAt: new Date('2025-02-03'),
    module: 'REST APIs',
    isPremium: false,
  },
  {
    _id: 'material-006',
    courseId: 'course-002',
    title: 'Database Design Best Practices',
    type: 'pdf',
    description: 'Designing efficient databases, normalization, and relationships',
    fileUrl: 'https://example.com/pdfs/database-design.pdf',
    fileSize: '2.3 MB',
    uploadedBy: 'John Developer',
    uploadedAt: new Date('2025-02-05'),
    module: 'Database Design',
    isPremium: true,
  },

  {
    _id: 'material-007',
    courseId: 'course-003',
    title: 'React Components Deep Dive',
    type: 'pdf',
    description: 'Understanding React components, lifecycles, and rendering',
    fileUrl: 'https://example.com/pdfs/react-components.pdf',
    fileSize: '3.7 MB',
    uploadedBy: 'Sarah Frontend',
    uploadedAt: new Date('2025-01-25'),
    module: 'Components',
    isPremium: false,
  },
  {
    _id: 'material-008',
    courseId: 'course-003',
    title: 'React Hooks Guide',
    type: 'pdf',
    description: 'Complete guide to React Hooks: useState, useEffect, useContext, and custom hooks',
    fileUrl: 'https://example.com/pdfs/react-hooks.pdf',
    fileSize: '3.2 MB',
    uploadedBy: 'Sarah Frontend',
    uploadedAt: new Date('2025-01-28'),
    module: 'Hooks',
    isPremium: false,
  },
  {
    _id: 'material-009',
    courseId: 'course-003',
    title: 'State Management with Redux',
    type: 'pdf',
    description: 'State management patterns, Redux, and Redux Toolkit',
    fileUrl: 'https://example.com/pdfs/redux-guide.pdf',
    fileSize: '4.1 MB',
    uploadedBy: 'Sarah Frontend',
    uploadedAt: new Date('2025-02-01'),
    module: 'State Management',
    isPremium: true,
  },

  {
    _id: 'material-010',
    courseId: 'course-004',
    title: 'SQL Query Basics',
    type: 'pdf',
    description: 'SQL SELECT, INSERT, UPDATE, DELETE queries with examples',
    fileUrl: 'https://example.com/pdfs/sql-queries.pdf',
    fileSize: '2.9 MB',
    uploadedBy: 'Mike Data',
    uploadedAt: new Date('2025-02-05'),
    module: 'SQL Basics',
    isPremium: false,
  },
  {
    _id: 'material-011',
    courseId: 'course-004',
    title: 'Database Normalization',
    type: 'pdf',
    description: '1NF, 2NF, 3NF normalization forms and database optimization',
    fileUrl: 'https://example.com/pdfs/normalization.pdf',
    fileSize: '2.6 MB',
    uploadedBy: 'Mike Data',
    uploadedAt: new Date('2025-02-07'),
    module: 'Database Design',
    isPremium: false,
  },
  {
    _id: 'material-012',
    courseId: 'course-004',
    title: 'Advanced SQL Joins',
    type: 'pdf',
    description: 'INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL OUTER JOIN with practical examples',
    fileUrl: 'https://example.com/pdfs/sql-joins.pdf',
    fileSize: '3.3 MB',
    uploadedBy: 'Mike Data',
    uploadedAt: new Date('2025-02-09'),
    module: 'Optimization',
    isPremium: true,
  },

  {
    _id: 'material-013',
    courseId: 'course-005',
    title: 'NumPy Fundamentals',
    type: 'pdf',
    description: 'NumPy arrays, operations, and mathematical functions',
    fileUrl: 'https://example.com/pdfs/numpy-guide.pdf',
    fileSize: '3.4 MB',
    uploadedBy: 'Alex Science',
    uploadedAt: new Date('2025-02-08'),
    module: 'Pandas',
    isPremium: false,
  },
  {
    _id: 'material-014',
    courseId: 'course-005',
    title: 'Pandas Data Manipulation',
    type: 'pdf',
    description: 'DataFrames, Series, data cleaning, groupby, and merge operations',
    fileUrl: 'https://example.com/pdfs/pandas-guide.pdf',
    fileSize: '4.5 MB',
    uploadedBy: 'Alex Science',
    uploadedAt: new Date('2025-02-10'),
    module: 'Pandas',
    isPremium: false,
  },
  {
    _id: 'material-015',
    courseId: 'course-005',
    title: 'Data Visualization with Matplotlib',
    type: 'pdf',
    description: 'Creating plots, charts, and advanced visualizations',
    fileUrl: 'https://example.com/pdfs/matplotlib-guide.pdf',
    fileSize: '3.8 MB',
    uploadedBy: 'Alex Science',
    uploadedAt: new Date('2025-02-12'),
    module: 'Visualization',
    isPremium: false,
  },
  {
    _id: 'material-016',
    courseId: 'course-005',
    title: 'Machine Learning Introduction',
    type: 'pdf',
    description: 'ML concepts, supervised vs unsupervised learning, and model evaluation',
    fileUrl: 'https://example.com/pdfs/ml-intro.pdf',
    fileSize: '5.2 MB',
    uploadedBy: 'Alex Science',
    uploadedAt: new Date('2025-02-14'),
    module: 'Machine Learning Basics',
    isPremium: true,
  },
];

class MockMaterialService {
  static find(query = {}) {
    let filtered = [...materials];
    
    if (query.courseId) {
      filtered = filtered.filter(m => m.courseId === query.courseId);
    }
    
    if (query.type) {
      filtered = filtered.filter(m => m.type === query.type);
    }

    if (query.module) {
      filtered = filtered.filter(m => m.module === query.module);
    }
    
    return filtered;
  }

  static findById(id) {
    return materials.find(m => m._id === id);
  }

  static findOne(query = {}) {
    const results = this.find(query);
    return results.length > 0 ? results[0] : null;
  }

  static create(materialData) {
    const newMaterial = {
      _id: 'material-' + Math.random().toString(36).substring(7),
      ...materialData,
      uploadedAt: new Date(),
    };
    materials.push(newMaterial);
    return newMaterial;
  }

  static getByCourse(courseId) {
    return this.find({ courseId });
  }

  static getByModule(courseId, module) {
    return this.find({ courseId, module });
  }

  static countByType(type) {
    return this.find({ type }).length;
  }
}

module.exports = MockMaterialService;
