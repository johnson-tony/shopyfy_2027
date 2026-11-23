import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISupportMessage {
  _id?: mongoose.Types.ObjectId;
  sender_type: 'user' | 'admin' | 'system';
  sender_id?: mongoose.Types.ObjectId;
  sender_name: string;
  message: string;
  attachments?: string[];
  created_at: Date;
}

export interface ISupportTicket extends Document {
  ticket_number: string;
  user_id?: mongoose.Types.ObjectId;
  order_id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assigned_admin_id?: mongoose.Types.ObjectId;
  partner_contacted: boolean;
  partner_contact_notes?: string;
  resolved_at?: Date;
  messages: ISupportMessage[];
  created_at: Date;
  updated_at: Date;
}

const SupportMessageSchema = new Schema<ISupportMessage>({
  sender_type: { type: String, enum: ['user', 'admin', 'system'], required: true },
  sender_id: { type: Schema.Types.ObjectId },
  sender_name: { type: String, required: true },
  message: { type: String, required: true },
  attachments: [{ type: String }],
  created_at: { type: Date, default: Date.now },
});

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    ticket_number: { type: String, required: true, unique: true, index: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    order_id: { type: Schema.Types.ObjectId, ref: 'Order' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, required: true },
    category: { type: String, default: 'general' },
    priority: { type: String, enum: ['low', 'normal', 'high', 'urgent'], default: 'normal' },
    status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
    assigned_admin_id: { type: Schema.Types.ObjectId, ref: 'Admin' },
    partner_contacted: { type: Boolean, default: false },
    partner_contact_notes: { type: String },
    resolved_at: { type: Date },
    messages: [SupportMessageSchema],
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

export const SupportTicket: Model<ISupportTicket> =
  mongoose.models.SupportTicket || mongoose.model<ISupportTicket>('SupportTicket', SupportTicketSchema);
export default SupportTicket;
