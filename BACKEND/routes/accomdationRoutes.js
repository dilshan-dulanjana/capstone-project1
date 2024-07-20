const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Route to search accommodations by name
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const accommodations = await Accommodation.find({ locationName: { $regex: new RegExp(name, 'i') } });
    res.status(200).json(accommodations);
  } catch (error) {
    console.error('Error searching accommodations:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new accommodation
router.post('/accommodations', async (req, res) => {
  try {
    const { locationName, category, province, district, latitude, longitude, userName, userId, description,availablerooms,emailaddress,address, telephoneNumber, imageurl } = req.body;

    const newAccommodation = new Accommodation({
      locationName,
      category,
      province,
      district,
      latitude,
      longitude,
      userName,
      userId,
      description,
      availablerooms,
      emailaddress,
      address,
      telephoneNumber,
      imageurl
    });

    const savedAccommodation = await newAccommodation.save();
    res.status(201).json(savedAccommodation);
  } catch (error) {
    console.error('Error adding accommodation:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

///////////////////////////////////////////////



// Route to get accommodation by ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  // Validate if the ID is a valid ObjectId
  if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid accommodation ID' });
  }

  try {
      const accommodation = await Accommodation.findOne({ _id: id });
      if (!accommodation) {
          return res.status(404).json({ message: 'Accommodation not found' });
      }
      res.json(accommodation);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching accommodation', error });
  }
});

// Route to create accommodation
router.post('/create', async (req, res) => {
  try {
      const accommodation = new Accommodation(req.body);
      await accommodation.save();
      res.status(201).json(accommodation);
  } catch (error) {
      res.status(400).json({ message: 'Error creating accommodation', error });
  }
});

// Route to update accommodation
router.put('/update/:id', async (req, res) => {
  try {
      const updatedAccommodation = await Accommodation.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
      );
      res.json(updatedAccommodation);
  } catch (error) {
      res.status(400).json({ message: 'Error updating accommodation', error });
  }
});

// Route to delete accommodation
router.delete('/delete/:id', async (req, res) => {
  try {
      await Accommodation.findOneAndDelete({ _id: req.params.id });
      res.json({ message: 'Accommodation deleted successfully' });
  } catch (error) {
      res.status(400).json({ message: 'Error deleting accommodation', error });
  }
});



///////////////////////////////////


module.exports = router;
