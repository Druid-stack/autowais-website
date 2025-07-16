const express = require('express');
const User = require('../models/User');
const { protect, restrictTo } = require('../middleware/auth');
const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || '-createdAt';
        const search = req.query.search || '';
        const role = req.query.role;
        const status = req.query.status;

        // Build filter object
        const filter = {};

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (role) {
            filter.role = role;
        }

        if (status === 'active') {
            filter.isActive = true;
        } else if (status === 'inactive') {
            filter.isActive = false;
        }

        const skip = (page - 1) * limit;

        // Execute query
        const users = await User.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .select('-__v');

        const total = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: {
                users,
                pagination: {
                    current: page,
                    pages: Math.ceil(total / limit),
                    total,
                    limit
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get users',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get single user (Admin only)
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                user
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
    try {
        const { name, email, role, isActive } = req.body;
        const updates = {};

        if (name) updates.name = name;
        if (email) {
            // Check if email is already taken
            const existingUser = await User.findOne({ email, _id: { $ne: req.params.id } });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email is already taken by another user'
                });
            }
            updates.email = email;
        }
        if (role) updates.role = role;
        if (typeof isActive === 'boolean') updates.isActive = isActive;

        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: {
                user
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Delete user (Admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        // Prevent deleting yourself
        if (req.params.id === req.user.id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Reset user password (Admin only)
// @route   PUT /api/users/:id/reset-password
// @access  Private/Admin
const resetUserPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;

        if (!newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide new password'
            });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        user.password = newPassword;
        user.loginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Password reset successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to reset password',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Unlock user account (Admin only)
// @route   PUT /api/users/:id/unlock
// @access  Private/Admin
const unlockUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        await user.resetLoginAttempts();

        res.status(200).json({
            success: true,
            message: 'User account unlocked successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to unlock user',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get user statistics (Admin only)
// @route   GET /api/users/stats
// @access  Private/Admin
const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const activeUsers = await User.countDocuments({ isActive: true });
        const inactiveUsers = await User.countDocuments({ isActive: false });
        const lockedUsers = await User.countDocuments({ lockUntil: { $gt: Date.now() } });

        const usersByRole = await User.aggregate([
            {
                $group: {
                    _id: '$role',
                    count: { $sum: 1 }
                }
            }
        ]);

        const recentUsers = await User.find()
            .sort('-createdAt')
            .limit(5)
            .select('name email role createdAt');

        res.status(200).json({
            success: true,
            data: {
                overview: {
                    total: totalUsers,
                    active: activeUsers,
                    inactive: inactiveUsers,
                    locked: lockedUsers
                },
                byRole: usersByRole,
                recent: recentUsers
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to get user statistics',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// @desc    Get the logged-in user's connected services
// @route   GET /api/users/services
// @access  Private
router.get('/services', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('services');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, services: user.services });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
});

// Routes
router.get('/stats', restrictTo('admin'), getUserStats);
router.get('/', restrictTo('admin'), getAllUsers);
router.get('/:id', restrictTo('admin'), getUser);
router.put('/:id', restrictTo('admin'), updateUser);
router.delete('/:id', restrictTo('admin'), deleteUser);
router.put('/:id/reset-password', restrictTo('admin'), resetUserPassword);
router.put('/:id/unlock', restrictTo('admin'), unlockUser);

module.exports = router; 