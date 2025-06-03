// 11. Referral Schema
const referralSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    referredUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    usedOn: { type: Date },
    rewardGiven: { type: Boolean, default: false },
    rewardAmount: { type: Number },
    rewardCurrency: { type: String, default: 'USD' },
    notes: { type: String },
    redeemedVia: { type: String, enum: ['app', 'website', 'other'], default: 'app' },
    isActive: { type: Boolean, default: true }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Referral', referralSchema);