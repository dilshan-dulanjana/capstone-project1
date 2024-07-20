const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: { type: String, required: true },
  adminID: { type: Number },
  totalPoints: { type: Number, default: 0 }
});

adminSchema.plugin(AutoIncrement, { inc_field: 'adminID' });

module.exports = mongoose.model('AdminRequest', adminSchema);
  