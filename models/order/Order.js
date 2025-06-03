const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  // User & Store
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },

  // Ordered Items
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      selectedVariant: { type: String },
      priceAtOrder: { type: Number, required: true }
    }
  ],

  // Pricing Breakdown
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // flat discount amount or %
  tax: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  total: { type: Number, required: true },

  // Status Management
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'preparing',
      'ready',
      'out_for_delivery',
      'delivered',
      'cancelled'
    ],
    default: 'pending'
  },

  // Payment
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'wallet', 'upi', 'cod'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  transactionId: { type: String }, // optional for online payments

  // Delivery Info
  deliveryAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String, default: 'YourCountry' },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  deliveryTimeEstimate: { type: String }, // e.g. "45 mins", "18:30 PM"

  // Referral & Loyalty
  usedReferral: { type: String },
  earnedPoints: { type: Number, default: 0 },

  // Assigned Delivery Agent
  deliveryAgentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

  // Admin/Staff Info
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isCancelled: { type: Boolean, default: false },
  cancellationReason: { type: String },
  notes: { type: String },

  // Tracking
  currentLocation: {
    lat: Number,
    lng: Number,
    updatedAt: { type: Date }
  }

}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
