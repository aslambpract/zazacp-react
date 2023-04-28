import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";

import axiosInstance from "src/utils/axios";

const usePriorities = () => {
  const [priorities, setPriorities] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchPriorities = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/support-ticket-priorities?page=${page}`
      );
      const { status, data: priorities } = data;
      if (status) {
        const { data: list, last_page, from } = priorities;
        seed(last_page, from);
        setPriorities(list);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchPriorities(page);
  }, [page]);

  return { priorities, fetchPriorities, count, onChange, page, rowStart };
};

export default usePriorities;
