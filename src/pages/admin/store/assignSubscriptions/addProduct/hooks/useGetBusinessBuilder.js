import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useGetBusinessBuilder = () => {
  const [businessBuilderList, setBusinessBuilderList] = useState([]);
  const handleErrors = useErrors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          "api/user/business-builder-list"
        );
        if (status === 200) {
          setBusinessBuilderList(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };
    fetchData();
  }, []);
  return businessBuilderList;
};

export default useGetBusinessBuilder;
