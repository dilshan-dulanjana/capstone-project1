const express = require('express');
const router = express.Router();
const AdminRequest = require('../models/AdminModel');
const User = require('../models/UserModel');

// Fetch all admin requests
router.get('/admins', async (req, res) => {
  try {
    const admins = await AdminRequest.find();
    res.json(admins);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Approve admin request
router.post('/admins/approve/:id', async (req, res) => {
  try {
    const admin = await AdminRequest.findById(req.params.id);
    if (!admin) {
      return res.status(404).send('Admin request not found');
    }

    const newUser = new User({
      name: admin.name,
      email: admin.email,
      password: admin.password,
      category: admin.category,
      totalPoints: admin.totalPoints,
    });

    await newUser.save();
    await AdminRequest.findByIdAndDelete(req.params.id);

    res.send('Admin approved and moved to users');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Delete admin request
router.delete('/admins/:id', async (req, res) => {
  try {
    const admin = await AdminRequest.findById(req.params.id);
    if (!admin) {
      return res.status(404).send('Admin request not found');
    }

    await AdminRequest.findByIdAndDelete(req.params.id);
    res.send('Admin request deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
