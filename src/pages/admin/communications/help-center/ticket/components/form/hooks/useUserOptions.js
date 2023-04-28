import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useUserOptions = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const handleErrors = useErrors();

  useEffect(() => {
    const searchUsers = async (searchTerm) => {
      if (searchTerm.length < 2) return;

      const reqData = new FormData();
      reqData.append("term", searchTerm);
      try {
        const { status, data } = await axiosInstance.post(
          `/api/username/autocomplete`,
          reqData
        );
        if (status === 200) {
          setUsers(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    if (searchTerm.length > 2) searchUsers(searchTerm);
    setUsers([]);
  }, [searchTerm]);

  return { users, setSearchTerm };
};

export default useUserOptions;
