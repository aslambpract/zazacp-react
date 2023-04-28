import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useTrashed = () => {
  const [productHistoryList, setProductHistoryList] = useState([]);
  const { count, onChange, page, rowStart, seed } = usePagination();
  const handleErrors = useErrors();
  const fetchProductHistoryList = async (query, page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/product-subscriptions`,
        {
          params: {
            query,
            page,
          },
        }
      );

      const { status, data: history } = data;

      if (status) {
        const {
          data: list,
          last_page,
          from,
        } = history.trashed_product_subscription;
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
    count,
    onChange,
    page,
    rowStart,
  };
};

export default useTrashed;
