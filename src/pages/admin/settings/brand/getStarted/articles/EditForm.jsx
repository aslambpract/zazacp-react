import { LoadingButton } from "@mui/lab";
import { Button, DialogActions } from "@mui/material";
import { useSnackbar } from "notistack";

import { FormProvider } from "src/components/hook-form";
import axiosInstance from "src/utils/axios";
import FormFields from "./formFields";
import useGetArticleById from "./hooks/useGetArticleById";
import { genReqData, handleErrors } from "./utils";
import useLocales from "src/hooks/useLocales";


const EditForm = ({ onClose, fetchArticles, articleId }) => {
  const { translate } = useLocales();
  const methods = useGetArticleById(articleId);
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (inputData) => {
    const reqData = genReqData(inputData);
    reqData.append("_method", "PUT");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/brand-get-started-articles/${articleId}`,
        reqData
      );
      if (status === 200) {
        fetchArticles();
        enqueueSnackbar(data.message);
        onClose();
      }
    } catch (error) {
      handleErrors(enqueueSnackbar)(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <FormFields isEdit />
      <DialogActions>
        <LoadingButton type="submit" variant="contained">
        {translate("adminSettings.brand.update")}  
        </LoadingButton>
        <Button onClick={onClose} autoFocus color="error">
        {translate("adminSettings.brand.close")} 
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default EditForm;
