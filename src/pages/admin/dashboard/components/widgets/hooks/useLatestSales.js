import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axios";

const useLatestSales = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, status } = await axiosInstance(
          "api/admin/dashboard/latest-sales"
        );
        if (status === 200) {
          setList(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return list;
};

export default useLatestSales;
