import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useSubScriptionSales = () => {
  const [tableData, setTableData] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();

  const [topSectionData, setTopSectionData] = useState({
    recurringCancelledCount: "",
    recurringCount: "",
    totalAmount: "",
  });
  const fetchData = async (query, page = 1) => {
    const { data } = await axiosInstance.get(
      `/api/admin/business-builder-subscription-sales?page=${page}`
    );
    const { status, data: reports } = data;

    if (status) {
      const {
        business_builder_subscription: report,

        ...rest
      } = reports;
      const { data: list, last_page, from } = report;
      seed(last_page, from);
      setTableData(list);
      setTopSectionData({
        recurringCancelledCount: rest.recurring_cancelled_count || 0,
        recurringCount: rest.recurring_count || 0,
        totalAmount: rest.total_amount || 0,
        thisWeek: rest.this_week || 0,
      });
    }
  };
  useEffect(() => {
    fetchData("", page);
  }, [page]);
  return {
    topSectionData,
    tableData,
    fetchData,
    count,
    onChange,
    page,
    rowStart,
  };
};

export default useSubScriptionSales;
