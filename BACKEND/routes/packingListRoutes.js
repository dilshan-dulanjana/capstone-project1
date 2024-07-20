const express = require('express');
const router = express.Router();
const PackingList = require('../models/PackingList');

// Create a new packing list
router.post('/', async (req, res) => {
  try {
    const packingList = new PackingList(req.body);
    const savedPackingList = await packingList.save();
    res.status(201).json(savedPackingList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Search packing lists
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const results = await PackingList.find({ travelplacename: new RegExp(query, 'i') });
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a packing list
router.put('/:id', async (req, res) => {
  try {
    const updatedPackingList = await PackingList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPackingList);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a packing list
router.delete('/:id', async (req, res) => {
  try {
    await PackingList.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Packing list deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Search for packing lists by travel place name
router.get('/search', async (req, res) => {
    try {
      const query = req.query.query;
      const results = await PackingList.find({ travelplacename: { $regex: query, $options: 'i' } });
      res.json(results);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;
