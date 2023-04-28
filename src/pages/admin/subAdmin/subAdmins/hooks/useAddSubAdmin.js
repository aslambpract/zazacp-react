import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import useErrors from "src/hooks/useErrors";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import useSubAdminForm from "./useSubAdminForm";

const useAddSubAdmin = () => {
  const navigate = useNavigate();
  const methods = useSubAdminForm();
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();
  const onSubmit = async (inputData) => {
    const reqData = new FormData();
    [...Object.entries(inputData)].forEach(([key, value]) =>
      reqData.append(key, value)
    );
    try {
      const { status, data } = await axiosInstance.post(
        "api/admin/sub-admins",
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        navigate(PATH_DASHBOARD.subAdmin.sub_admins);
      }
    } catch (err) {
      Object.entries(err.errors).forEach(([k, v]) =>
        methods.setError(k, { message: v[0] })
      );
      handleErrors(err);
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useAddSubAdmin;
