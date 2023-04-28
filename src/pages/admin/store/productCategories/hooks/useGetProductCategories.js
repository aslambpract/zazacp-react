import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useGetProductCategories = () => {
  const [productCategories, setProductCategories] = useState([]);

  const { count, onChange, page, seed } = usePagination();

  const fetchProductCategories = async (page = 1) => {
    const { data } = await axiosInstance(
      `/api/admin/product-categories?page=${page}`
    );

    const { status, data: categories } = data;
    if (status) {
      setProductCategories(categories.data);
      seed(categories.last_page);
    }
  };
  useEffect(() => {
    fetchProductCategories(page);
  }, [page]);

  return {
    productCategories,
    fetchProductCategories,
    count,
    onChange,
    page,
  };
};

export default useGetProductCategories;
