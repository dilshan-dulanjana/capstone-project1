const mongoose = require('mongoose');

const PackingListSchema = new mongoose.Schema({
  travelplacename: { type: String, required: true },
  clothing: { type: String, required: true },
  essentials: { type: String, required: true },
  accessories: { type: String, required: true },
  miscellaneous: { type: String, required: true },
  travelPlace: { type: String }
});

module.exports = mongoose.model('PackingList', PackingListSchema);
