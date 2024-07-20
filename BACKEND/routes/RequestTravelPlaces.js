const express = require('express');
const router = express.Router();
const requesttravelPlaces = require('../models/requesttravelPlaces');  // Assuming 'requesttravelPlaces' is correct
const auth = require('../middleware/auth');

router.get('/api/travel-places', async (req, res) => {
  try {
    const travelPlaces = await requesttravelPlaces.find({});
    res.json(travelPlaces);
  } catch (error) {
    console.error('Error fetching travel places:', error);
    res.status(500).send('Server Error');
  }
});