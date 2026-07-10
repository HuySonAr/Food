import { z } from 'zod';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import { STATUS_RESERVATIONS } from '../constants/reservation.constant.js';
import { zRequiredNUmber, zRequiredString } from '../utils/zod.util.js';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

const TZ = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh';
dayjs.tz.setDefault(TZ);

export const createReservationRequestDto = z
  .object({
    customerName: zRequiredString('Customer name')
      .trim()
      .min(2, 'Name must be at least 2 characters.')
      .max(100, 'Customer name is too long.'),
    phone: zRequiredString('Phone number')
      .trim()
      .regex(/^[0-9]{10,11}$/, 'Invalid phone number.'),
    date: zRequiredString('Reservation date').regex(
      /^\d{2}-\d{2}-\d{4}$/,
      'Date must be in DD-MM-YYYY format.',
    ),
    time: zRequiredString('Reservation time')
      .trim()
      .toUpperCase()
      .regex(
        /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/,
        'Time must be in 12-hour format (e.g. 06:30 PM).',
      ),
    guests: zRequiredNUmber('Number of guests')
      .int()
      .min(1, 'Guests must be at least 1.')
      .max(500, 'Guests cannot exceed 500.'),
  })
  .superRefine((val, ctx) => {
    const now = dayjs();

    const inputDate = dayjs(val.date, 'DD-MM-YYYY', true);
    if (inputDate.isValid() && inputDate.isBefore(now, 'day')) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['date'],
        message: 'Reservation date cannot be in the past.',
      });
      return;
    }

    const reservation = dayjs(
      `${val.date} ${val.time}`,
      'DD-MM-YYYY hh:mm A',
      true,
    );

    if (!reservation.isValid()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['time'],
        message: 'Invalid reservation date or time.',
      });
      return;
    }

    if (!reservation.isAfter(now)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['time'],
        message: `Reservation time must be later than the current time (${now.format('hh:mm A')}).`,
      });
    }
  })
  .transform((val) => {
    const combinedDate = dayjs(
      `${val.date} ${val.time}`,
      'DD-MM-YYYY hh:mm A',
      true,
    ).toDate();

    return {
      customerName: val.customerName,
      phone: val.phone,
      guests: val.guests,
      reservationTime: combinedDate,
      timeSlot: val.time,
    };
  });

export const getReservationsQueryDto = z.object({
  page: z.coerce
    .number()
    .int('Page must be an integer.')
    .min(1, 'Page must be greater than or equal to 1.')
    .optional()
    .default(1),

  limit: z.coerce
    .number()
    .int('Limit must be an integer.')
    .min(1, 'Limit must be at least 1.')
    .max(100, 'Limit cannot exceed 100.')
    .optional()
    .default(10),

  keyword: z.string().trim().max(100, 'Keyword is too long.').optional(),

  status: z.enum(STATUS_RESERVATIONS).optional(),

  time: z
    .string()
    .trim()
    .toUpperCase()
    .regex(
      /^(0[1-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/,
      'Time must be in 12-hour format (e.g. 06:30 PM).',
    )
    .optional(),

  sort: z.enum(['asc', 'desc']).default('asc'),
});

export const updateStatusRequestDto = z.object({
  status: z.enum(STATUS_RESERVATIONS, {
    error: (iss) =>
      iss.input === undefined ? 'Status is required.' : 'Invalid status value.',
  }),
});

export const updateReservationRequestDto = z
  .object({
    customerName: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters.')
      .max(100, 'Customer name is too long.')
      .optional(),
    phone: z
      .string()
      .trim()
      .regex(/^[0-9]{10,11}$/, 'Invalid phone number.')
      .optional(),
    date: z
      .string()
      .regex(/^\d{2}-\d{2}-\d{4}$/, 'Date must be in DD-MM-YYYY format.')
      .optional(),
    time: z
      .string()
      .trim()
      .toUpperCase()
      .regex(
        /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/,
        'Time must be in 12-hour format (e.g. 06:30 PM).',
      )
      .optional(),
    guests: z
      .string()
      .min(1, 'Guests must be at least 1.')
      .max(500, 'Guests cannot exceed 500.'),
  })
  .superRefine((val, ctx) => {
    if ((val.date && !val.time) || (!val.date && val.time)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['time'],
        message:
          'Both date and time must be provided together to update schedule.',
      });
    }
  });
