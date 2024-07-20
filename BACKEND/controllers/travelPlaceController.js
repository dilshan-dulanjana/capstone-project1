const TravelPlace = require('../models/TravelPlace');

const addTravelPlace = async (req, res) => {
  const {
    locationName,
    category,
    province,
    district,
    latitude,
    longitude,
    username,
    userId
  } = req.body;

  try {
    const newPlace = new TravelPlace({
      locationName,
      category,
      province,
      district,
      latitude,
      longitude,
      username,
      userId
    });

    await newPlace.save();
    res.status(201).json({ message: 'Travel place added successfully', newPlace });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  addTravelPlace,
};
