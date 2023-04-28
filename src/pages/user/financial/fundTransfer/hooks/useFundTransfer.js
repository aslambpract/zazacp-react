import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/fetchUser";

const useFundTransfer = () => {
  const [data, setData] = useState([]);
  const { count, onChange, page, rowStart, seed } = usePagination();
  const fetchData = async (page = 1) => {
    try {
      const { data, status } = await (
        await axiosInstance.get(`fund-transfer?page=${page}`)
      ).data;
      if (status) {
        const { data: eWallet, from, last_page } = data;
        seed(last_page, from);
        setData(eWallet);
      }
    } catch (err) {
      console.error(err);
      // handleErrors(err);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);
  console.log(data);
  return {
    data,
    count,
    onChange,
    page,
    rowStart,
    refetch: () => fetchData(page),
  };
};

export default useFundTransfer;
