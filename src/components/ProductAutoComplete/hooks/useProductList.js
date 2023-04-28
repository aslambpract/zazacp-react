import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useProductList = (isCombo) => {
  const handleErrors = useErrors();
  const [productList, setProductList] = useState([]);
  const fetchData = async () => {
    try {
      const { status, data } = await axiosInstance.get(
        `/api/admin/product-list?is_combo=${isCombo ? 1 : 0}`
      );
      if (status === 200) {
        setProductList(data.data);
      }
    } catch (err) {
      handleErrors(handleErrors);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return productList;
};

export default useProductList;
