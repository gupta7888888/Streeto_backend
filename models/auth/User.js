const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Role-based Access
  role: {
    type: String,
    enum: ['customer', 'seller', 'delivery', 'admin', 'staff'],
    default: 'customer',
  },

  // Address Info
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String, default: 'YourCountry' },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    }
  },

  // Food Preferences
  preferences: {
    preferredSnacks: [{ type: String }], // e.g. ['fries', 'nuggets']
    preferredMeals: {
      morning: [{ type: String }],
      lunch: [{ type: String }],
      evening: [{ type: String }],
    },
    occasionalLikes: [{ type: String }], // e.g. ['cake', 'ice cream']
  },

  // Seller Info
  storeName: { type: String },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' },

  // Delivery Staff Info
  vehicleType: { type: String, enum: ['bike', 'car', 'scooter', 'other'] },
  licenseNumber: { type: String },
  availabilityStatus: { type: Boolean, default: false },

  // Account & Activity
  isEmailVerified: { type: Boolean, default: false },
  isMobileVerified: { type: Boolean, default: false },
  profileImage: { type: String },
  lastLogin: { type: Date },

  // Referral & Rewards
  referralCode: { type: String, unique: true, sparse: true },
  referredBy: { type: String },
  loyaltyPoints: { type: Number, default: 0 },

  // Notifications & Preferences
  pushToken: { type: String },
  preferredLanguage: { type: String, default: 'en' },
  receivePromos: { type: Boolean, default: true },

  // Admin/Staff Specific
  permissions: [{ type: String }], // e.g., ['manage_users']

  // Deactivation & Status
  isActive: { type: Boolean, default: true },
  deletedAt: { type: Date },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
