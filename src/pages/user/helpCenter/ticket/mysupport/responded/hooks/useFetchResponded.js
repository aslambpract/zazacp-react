import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/fetchUser";
const useFetchResponded = () => {
  const [data, setData] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();
  const fetchData = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `support-tickets?status=responded&page=${page}`
      );
      const { status, data: report } = data;
      if (status) {
        const { last_page, data: list, from } = report;
        seed(last_page, from);
        setData(list);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return { data, fetchData, count, onChange, page, rowStart };
};

export default useFetchResponded;
