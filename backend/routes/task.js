const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const auth = require('../middleware/auth');

// Create Task
router.post('/', auth, async (req, res) => {
    try {
        const task = await Task.create({ user: req.user._id, task: req.body.task });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

// Get Tasks
router.get('/', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Update Task
router.put('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete Task
router.delete('/:id', auth, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

module.exports = router;
