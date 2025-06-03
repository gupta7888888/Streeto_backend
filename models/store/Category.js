// 9. Category Schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    description: { type: String },
    image: { type: String },
    banner: { type: String }, // Optional larger image for category page
    icon: { type: String },   // Optional small icon for menus
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    sortOrder: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    seoMeta: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }]
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Category', categorySchema);
  