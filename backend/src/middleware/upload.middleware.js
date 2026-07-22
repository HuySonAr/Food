import multer from 'multer';
import ApiError from '../utils/ApiError.js';
import { RES_CODE } from '../constants/responseCode.constant.js';
import { toFile } from '@imagekit/nodejs';
import imagekit from '../config/imagekit.js';
import sharp from 'sharp';
import crypto from "crypto"

const storage = multer.memoryStorage();

const MAX_FILE_SIZE = 12 * 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(
    new ApiError(
      'Only JPG, JPEG, PNG and WEBP images are allowed.',
      400,
      RES_CODE.VALIDATION_ERROR,
    ),
  );
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

const optimizeImage = async (buffer) => {
  return sharp(buffer)
    .rotate()
    .resize({
      width: 1200,
      height: 1200,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
      effort: 3,
    })
    .toBuffer();
};

export const uploadToImageKit = ({
  folder = '/general',
  prefix = 'file',
} = {}) => {
  return async (req, res, next) => {
    if (!req.file) {
      delete req.body.image;
      delete req.body.imageFileId;
      return next();
    }

    try {
      const compressedBuffer = await optimizeImage(req.file.buffer);

      const fileName = `${prefix}_${Date.now()}_${crypto.randomUUID()}.webp`;

      const response = await imagekit.files.upload({
        file: await toFile(compressedBuffer, fileName),
        fileName,
        folder,
      });

      req.body[req.file.fieldname] = response.url;
      req.body.imageFileId = response.fileId;
      req.imageKitFileId = response.fileId;

      req.file.buffer = null;
      next();
    } catch (error) {
      console.error('[ImageKit Upload Error]', error);
      return next(
        new ApiError(
          'Image upload failed. Please try again later.',
          500,
          RES_CODE.FAIL,
        ),
      );
    }
  };
};

export const deleteFromImageKit = async (fileId) => {
  if (!fileId) return;

  try {
    await imagekit.files.delete(fileId);
    console.log(`[ImageKit] Successfully deleted file: ${fileId}`);
  } catch (error) {
    console.error(
      `[ImageKit Error] Failed to delete file ${fileId}:`,
      error.message,
    );
  }
};

export const rollbackUpload = async (err, req, res, next) => {
  if (req.imageKitFileId) {
    await deleteFromImageKit(req.imageKitFileId);
  }
  next(err);
};
