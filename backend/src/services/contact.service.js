import Contact from '../models/Contact.js';
import ApiError from '../utils/ApiError.js';
import sendEmail from '../utils/sendEmail.js';
import { RES_CODE } from '../constants/responseCode.constant.js';

/**
 * @desc Khách hàng gửi form liên hệ -> Lưu DB + Gửi mail Admin
 */
export const createContactService = async (data) => {
  const contact = await Contact.create(data);

  const adminEmail = process.env.ADMIN_EMAIL;
  const linkDashboard =
    process.env.LINK_DASHBOARD || 'http://localhost:5173/admin';

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #007bff; text-align: center;">New Customer Inquiry</h2>
      <p>Hello <strong>Administrator</strong>,</p>
      <p>You have received a new message from the restaurant's Contact form:</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${contact.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">
            <a href="mailto:${contact.email}">${contact.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Subject</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>${contact.subject}</strong></td>
        </tr>
        <tr style="background-color: #f8f9fa;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${contact.message}</td>
        </tr>
      </table>
      <p style="text-align: center; margin-top: 30px;">
        <a href="${linkDashboard}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          View in Admin Dashboard
        </a>
      </p>
    </div>
  `;

  const options = {
    email: adminEmail,
    subject: `[New Contact] ${contact.subject} - From: ${contact.name}`,
    message: `You have a new message from client ${contact.name}: ${contact.message}`,
    html: emailHtml,
  };

  try {
    await sendEmail(options);
  } catch (err) {
    console.error('Background Contact Email Sending Error:', err);
  }

  return contact;
};

/**
 * @desc Admin: Lấy danh sách liên hệ có filter & phân trang
 */
export const getContactsService = async (query) => {
  const { page, limit, keyword, status, sort } = query;
  const filter = {};

  if (status) {
    filter.status = status;
  }

  if (keyword) {
    filter.$or = [
      { name: { $regex: keyword, $options: 'i' } },
      { email: { $regex: keyword, $options: 'i' } },
      { subject: { $regex: keyword, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const [contacts, total] = await Promise.all([
    Contact.find(filter)
      .sort({ createdAt: sort === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(Number(limit)),
    Contact.countDocuments(filter),
  ]);

  return {
    contacts,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * @desc Admin: Lấy chi tiết 1 liên hệ theo ID
 */
export const getContactByIdService = async (id) => {
  const contact = await Contact.findById(id).lean();
  if (!contact) {
    throw new ApiError(
      'Contact request not found.',
      404,
      RES_CODE.RES_NOT_FOUND,
    );
  }
  return contact;
};

/**
 * @desc Admin: Cập nhật trạng thái và ghi chú xử lý
 */
export const updateContactService = async (id, updateData) => {
  const contact = await Contact.findById(id);
  if (!contact) {
    throw new ApiError(
      'Contact request not found.',
      404,
      RES_CODE.RES_NOT_FOUND,
    );
  }

  Object.assign(contact, updateData);
  return await contact.save();
};

/**
 * @desc Admin: Xóa 1 liên hệ
 */
export const deleteContactService = async (id) => {
  const contact = await Contact.findByIdAndDelete(id);
  if (!contact) {
    throw new ApiError(
      'Contact request not found.',
      404,
      RES_CODE.RES_NOT_FOUND,
    );
  }
  return { id };
};
