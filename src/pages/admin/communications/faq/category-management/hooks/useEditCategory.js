import { useSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";
import genFaqReqData from "../../utils/genFaqReqData";
import useGetCategoryById from "./useGetCategoryById";

const useEditCategory = (id, cb) => {
  const methods = useGetCategoryById(id);

  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (inputData) => {
    const reqData = genFaqReqData(inputData);
    reqData.append("_method", "PUT");
    try {
      const { status, data } = await axiosInstance.post(
        `api/admin/faq-categories/${id}`,
        reqData
      );
      if (status === 200) {
        cb();
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useEditCategory;
