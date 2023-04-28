import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";
import { getUrl } from "../config";

const useReport = (uriKey, { title, heading }) => {
  const { filter, setData } = useOutletContext();
  const [report, setReport] = useState();
  const { count, onChange, page, seed, rowStart } = usePagination();

  const getReport = async (page = 1, filter = {}) => {
    const URI = `api/admin/${getUrl(uriKey)}`;
    try {
      const { data, status } = await axiosInstance(URI, {
        params: { ...filter, page },
      });
      if (status === 200) {
        const { last_page, from, data: list } = data.data;
        seed(last_page, from);
        setReport(list);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useMemo(() => {
    setData({ title, heading });
  }, [title, heading]);

  useEffect(() => {
    getReport(page, filter);
  }, [page, filter]);

  return { report, getReport, count, onChange, page, rowStart };
};

export default useReport;
