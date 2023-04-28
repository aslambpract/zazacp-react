import { useSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";
import useGetDepartmentTickedById from "./useGetDepartmentTickedtById";

const useEditDepartmentTicket = (id, cb) => {
  const methods = useGetDepartmentTickedById(id);
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = async (inputData) => {
    const reqData = new FormData();

    Object.entries(inputData).forEach(([key, value]) =>
      reqData.append(key, value)
    );
    reqData.append("_method", "PUT");

    try {
      const { status, data } = await axiosInstance.post(
        `api/admin/support-ticket-department/${id}`,
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

export default useEditDepartmentTicket;
