// Mock Quiz Service - Sample quizzes for each course

const quizzes = [
  {
    _id: 'quiz-001',
    courseId: 'course-001',
    title: 'HTML & CSS Fundamentals Quiz',
    description: 'Test your knowledge of HTML and CSS basics',
    totalPoints: 100,
    passingScore: 70,
    timeLimit: 30, // minutes
    attempsAllowed: 3,
    questions: [
      {
        id: 'q1',
        question: 'What does HTML stand for?',
        type: 'multiple-choice',
        options: [
          'Hyper Text Markup Language',
          'High Tech Modern Language',
          'Home Tool Markup Language',
          'Hyperlinks and Text Markup Language'
        ],
        correctAnswer: 'Hyper Text Markup Language',
        points: 10
      },
      {
        id: 'q2',
        question: 'Which HTML tag is used for the largest heading?',
        type: 'multiple-choice',
        options: ['<h6>', '<h1>', '<head>', '<header>'],
        correctAnswer: '<h1>',
        points: 10
      },
      {
        id: 'q3',
        question: 'What is the correct CSS syntax for selecting all paragraph elements?',
        type: 'multiple-choice',
        options: ['p {}', '[p]{}', '{p}', 'all.p {}'],
        correctAnswer: 'p {}',
        points: 10
      },
      {
        id: 'q4',
        question: 'Which CSS property is used to change the text color?',
        type: 'multiple-choice',
        options: ['text-color', 'color', 'font-color', 'text-style'],
        correctAnswer: 'color',
        points: 10
      },
      {
        id: 'q5',
        question: 'What does CSS stand for?',
        type: 'multiple-choice',
        options: [
          'Cascading Style Sheets',
          'Computer Style Sheets',
          'Creative Style Sheets',
          'Colorful Style Sheets'
        ],
        correctAnswer: 'Cascading Style Sheets',
        points: 10
      }
    ],
    results: [],
    createdAt: new Date('2025-01-20'),
  },

  {
    _id: 'quiz-002',
    courseId: 'course-002',
    title: 'Node.js & Express Mastery Quiz',
    description: 'Advanced Node.js and Express.js concepts',
    totalPoints: 100,
    passingScore: 70,
    timeLimit: 45,
    attempsAllowed: 2,
    questions: [
      {
        id: 'q1',
        question: 'What is Node.js?',
        type: 'multiple-choice',
        options: [
          'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
          'A JavaScript library for frontend development',
          'A CSS framework',
          'A database management system'
        ],
        correctAnswer: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
        points: 20
      },
      {
        id: 'q2',
        question: 'Which of these is a middleware in Express?',
        type: 'multiple-choice',
        options: [
          'app.use()',
          'app.listen()',
          'app.require()',
          'app.export()'
        ],
        correctAnswer: 'app.use()',
        points: 20
      },
      {
        id: 'q3',
        question: 'What does REST stand for?',
        type: 'multiple-choice',
        options: [
          'Representational State Transfer',
          'Remote Enable Server Transfer',
          'Rapid Exchange Service Transfer',
          'Resource Exchange Server Technology'
        ],
        correctAnswer: 'Representational State Transfer',
        points: 20
      },
      {
        id: 'q4',
        question: 'Which HTTP method is used to retrieve data?',
        type: 'multiple-choice',
        options: [
          'POST',
          'GET',
          'PUT',
          'DELETE'
        ],
        correctAnswer: 'GET',
        points: 20
      },
      {
        id: 'q5',
        question: 'What is the default port for Node.js applications?',
        type: 'multiple-choice',
        options: [
          '80',
          '443',
          '3000',
          '8080'
        ],
        correctAnswer: '3000',
        points: 20
      }
    ],
    results: [],
    createdAt: new Date('2025-02-01'),
  },

  {
    _id: 'quiz-003',
    courseId: 'course-003',
    title: 'React Hooks & State Management Quiz',
    description: 'Test your React knowledge including hooks and state management',
    totalPoints: 100,
    passingScore: 75,
    timeLimit: 40,
    attempsAllowed: 3,
    questions: [
      {
        id: 'q1',
        question: 'What is the purpose of the useState hook?',
        type: 'multiple-choice',
        options: [
          'To manage component state in functional components',
          'To fetch data from APIs',
          'To style components',
          'To create classes'
        ],
        correctAnswer: 'To manage component state in functional components',
        points: 20
      },
      {
        id: 'q2',
        question: 'Which hook is used for side effects in React?',
        type: 'multiple-choice',
        options: [
          'useEffect',
          'useSideEffect',
          'useCallback',
          'useReducer'
        ],
        correctAnswer: 'useEffect',
        points: 20
      },
      {
        id: 'q3',
        question: 'What does JSX stand for?',
        type: 'multiple-choice',
        options: [
          'JavaScript XML',
          'Java Syntax Extension',
          'JavaScript External Library',
          'JSON Extended'
        ],
        correctAnswer: 'JavaScript XML',
        points: 20
      },
      {
        id: 'q4',
        question: 'How do you pass data from parent to child in React?',
        type: 'multiple-choice',
        options: [
          'Using props',
          'Using state',
          'Using context',
          'Using Redux'
        ],
        correctAnswer: 'Using props',
        points: 20
      },
      {
        id: 'q5',
        question: 'What is the virtual DOM in React?',
        type: 'multiple-choice',
        options: [
          'A lightweight representation of the real DOM',
          'A database',
          'A server-side rendering tool',
          'A CSS framework'
        ],
        correctAnswer: 'A lightweight representation of the real DOM',
        points: 20
      }
    ],
    results: [],
    createdAt: new Date('2025-01-25'),
  },

  {
    _id: 'quiz-004',
    courseId: 'course-004',
    title: 'SQL Basics Quiz',
    description: 'Fundamental SQL queries and database concepts',
    totalPoints: 100,
    passingScore: 70,
    timeLimit: 35,
    attempsAllowed: 4,
    questions: [
      {
        id: 'q1',
        question: 'What does SQL stand for?',
        type: 'multiple-choice',
        options: [
          'Structured Query Language',
          'Standard Query Language',
          'Simple Query Language',
          'Sequential Query Language'
        ],
        correctAnswer: 'Structured Query Language',
        points: 20
      },
      {
        id: 'q2',
        question: 'Which SQL keyword is used to retrieve data?',
        type: 'multiple-choice',
        options: [
          'FETCH',
          'RETRIEVE',
          'SELECT',
          'GET'
        ],
        correctAnswer: 'SELECT',
        points: 20
      },
      {
        id: 'q3',
        question: 'What is a PRIMARY KEY?',
        type: 'multiple-choice',
        options: [
          'A unique identifier for a record in a table',
          'The first column in a table',
          'A backup key',
          'A foreign key reference'
        ],
        correctAnswer: 'A unique identifier for a record in a table',
        points: 20
      },
      {
        id: 'q4',
        question: 'Which SQL clause filters records?',
        type: 'multiple-choice',
        options: [
          'WHERE',
          'FILTER',
          'SEARCH',
          'FIND'
        ],
        correctAnswer: 'WHERE',
        points: 20
      },
      {
        id: 'q5',
        question: 'What is INNER JOIN used for?',
        type: 'multiple-choice',
        options: [
          'To combine rows from two tables where there is a match',
          'To add rows to a table',
          'To delete rows from a table',
          'To update data in a table'
        ],
        correctAnswer: 'To combine rows from two tables where there is a match',
        points: 20
      }
    ],
    results: [],
    createdAt: new Date('2025-02-05'),
  },

  {
    _id: 'quiz-005',
    courseId: 'course-005',
    title: 'Python Data Science Quiz',
    description: 'Data Science with Python - Pandas, NumPy, and Visualization',
    totalPoints: 100,
    passingScore: 75,
    timeLimit: 50,
    attempsAllowed: 3,
    questions: [
      {
        id: 'q1',
        question: 'What is NumPy primarily used for?',
        type: 'multiple-choice',
        options: [
          'Numerical computing with arrays and matrices',
          'Web development',
          'Database management',
          'GUI development'
        ],
        correctAnswer: 'Numerical computing with arrays and matrices',
        points: 20
      },
      {
        id: 'q2',
        question: 'What is a Pandas DataFrame?',
        type: 'multiple-choice',
        options: [
          'A 2-dimensional labeled data structure',
          'A Python loop',
          'A machine learning algorithm',
          'A visualization tool'
        ],
        correctAnswer: 'A 2-dimensional labeled data structure',
        points: 20
      },
      {
        id: 'q3',
        question: 'Which library is best for data visualization?',
        type: 'multiple-choice',
        options: [
          'Matplotlib',
          'NumPy',
          'Pandas',
          'Scikit-learn'
        ],
        correctAnswer: 'Matplotlib',
        points: 20
      },
      {
        id: 'q4',
        question: 'What does "clean data" mean in data science?',
        type: 'multiple-choice',
        options: [
          'Data that is formatted correctly, free of errors and duplicates',
          'Data that is physically clean',
          'Data from a clean source',
          'Data that is new'
        ],
        correctAnswer: 'Data that is formatted correctly, free of errors and duplicates',
        points: 20
      },
      {
        id: 'q5',
        question: 'What is exploratory data analysis (EDA)?',
        type: 'multiple-choice',
        options: [
          'Analyzing and visualizing data to understand patterns',
          'Deleting unwanted data',
          'Creating new databases',
          'Writing SQL queries'
        ],
        correctAnswer: 'Analyzing and visualizing data to understand patterns',
        points: 20
      }
    ],
    results: [],
    createdAt: new Date('2025-02-10'),
  }
];

