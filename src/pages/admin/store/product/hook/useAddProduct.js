import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import useErrors from "src/hooks/useErrors";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import createReqData from "../ProductAddForm/utils/createReqData";
import useProductForm from "./useProductForm";

const useAddProduct = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleErrors = useErrors();
  const methods = useProductForm();
  const { setError } = methods;
  const onSubmit = async (data) => {
    const { life_time_access, no_of_days, life_time_price } = data;
    if (life_time_access) {
      if (isNaN(parseInt(no_of_days))) {
        setError("no_of_days", { message: "Enter a valid number" });
      }
      if (isNaN(parseInt(life_time_price))) {
        setError("life_time_price", { message: "Enter a valid number" });
        return;
      }
    }
    try {
      const res = await axiosInstance({
        method: "post",
        url: "/api/admin/products",
        data: createReqData(data),
      });
      if (res.status === 200) {
        enqueueSnackbar(res.data.message);
        navigate(PATH_DASHBOARD.store.products);
      }
    } catch (err) {
      console.log(err);
      handleErrors(err);
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useAddProduct;
