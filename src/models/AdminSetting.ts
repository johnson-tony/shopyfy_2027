import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminSetting extends Document {
  is_dark_mode: boolean;
  site_name: string;
  site_logo?: string;
  is_delivery_enabled: boolean;
  delivery_enabled_shopy: boolean;
  delivery_enabled_minutes: boolean;
  delivery_enabled_food: boolean;
  upi_id?: string;
  upi_merchant_name?: string;
  upi_qr_image?: string;
  is_cod_enabled: boolean;
  is_upi_enabled: boolean;
  is_card_enabled: boolean;
  created_at: Date;
  updated_at: Date;
}

const AdminSettingSchema = new Schema<IAdminSetting>(
  {
    is_dark_mode: { type: Boolean, default: false },
    site_name: { type: String, default: 'Shopy' },
    site_logo: { type: String, default: '/images/logo/logo.png' },
    is_delivery_enabled: { type: Boolean, default: true },
    delivery_enabled_shopy: { type: Boolean, default: false },
    delivery_enabled_minutes: { type: Boolean, default: true },
    delivery_enabled_food: { type: Boolean, default: false },
    upi_id: { type: String, default: 'merchant@upi' },
    upi_merchant_name: { type: String, default: 'Shopy Store' },
    upi_qr_image: { type: String },
    is_cod_enabled: { type: Boolean, default: true },
    is_upi_enabled: { type: Boolean, default: true },
    is_card_enabled: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const AdminSetting: Model<IAdminSetting> =
  mongoose.models.AdminSetting || mongoose.model<IAdminSetting>('AdminSetting', AdminSettingSchema);
export default AdminSetting;
