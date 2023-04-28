import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useArticleList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [articleList, setArticleList] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();
  const fetchArticleList = async (page = 1) => {
    try {
      const { data } = await axiosInstance(`api/admin/articles?page=${page}`);
      const { status, data: articles } = data;
      if (status) {
        const { last_page, data: list, from } = articles;
        seed(last_page, from);
        setArticleList(list);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  useEffect(() => fetchArticleList(page), [page]);

  return { articleList, fetchArticleList, count, onChange, rowStart };
};

export default useArticleList;
