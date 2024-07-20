const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const requestTravelPlacesSchema = new mongoose.Schema({
  locationName: { type: String, required: true },
  category: { type: String, required: true },
  province: { type: String, required: true },
  District: { type: String, required: true },  // Changed 'District' to 'district' for consistency
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  imageurl:{type:String},
  userName: { type: String },
  userID: { type: Number }
}, { timestamps: true });

requestTravelPlacesSchema.plugin(AutoIncrement, { inc_field: 'requestTravelPlacesID' });

module.exports = mongoose.model('RequestTravelPlaces', requestTravelPlacesSchema);
