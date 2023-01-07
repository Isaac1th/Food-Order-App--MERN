import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },
});

const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  adjective: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;
