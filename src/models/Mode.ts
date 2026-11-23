import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMode extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  status: boolean;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

const ModeSchema = new Schema<IMode>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String },
    icon: { type: String },
    image: { type: String },
    status: { type: Boolean, default: true },
    sort_order: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const Mode: Model<IMode> = mongoose.models.Mode || mongoose.model<IMode>('Mode', ModeSchema);
export default Mode;
