import { useSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";
import useArticleCategoryForm from "./useArticleCategoryForm";

const useAddArticleCategory = (cb) => {
  const methods = useArticleCategoryForm();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    Object.entries(inputData).map(([key, value]) => reqData.append(key, value));

    try {
      const { status, data } = await axiosInstance.post(
        "api/admin/article-categories",
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

export default useAddArticleCategory;
