const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  beforeYouGo: { type: String, required: true },
  packingEssentials: { type: String, required: true },
  duringYourVisit: { type: String, required: true },
  afterYourVisit: { type: String, required: true },
  travelplacename: { type: String },
  travelPlace: { type:String },
});

module.exports = mongoose.model('Trip', tripSchema);
