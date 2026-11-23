import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWishlist extends Document {
  user_id: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  mode_id: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

const WishlistSchema = new Schema<IWishlist>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    mode_id: { type: Schema.Types.ObjectId, ref: 'Mode', required: true, index: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

WishlistSchema.index({ user_id: 1, product_id: 1, mode_id: 1 }, { unique: true });

export const Wishlist: Model<IWishlist> =
  mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema);
export default Wishlist;
