const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// REGISTER - Create new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User with this email already exists'
      });
    }
    
    // Create new user
    const user = new User({
      fullName,
      email,
      phone,
      password
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      status: 'error',
      message: error.message || 'Failed to register user'
    });
  }
});

// LOGIN - Authenticate user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid email or password'
      });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: {
        user,
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to login'
    });
  }
});

// FORGOT PASSWORD - Send reset token
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User with this email not found'
      });
    }
    
    // Generate reset token
    const resetToken = Math.random().toString(36).substring(2, 15);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save();
    
    // TODO: Send email with reset token
    
    res.status(200).json({
      status: 'success',
      message: 'Password reset instructions sent to your email',
      data: {
        resetToken // Remove this in production
      }
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to process password reset'
    });
  }
});

// RESET PASSWORD - Reset with token
router.post('/reset-password', async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid or expired reset token'
      });
    }
    
    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();
    
    res.status(200).json({
      status: 'success',
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to reset password'
    });
  }
});

// GET PROFILE - Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch user profile'
    });
  }
});

module.exports = router;



