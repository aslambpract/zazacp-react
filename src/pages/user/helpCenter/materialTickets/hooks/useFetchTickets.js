import { set } from "nprogress";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePagination from "src/components/pagination/usePagination";
import fetchUser from "src/utils/fetchUser";

const useFetchTickets = () => {
  const { label } = useParams();
  const [data, setData] = useState([]);
  const { count, onChange, page, rowStart, seed } = usePagination();
  useEffect(() => {
    const fetchData = async (label = null, page = 1) => {
      try {
        const { status, data } = await (
          await fetchUser("support-tickets", {
            params: { status: label, page },
          })
        ).data;
        if (status) {
          const { data: list, last_page, from } = data;
          seed(last_page, from);
          setData(list);
          return;
        }
        setData([]);
      } catch (err) {
        console.log(err);
      }
    };

    if (label === "all") fetchData(null, page);
    else fetchData(label, page);
  }, [label, page]);

  return { count, onChange, page, rowStart, data };
};

export default useFetchTickets;
