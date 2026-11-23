import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAddress extends Document {
  user_id: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  type: 'home' | 'work' | 'other';
  address_line1: string;
  address_line2?: string;
  landmark?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude?: number;
  longitude?: number;
  is_default: boolean;
  created_at: Date;
  updated_at: Date;
}

const AddressSchema = new Schema<IAddress>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    type: { type: String, enum: ['home', 'work', 'other'], default: 'home' },
    address_line1: { type: String, required: true },
    address_line2: { type: String },
    landmark: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, default: 'India' },
    latitude: { type: Number },
    longitude: { type: Number },
    is_default: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Address: Model<IAddress> = mongoose.models.Address || mongoose.model<IAddress>('Address', AddressSchema);
export default Address;
