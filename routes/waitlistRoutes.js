const express = require('express');
const router = express.Router();
const { Waitlist, WaitlistCustomers, User, Notification  } = require('../models');


// Create a new waitlist
router.post('/create', async (req, res) => {
    const { serviceName, waitTime, status, address, phone, ownerId } = req.body;
    try {
      const newWaitlist = await Waitlist.create({ serviceName, waitTime, status, address, phone, ownerId });
      res.status(201).json(newWaitlist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Get all waitlists
  router.get('/', async (req, res) => {
    try {
      const waitlists = await Waitlist.findAll();
      res.status(200).json(waitlists);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update a waitlist
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { serviceName, waitTime, status, address, phone } = req.body;
    try {
      const updatedWaitlist = await Waitlist.update(
        { serviceName, waitTime, status },
        { where: { id } }
      );
      res.status(200).json(updatedWaitlist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Delete a waitlist
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await Waitlist.destroy({ where: { id } });
      res.status(200).json({ message: 'Waitlist deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });  

// Join a waitlist
router.post('/:id/join', async (req, res) => {
  const { id } = req.params; // waitlist ID
  const { userId } = req.body; // customer ID

  if (!userId){
    return res.status(400).json({ message: 'User ID is required' });
  }
  try {
    const existingEntry = await WaitlistCustomers.findOne({ where: { waitlistId: id, userId } });
    if (existingEntry) {
      return res.status(400).json({ message: 'Already joined this waitlist' });
    }


    // Fetch the waitlist instance
    const waitlist = await Waitlist.findByPk(id);
    if (!waitlist) {
      return res.status(404).json({ message: 'Waitlist not found' });
    }

    const owner = await User.findByPk(waitlist.ownerId);
    if (!owner) {
      return res.status(400).json({ error: 'Owner user does not exist' });
}

    // Create new entry for the customer joining the waitlist
    const newEntry = await WaitlistCustomers.create({ waitlistId: id, userId });

    // Create notification for the business owner
    await Notification.create({
      userId: waitlist.ownerId, // Correctly access the ownerId from the waitlist instance
      message: `A new customer has joined your waitlist: ${waitlist.serviceName}`,
      waitlistId: id,
      isRead: false, 
    });

    res.status(200).json(newEntry);
  } catch (error) {
    console.error('Failed to join waitlist:', error); // Log error for debugging
    res.status(500).json({ error: 'Failed to join waitlist' });
  }
});

// Leave a waitlist
router.delete('/:id/leave', async (req, res) => {
  const { id } = req.params; // waitlist ID
  const { userId } = req.body; // customer ID
  try {
    const existingEntry = await WaitlistCustomers.findOne({ where: { waitlistId: id, userId } });
    if (!existingEntry) {
      return res.status(400).json({ message: 'You are not on this waitlist' });
    }
    await WaitlistCustomers.destroy({ where: { waitlistId: id, userId } });
    res.status(200).json({ message: 'Successfully left the waitlist' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to leave waitlist' });
  }
});

// Get joined waitlists         
router.get('/joined', async (req, res) => {
  const { userId } = req.query;

  try {
    // Fetch waitlist IDs that the user has joined
    const joinedWaitlists = await WaitlistCustomers.findAll({
      where: { userId },
      attributes: ['waitlistId'],
    });

    // Extract waitlist IDs into an array
    const waitlistIds = joinedWaitlists.map(entry => entry.waitlistId);

    res.status(200).json(waitlistIds);
  } catch (error) {
    console.error('Error fetching joined waitlists:', error);
    res.status(500).json({ error: 'Failed to fetch joined waitlists' });
  }
});

// Get customers who joined a specific waitlist
router.get('/:id/customers', async (req, res) => {
  const { id } = req.params; // waitlist ID

  try {
      const customers = await WaitlistCustomers.findAll({
          where: { waitlistId: id },
          include: [
            {
               model: User,
                attributes: ['username', 'phone'],
               },{
                model: Waitlist,
                attributes: ['serviceName', 'waitTime', 'status'],
               }
              ],
      });

      res.status(200).json(customers);
  } catch (error) {
      console.error(`Error fetching customers for waitlist ${id}:`, error);
      res.status(500).json({ error: 'Failed to fetch customers for this waitlist' });
  }
});

// Check for new customers joining waitlists
// router.get('/notifications', async (req, res) => {
//   try {
//     // Here, you could use a more specific query to check for recent join events
//     // Assuming this returns new join events since the last time checked
//     const newJoins = await WaitlistCustomers.findAll({
//       include: [{ model: User, attributes: ['username'] }],
//       order: [['createdAt', 'DESC']], // Order by latest join events
//       limit: 5 // Limit the number to the latest 5 join events
//     });

//     res.json(newJoins);
//   } catch (error) {
//     console.error('Error fetching notifications:', error);
//     res.status(500).json({ error: 'Failed to fetch notifications' });
//   }
// });

// Fetch recent notifications
router.get('/notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
      limit: 5
    });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

module.exports = router;
