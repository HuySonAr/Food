import { z } from 'zod';
import { zRequiredString } from '../utils/zod.util.js';

const baseBlogSchema = z.object({
  title: zRequiredString('Blog title')
    .trim()
    .min(5, 'Title must be at least 5 characters.')
    .max(200, 'Title is too long.'),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens.',
    )
    .optional(),
  description: zRequiredString('Description')
    .trim()
    .max(500, 'Description cannot exceed 500 characters.'),
  coverImage: zRequiredString('Cover image URL').url('Cover image must be a valid URL.'),
  coverImageFileId: zRequiredString('Cover image file ID'),
  content: zRequiredString('Content (HTML string)').min(20, 'Content is too short.'),
  isPublished: z.coerce.boolean().optional().default(false),
});

export const createBlogRequestDto = baseBlogSchema;

export const updateBlogRequestDto = baseBlogSchema
  .partial()
  .superRefine((val, ctx) => {
    if (Object.keys(val).length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'At least one field must be provided for update.',
      });
    }
  });

export const getBlogsQueryDto = z.object({
  page: z.coerce
    .number()
    .int('Page must be an integer.')
    .min(1, 'Page must be greater than or equal to 1.')
    .default(1),
  limit: z.coerce
    .number()
    .int('Limit must be an integer.')
    .min(1, 'Limit must be at least 1.')
    .max(100, 'Limit cannot exceed 100.')
    .default(12),
  keyword: z.string().trim().max(100, 'Keyword is too long.').optional(),
  isPublished: z.enum(['true', 'false', 'all']).default('all'),
  sort: z.enum(['newest', 'oldest']).default('newest'),
});

// Response DTOs
export class BlogResponseDto {
  constructor(blog) {
    this.id = blog._id || blog.id;
    this.title = blog.title;
    this.slug = blog.slug;
    this.description = blog.description;
    this.coverImage = blog.coverImage;
    this.coverImageFileId = blog.coverImageFileId;
    this.content = blog.content;
    this.isPublished = blog.isPublished;
    
    if (blog.author && typeof blog.author === 'object') {
      this.author = {
        id: blog.author._id || blog.author.id,
        email: blog.author.email,
        role: blog.author.role,
      };
    } else {
      this.author = blog.author || null;
    }

    this.createdAt = blog.createdAt;
    this.updatedAt = blog.updatedAt;
  }
}

export class BlogListResponseDto {
  constructor(data) {
    this.blogs = data.blogs.map((item) => new BlogResponseDto(item));
    this.pagination = data.pagination;
  }
}