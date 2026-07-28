import Blog from '../models/Blog.js';
import ApiError from '../utils/ApiError.js';
import { RES_CODE } from '../constants/responseCode.constant.js';
import { deleteFromImageKit } from '../middleware/upload.middleware.js';
import TempUpload from '../models/TempUpload.js';
import { escapeRegex } from '../utils/escapeRegex.js';

/**
 * @desc Thêm bài blog mới
 */
export const createBlogService = async (data, authorId) => {
  if (data.slug) {
    const existingBlog = await Blog.findOne({ slug: data.slug });
    if (existingBlog) {
      throw new ApiError('A blog with this slug already exists.', 409, RES_CODE.RES_CONFLICT);
    }
  }

  const blogData = {
    ...data,
    author: authorId,
  };

  const blog = await Blog.create(blogData);
  await markImagesAsUsed(blogData)
  return await getBlogByIdService(blog._id);
};

/**
 * @desc Lấy danh sách blog có phân trang, lọc theo trạng thái và tìm kiếm
 */
export const getBlogsService = async (query) => {
  const { page, limit, keyword, isPublished, sort } = query;
  const filter = {};

  if (keyword) {
    const escapedKeyword = escapeRegex(keyword.trim())
    filter.$or = [
      { title: { $regex: escapedKeyword, $options: 'i' } },
      { description: { $regex: escapedKeyword, $options: 'i' } },
    ];
  }

  if (isPublished !== 'all') {
    filter.isPublished = isPublished === 'true';
  }

  const sortOption = { createdAt: sort === 'oldest' ? 1 : -1 };
  const skip = (page - 1) * limit;

  const [blogs, total] = await Promise.all([
    Blog.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .populate('author', 'email role')
      .lean(),
    Blog.countDocuments(filter),
  ]);

  return {
    blogs,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * @desc Lấy chi tiết blog theo ID
 */
export const getBlogByIdService = async (id) => {
  const blog = await Blog.findById(id).populate('author', 'email role').lean();
  if (!blog) {
    throw new ApiError('Blog not found.', 404, RES_CODE.RES_NOT_FOUND);
  }
  return blog;
};

/**
 * @desc Lấy chi tiết blog theo Slug (Dành cho Client public xem bài viết)
 */
export const getBlogBySlugService = async (slug) => {
  const blog = await Blog.findOne({ slug, isPublished: true })
    .populate('author', 'email role')
    .lean();
  if (!blog) {
    throw new ApiError('Blog not found or not published.', 404, RES_CODE.RES_NOT_FOUND);
  }
  return blog;
};

/**
 * @desc Cập nhật bài blog
 */
export const updateBlogService = async (id, updateData) => {
  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ApiError('Blog not found.', 404, RES_CODE.RES_NOT_FOUND);
  }

  if (updateData.slug && updateData.slug !== blog.slug) {
    const duplicateBlog = await Blog.findOne({
      _id: { $ne: id },
      slug: updateData.slug,
    });
    if (duplicateBlog) {
      throw new ApiError('A blog with this slug already exists.', 409, RES_CODE.RES_CONFLICT);
    }
  }

  const oldCoverImageFileId = blog.coverImageFileId;
  const isChangingImage = Boolean(
    updateData.coverImageFileId && updateData.coverImageFileId !== oldCoverImageFileId
  );

  Object.assign(blog, updateData);
  await blog.save();

  if (isChangingImage && oldCoverImageFileId) {
    await deleteFromImageKit(oldCoverImageFileId);
  }

  await markImagesAsUsed(updateData)

  return await getBlogByIdService(id);
};

/**
 * @desc Xóa bài blog
 */
export const deleteBlogService = async (id) => {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    throw new ApiError('Blog not found.', 404, RES_CODE.RES_NOT_FOUND);
  }

  if (blog.coverImageFileId) {
    await deleteFromImageKit(blog.coverImageFileId);
  }

  return { id: blog._id, title: blog.title, deletedAt: new Date() };
};


const markImagesAsUsed = async (blogData) => {
  try {
    let textToScan = JSON.stringify(blogData);

    const pendingImages = await TempUpload.find({ isUsed: false });

    const usedFileIds = pendingImages
      .filter((img) => textToScan.includes(img.url))
      .map((img) => img._id);

    if (usedFileIds.length > 0) {
      await TempUpload.deleteMany({ _id: { $in: usedFileIds } });
    }
  } catch (error) {
    console.error('Lỗi khi cập nhật trạng thái ảnh:', error);
  }
};