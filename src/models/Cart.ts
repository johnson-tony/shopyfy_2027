import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICartItem {
  _id?: mongoose.Types.ObjectId;
  product_id: mongoose.Types.ObjectId;
  quantity: number;
  color?: string;
  size?: string;
  selected_addons?: Array<{ name: string; price: number }>;
  unit_price: number;
}

export interface ICart extends Document {
  user_id?: mongoose.Types.ObjectId;
  session_id?: string;
  mode_id: mongoose.Types.ObjectId;
  coupon_code?: string;
  discount_amount: number;
  notes?: string;
  items: ICartItem[];
  created_at: Date;
  updated_at: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  color: { type: String },
  size: { type: String },
  selected_addons: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  unit_price: { type: Number, required: true },
});

const CartSchema = new Schema<ICart>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    session_id: { type: String, index: true },
    mode_id: { type: Schema.Types.ObjectId, ref: 'Mode', required: true },
    coupon_code: { type: String },
    discount_amount: { type: Number, default: 0 },
    notes: { type: String },
    items: [CartItemSchema],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);
export default Cart;
