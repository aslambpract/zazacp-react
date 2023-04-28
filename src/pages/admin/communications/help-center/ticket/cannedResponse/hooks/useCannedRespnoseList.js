import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useCannedResponseList = () => {
  const [cannedList, setCannedList] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchCannedList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/support-ticket-canned-responses?page=${page}`
      );

      const { status, data: cannedResponses } = data;
      if (status) {
        const { last_page, from, data: list } = cannedResponses;
        seed(last_page, from);
        setCannedList(list);
      }
    } catch (err) {
      handleErrors(err);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCannedList(page);
  }, [page]);
  return { cannedList, fetchCannedList, count, onChange, page, rowStart };
};

export default useCannedResponseList;
