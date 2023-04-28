import { useSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";
import genFaqReqData from "../../utils/genFaqReqData";
import useCategoryForm from "./useCategoryForm";

const useAddCategory = (cb) => {
  const methods = useCategoryForm();

  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (inputData) => {
    try {
      const { status, data } = await axiosInstance({
        method: "post",
        url: "/api/admin/faq-categories",
        data: genFaqReqData(inputData),
      });
      if (status === 200) {
        cb();
        enqueueSnackbar(data.message);
      }
    } catch (error) {
      Object.values(error).flatMap((item) => enqueueSnackbar(item));
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useAddCategory;
