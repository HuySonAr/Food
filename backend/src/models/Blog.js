import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required.'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters.'],
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required.'],
    },
    coverImageFileId: {
      type: String,
      required: [true, 'Cover image file ID is required.'],
    },
    content: {
      type: String,
      required: [true, 'Content (HTML string) is required.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);


blogSchema.pre('save', function () {
  if (this.isModified('title') || !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      locale: 'vi',
    });
  }
});

export default model('Blog', blogSchema);