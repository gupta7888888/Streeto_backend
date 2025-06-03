const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true }, // e.g., 'burger', 'drink', 'combo'
  tags: [{ type: String }], // e.g., ['spicy', 'vegan', 'kids']
  
  // Pricing
  price: { type: Number, required: true },
  discount: {
    type: Number,
    default: 0, // percentage discount
    min: 0,
    max: 100,
  },
  currency: { type: String, default: 'NPR' },

  // Variants (e.g., small/medium/large or with cheese)
  variants: [
    {
      label: String,
      additionalPrice: Number,
      available: { type: Boolean, default: true }
    }
  ],

  // Availability
  isAvailable: { type: Boolean, default: true },
  availableTimes: {
    start: { type: String }, // e.g., "08:00"
    end: { type: String }    // e.g., "22:00"
  },

  // Inventory
  stock: { type: Number, default: 0 },
  sku: { type: String, unique: true, sparse: true },

  // Relations
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // seller/admin who added it

  // Images
  images: [{ type: String }], // URLs
  thumbnail: { type: String }, // primary image

  // Ratings and Reviews
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },

  // Nutrition Info (optional but useful)
  nutrition: {
    calories: Number,
    protein: Number,
    fat: Number,
    carbs: Number
  },

  // Flags
  isFeatured: { type: Boolean, default: false },
  isCombo: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },

  // Promo/Seasonal
  seasonal: {
    isSeasonal: { type: Boolean, default: false },
    startDate: { type: Date },
    endDate: { type: Date }
  },

}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
