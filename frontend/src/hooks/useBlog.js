import { getBlogBySlugService, getBlogsService } from '@/services/blog.service';
import { useEffect, useState } from 'react';

export const useBlog = (page = 1, limit = 12) => {
  const [blogs, setBlogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setErorr] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getBlogsService({page, limit});
        setBlogs(response.data.blogs);
        setPagination(response.data.pagination);
        setErorr(null);
      } catch (err) {
        setErorr(err.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, limit]);

  return { blogs, pagination, loading, error };
};

export const useBlogDetail = (slug) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetchDetail = async () => {
      setLoading(true);
      try {
        const response = await getBlogBySlugService(slug);
        setBlog(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);
  return { blog, loading, error };
};
