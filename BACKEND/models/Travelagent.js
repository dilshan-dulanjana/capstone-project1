const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TravelagentSchema = new Schema({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  web: { type: String },
  registrationNo: { type: String, required: true },
  licenseNo: { type: String, required: true },
  validityStatusOfLicense: { type: String, required: true },
  district: { type: String, required: true },
  telephone: { type: String, required: true },
  selectedImage: { type: String }, // You might store the image URL/path here
});

TravelagentSchema.plugin(AutoIncrement, { inc_field: 'agentID' });

module.exports = mongoose.model('Travelagent', TravelagentSchema);
