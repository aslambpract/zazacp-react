import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useGetData = () => {
  const [data, setData] = useState([]);

  const handleErrors = useErrors();
  const fetchData = async () => {
    try {
      const { status, data } = await axiosInstance("/api/admin/level-settings");

      if (status === 200) {
        setData(data.data.data);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};

export default useGetData;
