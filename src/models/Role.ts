import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IRole extends Document {
  name: string;
  slug: string;
  description?: string;
  status: boolean;
  permissions: mongoose.Types.ObjectId[];
  modes: mongoose.Types.ObjectId[];
  created_at: Date;
  updated_at: Date;
}

const RoleSchema = new Schema<IRole>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    status: { type: Boolean, default: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
    modes: [{ type: Schema.Types.ObjectId, ref: 'Mode' }],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Role: Model<IRole> = mongoose.models.Role || mongoose.model<IRole>('Role', RoleSchema);
export default Role;
