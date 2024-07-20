const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const accommodationSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  category: { type: String, required: true },
  province: { type: String, required: true },
  District: { type: String },
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  userName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId },
  description: { type: String },
  availablerooms:{type:Number},
  emailaddress:{type:String},
  address:{type:String},
  telephoneNumber:{type:String},
  bookingurl:{type:String},

  imageurl: { type: String, required: true },
}, { timestamps: true });

accommodationSchema.plugin(AutoIncrement, { inc_field: 'AccommodationID' });

module.exports = mongoose.model('Accommodation', accommodationSchema);
