
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: Number,
  description: String,
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
});

export default mongoose.model('Product', productSchema);
