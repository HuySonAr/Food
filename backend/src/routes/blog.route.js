import express from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware.js';
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
  createBlogRequestDto,
  getBlogsQueryDto,
  updateBlogRequestDto,
} from '../dtos/blog.dto.js';
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogBySlug,
  getBlogs,
  updateBlog,
  uploadSectionImage,
} from '../controllers/blog.controller.js';
import { idParamDto } from '../dtos/common.dto.js';

const router = express.Router();

// Public
router.get('/', validateQueryDto(getBlogsQueryDto), getBlogs);
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', validateParamsDto(idParamDto('Blog ID')), getBlogById);

// Private
router.use(protect);
router.use(restrictTo('admin'));


router.post(
  '/upload-image',
  uploadImage.single('image'),
  uploadToImageKit({ folder: '/restaurant_blogs/inline', prefix: 'inline' }),
  uploadSectionImage,
  rollbackUpload
);

router.post(
  '/',
  uploadImage.single('coverImage'),
  uploadToImageKit({ folder: '/restaurant_blogs', prefix: 'cover' }),
  validateDto(createBlogRequestDto),
  createBlog,
  rollbackUpload
);


router.patch(
  '/:id',
  validateParamsDto(idParamDto('Blog ID')),
  uploadImage.single('coverImage'),
  uploadToImageKit({ folder: '/restaurant_blogs', prefix: 'cover' }),
  validateDto(updateBlogRequestDto),
  updateBlog,
  rollbackUpload
);

router.delete('/:id', validateParamsDto(idParamDto('Blog ID')), deleteBlog);

export default router;