const express = require('express');
const {
  getAllUsers,
  changeUserRole,
  deactivateUser,
  getPlatformStats,
} = require('../controllers/adminController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/users', authMiddleware, roleMiddleware('admin'), getAllUsers);
router.put('/users/role', authMiddleware, roleMiddleware('admin'), changeUserRole);
router.put('/users/:userId/deactivate', authMiddleware, roleMiddleware('admin'), deactivateUser);
router.get('/stats', authMiddleware, roleMiddleware('admin'), getPlatformStats);

module.exports = router;
