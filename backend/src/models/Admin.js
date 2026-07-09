import { model, Schema } from 'mongoose';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';

const adminSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email format.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    role: {
      type: String,
      default: 'admin',
      immutable: true,
    },
    resetOtp: {
      type: String,
    },
    resetOtpExpire: {
      type: Date,
    },
  },
  { timestamps: true },
);

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return
  }

  this.password = await hashPassword(this.password);
});

adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await comparePassword(enteredPassword, this.password);
};

export default model('Admin', adminSchema);
