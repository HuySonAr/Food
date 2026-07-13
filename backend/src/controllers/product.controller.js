import { RES_CODE } from '../constants/responseCode.constant.js';
import {
  ProductListResponseDto,
  ProductResponseDto,
} from '../dtos/product.dto.js';
import {
  createProductService,
  deleteProductService,
  getAdminProductsService,
  getProductByIdService,
  getPublicProductService,
  updateProductService,
} from '../services/product.service.js';
import { formatResponse } from '../utils/response.util.js';

/**
 * @desc    Admin creat Product
 * @route   POST /api/products
 * @access  Private
 */
export const createProduct = async (req, res, next) => {
  try {
    const data = await createProductService(req.body);
    const responseData = new ProductResponseDto(data);
    return res
      .status(201)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Product created successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Khách hàng xem danh sách món ăn (Public)
 * @route   GET /api/products
 * @access  Public
 */
export const getPublicProducts = async (req, res, next) => {
  try {
    const data = await getPublicProductService(req.validatedQuery);
    const responseData = new ProductListResponseDto(data);
    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Products retrieved successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin xem danh sách món ăn (Private)
 * @route   GET /api/products/admin
 * @access  Private (Admin)
 */
export const getAdminProducts = async (req, res, next) => {
  try {
    const data = await getAdminProductsService(req.validatedQuery);
    const responseData = new ProductListResponseDto(data);
    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Admin products retrieved successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin lấy thông tin sản phẩm bằng id
 * @route   GET /api/products/:id
 * @access  Private (Admin)
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getProductByIdService(id);
    const responseData = new ProductResponseDto(data);

    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Product details retrieved successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error)
  }
};

/**
 * @desc    Admin cập nhật món ăn
 * @route   PATCH /api/products/:id
 * @access  Private (Admin)
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await updateProductService(id, req.body);

    const responseData = new ProductResponseDto(data);

    return res
      .status(200)
      .json(
        formatResponse(
          RES_CODE.SUCCESS,
          'Product updated successfully.',
          responseData,
        ),
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Admin xóa món ăn
 * @route   DELETE /api/products/:id
 * @access  Private (Admin)
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await deleteProductService(id);

    return res
      .status(200)
      .json(
        formatResponse(RES_CODE.SUCCESS, 'Product deleted successfully.', data),
      );
  } catch (error) {
    next(error);
  }
};
