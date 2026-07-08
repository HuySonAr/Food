import{ model, Schema } from 'mongoose';
import { PRODUCT_CATEGORIES } from '../constants/product.constant';

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

    description: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true },
);

productSchema.index({ category: 1 });

export default model('Product', productSchema);
