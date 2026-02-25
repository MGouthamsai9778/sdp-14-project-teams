const MockMaterialService = require('../config/mockMaterialService');
const MockCourseService = require('../config/mockCourseService');

// Get all materials for a course
const getMaterialsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Verify course exists
    const course = MockCourseService.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Get all materials for the course
    const materials = MockMaterialService.getByCourse(courseId);

    res.json({
      message: 'Course materials retrieved',
      materials,
      count: materials.length,
      stats: {
        totalPDFs: materials.filter(m => m.type === 'pdf').length,
        totalSize: materials.reduce((sum, m) => {
          const size = parseInt(m.fileSize);
          return sum + (isNaN(size) ? 0 : size);
        }, 0) + ' MB',
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving materials', error: error.message });
  }
};

// Get single material
const getMaterialById = async (req, res) => {
  try {
    const { materialId } = req.params;

    const material = MockMaterialService.findById(materialId);
    if (!material) {
      return res.status(404).json({ message: 'Material not found' });
    }

    res.json({
      message: 'Material retrieved',
      material,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving material', error: error.message });
  }
};

// Get materials by module
const getMaterialsByModule = async (req, res) => {
  try {
    const { courseId, module } = req.params;

    const course = MockCourseService.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const materials = MockMaterialService.getByModule(courseId, module);

    res.json({
      message: `Materials for module "${module}" retrieved`,
      module,
      materials,
      count: materials.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving materials', error: error.message });
  }
};

// Get course content (materials + quizzes + structure)
const getCourseContent = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = MockCourseService.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const materials = MockMaterialService.getByCourse(courseId);
    const MockQuizService = require('../config/mockQuizService');
    const quizzes = MockQuizService.find({ courseId });

    // Group materials by module
    const modulesByName = {};
    materials.forEach(material => {
      if (!modulesByName[material.module]) {
        modulesByName[material.module] = [];
      }
      modulesByName[material.module].push(material);
    });

    res.json({
      message: 'Course content retrieved',
      course: {
        _id: course._id,
        title: course.title,
        description: course.description,
        instructor: course.instructor,
        category: course.category,
        level: course.level,
        duration: course.duration,
        materials: materials.length,
        quizzes: quizzes.length,
      },
      content: {
        modules: modulesByName,
        materials,
        quizzes: quizzes.map(q => ({
          _id: q._id,
          title: q.title,
          description: q.description,
          totalPoints: q.totalPoints,
          passingScore: q.passingScore,
          timeLimit: q.timeLimit,
          questionCount: q.questions.length,
        })),
      },
      stats: {
        totalModules: Object.keys(modulesByName).length,
        totalMaterials: materials.length,
        totalQuizzes: quizzes.length,
        totalPDFs: materials.filter(m => m.type === 'pdf').length,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving course content', error: error.message });
  }
};

module.exports = {
  getMaterialsByCourse,
  getMaterialById,
  getMaterialsByModule,
  getCourseContent,
};
