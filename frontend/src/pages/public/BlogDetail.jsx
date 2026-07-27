import { useBlogDetail } from '@/hooks/useBlog';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { slug } = useParams();
  const { blog, loading, error } = useBlogDetail(slug);

  const test = true;

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-3">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-base text-muted-foreground font-medium">
          Loading article...
        </p>
      </div>
    );
  }
  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="flex flex-col gap-12 sm:gap-15">
          {/* Heading */}
          <h1 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[55px] leading-tight lg:leading-[60.5px] text-foreground text-center">
            {blog.title}
          </h1>

          <div className="max-h-175 overflow-hidden rounded-[12px]">
            <img
              src={blog.coverImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
