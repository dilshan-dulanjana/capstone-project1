const express = require('express');
const multer = require('multer');
const TravelAgent = require('../models/Travelagent'); // Adjust the path as necessary

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

// GET all travel agents
router.get('/', async (req, res) => {
  try {
    const travelAgents = await TravelAgent.find();
    res.json(travelAgents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new travel agent
router.post('/', upload.single('selectedImage'), async (req, res) => {
  const { companyName, address, web, registrationNo, licenseNo, validityStatusOfLicense, district, telephone } = req.body;
  const image = req.file ? req.file.path : '';

  const travelAgent = new TravelAgent({
    companyName,
    address,
    web,
    registrationNo,
    licenseNo,
    validityStatusOfLicense,
    district,
    telephone,
    image,
  });

  try {
    const newTravelAgent = await travelAgent.save();
    res.status(201).json(newTravelAgent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH (update) a travel agent
router.patch('/:id', async (req, res) => {
  try {
    const updatedTravelAgent = await TravelAgent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTravelAgent) {
      return res.status(404).json({ message: 'Travel agent not found' });
    }
    res.json(updatedTravelAgent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a travel agent
router.delete('/:id', async (req, res) => {
  try {
    const deletedTravelAgent = await TravelAgent.findByIdAndDelete(req.params.id);
    if (!deletedTravelAgent) {
      return res.status(404).json({ message: 'Travel agent not found' });
    }
    res.json({ message: 'Travel agent deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
