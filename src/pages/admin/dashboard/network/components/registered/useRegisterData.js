import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";

const useRegisterData = () => {
  const handleErrors = useErrors();
  const [data, setData] = useState({
    members: 0,
    holding_tank: 0,
    network_members: 0,
    business_builder_members: 0,
    members_yesterday: 0,
    holding_tank_yesterday: 0,
    network_members_yesterday: 0,
    members_this_month: 0,
    holding_tank_this_month: 0,
    network_members_this_month: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          URI.admin.network.registeredMembers
        );

        if (status === 200) {
          setData(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);

  return data;
};

export default useRegisterData;
