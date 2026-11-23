import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductAddon {
  name: string;
  price: number;
  is_required?: boolean;
}

export interface IProduct extends Document {
  mode_id: mongoose.Types.ObjectId;
  category_id?: mongoose.Types.ObjectId;
  restaurant_id?: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  sale_price?: number;
  stock: number;
  description?: string;
  short_description?: string;
  image?: string;
  gallery: string[];
  colors: string[];
  sizes: string[];
  addons: IProductAddon[];
  delivery_time?: string;
  return_policy?: string;
  is_featured: boolean;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    mode_id: { type: Schema.Types.ObjectId, ref: 'Mode', required: true, index: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', index: true },
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'Restaurant', index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    sku: { type: String },
    price: { type: Number, required: true },
    sale_price: { type: Number },
    stock: { type: Number, default: 100 },
    description: { type: String },
    short_description: { type: String },
    image: { type: String },
    gallery: [{ type: String }],
    colors: [{ type: String }],
    sizes: [{ type: String }],
    addons: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        is_required: { type: Boolean, default: false },
      },
    ],
    delivery_time: { type: String, default: 'Standard Delivery (2-4 Days)' },
    return_policy: { type: String, default: '7 Days Replacement / Return' },
    is_featured: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
