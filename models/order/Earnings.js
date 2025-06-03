const mongoose = require('mongoose');

const earningsSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Earnings breakdown
  totalEarned: { type: Number, default: 0 },
  totalWithdrawn: { type: Number, default: 0 },
  currentBalance: { type: Number, default: 0 }, // totalEarned - totalWithdrawn

  // Optional: transaction history
  transactions: [
    {
      orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      amount: { type: Number, required: true },
      type: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
      },
      description: String, // e.g. "Order #1234", "Payout"
      createdAt: { type: Date, default: Date.now }
    }
  ],

  // Payout info
  lastPayoutDate: { type: Date },
  payoutMethod: {
    type: String,
    enum: ['bank', 'upi', 'paypal'],
    default: 'bank'
  },

  // Audit
  lastUpdated: { type: Date, default: Date.now }

}, { timestamps: true });

module.exports = mongoose.model('Earnings', earningsSchema);
