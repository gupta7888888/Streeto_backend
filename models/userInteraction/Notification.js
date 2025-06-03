// 10. Notification Schema
const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['order', 'promo', 'system', 'feedback', 'account'],
      default: 'system'
    },
    icon: { type: String }, // optional icon URL or icon name
    url: { type: String }, // optional link to a resource
    metadata: { type: Object }, // any additional payload like orderId, productId, etc.
    read: { type: Boolean, default: false },
    readAt: { type: Date },
    sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin/staff who triggered the notification
    scheduledAt: { type: Date } // if the notification is to be sent later
  }, { timestamps: true });
  
  module.exports = mongoose.model('Notification', notificationSchema);
  