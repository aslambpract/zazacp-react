import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";

import axiosInstance from "src/utils/axios";

const useReviewList = () => {
  const [reviewList, setReviewList] = useState([]);
  const { count, onChange, page, rowStart, seed } = usePagination();
  useEffect(() => {
    const fetchReviewList = async (page = 1) => {
      try {
        const { data } = await axiosInstance.get(
          `/api/admin/user-reviews?page=${page}`
        );

        const { status, data: reviews } = data;

        if (status) {
          const { last_page, from, data: list } = reviews;
          seed(last_page, from);
          setReviewList(list);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchReviewList(page);
  }, [page]);

  return { reviewList, count, onChange, page, rowStart };
};

export default useReviewList;
