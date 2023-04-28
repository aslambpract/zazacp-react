import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useFetchDepositWallet = () => {
  const [data, setData] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchData = async (query = "", page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/deposit-wallet?${query}&page=${page}`
      );

      const { status, data: depositWallet } = data;
      if (status) {
        seed(depositWallet.last_page, depositWallet.from);
        setData(depositWallet.data);
      }
    } catch (err) {
      handleErrors(err);
    }
  };
  useEffect(() => {
    fetchData("", page);
  }, [page]);

  return { data, fetchData, count, onChange, page, rowStart };
};

export default useFetchDepositWallet;
