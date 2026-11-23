import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProductReview extends Document {
  product_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  user_name: string;
  rating: number;
  title?: string;
  comment: string;
  images: string[];
  is_verified_purchase: boolean;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

const ProductReviewSchema = new Schema<IProductReview>(
  {
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    user_name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String },
    comment: { type: String, required: true },
    images: [{ type: String }],
    is_verified_purchase: { type: Boolean, default: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const ProductReview: Model<IProductReview> =
  mongoose.models.ProductReview || mongoose.model<IProductReview>('ProductReview', ProductReviewSchema);
export default ProductReview;
