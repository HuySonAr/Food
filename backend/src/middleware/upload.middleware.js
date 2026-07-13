import multer from 'multer';
import ApiError from '../utils/ApiError.js';
import { RES_CODE } from '../constants/responseCode.constant.js';
import { toFile } from '@imagekit/nodejs';
import imagekit from '../config/imagekit.js';

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(
      new ApiError(
        'Only image files (JPG, PNG, WEBP) are allowed!',
        400,
        RES_CODE.VALIDATION_ERROR,
      ),
      false,
    );
  }
};

export const uploadImage = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

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
      const fileToUpload = await toFile(req.file.buffer, req.file.originalname);

      const response = await imagekit.files.upload({
        file: fileToUpload,
        fileName: `${prefix}_${Date.now()}_${req.file.originalname}`,
        folder: folder,
        transformation: {
          pre: 'w-800,q-80',
        },
      });

      req.body[req.file.fieldname] = response.url;
      req.body.imageFileId = response.fileId;
      req.imageKitFileId = response.fileId;

      req.file.buffer = null;
      next();
    } catch (error) {
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
