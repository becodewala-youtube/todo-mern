const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register route
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.json({ token: jwt.sign({ id: user._id }, process.env.JWT_SECRET) });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
        res.json({ token: jwt.sign({ id: user._id }, process.env.JWT_SECRET) });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in' });
    }
});

module.exports = router;
