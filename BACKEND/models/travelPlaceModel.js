const mongoose = require('mongoose');

const travelPlaceSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  category: { type: String, required: true },
  username: { type: String, required: true },
  province: { type: String, required: true },
  District: { type: String, required: true },
  images: { type: [String], required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const TravelPlace = mongoose.model('TravelPlacebbb', travelPlaceSchema);

module.exports = TravelPlace;
