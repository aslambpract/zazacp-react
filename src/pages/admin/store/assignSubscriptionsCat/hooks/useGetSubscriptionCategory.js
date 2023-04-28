import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axios";
import usePagination from "src/components/pagination/usePagination";

const useGetSubscriptionCategory = () => {
  const [subscriptionCategoryList, setSubScriptionCategoryList] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchSubCategoryList = async (page = 1) => {
    try {
      const { data } = await axiosInstance(
        `api/admin/product-subscription-categories?page=${page}`
      );
      const { status, data: categories } = data;
      if (status) {
        const { last_page, data: list, from } = categories;
        seed(last_page, from);
        setSubScriptionCategoryList(list);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchSubCategoryList(page);
  }, [page]);

  return {
    subscriptionCategoryList,
    fetchSubCategoryList,
    count,
    onChange,
    page,
    rowStart,
  };
};

export default useGetSubscriptionCategory;
