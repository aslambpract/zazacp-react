import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/fetchUser";

const useFetchSubscription = () => {
  const [data, setData] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, rowStart, seed } = usePagination();
  const fetchData = async (page = 1) => {
    try {
      const { data, status } = await (
        await axiosInstance.get(`my-subscriptions?page=${page}`)
      ).data;
      if (status) {
        const { last_page, from, data: subscriptions } = data;
        seed(last_page, from);
        setData(subscriptions);
      }
    } catch (err) {
      handleErrors(err);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return { data, count, onChange, page, rowStart, fetchData };
};

export default useFetchSubscription;
