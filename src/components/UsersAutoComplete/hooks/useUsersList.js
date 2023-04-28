import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axios";

const useUsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const fetchData = async () => {
    try {
      const { status, data } = await axiosInstance.post(
        `/api/username/autocomplete`
      );
      if (status === 200) {
        setUsersList(data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return usersList;
};

export default useUsersList;
