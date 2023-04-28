import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import useErrors from "src/hooks/useErrors";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import useComboForm from "./useComboForm";

const createReqData = (data) => {
  const {
    bv,
    price,
    sample_doc,
    doc,
    image,
    active,
    subscription_type,
    life_time_access,
    product_ids,
    ...newData
  } = data;

  console.log(product_ids);
  const formData = new FormData();
  Object.entries(newData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  image.forEach((v) => formData.append("image[]", v));

  formData.set("active", active ? 1 : 0);
  formData.set("sample_doc", sample_doc ? sample_doc[0] : null);
  formData.set("doc", doc ? doc[0] : null);
  formData.set(
    "subscription_type",
    subscription_type.toLowerCase() === "subscription" ? 1 : 0
  );
  formData.set("life_time_access", life_time_access ? 1 : 0);

  Object.entries(bv).forEach(([key, value]) => {
    if (value) formData.append(`business_volume[${key}]`, value);
  });

  Object.entries(price).forEach(([key, value]) => {
    if (value) formData.append(`price[${key}]`, value);
  });

  formData.append("product_ids", `[${product_ids}]`);

  return formData;
};

const useAddCombo = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useComboForm();
  const handleErrors = useErrors();
  const { setError } = methods;
  const onSubmit = async (reqData) => {
    const {
      life_time_access,
      no_of_days,
      life_time_price,
      life_time_business_volume,
    } = reqData;
    if (life_time_access) {
      if (isNaN(parseInt(no_of_days))) {
        setError("no_of_days", { message: "Enter a valid number" });
      }
      if (isNaN(parseInt(life_time_price))) {
        setError("life_time_price", { message: "Enter a valid number" });
      }

      if (isNaN(parseInt(life_time_business_volume))) {
        setError("life_time_business_volume", {
          message: "Enter a valid number",
        });
        return;
      }
    }
    try {
      const { status, data } = await axiosInstance.post(
        "/api/admin/combo-products/",
        createReqData(reqData)
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        navigate(PATH_DASHBOARD.store.products);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useAddCombo;
