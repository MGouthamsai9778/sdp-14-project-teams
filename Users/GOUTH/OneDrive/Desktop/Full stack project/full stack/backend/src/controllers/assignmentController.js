const Assignment = require('../models/Assignment');
const Course = require('../models/Course');

// Create assignment
const createAssignment = async (req, res) => {
  try {
    const { courseId, title, description, dueDate, maxScore } = req.body;

    const assignment = new Assignment({
      courseId,
      title,
      description,
      dueDate,
      maxScore,
      createdBy: req.user.userId,
    });

    await assignment.save();

    res.status(201).json({
      message: 'Assignment created successfully',
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating assignment', error: error.message });
  }
};

// Get assignments by course
const getAssignmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const assignments = await Assignment.find({ courseId })
      .populate('createdBy', 'firstName lastName')
      .sort({ dueDate: 1 });

    res.json({
      message: 'Assignments retrieved',
      assignments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving assignments', error: error.message });
  }
};

// Submit assignment
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { content, fileUrl } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const submission = {
      studentId: req.user.userId,
      submissionDate: new Date(),
      content,
      fileUrl,
    };

    assignment.submissions.push(submission);
    await assignment.save();

    res.status(201).json({
      message: 'Assignment submitted successfully',
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assignment', error: error.message });
  }
};

// Grade assignment
const gradeAssignment = async (req, res) => {
  try {
    const { assignmentId, submissionIndex, score, feedback } = req.body;

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (submissionIndex < 0 || submissionIndex >= assignment.submissions.length) {
      return res.status(400).json({ message: 'Invalid submission index' });
    }

    assignment.submissions[submissionIndex].score = score;
    assignment.submissions[submissionIndex].feedback = feedback;
    assignment.submissions[submissionIndex].isGraded = true;

    await assignment.save();

    res.json({
      message: 'Assignment graded successfully',
      assignment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error grading assignment', error: error.message });
  }
};

// Get assignment submissions
const getAssignmentSubmissions = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const assignment = await Assignment.findById(assignmentId)
      .populate('submissions.studentId', 'firstName lastName email');

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({
      message: 'Submissions retrieved',
      submissions: assignment.submissions,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving submissions', error: error.message });
  }
};

module.exports = {
  createAssignment,
  getAssignmentsByCourse,
  submitAssignment,
  gradeAssignment,
  getAssignmentSubmissions,
};
