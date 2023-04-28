import { useSnackbar } from "notistack";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useStatusChange = (id, cb) => {
  const handleErrors = useErrors();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = async (status) => {
    const reqData = new FormData();
    reqData.append("status", status);
    reqData.append("_method", "PUT");
    try {
      const { data, status } = await axiosInstance.post(
        `api/admin/support-ticket-status-change/${id}`,
        reqData
      );
      if (status === 200) {
        cb();
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  return handleChange;
};
export default useStatusChange;
