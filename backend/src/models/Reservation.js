import { Schema, model } from 'mongoose';
import { STATUS_RESERVATIONS } from '../constants/reservation.constant.js';

const reservationSchema = new Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required.'],
      trim: true,
      maxlength: [100, 'Customer name is too long.'],
    },

    phone: {
      type: String,
      required: [true, 'Phone number is required.'],
      trim: true,
      match: [/^[0-9]{10,11}$/, 'Invalid phone number.'],
    },

    reservationTime: {
      type: Date,
      required: [true, 'Reservation time is required.'],
    },

    guests: {
      type: Number,
      required: [true, 'Number of guests is required.'],
      min: [1, 'Guests must be at least 1.'],
      max: [500, 'Guests cannot exceed 500.'],
    },

    status: {
      type: String,
      enum: {
        values: STATUS_RESERVATIONS,
        message: '{VALUE} is not a valid reservation status.',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

reservationSchema.index({
  reservationTime: 1,
  status: 1,
});

export default model('Reservation', reservationSchema);
