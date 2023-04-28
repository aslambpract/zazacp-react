import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/fetchUser";

const useFetchDepositWallet = () => {
  const [data, setData] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, rowStart, seed } = usePagination();
  const fetchData = async (query = "", page = "") => {
    try {
      const { data, status } = (
        await axiosInstance.get(`/deposit-wallet?query=${query}&page=${page}`)
      ).data;
      if (status) {
        // const { last_page, from, data: list } = data;
        // seed(last_page, from);
        // setData(list);
        setData(data);
      }
    } catch (err) {
      handleErrors(err);
    }
  };
  useEffect(() => {
    fetchData("", page);
  }, [page]);

  return { data, count, onChange, page, rowStart };
};

export default useFetchDepositWallet;
