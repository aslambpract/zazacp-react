import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import axiosInstance from "src/utils/axios";
import { getUrl } from "../../config";

const useFund = ({ title, heading }) => {
  const { filter, setData } = useOutletContext();

  const [fund, setFund] = useState({
    credit_report: {},
    debit_report: {},
  });

  const getReport = async (page = 1) => {
    const URI = `api/admin/${getUrl("fundCredit")}`;

    try {
      const { data, status } = await axiosInstance(URI, {
        params: { ...filter, page },
      });
      if (status === 200) {
        setFund(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getReport();
  }, []);

  useMemo(() => {
    setData({ title, heading });
  }, [title, heading]);

  return { fund, getReport };
};

export default useFund;
