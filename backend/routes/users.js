const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

// GET all users (admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') 
      return res.status(403).json({ message: 'Access denied' });

    const users = await User.find().select('-password'); // exclude password
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PUT toggle admin role
router.put('/toggle-admin/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') 
      return res.status(403).json({ message: 'Access denied' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Toggle role
    user.role = user.role === 'admin' ? 'user' : 'admin';
    await user.save();

    res.json({ message: `${user.name} is now ${user.role}`, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
