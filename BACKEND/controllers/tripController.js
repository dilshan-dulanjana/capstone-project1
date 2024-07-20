const mongoose = require('mongoose');
const Trip = require('../models/Trip');
const TravelPlace = require('../models/TravelPlace');

const createTrip = async (req, res) => {
    try {
      const tripData = {
        ...req.body,
        travelPlace: mongoose.Types.ObjectId(req.body.travelPlace)
      };
      const newTrip = new Trip(tripData);
      const savedTrip = await newTrip.save();
      res.json({ newTrip: savedTrip });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  const updateTrip = async (req, res) => {
    try {
      const tripData = {
        ...req.body,
        travelPlace: mongoose.Types.ObjectId(req.body.travelPlace)
      };
      const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, tripData, { new: true });
      res.json(updatedTrip);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const deleteTrip = async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTripsByTravelPlace = async (req, res) => {
  try {
    const travelPlaceId = req.params.travelPlaceId;
    const trips = await Trip.find({ travelPlace: travelPlaceId });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const searchTravelPlaces = async (req, res) => {
  try {
    const query = req.query.query;
    const results = await TravelPlace.find({ locationName: new RegExp(query, 'i') });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTravelPlaceByName = async (req, res) => {
  try {
    const name = req.params.name;
    const place = await TravelPlace.findOne({ locationName: name });
    res.json(place);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTrip,
  updateTrip,
  deleteTrip,
  getTripsByTravelPlace,
  searchTravelPlaces,
  getTravelPlaceByName
};
