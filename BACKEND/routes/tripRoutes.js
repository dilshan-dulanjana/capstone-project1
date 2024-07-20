const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');

// Search for trips by travel place name
router.get('/search', (req, res) => {
  const query = req.query.query;
  Trip.find({ travelplacename: new RegExp(query, 'i') })
    .then(trips => res.json(trips))
    .catch(err => {
      console.error('Error searching trips:', err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get trip by travel place ID
router.get('/by-travelplace/:id', (req, res) => {
  const travelPlaceId = req.params.id;
  Trip.findOne({ travelPlace: travelPlaceId })
    .then(trip => res.json(trip))
    .catch(err => {
      console.error('Error fetching trip by place ID:', err.message);
      res.status(500).json({ error: err.message });
    });
});

// Add new trip
router.post('/', (req, res) => {
  const tripData = req.body;
  const newTrip = new Trip(tripData);
  newTrip.save()
    .then(trip => res.status(201).json({ newTrip: trip }))
    .catch(err => {
      console.error('Error adding new trip:', err.message);
      res.status(500).json({ error: err.message });
    });
});

// Update existing trip
router.put('/:id', (req, res) => {
  const tripId = req.params.id;
  const updatedData = req.body;
  Trip.findByIdAndUpdate(tripId, updatedData, { new: true })
    .then(updatedTrip => res.json(updatedTrip))
    .catch(err => {
      console.error('Error updating trip:', err.message);
      res.status(500).json({ error: err.message });
    });
});

// Delete trip
router.delete('/:id', (req, res) => {
  const tripId = req.params.id;
  Trip.findByIdAndDelete(tripId)
    .then(() => res.json({ message: 'Trip deleted successfully' }))
    .catch(err => {
      console.error('Error deleting trip:', err.message);
      res.status(500).json({ error: err.message });
    });
});


// Fetch all trips
router.get('/newtrips', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    console.error('Error fetching trips:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get trips by travel place name
router.get('/newtrips/:place', async (req, res) => {
  try {
    const place = decodeURIComponent(req.params.place);
    console.log('Fetching trips for place:', place); // Debugging line
    const trips = await Trip.find({ travelplacename: place });
    if (trips.length === 0) {
      return res.status(404).json({ message: 'No trips found for this place' });
    }
    res.json(trips);
  } catch (error) {
    console.error('Error fetching trips:', error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
