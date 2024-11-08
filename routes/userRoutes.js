const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const { User } = require('../models');

// Helper function to hash password
const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

// Sign up route
router.post('/signup', async (req, res) => {
  const { username, password, role, email, phone } = req.body;
  
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = hashPassword(password, salt);

  try {
    const newUser = await User.create({ username, password: hashedPassword, role, salt, email, phone });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const hashedPassword = hashPassword(password, user.salt);
    if (hashedPassword === user.password) {
      // Set session or redirect based on role
      res.status(200).json({ message: 'Login successful', role: user.role, userId: user.id, username: user.username, email: user.email, phone: user.phone });
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
