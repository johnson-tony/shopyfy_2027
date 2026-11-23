import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICouponUsage extends Document {
  coupon_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  order_id: mongoose.Types.ObjectId;
  discount_amount: number;
  created_at: Date;
  updated_at: Date;
}

const CouponUsageSchema = new Schema<ICouponUsage>(
  {
    coupon_id: { type: Schema.Types.ObjectId, ref: 'Coupon', required: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    order_id: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    discount_amount: { type: Number, required: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const CouponUsage: Model<ICouponUsage> =
  mongoose.models.CouponUsage || mongoose.model<ICouponUsage>('CouponUsage', CouponUsageSchema);
export default CouponUsage;
