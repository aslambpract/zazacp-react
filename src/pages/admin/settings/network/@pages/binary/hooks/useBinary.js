import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";

const useBinary = () => {
  const [data, setData] = useState([]);
  const handleError = useErrors();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          URI.admin.settings.network.binary.index
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

  const handleUpdate = (id) => (e) => {
    const selectedIndex = data.findIndex((item) => item.id === id);
    const selectedItem = data.find((item) => id === item.id);
    const { value, name } = e.target;
    selectedItem[name] = value ? parseInt(value) : value;
    setData((prev) => {
      const temp = [...prev];
      temp.splice(selectedIndex, 1, selectedItem);
      return temp;
    });
  };

  const onSubmit = (id) => async () => {
    const updateData = data.find((item) => item.id === id);
    const reqData = new FormData();

    Object.entries(updateData).forEach(([k, v]) => reqData.append(k, v));
    reqData.append("_method", "PUT");
    try {
      const { status } = await axiosInstance.post(
        URI.admin.settings.network.binary.update(id, reqData),
        reqData
      );
      return status === 200;
    } catch (err) {
      handleError(err);
    }
  };

  return { data, handleUpdate, onSubmit };
};
export default useBinary;
