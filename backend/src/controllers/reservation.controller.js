import { RES_CODE } from '../constants/responseCode.constant.js';
import {
  createReservationService,
  getReservationsService,
  updateReservationStatusService,
} from '../services/reservation.service.js';
import { formatResponse } from '../utils/response.util.js';

/**
 * @desc    Khách tạo đơn đặt bàn
 * @route   POST /api/reservations
 * @access  Public
 */
export const createReservation = async (req, res, next) => {
  try {
    const data = await createReservationService(req.body);
    return res
      .status(201)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservation created successfully.',
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin lấy danh sách đặt bàn
 * @route   GET /api/reservations
 * @access  Private/Admin
 */
export const getReservations = async (req, res, next) => {
  try {
    const data = await getReservationsService(req.validatedQuery);

    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservations retrieved successfully.',
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin cập nhật trang thái cho đơn đặt bàn
 * @route   GET /api/reservations/:id/status
 * @access  Private/Admin
 */
export const updateReservationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const data = await updateReservationStatusService(id, status);

    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservation status updated successfully.',
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};
