const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TourguideSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  languages: { type: String, required: true },
  telephone: { type: String, required: true },
  address: { type: String, required: true },
  registrationNo: { type: String, required: true },
  email: { type: String, required: true },
  validityStatus: { type: String, required: true },
  selectedImage: { type: String }, // You might store the image URL/path here
});
TourguideSchema.plugin(AutoIncrement, { inc_field: 'TourguideID' });

module.exports = mongoose.model('Tourguide', TourguideSchema);
