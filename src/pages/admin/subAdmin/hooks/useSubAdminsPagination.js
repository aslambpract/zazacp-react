import { useEffect } from "react";
import usePagination from "src/components/pagination/usePagination";

const useSubAdminsPagination = (
  { last_page, from },
  fetchData = () => null
) => {
  const { count, onChange, page, rowStart, seed } = usePagination();

  useEffect(() => {
    seed(last_page, from);
  }, [last_page, from]);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return { count, onChange, page, rowStart };
};

export default useSubAdminsPagination;
