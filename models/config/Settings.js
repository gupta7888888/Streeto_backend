const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-z0-9_.-]+$/,  // enforce simple keys like 'payment.timeout', 'ui.theme'
    index: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed, // supports any value type: string, number, object, array, boolean
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  group: {
    type: String,
    default: 'general',
    trim: true,
    index: true,
  },
  dataType: {
    type: String,
    enum: ['string', 'number', 'boolean', 'object', 'array', 'mixed'],
    default: 'mixed',
    required: true
  },
  editable: {
    type: Boolean,
    default: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  validation: {
    type: Object,
    default: null,
    // Optional JSON Schema or custom validation rules
    // e.g., { min: 0, max: 100 } or { regex: "^https?://" }
  },
  lastUpdatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [{ type: String, lowercase: true, trim: true }], // e.g. ['payment', 'feature-toggle']
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
