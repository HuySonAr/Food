import { getPublicProductsService } from '@/services/menu.service';
import { useEffect, useState } from 'react';

export const useMenu = (category = 'all', page = 1, limit = 8) => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setErorr] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const apiCategory =
          category === 'main-dishes' ? 'main dishes' : category;

        const response = await getPublicProductsService({
          category: apiCategory,
          page,
          limit,
        });

        setProducts(response.data.products);
        setPagination(response.data.pagination);
        setErorr(null);
      } catch (err) {
        console.log('error', err.response.data);
        setErorr(err.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, page, limit]);

  return { products, pagination, loading, error };
};
