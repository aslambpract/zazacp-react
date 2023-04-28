import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { PATH_USER } from "src/routes/paths";
import fetchUser from "src/utils/fetchUser";

const useGetProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [product, setProduct] = useState({ images: [], colors: ["#000"] });
  const { pid } = state || {};
  const fetchProducts = async () => {
    try {
      const { status, data } = await fetchUser(`online-store/${pid}`);
      if (status === 200) {
        setProduct(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (pid) fetchProducts();
    else navigate(PATH_USER.onlineStore.productSubscription.root);

  }, [pid]);

  return { product, fetchProducts };
};

export default useGetProduct;
