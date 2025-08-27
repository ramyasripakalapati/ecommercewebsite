const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const User = require('../models/User');

// Promote a user to admin
router.put('/promote/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') 
      return res.status(403).json({ message: "Access denied" });

    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { role: 'admin' }, 
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: `${user.name} is now an admin`, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
