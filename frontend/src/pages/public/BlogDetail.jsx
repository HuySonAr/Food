import { useBlogDetail } from '@/hooks/useBlog';
import { Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import DOMPurity from 'dompurify';
import BlogContent from '@/components/client/blog/BlogContent';

const BlogDetail = () => {
  const { slug } = useParams();
  const { blog, loading, error } = useBlogDetail(slug);
  const contentClean = DOMPurity.sanitize(blog?.content);

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

  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-base text-destructive font-medium">{error}</p>
      </div>
    );
  }
  return (
    <>
      <div className="py-12 sm:py-16 md:py-20 lg:py-30 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
          <div className="flex flex-col gap-12 sm:gap-15">
            {/* Heading */}
            <h1 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[55px] leading-tight lg:leading-[60.5px] text-foreground text-center">
              {blog.title}
            </h1>

            <div className="max-h-117 sm:max-h-131 lg:max-h-175 w-full overflow-hidden rounded-[12px]">
              <img
                src={blog.coverImage}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full">
              <article
                className="
                  [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-foreground [&>h2]:mt-8 [&>h2]:mb-4
                  [&>p]:text-base [&>p]:text-muted-foreground [&>p]:leading-relaxed [&>p]:mb-4
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-4 [&>ul>li]:mb-2
                  [&>blockquote]:border-l-4 [&>blockquote]:border-primary [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6
                  [&_strong]:font-semibold [&_strong]:text-foreground
                "
                dangerouslySetInnerHTML={{ __html: contentClean }}
              />
            </div>
          </div>
        </div>
      </div>
      <BlogContent />
    </>
  );
};

export default BlogDetail;
