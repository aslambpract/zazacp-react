import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useQuestionList = () => {
  const [questionList, setQuestionList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { pid } = useParams();
  const { count, onChange, page, rowStart, seed } = usePagination();
  const fetchQuestionList = async (page = 1) => {
    try {
      const { status, data } = await axiosInstance.get(
        `/api/admin/product-question/${pid}?page=${page}`
      );

      if (status === 200) {
        const { last_page, from, data: list } = data.data;
        seed(last_page, from);
        setQuestionList(list);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  useEffect(() => {
    fetchQuestionList(page);
  }, [page]);

  return { questionList, fetchQuestionList, count, onChange, rowStart, page };
};

export default useQuestionList;
