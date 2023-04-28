import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useBlogCategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);

  const { count, onChange, page, seed, rowStart } = usePagination();
  const fetchCategoryList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/blog-categories?page=${page}`
      );

      const { status, data: categories } = data;
      if (status) {
        const { last_page, from, data: list } = categories;
        seed(last_page, from);
        setCategoryList(list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategoryList(page);
  }, [page]);

  return { categoryList, fetchCategoryList, count, onChange, page, rowStart };
};

export default useBlogCategoryList;
