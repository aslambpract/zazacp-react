import { useSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";
import useEditForm from "./useEditForm";

const useEditHistory = (productId, cb) => {
  const methods = useEditForm(productId);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    reqData.append("effective_until", inputData.effective_until);
    reqData.append("_method", "PUT");
    try {
      const { status, data } = await axiosInstance.post(
        `api/admin/business-builder-subscriptions/${productId}`,
        reqData
      );
      if (status === 200) {
        cb();
        enqueueSnackbar(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useEditHistory;
