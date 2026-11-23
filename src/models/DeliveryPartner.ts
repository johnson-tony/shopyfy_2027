import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDeliveryPartner extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  vehicle_type: 'bike' | 'scooter' | 'van';
  status: 'pending' | 'active' | 'suspended' | 'rejected';
  is_available: boolean;
  latitude?: number;
  longitude?: number;
  location_source: string;
  allowed_modes: string[];
  created_at: Date;
  updated_at: Date;
}

const DeliveryPartnerSchema = new Schema<IDeliveryPartner>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    vehicle_type: { type: String, enum: ['bike', 'scooter', 'van'], default: 'bike' },
    status: { type: String, enum: ['pending', 'active', 'suspended', 'rejected'], default: 'active' },
    is_available: { type: Boolean, default: true },
    latitude: { type: Number, default: 13.08268 },
    longitude: { type: Number, default: 80.270718 },
    location_source: { type: String, default: 'static' },
    allowed_modes: [{ type: String, default: 'shopy' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const DeliveryPartner: Model<IDeliveryPartner> =
  mongoose.models.DeliveryPartner || mongoose.model<IDeliveryPartner>('DeliveryPartner', DeliveryPartnerSchema);
export default DeliveryPartner;
