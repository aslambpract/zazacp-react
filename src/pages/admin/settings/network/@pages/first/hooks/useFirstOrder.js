import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";

const useFirstOrder = () => {
  const [data, setData] = useState([]);
  const handleError = useErrors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          URI.admin.settings.network.firstOrder.index
        );
        if (status === 200) {
          setData(data.data);
        }
      } catch (err) {
        handleError(err);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useFirstOrder;
