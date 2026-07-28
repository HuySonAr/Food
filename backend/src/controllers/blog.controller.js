import { RES_CODE } from '../constants/responseCode.constant.js';
import { BlogListResponseDto, BlogResponseDto } from '../dtos/blog.dto.js';
import TempUpload from '../models/TempUpload.js';
import {
  createBlogService,
  deleteBlogService,
  getBlogByIdService,
  getBlogBySlugService,
  getBlogsService,
  updateBlogService,
} from '../services/blog.service.js';
import { formatResponse } from '../utils/response.util.js';

/**
 * @desc    Create Blog
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
export const createBlog = async (req, res, next) => {
  try {
    const data = await createBlogService(req.body, req.admin._id);
    const responseData = new BlogResponseDto(data);
    return res
      .status(201)
      .json(formatResponse(RES_CODE.SUCCESS, 'Blog created successfully.', responseData));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all blogs
 * @route   GET /api/blogs
 * @access  Public
 */
export const getBlogs = async (req, res, next) => {
  try {
    const data = await getBlogsService(req.validatedQuery);
    const responseData = new BlogListResponseDto(data);
    return res
      .status(200)
      .json(formatResponse(RES_CODE.SUCCESS, 'Blogs retrieved successfully.', responseData));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get blog by ID
 * @route   GET /api/blogs/:id
 * @access  Public / Private
 */
export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getBlogByIdService(id);
    const responseData = new BlogResponseDto(data);
    return res
      .status(200)
      .json(formatResponse(RES_CODE.SUCCESS, 'Blog retrieved successfully.', responseData));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get blog by Slug
 * @route   GET /api/blogs/slug/:slug
 * @access  Public
 */
export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const data = await getBlogBySlugService(slug);
    const responseData = new BlogResponseDto(data);
    return res
      .status(200)
      .json(formatResponse(RES_CODE.SUCCESS, 'Blog retrieved successfully.', responseData));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update blog
 * @route   PATCH /api/blogs/:id
 * @access  Private (Admin)
 */
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateBlogService(id, req.body);
    const responseData = new BlogResponseDto(data);
    return res
      .status(200)
      .json(formatResponse(RES_CODE.SUCCESS, 'Blog updated successfully.', responseData));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete blog
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteBlogService(id);
    return res
      .status(200)
      .json(formatResponse(RES_CODE.SUCCESS, 'Blog deleted successfully.', data));
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Upload riêng ảnh cho Section
 * @route   POST /api/blogs/upload-image
 * @access  Private (Admin)
 */
export const uploadSectionImage = async (req, res, next) => {
  try {
    if (!req.file || !req.body.image) {
      return res.status(400).json(
        formatResponse(RES_CODE.VALIDATION_ERROR, 'Please provide an image file.')
      );
    }

    await TempUpload.create({
      fileId: req.imageKitFileId,
      url: req.body.image,
      isUsed: false,
    });

    return res.status(200).json(
      formatResponse(RES_CODE.SUCCESS, 'Image uploaded successfully.', {
        url: req.body.image,
        fileId: req.imageKitFileId,
      })
    );
  } catch (error) {
    next(error);
  }
};