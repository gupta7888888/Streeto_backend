// models/storeModel.js
const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true }, // one-line address for now
}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
