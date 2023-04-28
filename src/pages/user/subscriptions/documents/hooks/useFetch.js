import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { count, onChange, page, rowStart, seed } = usePagination();

  const handleErrors = useErrors();
  const fetchData = async () => {
    try {
      const { status, data } = await (
        await fetchUser(`my-subscriptions-${url}/${id}`)
      ).data;

      if (status) {
        const { data: list, last_page, from } = data;
        seed(last_page, from);
        setData(list);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  return { count, onChange, page, rowStart, data };
};

export default useFetch;
