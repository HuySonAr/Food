import {
  createReservationService,
  getReservationsService,
} from '../services/reservation.service.js';

/**
 * @desc    Khách tạo đơn đặt bàn
 * @route   POST /api/reservations
 * @access  Public
 */
export const createReservation = async (req, res) => {
  try {
    const data = await createReservationService(req.body);
    return res.status(201).json({
      success: true,
      message: 'Reservation created successfully.',
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc    Admin lấy danh sách đặt bàn
 * @route   GET /api/reservations
 * @access  Private/Admin
 */
export const getReservations = async (req, res) => {
  try {
    const data = await getReservationsService(req.query);

    return res.status(200).json({
      success: true,
      message: 'Reservations retrieved successfully.',
      data,
    });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
