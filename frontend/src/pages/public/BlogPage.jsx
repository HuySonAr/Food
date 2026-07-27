import BlogSkeleton from '@/components/skeleton/BlogSkeleton';
import { useBlog } from '@/hooks/useBlog';
import { formatDate } from '@/utils/formatDate';
import { Link } from 'react-router-dom';

const BlogPage = () => {
  const { loading, error, blogs } = useBlog();
  const test = true;

  return (
    <div className="py-12 sm:py-16 md:py-20 lg:py-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 2xl:px-0">
        <div className="flex flex-col items-center gap-4 sm:gap-5">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-serif font-normal text-center">
            Our Blog & Articles
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground w-full sm:max-w-[80%] lg:max-w-[60%] mx-auto text-center">
            We consider all the drivers of change gives you the components you
            need to change to create a truly happens.
          </p>
        </div>

        {/* Loading */}
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
            There are no dishes in this category.
          </div>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {blogs.map((item) => (
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

                <div className="p-7.5 flex flex-col gap-2 sm:gap-3 bg-white">
                  <p className="text-sm text-[#737865] font-medium">
                    {formatDate(item.createdAt)}
                  </p>
                  <h3 className="text-lg sm:text-xl font-medium">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
