import { response } from 'express';
import { RES_CODE } from '../constants/responseCode.constant.js';
import {
  ReservationListResponseDto,
  ReservationResponseDto,
} from '../dtos/reservation.dto.js';
import {
  createReservationService,
  deleteReservationServices,
  getReservationByIdService,
  getReservationsService,
  updateReservationService,
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
    const responseData = new ReservationResponseDto(data);
    return res
      .status(201)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservation created successfully.',
          responseData,
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
    const responseData = new ReservationListResponseDto(data);
    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservations retrieved successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin lấy chi tiết một đơn đặt bàn
 * @route   GET /api/reservations/:id
 * @access  Private/Admin
 */
export const getReservationById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getReservationByIdService(id);
    const responseData = new ReservationResponseDto(data);

    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservation retrieved successfully.',
          responseData,
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
    const responseData = new ReservationResponseDto(data);

    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservation status updated successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin cập nhật thông tin chi tiết đơn đặt bàn
 * @route   PATCH /api/reservations/:id
 * @access  Private/Admin
 */
export const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const data = await updateReservationService(id, updateData);
    const responseData = new ReservationResponseDto(data);

    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservation updated successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin xóa đơn đặt bàn
 * @route   DELETE /api/reservations/:id
 * @access  Private/Admin
 */
export const deleteReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteReservationServices(id);
    
    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Reservation deleted successfully.',
          data,
        ),
      );
  } catch (error) {
    next(error);
  }
};
