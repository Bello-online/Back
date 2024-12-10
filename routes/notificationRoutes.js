const express = require('express');
const router = express.Router();
const { Notification } = require('../models');

// Get notifications for a user
router.get('/:userId', async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.params.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark a single notification as read
router.delete('/mark-as-read/:notificationId', async (req, res) => {
  try {
    console.log('Deleting notification:', req.params.notificationId);
    const result = await Notification.destroy({
      where: { id: req.params.notificationId }
    });
    
    if (result === 0) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.status(200).json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: error.message });
  }
});

// Mark all notifications as read for a user
router.put('/mark-all-as-read/:userId', async (req, res) => {
  try {
    await Notification.destroy({
      where: { userId: req.params.userId }
    });
    res.status(200).json({ message: 'All notifications marked as read' });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;