// 8. Feedback Schema
const feedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }, // Optional, if related to a specific order
    message: { type: String, required: true },
    category: {
      type: String,
      enum: ['complaint', 'suggestion', 'inquiry', 'other'],
      default: 'other'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    response: { type: String },
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin/staff who responded
    resolved: { type: Boolean, default: false },
    resolvedAt: { type: Date },
    attachments: [{ type: String }] // Optional screenshot/image URLs
  }, { timestamps: true });
  
  module.exports = mongoose.model('Feedback', feedbackSchema);
  