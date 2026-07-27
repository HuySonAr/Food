import { Schema, model } from 'mongoose';

const tempUploadSchema = new Schema(
  {
    fileId: {
      type: String,
      required: true,
      index: true,
    },
    url: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model('TempUpload', tempUploadSchema);