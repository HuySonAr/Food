import { RES_CODE } from '../constants/responseCode.constant.js';
import { deleteFromImageKit } from '../middleware/upload.middleware.js';
import Product from '../models/Product.js';
import ApiError from '../utils/ApiError.js';

/**
 * @desc Admin: Thêm món ăn mới
 */
export const createProductService = async (data) => {
  const existingProduct = await Product.findOne({
    name: { $regex: `^${data.name}$`, $options: 'i' },
  });
  if (existingProduct) {
    throw new ApiError(
      'A product with this name already exists.',
      409,
      RES_CODE.RES_CONFLICT,
    );
  }

  return await Product.create(data);
};

/**
 * @desc Khách hàng xem thực đơn (LUÔN LUÔN isAvailable = true)
 */
export const getPublicProductService = async (query) => {
  const { page, limit, category } = query;
  const filter = { isAvailable: true };
  if (category !== 'all') {
    filter.category = category;
  }

  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * @desc Admin quản lý thực đơn (Đâyf đủ chức năng của admin để quản lý)
 */
export const getAdminProductsService = async (query) => {
  const { page, limit, keyword, category, status, sort } = query;
  const filter = {};

  if (keyword) {
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.name = { $regex: escapedKeyword, $options: 'i' };
  }

  if (category !== 'all') {
    filter.category = category;
  }

  if (status !== 'all') {
    filter.isAvailable = status === 'true';
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'price_asc') sortOption = { price: 1 };
  if (sort === 'price_desc') sortOption = { price: -1 };

  const skip = (page - 1) * limit;

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

/**
 * @desc Lấy thông tin sản phẩm bằng Id
 */
export const getProductByIdService = async(id) => {
  const product = Product.findById(id).lean()
  if(!product){
    throw new ApiError('Product not found.', 404, RES_CODE.RES_NOT_FOUND);
  }
  return product;
}

/**
 * @desc Admin: Cập nhật thông tin sản phẩm
 */
export const updateProductService = async (id, updateData) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError('Product not found.', 404, RES_CODE.RES_NOT_FOUND);
  }

  if (
    updateData.name &&
    updateData.name.trim().toLowerCase() !== product.name.toLowerCase()
  ) {
    const escapedName = updateData.name
      .trim()
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const duplicateProduct = await Product.findOne({
      _id: { $ne: id },
      name: { $regex: `^${escapedName}$`, $options: 'i' },
    });

    if (duplicateProduct) {
      throw new ApiError(
        'A product with this name already exists.',
        409,
        RES_CODE.RES_CONFLICT,
      );
    }
  }

  const oldImageFileId = product.imageFileId;
  const isChangingImage = Boolean(
    updateData.imageFileId && updateData.imageFileId !== oldImageFileId,
  );

  Object.assign(product, updateData);
  const updatedProduct = await product.save();

  if (isChangingImage) {
    await deleteFromImageKit(oldImageFileId);
  }

  return updatedProduct;
};

/**
 * @desc Admin: Xóa sản phẩm
 */
export const deleteProductService = async (id) => {
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError('Product not found.', 404, RES_CODE.RES_NOT_FOUND);
  }

  await deleteFromImageKit(product.imageFileId);

  return {
    id: product._id,
    name: product.name,
    deletedAt: new Date(),
  };
};
