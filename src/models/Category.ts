import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  mode_id: mongoose.Types.ObjectId;
  parent_id?: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  sort_order: number;
  status: boolean;
  is_featured: boolean;
  created_at: Date;
  updated_at: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    mode_id: { type: Schema.Types.ObjectId, ref: 'Mode', required: true, index: true },
    parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null, index: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    image: { type: String },
    icon: { type: String },
    sort_order: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    is_featured: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema);
export default Category;
