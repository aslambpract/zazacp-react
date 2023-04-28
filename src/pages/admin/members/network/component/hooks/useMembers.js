import { snakeCase } from "lodash";
import { useEffect, useState } from "react";
import usePagination from "src/components/pagination/usePagination";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useMembers = (type) => {
  const [membersList, setMembersList] = useState([]);
  const handleErrors = useErrors();
  const { count, onChange, page, seed, rowStart } = usePagination();
  const fetchMemberList = async (query = "", page) => {
    try {
      const { data } = await axiosInstance.get(`/api/admin/users`, {
        params: {
          query,
          page,
          type: snakeCase(type),
        },
      });
      const { status, data: members } = data;
      if (status) {
        const { last_page, data: list, from } = members;
        seed(last_page, from);
        setMembersList(list);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchMemberList("", page);
  }, [page]);

  return { membersList, fetchMemberList, count, onChange, page, rowStart };
};

export default useMembers;
