const express = require('express');
const router = express.Router();
const Tourguide = require('../models/Tourguide');

// Create a new tour guide
router.post('/', async (req, res) => {
  const { name, category, languages, telephone, address, registrationNo, email, validityStatus, selectedImage } = req.body;
  try {
    const newTourguide = new Tourguide({
      name,
      category,
      languages,
      telephone,
      address,
      registrationNo,
      email,
      validityStatus,
      selectedImage
    });
    const savedTourguide = await newTourguide.save();
    res.status(201).json(savedTourguide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tour guides
router.get('/', async (req, res) => {
  try {
    const tourguides = await Tourguide.find();
    res.status(200).json(tourguides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search for tour guides by name
router.get('/search', async (req, res) => {
  const { name } = req.query;
  try {
    const tourguides = await Tourguide.find({ name: { $regex: name, $options: 'i' } });
    res.status(200).json(tourguides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a tour guide
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTourguide = await Tourguide.findByIdAndDelete(id);
    if (!deletedTourguide) {
      return res.status(404).json({ message: 'Tour guide not found' });
    }
    res.status(200).json({ message: 'Tour guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a tour guide
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTourguide = await Tourguide.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTourguide) {
      return res.status(404).json({ message: 'Tour guide not found' });
    }
    res.status(200).json(updatedTourguide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
