const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  address: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  dob: { type: String, unique: true },
  email: { type: String, unique: true },
  phone: { type: String, default: null }
});

module.exports = mongoose.model('patient', patientSchema);
