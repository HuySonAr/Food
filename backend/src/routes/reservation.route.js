import express from 'express';
import {
  validateDto,
  validateQueryDto,
} from '../middleware/validate.middleware.js';
import {
  createReservationRequestDto,
  getReservationsQueryDto,
  updateStatusRequestDto,
} from '../dtos/reservation.dto.js';
import {
  createReservation,
  getReservations,
  updateReservationStatus,
} from '../controllers/reservation.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public
router.post('/', validateDto(createReservationRequestDto), createReservation);

// Private
router.use(protect);

router.get('/', validateQueryDto(getReservationsQueryDto), getReservations);
router.patch("/:id/status", validateDto(updateStatusRequestDto), updateReservationStatus)

export default router;
