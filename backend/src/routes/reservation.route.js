import express from 'express';
import {
  validateDto,
  validateQueryDto,
} from '../middleware/validate.middleware.js';
import {
  createReservationRequestDto,
  getReservationsQueryDto,
} from '../dtos/reservation.dto.js';
import {
  createReservation,
  getReservations,
} from '../controllers/reservation.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public
router.post('/', validateDto(createReservationRequestDto), createReservation);

// Private
router.use(protect);

router.get('/', validateQueryDto(getReservationsQueryDto), getReservations);

export default router;
