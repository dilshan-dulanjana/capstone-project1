const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TravelPlaceSchema = new mongoose.Schema({
    locationName: { type: String, required: true },
    category: { type: String, required: true },
    province: { type: String, required: true },
    District: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    description: { type: String }, // Add description field
    userName: { type: String },
    imageurl:{type:String},
    userId: { type: Number },
}, { timestamps: true });

TravelPlaceSchema.plugin(AutoIncrement, { inc_field: 'TravelPlaceID' });

module.exports = mongoose.model('TravelPlace', TravelPlaceSchema);
