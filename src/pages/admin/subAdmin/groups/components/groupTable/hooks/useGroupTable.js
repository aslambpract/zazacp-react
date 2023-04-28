import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useGroupTable = () => {
  const [groupList, setGroupList] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, seed, rowStart } = usePagination();

  const fetchData = async (page = 1) => {
    try {
      const { data, status } = await axiosInstance(
        "api/admin/sub-admin-user-groups",
        {
          params: {
            page,
          },
        }
      );
      if (status === 200) {
        const { data: list, last_page, from } = data.data;
        seed(last_page, from);
        setGroupList(list);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return { groupList, fetchData, count, onChange, page, rowStart };
};
export default useGroupTable;
