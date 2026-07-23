import { model, Schema } from 'mongoose';
import { STATUS_CONTACTS } from '../constants/contact.constant.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required.'],
      trim: true,
      maxlength: [100, 'Name is too long.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'],
    },
    subject: {
      type: String,
      trim: true,
      default: 'General Inquiry',
      maxlength: [200, 'Subject is too long.'],
    },
    message: {
      type: String,
      required: [true, 'Message is required.'],
      trim: true,
      maxlength: [2000, 'Message cannot exceed 2000 characters.'],
    },
    status: {
      type: String,
      enum: {
        values: STATUS_CONTACTS,
        message: '{VALUE} is not a valid contact status.',
      },
      default: 'pending',
    },
    adminNotes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true },
);

contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

export default model('Contact', contactSchema);
