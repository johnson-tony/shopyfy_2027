import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  name: string;
  description?: string;
  type: 'fixed' | 'percentage' | 'free_delivery';
  value: number;
  min_order_amount: number;
  max_discount_amount?: number;
  mode_id?: mongoose.Types.ObjectId;
  usage_limit: number;
  usage_limit_per_user: number;
  starts_at?: Date;
  expires_at?: Date;
  status: boolean;
  created_at: Date;
  updated_at: Date;
}

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, index: true },
    name: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['fixed', 'percentage', 'free_delivery'], required: true },
    value: { type: Number, required: true, default: 0 },
    min_order_amount: { type: Number, default: 0 },
    max_discount_amount: { type: Number },
    mode_id: { type: Schema.Types.ObjectId, ref: 'Mode', default: null },
    usage_limit: { type: Number, default: 1000 },
    usage_limit_per_user: { type: Number, default: 1 },
    starts_at: { type: Date },
    expires_at: { type: Date },
    status: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Coupon: Model<ICoupon> = mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
export default Coupon;
