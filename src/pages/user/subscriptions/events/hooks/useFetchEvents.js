import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";

const useFetchEvents = (url, isPublic) => {
  const { id } = useParams();
  const { count, onChange, page, seed } = usePagination();
  const [data, setData] = useState([]);
  const handleErrors = useErrors();
  const fetchData = async (page = 1) => {
    try {
      const { status, data } = await (
        await fetchUser(`products-events-${url}`, {
          params: {
            access_scope: isPublic ? "public" : "private",
            product_id: id,
            page: page,
          },
        })
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
    fetchData(page);
  }, [page]);

  return { data, count, onChange, page };
};

export default useFetchEvents;
