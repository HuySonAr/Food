import { Schema, model } from 'mongoose';

const sectionSchema = new Schema(
  {
    heading: {
      type: String,
      required: [true, 'Section heading is required.'],
      trim: true,
    },

    content: {
      type: String,
      required: [true, 'Section content is required.'],
      trim: true,
    },

    steps: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      default: [],
    },

    image: {
      type: String,
      default: '',
    },
  },
  {
    _id: false,
  },
);

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required.'],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, 'Slug is required.'],
      unique: true,
      trim: true,
      lowercase: true,
    },

    thumbnail: {
      type: String,
      required: [true, 'Thumbnail is required.'],
    },

    sections: {
      type: [sectionSchema],
      required: [true, 'Blog sections are required.'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

blogSchema.index({
  slug: 1,
});

export default model('Blog', blogSchema);
