const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

// Create and send token response
const createSendToken = (user, statusCode, res, message = 'Success') => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    };

    res.cookie('jwt', token, cookieOptions);

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        success: true,
        message,
        token,
        data: {
            user
        }
    });
};

// Protect routes - require authentication
const protect = async (req, res, next) => {
    try {
        // 1) Get token and check if it exists
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'You are not logged in! Please log in to get access.'
            });
        }

        // 2) Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: 'The user belonging to this token no longer exists.'
            });
        }

        // 4) Check if user is active
        if (!currentUser.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Your account has been deactivated. Please contact support.'
            });
        }

        // 5) Check if user changed password after the token was issued
        if (currentUser.changedPasswordAfter(decoded.iat)) {
            return res.status(401).json({
                success: false,
                message: 'User recently changed password! Please log in again.'
            });
        }

        // Grant access to protected route
        req.user = currentUser;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please log in again!'
            });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Your token has expired! Please log in again.'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Authentication error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Restrict access to specific roles
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};

// Optional authentication - don't fail if no token
const optionalAuth = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies && req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const currentUser = await User.findById(decoded.id);

            if (currentUser && currentUser.isActive && !currentUser.changedPasswordAfter(decoded.iat)) {
                req.user = currentUser;
            }
        }

        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};

module.exports = {
    signToken,
    createSendToken,
    protect,
    restrictTo,
    optionalAuth
}; 