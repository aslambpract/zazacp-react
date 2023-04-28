import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useFetchDepartmentList = () => {
  const [departmentList, setDepartmentList] = useState([]);
  const { count, onChange, page, seed, rowStart } = usePagination();

  const { enqueueSnackbar } = useSnackbar();
  const fetchDepartmentList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/support-ticket-department?page=${page}`
      );

      const { status, data: departments } = data;
      if (status) {
        const { data: list, last_page, from } = departments;
        seed(last_page, from);
        setDepartmentList(list);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  useEffect(() => {
    fetchDepartmentList(page);
  }, [page]);

  return {
    departmentList,
    fetchDepartmentList,
    page,
    count,
    onChange,
    rowStart,
  };
};

export default useFetchDepartmentList;
