import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useReferrals = () => {
  const [data, setData] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchData = async (page = 1) => {
    try {
      const { data } = await axiosInstance("/api/referrals", {
        params: { page },
      });
      const { status, referrals } = data;
      if (status) {
        const { last_page, from, data: list } = referrals;

        seed(last_page, from);
        setData(list);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  return { data, count, onChange, page, rowStart };
};

export default useReferrals;
