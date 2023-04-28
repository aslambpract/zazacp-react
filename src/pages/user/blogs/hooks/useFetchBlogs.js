import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/fetchUser";

const useFetchBlogs = () => {
  const [data, setData] = useState([]);

  const [searchParams] = useSearchParams();
  const isSubScription = searchParams.get("type") === "subscriptions";
  const { count, onChange, page, seed, rowStart } = usePagination();
  const fetchData = async (page = 1) => {
    const url = isSubScription
      ? `products-blog/${searchParams.get("id")}`
      : "user-blogs";
    try {
      const { data, status } = await (
        await axiosInstance.get(`${url}?page=${page}`)
      ).data;
      if (status) {
        const { last_page, data: list, from } = data;
        seed(last_page, from);
        setData(list);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page, isSubScription]);

  return { data, fetchData, count, onChange, page, rowStart };
};

export default useFetchBlogs;
