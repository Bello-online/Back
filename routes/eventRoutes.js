const express = require('express');
const router = express.Router();
const { User,Event, EventParticipant } = require('../models');

// Fetch all events (for customers)
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

// Fetch events for a specific business owner
router.get('/owner/:ownerId', async (req, res) => {
    try {
      const { ownerId } = req.params;
      const events = await Event.findAll({ where: { ownerId },
    include: [{
        model: EventParticipant,
        as: 'participants',
        attributes: ['id','userId'],
    }] });
      if (events) {
        res.status(200).json(events);
      } else {
        res.status(404).json({ message: 'No events found for this owner' });
      }
    } catch (error) {
      console.error('Error fetching events for owner:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Create a new event
router.post('/', async (req, res) => {
  const { title, description, date, location, capacity, ownerId } = req.body;
  try {
    const newEvent = await Event.create({ title, description, date, location, capacity, ownerId });
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Error creating event' });
  }
});

// Delete an event
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Event.destroy({ where: { id } });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Error deleting event' });
  }
});

// Join an event
router.post('/participants', async (req, res) => {
  const { userId, eventId } = req.body;
  try {
    const existingEntry = await EventParticipant.findOne({ where: { userId, eventId } });
    if (existingEntry) {
      return res.status(400).json({ error: 'Already joined this event' });
    }
    const newParticipant = await EventParticipant.create({ userId, eventId });
    res.status(201).json(newParticipant);
  } catch (error) {
    console.error('Error joining event:', error);
    res.status(500).json({ error: 'Error joining event' });
  }
});

  // Leave an event
  router.delete('/participants/:userId/:eventId', async (req, res) => {
    const { userId, eventId } = req.params; // Extract userId and eventId from URL
  
    try {
      const deletedRows = await EventParticipant.destroy({
        where: { userId, eventId },
      });
  
      if (deletedRows > 0) {
        res.status(200).json({ message: 'Successfully left the event' });
      } else {
        res.status(404).json({ error: 'Event participation not found' });
      }
    } catch (error) {
      console.error('Error leaving event:', error);
      res.status(500).json({ error: 'Error leaving event' });
    }
  });

// Fetch joined events for a customer
router.get('/participants/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const joinedEvents = await EventParticipant.findAll({
        where: { userId },
        include: [
          {
            model: Event,
            as: 'event', // Use the alias specified in the association
            attributes: ['id', 'title', 'date', 'location', 'capacity'],
          },
        ],
      });
  
      res.status(200).json(joinedEvents);
    } catch (error) {
      console.error('Error fetching joined events:', error);
      res.status(500).json({ message: 'Error fetching joined events.' });
    }
  });


  // Fetch participants for a specific event
router.get('/:eventId/participants', async (req, res) => {
  const { eventId } = req.params;
  try {
    const participants = await EventParticipant.findAll({
      where: { eventId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'phone'], // Fetch user details
        },
      ],
    });
    res.status(200).json(participants);
  } catch (error) {
    console.error('Error fetching participants:', error);
    res.status(500).json({ error: 'Error fetching participants' });
  }
});

// Update an event
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, capacity } = req.body;

  try {
    const event = await Event.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the event fields
    await event.update({ title, description, date, location, capacity });
    res.status(200).json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Error updating event' });
  }
});



module.exports = router;
