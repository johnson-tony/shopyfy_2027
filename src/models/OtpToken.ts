import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOtpToken extends Document {
  email: string;
  otp: string;
  token?: string;
  type: 'verification' | 'reset';
  expires_at: Date;
  verified_at?: Date;
  created_at: Date;
  updated_at: Date;
}

const OtpTokenSchema = new Schema<IOtpToken>(
  {
    email: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    token: { type: String, index: true },
    type: { type: String, enum: ['verification', 'reset'], default: 'verification' },
    expires_at: { type: Date, required: true },
    verified_at: { type: Date },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const OtpToken: Model<IOtpToken> =
  mongoose.models.OtpToken || mongoose.model<IOtpToken>('OtpToken', OtpTokenSchema);
export default OtpToken;
