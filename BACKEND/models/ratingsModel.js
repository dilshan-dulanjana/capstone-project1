const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  userId: { type: String },
  name: { type: String, required: true },
  totalPoints: { type: Number, required: true },
  rank: { type: Number, required: true }
});

module.exports = mongoose.model('Rating', ratingSchema);
