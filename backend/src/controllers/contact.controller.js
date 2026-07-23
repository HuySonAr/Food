import { RES_CODE } from '../constants/responseCode.constant.js';
import {
  ContactListResponseDto,
  ContactResponseDto,
} from '../dtos/contact.dto.js';
import {
  createContactService,
  deleteContactService,
  getContactByIdService,
  getContactsService,
  updateContactService,
} from '../services/contact.service.js';
import { formatResponse } from '../utils/response.util.js';

/**
 * @desc    Khách hàng gửi form liên hệ
 * @route   POST /api/contacts
 * @access  Public
 */
export const createContact = async (req, res, next) => {
  try {
    const data = await createContactService(req.body);
    const responseData = new ContactResponseDto(data);
    return res
      .status(201)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Your message has been sent successfully. We will get back to you soon!',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin xem danh sách tin nhắn / góp ý
 * @route   GET /api/contacts
 * @access  Private/Admin
 */
export const getContacts = async (req, res, next) => {
  try {
    const data = await getContactsService(req.validatedQuery);
    const responseData = new ContactListResponseDto(data);
    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Contacts retrieved successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin lấy chi tiết một liên hệ
 * @route   GET /api/contacts/:id
 * @access  Private/Admin
 */
export const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getContactByIdService(id);
    const responseData = new ContactResponseDto(data);
    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Contact retrieved successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin cập nhật trạng thái/ghi chú liên hệ
 * @route   PATCH /api/contacts/:id
 * @access  Private/Admin
 */
export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateContactService(id, req.body);
    const responseData = new ContactResponseDto(data);
    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Contact updated successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin xóa một liên hệ
 * @route   DELETE /api/contacts/:id
 * @access  Private/Admin
 */
export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteContactService(id);
    return res
      .status(200)
      .json(
        formatResponse(RES_CODE.SUCCESS, 'Contact deleted successfully.', data),
      );
  } catch (error) {
    next(error);
  }
};
