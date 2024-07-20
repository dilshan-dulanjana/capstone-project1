const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

// Route to update a trip
router.put('/update-trip/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { search, beforeYouGo, packingEssentials, duringYourVisit, afterYourVisit, travelPlaceId } = req.body;

    if (!search || !beforeYouGo || !packingEssentials || !duringYourVisit || !afterYourVisit || !travelPlaceId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      {
        search,
        beforeYouGo,
        packingEssentials,
        duringYourVisit,
        afterYourVisit,
        travelPlace: travelPlaceId
      },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip updated successfully', updatedTrip });
  } catch (error) {
    console.error('Error updating trip:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
