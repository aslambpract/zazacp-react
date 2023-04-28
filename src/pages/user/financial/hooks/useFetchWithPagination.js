import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/fetchUser";

const useFetchWitPagination = (url) => {
  const [data, setData] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, rowStart, seed } = usePagination();
  const fetchData = async (page = 1, filter = {}) => {
    try {
      const { data, status } = await (
        await axiosInstance.get(url, {
          params: {
            page,
            ...filter,
          },
        })
      ).data;
      if (status) {
        const { data: list, from, last_page } = data;
        seed(last_page, from);
        setData(list);
      }
    } catch (err) {
      console.log(err);
      handleErrors(err);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return { data, count, onChange, page, rowStart, fetchData };
};

export default useFetchWitPagination;
