import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import {
  rollbackUpload,
  uploadImage,
  uploadToImageKit,
} from '../middleware/upload.middleware.js';
import {
  validateDto,
  validateParamsDto,
  validateQueryDto,
} from '../middleware/validate.middleware.js';
import {
  createProductRequestDto,
  getAdminProductsQueryDto,
  getPublicProductsQueryDto,
  updateProductRequestDto,
} from '../dtos/product.dto.js';
import {
  createProduct,
  deleteProduct,
  getAdminProducts,
  getProductById,
  getPublicProducts,
  updateProduct,
} from '../controllers/product.controller.js';
import { idParamDto } from '../dtos/common.dto.js';

const router = express.Router();
// Public
router.get('/', validateQueryDto(getPublicProductsQueryDto), getPublicProducts);

// Private
router.use(protect);

router.post(
  '/',
  uploadImage.single('image'),
  uploadToImageKit({ folder: '/restaurant_products', prefix: 'prod' }),
  validateDto(createProductRequestDto),
  createProduct,
  rollbackUpload,
);

router.get(
  '/admin',
  validateQueryDto(getAdminProductsQueryDto),
  getAdminProducts,
);

router.get('/:id', validateParamsDto(idParamDto('Product ID')), getProductById);

router.patch(
  '/:id',
  validateParamsDto(idParamDto('Product ID')),
  uploadImage.single('image'),
  uploadToImageKit({ folder: '/restaurant_products', prefix: 'prod' }),
  validateDto(updateProductRequestDto),
  updateProduct,
  rollbackUpload,
);

router.delete(
  '/:id',
  validateParamsDto(idParamDto('Product ID')),
  deleteProduct,
);

export default router;