class MockQuizService {
  static find(query = {}) {
    let filtered = [...quizzes];
    
    if (query.courseId) {
      filtered = filtered.filter(q => q.courseId === query.courseId);
    }
    
    return filtered;
  }

  static findById(id) {
    return quizzes.find(q => q._id === id);
  }

  static findOne(query = {}) {
    const results = this.find(query);
    return results.length > 0 ? results[0] : null;
  }

  static create(quizData) {
    const newQuiz = {
      _id: 'quiz-' + Math.random().toString(36).substring(7),
      ...quizData,
      results: [],
      createdAt: new Date(),
    };
    quizzes.push(newQuiz);
    return newQuiz;
  }

  static findByIdAndUpdate(id, updateData) {
    const quiz = this.findById(id);
    if (quiz) {
      Object.assign(quiz, updateData);
      return quiz;
    }
    return null;
  }

  static submitQuiz(quizId, studentId, answers, score) {
    const quiz = this.findById(quizId);
    if (quiz) {
      quiz.results.push({
        studentId,
        answers,
        score,
        submittedAt: new Date(),
        passed: score >= quiz.passingScore,
      });
      return true;
    }
    return false;
  }

  static getQuizResults(quizId, studentId) {
    const quiz = this.findById(quizId);
    if (quiz) {
      return quiz.results.filter(r => r.studentId === studentId);
    }
    return [];
  }
}

module.exports = MockQuizService;
