const express = require('express');
const router = express.Router();
const { Notification } = require('../models');

// Get unread notifications count
router.get('/unread-count/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const unreadCount = await Notification.count({ where: { userId, isRead: false } });
    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching unread notifications count' });
    res.status(500).json({error: "Failed to fetch unread notifications count"})
  }
});

// Mark all notifications as read
router.put('/mark-all-as-read/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await Notification.update(
      { isRead: true },
      { where: { userId } }
    );
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking notifications as read:', error);
    res.status(500).json({ error: 'Failed to mark notifications as read' });
  }
});

// Get all notifications for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({ where: { userId } });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching notifications' });
  }
});

module.exports = router;