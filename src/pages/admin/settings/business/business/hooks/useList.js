import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useBusinessList = () => {
  const [businessList, setBusinessList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchBusinessList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/business-builder?page=${page}`
      );
      const { status, data: businesses } = data;
      if (status) {
        const { last_page, from, data: list } = businesses;
        seed(last_page, from);
        setBusinessList(list);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  useEffect(() => {
    fetchBusinessList(page);
  }, [page]);

  return { businessList, fetchBusinessList, count, onChange, page, rowStart };
};

export default useBusinessList;
