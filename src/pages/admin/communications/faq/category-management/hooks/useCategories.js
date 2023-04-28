import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useCategories = () => {
  const [categoryList, setCategoryList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { count, onChange, page, rowStart, seed } = usePagination();
  const fetchCategoryList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/faq-categories?page=${page}`
      );

      const { status, data: categories } = data;
      if (status) {
        const { last_page, from, data: list } = categories;
        seed(last_page, from);
        setCategoryList(list);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  useEffect(() => {
    fetchCategoryList(page);
  }, [page]);

  return { categoryList, fetchCategoryList, count, onChange, page, rowStart };
};

export default useCategories;
