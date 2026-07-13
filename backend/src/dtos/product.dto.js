import { z } from 'zod';
import { zRequiredNUmber, zRequiredString } from '../utils/zod.util.js';
import {
  PRODUCT_CATEGORIES,
  PRODUCT_PRICES,
  PRODUCT_STATUS,
} from '../constants/product.constant.js';

export const createProductRequestDto = z.object({
  name: zRequiredString('Product name')
    .trim()
    .min(2, 'Name must be at least 2 characters.')
    .max(150, 'Product name is too long.'),
  category: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(
      z.enum(PRODUCT_CATEGORIES, {
        error: (iss) =>
          iss.input === undefined
            ? 'Category is required.'
            : 'Invalid category.',
      }),
    ),
  price: zRequiredNUmber('Price')
    .min(0, 'Price cannot be negative.')
    .transform((val) => Number(val.toFixed(2))),
  image: zRequiredString('Product image').url('Image must be a valid URL.'),
  imageFileId: zRequiredString('Image file ID'),
  description: z.string().trim().optional().default(''),
  isAvailable: z.coerce.boolean().optional().default(true),
});

export const updateProductRequestDto = createProductRequestDto
  .partial()
  .superRefine((val, ctx) => {
    if (Object.keys(val).length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'At least one field must be provided for update.',
      });
    }
  });

export const getPublicProductsQueryDto = z.object({
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
    .default(8),

  category: z.enum(PRODUCT_CATEGORIES).default('all'),
});

export const getAdminProductsQueryDto = getPublicProductsQueryDto.extend({
  keyword: z.string().trim().max(100, 'Keyword is too long.').optional(),

  status: z.enum(PRODUCT_STATUS).default('all'),

  sort: z.enum(PRODUCT_PRICES).default('newest'),
});

export class ProductResponseDto {
  constructor(product) {
    this.id = product._id;
    this.name = product.name;
    this.category = product.category;
    this.price = product.price;
    this.image = product.image;
    this.imageFileId = product.imageFileId;
    this.description = product.description;
    this.isAvailable = product.isAvailable;
    this.createdAt = product.createdAt;
    this.updatedAt = product.updatedAt;
  }
}

export class ProductListResponseDto {
  constructor(data) {
    this.products = data.products.map((item) => new ProductResponseDto(item));
    this.pagination = data.pagination;
  }
}
