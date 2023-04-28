import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useProductHistoryList = () => {
  const [productHistoryList, setProductHistoryList] = useState([]);
  const { count, onChange, page, rowStart, seed } = usePagination();
  const handleErrors = useErrors();
  const fetchProductHistoryList = async (query, page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/product-subscriptions`,
        {
          params: {
            page,
            query,
          },
        }
      );

      const { status, data: history } = data;
      if (status) {
        const { data: list, last_page, from } = history.product_subscription;
        seed(last_page, from);
        setProductHistoryList(list);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchProductHistoryList("", page);
  }, [page]);

  return {
    productHistoryList,
    fetchProductHistoryList,
    count,
    onChange,
    page,
    rowStart,
  };
};

export default useProductHistoryList;
