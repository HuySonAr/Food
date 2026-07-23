import { z } from 'zod';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import { STATUS_CONTACTS } from '../constants/contact.constant.js';
import { zRequiredString } from '../utils/zod.util.js';

dayjs.extend(utc);
dayjs.extend(timezone);
const TZ = process.env.TIMEZONE || 'Asia/Ho_Chi_Minh';


export const createContactRequestDto = z.object({
  name: zRequiredString('Name')
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name is too long.'),
  email: zRequiredString('Email')
    .trim()
    .email('Invalid email format.')
    .toLowerCase(),
  subject: z.string().trim().max(200, 'Subject is too long.').optional().default('General Inquiry'),
  message: zRequiredString('Message')
    .trim()
    .min(10, 'Message must be at least 10 characters.')
    .max(2000, 'Message is too long.'),
});


export const getContactsQueryDto = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(10),
  keyword: z.string().trim().max(100).optional(),
  status: z.enum(STATUS_CONTACTS).optional(),
  sort: z.enum(['asc', 'desc']).default('desc'),
});


export const updateContactRequestDto = z.object({
  status: z.enum(STATUS_CONTACTS).optional(),
  adminNotes: z.string().trim().max(1000).optional(),
}).superRefine((val, ctx) => {
  if (!val.status && val.adminNotes === undefined) {
    ctx.addIssue({
      code: 'custom',
      message: 'At least status or adminNotes must be provided to update.',
    });
  }
});

// 4. Response DTO
export class ContactResponseDto {
  constructor(contact) {
    this.id = contact._id;
    this.name = contact.name;
    this.email = contact.email;
    this.subject = contact.subject;
    this.message = contact.message;
    this.status = contact.status;
    this.adminNotes = contact.adminNotes;
    this.createdAt = contact.createdAt;
    this.formattedCreatedAt = dayjs(contact.createdAt).tz(TZ).format('DD-MM-YYYY HH:mm');
    this.updatedAt = contact.updatedAt;
  }
}

export class ContactListResponseDto {
  constructor(data) {
    this.contacts = data.contacts.map((item) => new ContactResponseDto(item));
    this.pagination = data.pagination;
  }
}