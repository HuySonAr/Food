import BlogSkeleton from '@/components/skeleton/BlogSkeleton';
import { useBlog } from '@/hooks/useBlog';
import { formatDate } from '@/utils/formatDate';
import { Link } from 'react-router-dom';

const BlogSection = () => {
  const { blogs, loading, error } = useBlog(1, 5);
  const featuredBlog = blogs?.[0];
  const otherBlogs = blogs.slice(1, 5);

  return (
    <div className="bg-secondary-foreground py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="flex justify-between items-center">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-medium text-center">
            Our Blog & Articles
          </h1>

          <Link
            to="/blog"
            className="hidden sm:inline-flex text-white px-6 py-3.5 sm:px-8 sm:py-5 rounded-[118px] text-sm sm:text-base font-bold bg-primary"
          >
            {' '}
            Read All Articles
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {Array.from({ length: 4 }).map((_, index) => {
              let displayClass = '';

              if (index === 1) {
                displayClass = 'hidden sm:block';
              } else if (index === 2) {
                displayClass = 'hidden lg:block';
              } else if (index === 3) {
                displayClass = 'hidden xl:block';
              }

              return (
                <div key={index} className={displayClass}>
                  <BlogSkeleton />
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <div className="text-center text-destructive mt-10">{error}</div>
        )}

        {!loading && !error && blogs?.length === 0 && (
          <div className="text-center text-muted-foreground mt-10">
            There are no blog in this restaurant.
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10 sm:mt-12 lg:mt-16">
            <Link
              to={`/blog/${featuredBlog.slug}`}
              className="border border-muted overflow-hidden rounded-[12px] shadow-form hover:-translate-y-1 transition-all duration-300"
            >
              <div className="h-56 sm:h-72 md:h-96 lg:h-114 overflow-hidden">
                <img
                  src={featuredBlog.coverImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="px-6 py-9 sm:py-11.25 sm:px-8.75 flex flex-col gap-2 sm:gap-3 bg-white h-full">
                <p className="text-base text-[#737865] font-medium">
                  {formatDate(featuredBlog.createdAt)}
                </p>
                <h3 className="text-xl text-foreground font-medium lg:line-clamp-2">
                  {featuredBlog.title}
                </h3>
                <p className="text-base text-muted-foreground">
                  {featuredBlog.description}
                </p>
              </div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherBlogs.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="border border-muted overflow-hidden rounded-[12px] shadow-form hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-50 overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="px-4 py-5 sm:py-6.5 sm:px-6 flex flex-col gap-2 sm:gap-3 bg-white">
                    <p className="text-sm text-[#737865] font-medium">
                      {formatDate(item.createdAt)}
                    </p>
                    <h3 className="text-xl text-foreground font-medium lg:line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSection;
