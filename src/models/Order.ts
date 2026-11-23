import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  _id?: mongoose.Types.ObjectId;
  product_id?: mongoose.Types.ObjectId;
  product_name: string;
  product_slug: string;
  restaurant_name?: string;
  product_image?: string;
  color?: string;
  size?: string;
  selected_addons?: Array<{ name: string; price: number }>;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface IOrder extends Document {
  order_number: string;
  user_id: mongoose.Types.ObjectId;
  mode_id: mongoose.Types.ObjectId;
  delivery_partner_id?: mongoose.Types.ObjectId;
  return_partner_id?: mongoose.Types.ObjectId;
  shipping_address: {
    name: string;
    phone: string;
    address_line1: string;
    address_line2?: string;
    landmark?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    type?: string;
    latitude?: number;
    longitude?: number;
  };
  status:
    | 'confirmed'
    | 'processing'
    | 'ready-for-delivery'
    | 'delivery-assigned'
    | 'picked-up'
    | 'shipped'
    | 'out-for-delivery'
    | 'delivered'
    | 'cancelled'
    | 'return-requested'
    | 'return-approved'
    | 'return-rejected'
    | 'returned';
  payment_method: 'pay_on_delivery' | 'mock_upi' | 'mock_card' | 'mock_netbanking';
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
  subtotal: number;
  delivery_fee: number;
  tax_amount: number;
  discount_amount: number;
  coupon_code?: string;
  grand_total: number;
  notes?: string;
  items: IOrderItem[];
  delivery_proof_image?: string;
  delivery_notes?: string;
  return_status?: string;
  return_reason?: string;
  return_note?: string;
  return_image?: string;
  return_requested_at?: Date;
  return_resolved_at?: Date;
  return_rejection_reason?: string;
  return_pickup_image?: string;
  return_pickup_notes?: string;
  delivered_at?: Date;
  cancelled_at?: Date;
  cancellation_reason?: string;
  created_at: Date;
  updated_at: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  product_id: { type: Schema.Types.ObjectId, ref: 'Product' },
  product_name: { type: String, required: true },
  product_slug: { type: String, required: true },
  restaurant_name: { type: String },
  product_image: { type: String },
  color: { type: String },
  size: { type: String },
  selected_addons: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    order_number: { type: String, required: true, unique: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    mode_id: { type: Schema.Types.ObjectId, ref: 'Mode', required: true, index: true },
    delivery_partner_id: { type: Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    return_partner_id: { type: Schema.Types.ObjectId, ref: 'DeliveryPartner' },
    shipping_address: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address_line1: { type: String, required: true },
      address_line2: { type: String },
      landmark: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, default: 'India' },
      type: { type: String, default: 'home' },
      latitude: { type: Number },
      longitude: { type: Number },
    },
    status: {
      type: String,
      enum: [
        'confirmed',
        'processing',
        'ready-for-delivery',
        'delivery-assigned',
        'picked-up',
        'shipped',
        'out-for-delivery',
        'delivered',
        'cancelled',
        'return-requested',
        'return-approved',
        'return-rejected',
        'returned',
      ],
      default: 'confirmed',
      index: true,
    },
    payment_method: {
      type: String,
      enum: ['pay_on_delivery', 'mock_upi', 'mock_card', 'mock_netbanking'],
      default: 'pay_on_delivery',
    },
    payment_status: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    subtotal: { type: Number, required: true },
    delivery_fee: { type: Number, default: 0 },
    tax_amount: { type: Number, default: 0 },
    discount_amount: { type: Number, default: 0 },
    coupon_code: { type: String },
    grand_total: { type: Number, required: true },
    notes: { type: String },
    items: [OrderItemSchema],
    delivery_proof_image: { type: String },
    delivery_notes: { type: String },
    return_status: { type: String },
    return_reason: { type: String },
    return_note: { type: String },
    return_image: { type: String },
    return_requested_at: { type: Date },
    return_resolved_at: { type: Date },
    return_rejection_reason: { type: String },
    return_pickup_image: { type: String },
    return_pickup_notes: { type: String },
    delivered_at: { type: Date },
    cancelled_at: { type: Date },
    cancellation_reason: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
