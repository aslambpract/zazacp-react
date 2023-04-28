import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useGetAllArticles = () => {
  const [articlesList, setArticlesList] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();

  const { enqueueSnackbar } = useSnackbar();
  const fetchArticles = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/brand-get-started-articles?page=${page}`
      );

      const { status, data: articles } = data;
      if (status) {
        const { last_page, data: list, from } = articles;
        seed(last_page, from);
        setArticlesList(list);
      }
    } catch (err) {
      enqueueSnackbar(err.message);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  return { articlesList, fetchArticles, count, onChange, page, rowStart };
};

export default useGetAllArticles;
