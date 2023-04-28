import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import fetchUser from "src/utils/fetchUser";

const useFetchHistoryTable = () => {
  const { count, onChange, page, rowStart, seed } = usePagination();
  const [history, setHistory] = useState([]);

  const fetchHistory = async (page = 1) => {
    try {
      const { data } = await fetchUser(`my-bb-subscriptions?page=${page}`);
      const { status, data: orderHistory } = data;
      if (status) {
        const { data: list, last_page, from } = orderHistory;
        seed(last_page, from);
        setHistory(list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHistory(page);
  }, [page]);

  return { history, count, onChange, page, rowStart };
};

export default useFetchHistoryTable;
