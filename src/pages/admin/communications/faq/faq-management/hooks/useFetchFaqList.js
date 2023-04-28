import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useFetchFaqList = () => {
  const [faqList, setFaqList] = useState([]);
  const { count, onChange, page, rowStart, seed } = usePagination();
  const fetchFaqList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/faq?page=${page}`);
      const { status, data: faqs } = data;
      if (status) {
        const { data: list, from, last_page } = faqs;
        seed(last_page, from);
        setFaqList(list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFaqList(page);
  }, [page]);

  return { faqList, fetchFaqList, count, onChange, page, rowStart };
};

export default useFetchFaqList;
