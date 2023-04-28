import { useEffect, useState } from "react";
import axiosInstance from "src/utils/axios";

const useSubAdmins = () => {
  const [subAdmins, setSubAdmins] = useState({
    active_sub_admins: { data: [] },
    inactive_sub_admins: { data: [] },
    trashed_sub_admins: { data: [] },
  });

  const fetchData = async (page = 1) => {
    try {
      const { status, data } = await (
        await axiosInstance.get(`/api/admin/sub-admins?page=${page}`)
      ).data;
      if (status) {
        setSubAdmins(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { subAdmins, fetchData };
};

export default useSubAdmins;
