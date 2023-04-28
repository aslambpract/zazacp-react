import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axios";

const useFetchUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const fetchUsers = async (searchString) => {
    const formData = new FormData();
    formData.append("term", searchString);

    try {
      const { data } = await axiosInstance.post(
        "api/username/autocomplete",
        formData
      );
      setUserList(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (searchTerm.length >= 2) {
      fetchUsers(searchTerm);
    } else {
      setUserList([]);
    }
  }, [searchTerm]);

  return { userList, setSearchTerm };
};

export default useFetchUsers;
