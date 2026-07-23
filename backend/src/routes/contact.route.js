import express from 'express';
import {
  validateDto,
  validateParamsDto,
  validateQueryDto,
} from '../middleware/validate.middleware.js';
import {
  createContactRequestDto,
  getContactsQueryDto,
  updateContactRequestDto,
} from '../dtos/contact.dto.js';
import {
  createContact,
  deleteContact,
  getContactById,
  getContacts,
  updateContact,
} from '../controllers/contact.controller.js';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
import { idParamDto } from '../dtos/common.dto.js';

const router = express.Router();

// Public
router.post('/', validateDto(createContactRequestDto), createContact);

// Private
router.use(protect);
router.use(restrictTo('admin'));

router.get('/', validateQueryDto(getContactsQueryDto), getContacts);

router.get(
  '/:id',
  validateParamsDto(idParamDto('Contact ID')),
  getContactById
);

router.patch(
  '/:id',
  validateParamsDto(idParamDto('Contact ID')),
  validateDto(updateContactRequestDto),
  updateContact
);

router.delete(
  '/:id',
  validateParamsDto(idParamDto('Contact ID')),
  deleteContact
);

export default router;