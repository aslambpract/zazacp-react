import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useAssignSubscriptionList = () => {
  const [assignSubscriptionsList, setAssignSubscriptionsList] = useState([]);
  const handleErrors = useErrors();
  const fetchAssignSubscriptionList = async () => {
    try {
      const { status, data } = await axiosInstance.get(
        "/api/admin/product-subscriptions"
      );
      if (status === 200) {
        setAssignSubscriptionsList(data.data);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchAssignSubscriptionList();
  }, []);

  return { assignSubscriptionsList, fetchAssignSubscriptionList };
};

export default useAssignSubscriptionList;
