const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },

  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, trim: true },
  
  isVerified: { type: Boolean, default: false }, // e.g. verified purchase
  
  // Additional info
  photos: [{ type: String }], // array of image URLs uploaded by user
  helpfulCount: { type: Number, default: 0 }, // number of users who found this review helpful
  flagged: { type: Boolean, default: false }, // for moderation
  
  // Admin or Seller response
  response: {
    responder: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // admin/seller who responded
    message: { type: String },
    respondedAt: { type: Date }
  }

}, { timestamps: true });

// Optional: Index to prevent multiple reviews per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = mongoose.model('Review', reviewSchema);
