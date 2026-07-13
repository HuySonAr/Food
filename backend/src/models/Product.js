import { model, Schema } from 'mongoose';
import { PRODUCT_CATEGORIES } from '../constants/product.constant.js';

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required.'],
      trim: true,
      maxlength: [150, 'Product name is too long.'],
    },

    category: {
      type: String,
      required: [true, 'Category is required.'],
      enum: {
        values: PRODUCT_CATEGORIES,
        message: '{VALUE} is not a valid category.',
      },
    },

    price: {
      type: Number,
      required: [true, 'Price is required.'],
      min: [0, 'Price cannot be negative.'],
    },

    image: {
      type: String,
      required: [true, 'Product image is required.'],
    },

    imageFileId: { 
      type: String, 
      required: [true, 'Image file ID is required.'] 
    },

    description: {
      type: String,
      trim: true,
      default: '',
    },
    
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1 });
productSchema.index({ name: 'text' });

export default model('Product', productSchema);
