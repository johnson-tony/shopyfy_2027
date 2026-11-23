import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  phone?: string;
  password: string;
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  roles: mongoose.Types.ObjectId[];
  allowed_modes: mongoose.Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String },
    password: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive', 'suspended'], default: 'active' },
    avatar: { type: String },
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    allowed_modes: [{ type: Schema.Types.ObjectId, ref: 'Mode' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Admin: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
export default Admin;
