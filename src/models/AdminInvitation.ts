import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdminInvitation extends Document {
  email: string;
  role_id: mongoose.Types.ObjectId;
  token: string;
  expires_at: Date;
  accepted_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const AdminInvitationSchema = new Schema<IAdminInvitation>(
  {
    email: { type: String, required: true },
    role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
    token: { type: String, required: true, unique: true },
    expires_at: { type: Date, required: true },
    accepted_at: { type: Date },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const AdminInvitation: Model<IAdminInvitation> =
  mongoose.models.AdminInvitation || mongoose.model<IAdminInvitation>('AdminInvitation', AdminInvitationSchema);
export default AdminInvitation;
