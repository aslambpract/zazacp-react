import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useCategoriesList = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { count, onChange, page, seed, rowStart } = usePagination();
  const fetchCategoriesList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/support-ticket-categories?page=${page}`
      );
      const { status, data: categories } = data;

      if (status) {
        const { last_page, data: list, from } = categories;
        seed(last_page, from);
        setCategoriesList(list);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  useEffect(() => {
    fetchCategoriesList(page);
  }, [page]);

  return {
    categoriesList,
    fetchCategoriesList,
    page,
    count,
    onChange,
    rowStart,
  };
};

export default useCategoriesList;
