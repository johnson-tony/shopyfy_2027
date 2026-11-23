import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  slug: string;
  group: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

const PermissionSchema = new Schema<IPermission>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    group: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Permission: Model<IPermission> =
  mongoose.models.Permission || mongoose.model<IPermission>('Permission', PermissionSchema);
export default Permission;
