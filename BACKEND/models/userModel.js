const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  category: { type: String, required: true },
  totalPoints: { type: Number, default: 0 }
});

// Apply the plugin only if it hasn't been applied already
if (!userSchema.plugin.isApplied) {
  userSchema.plugin(AutoIncrement, { inc_field: 'userID' });
  userSchema.plugin.isApplied = true;
}

// Check if the model is already defined to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;
