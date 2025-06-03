const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { 
    type: String, 
    required: true, 
    trim: true,
    unique: true,
    minlength: 2,
    maxlength: 100
  },
  description: { type: String, trim: true, maxlength: 1000 },
  address: {
    street: { type: String, trim: true, required: true },
    city: { type: String, trim: true, required: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, default: 'YourCountry', trim: true },
    coordinates: {
      lat: {
        type: Number,
        min: -90,
        max: 90,
        required: true
      },
      lng: {
        type: Number,
        min: -180,
        max: 180,
        required: true
      }
    }
  },
  openingHours: {
    start: {
      type: String, 
      required: true, 
      match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // e.g. '08:00'
    },
    end: {
      type: String, 
      required: true, 
      match: /^([0-1]\d|2[0-3]):([0-5]\d)$/, // e.g. '22:00'
    },
    daysOpen: {
      type: [String], // e.g. ['Monday', 'Tuesday', 'Wednesday', ...]
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  contact: {
    phone: { 
      type: String, 
      trim: true,
      match: /^\+?[1-9]\d{1,14}$/, // E.164 international phone format
    },
    email: { 
      type: String, 
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/, // basic email regex validation
    },
    website: { type: String, trim: true, match: /^https?:\/\/.+$/i } // optional website URL
  },
  socialMedia: {
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },
    twitter: { type: String, trim: true }
  },
  isActive: { type: Boolean, default: true, index: true },
  logo: { type: String, trim: true },   // URL of logo image
  banner: { type: String, trim: true }, // URL of banner image

  // Extra fields
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0, min: 0 }
  },

  metadata: {
    createdByIp: { type: String }, // store creation IP
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // user who last updated
  }

}, { timestamps: true });

module.exports = mongoose.model('Store', storeSchema);
