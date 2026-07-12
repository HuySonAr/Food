import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';
import Reservation from '../models/Reservation.js';
import sendEmail from '../utils/sendEmail.js';
import ApiError from '../utils/ApiError.js';
import { RES_CODE } from '../constants/responseCode.constant.js';

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * @desc    Khách hàng tạo đơn đặt bàn mới (Kèm gửi email thông báo cho Admin)
 */
export const createReservationService = async (data) => {
  const existedReservation = await Reservation.findOne({
    phone: data.phone,
    reservationTime: data.reservationTime,
    status: {
      $in: ['pending', 'confirmed'],
    },
  });

  if (existedReservation) {
    throw new ApiError(
      'You already have a reservation at this date and time.',
      409,
    );
  }

  const reservation = await Reservation.create(data);

  const TZ = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh';
  const localReservationTime = dayjs(reservation.reservationTime).tz(TZ);

  const reservationDate = localReservationTime.format('DD-MM-YYYY');
  const reservationHour = localReservationTime.format('hh:mm A');

  const adminEmail = process.env.ADMIN_EMAIL;
  const linkDashboard = process.env.LINK_DASHBOARD;

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      
      <h2 style="color: #28a745; text-align: center;">
        🎉 New Table Reservation
      </h2>

      <p>
        Hello <strong>Administrator</strong>,
      </p>

      <p>
        A new table reservation has just been submitted through the restaurant website.
        Please review the reservation details below:
      </p>

      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #ddd;">
            <strong>Customer Name</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            ${reservation.customerName}
          </td>
        </tr>

        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">
            <strong>Phone Number</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            <a href="tel:${reservation.phone}" style="color: #007bff; text-decoration: none;">
              ${reservation.phone}
            </a>
          </td>
        </tr>

        <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #ddd;">
            <strong>Reservation Date</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #ddd; color: #d9534f;">
            <strong>${reservationDate}</strong>
          </td>
        </tr>

        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;">
            <strong>Reservation Time</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #ddd; color: #d9534f;">
            <strong>${reservationHour}</strong>
          </td>
        </tr>

        <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #ddd;">
            <strong>Number of Guests</strong>
          </td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            ${reservation.guests}
          </td>
        </tr>
      </table>

      <p style="text-align: center; margin-top: 30px;">
        <a
          href="${linkDashboard}"
          style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;"
        >
          View Reservation Dashboard
        </a>
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

      <p style="font-size: 12px; color: #888; text-align: center;">
        This is an automated notification from the Restaurant Reservation System.
      </p>
    </div>
  `;

  const options = {
    email: adminEmail,
    subject: `[New Reservation] ${reservation.customerName} - ${reservationDate} (${reservationHour})`,
    message: `${reservation.customerName} (${reservation.phone}) has made a reservation for ${reservation.guests} guest(s) on ${reservationDate} at ${reservationHour}.`,
    html: emailHtml,
  };

  sendEmail(options).catch((err) => {
    console.error('Background Email Sending Error:', err.message);
  });

  return reservation;
};

/**
 * @desc    Admin lấy danh sách đặt bàn
 */
export const getReservationsService = async (query) => {
  const { page, limit, keyword, status, time, sort } = query;
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (time) {
    filter.timeSlot = time;
  }

  if (keyword) {
    filter.$or = [
      {
        customerName: {
          $regex: keyword,
          $options: 'i',
        },
      },
      {
        phone: {
          $regex: keyword,
          $options: 'i',
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const [reservations, total] = await Promise.all([
    Reservation.find(filter)
      .sort({
        reservationTime: sort === 'desc' ? -1 : 1,
      })
      .skip(skip)
      .limit(Number(limit)),

    Reservation.countDocuments(filter),
  ]);

  return {
    reservations,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * @desc    Admin lấy chi tiết đơn đặt bàn
 */
export const getReservationByIdService = async (id) => {
  const reservation = await Reservation.findById(id).lean();

  if (!reservation) {
    throw new ApiError('Reservation not found.', 404, RES_CODE.RES_NOT_FOUND);
  }

  return reservation;
};

/**
 * @desc    Cập nhật trạng thái đơn đặt bàn.
 */
export const updateReservationStatusService = async (id, status) => {
  const reservation = await Reservation.findById(id);

  if (!reservation) {
    throw new ApiError('Reservation not found.', 404, RES_CODE.RES_NOT_FOUND);
  }

  if (reservation.status === 'completed') {
    throw new ApiError(
      'Completed reservations cannot be updated.',
      400,
      RES_CODE.RES_INVALID_STATE,
    );
  }

  if (reservation.status === 'cancelled') {
    throw new ApiError(
      'Cancelled reservations cannot be updated.',
      400,
      RES_CODE.RES_INVALID_STATE,
    );
  }

  if (reservation.status === status) {
    throw new ApiError(
      `Reservation is already ${status}.`,
      400,
      RES_CODE.RES_INVALID_STATE,
    );
  }

  reservation.status = status;

  return await reservation.save();
};

/**
 * @desc    Cập nhật thông tin đơn đặt bàn.
 */
export const updateReservationService = async (id, updateData) => {
  const reservation = await Reservation.findById(id);

  if (!reservation) {
    throw new ApiError('Reservation not found.', 404, RES_CODE.RES_NOT_FOUND);
  }

  if (['completed', 'cancelled'].includes(reservation.status)) {
    throw new ApiError(
      `Cannot update a ${reservation.status} reservation.`,
      400,
      RES_CODE.RES_INVALID_STATE,
    );
  }

  if (
    (updateData.date && !updateData.time) ||
    (!updateData.date && updateData.time)
  ) {
    throw new ApiError(
      'Both date and time must be provided together to update the schedule.',
      400,
      RES_CODE.VALIDATION_ERROR,
    );
  }

  if (updateData.reservationTime) {
    const TZ = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh';
    const now = dayjs().tz(TZ);
    const newReservationTime = dayjs(updateData.reservationTime).tz(TZ);

    if (!newReservationTime.isValid()) {
      throw new ApiError(
        'Invalid reservation date or time.',
        400,
        RES_CODE.VALIDATION_ERROR,
      );
    }

    if (newReservationTime.isBefore(now)) {
      throw new ApiError(
        `Reservation time must be later than current time (${now.format('hh:mm A')}).`,
        400,
        RES_CODE.VALIDATION_ERROR,
      );
    }

    if (updateData.reservationTime || updateData.phone) {
      const checkPhone = updateData.phone || reservation.phone;
      const checkTime =
        updateData.reservationTime || reservation.reservationTime;

      const existedReservation = await Reservation.findOne({
        _id: { $ne: id },
        phone: checkPhone,
        reservationTime: checkTime,
        status: { $in: ['pending', 'confirmed'] },
      });

      if (existedReservation) {
        throw new ApiError(
          'This customer already has another reservation at the new time.',
          409,
          RES_CODE.RES_CONFLICT,
        );
      }
    }
  }

  delete updateData.date;
  delete updateData.time;

  Object.assign(reservation, updateData);
  return await reservation.save();
};

/**
 * @desc    Admin xóa đơn đặt bàn (Hard Delete)
 */
export const deleteReservationServices = async (id) => {
  const reservation = await Reservation.findByIdAndDelete(id);
  if (!reservation) {
    throw new ApiError('Reservation not found.', 404, RES_CODE.RES_NOT_FOUND);
  }
  return { id };
};
