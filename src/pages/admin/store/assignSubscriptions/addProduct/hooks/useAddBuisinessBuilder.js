import { useSnackbar } from "notistack";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";
import useBusinessBuilderForm, {
  businessBuilderDefaultValue,
} from "./useBusinessBuilderForm";

const useAddBusinessBuilder = () => {
  const methods = useBusinessBuilderForm();
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();
  const onSubmit = async (inputData) => {
    const { buffer_amount, is_with_points, ...rest } = inputData;
    const reqData = new FormData();

    Object.entries(rest).forEach(
      ([key, value]) => value && reqData.append(key, value)
    );

    try {
      const { status, data } = await axiosInstance.post(
        "api/admin/business-builder-subscriptions",
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        methods.reset(businessBuilderDefaultValue);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};
export default useAddBusinessBuilder;
