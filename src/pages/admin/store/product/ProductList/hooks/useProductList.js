import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useProductList = () => {
  const [products, setProducts] = useState([]);
  const { onChange, page, seed, count } = usePagination();
  const fetchProducts = async (pageNumber = 1) => {
    try {
      const { data } = await axiosInstance.get("/api/admin/products", {
        params: {
          page: pageNumber,
        },
      });
      const { status, data: products } = data;

      if (status) {
        const { last_page, from, data: list } = products;
        seed(last_page, from);
        setProducts(list);
      } else {
        setProducts([]);
        seed(1, 0);
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  console.log(products);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  return { products, onChange, page, count, fetchProducts };
};
export default useProductList;
