import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  password?: string;
  status: 'active' | 'inactive' | 'blocked';
  avatar?: string;
  google_id?: string;
  email_verified_at?: Date;
  current_mode: string;
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String },
    password: { type: String },
    status: { type: String, enum: ['active', 'inactive', 'blocked'], default: 'active' },
    avatar: { type: String },
    google_id: { type: String },
    email_verified_at: { type: Date },
    current_mode: { type: String, default: 'shopy' },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
