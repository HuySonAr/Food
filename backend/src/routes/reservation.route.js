import express from 'express';
import {
  validateDto,
  validateParamsDto,
  validateQueryDto,
} from '../middleware/validate.middleware.js';
import {
  createReservationRequestDto,
  getReservationsQueryDto,
  updateReservationRequestDto,
  updateStatusRequestDto,
} from '../dtos/reservation.dto.js';
import {
  createReservation,
  deleteReservation,
  getReservationById,
  getReservations,
  updateReservation,
  updateReservationStatus,
} from '../controllers/reservation.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { idParamDto } from '../dtos/common.dto.js';

const router = express.Router();

// Public
router.post('/', validateDto(createReservationRequestDto), createReservation);

// Private
router.use(protect);
router.use(restrictTo('admin'));

router.get('/', validateQueryDto(getReservationsQueryDto), getReservations);
router.get(
  '/:id',
  validateParamsDto(idParamDto('Reservation ID')),
  getReservationById,
);
router.patch(
  '/:id/status',
  validateParamsDto(idParamDto('Reservation ID')),
  validateDto(updateStatusRequestDto),
  updateReservationStatus,
);
router.patch(
  '/:id',
  validateDto(updateReservationRequestDto),
  updateReservation,
);
router.delete(
  '/:id',
  validateParamsDto(idParamDto('Reservation ID')),
  deleteReservation,
);

export default router;
