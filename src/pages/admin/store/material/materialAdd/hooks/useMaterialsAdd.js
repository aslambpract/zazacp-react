import moment from "moment";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import useErrors from "src/hooks/useErrors";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import useMaterialForm from "./useMaterialForm";

const genReqData = (inputData) => {
  const { video_access_time, doc_access_time, product_list, doc, ...rest } =
    inputData;
  const reqData = new FormData();
  Object.entries(rest).forEach(([key, value]) => reqData.append(key, value));

  reqData.append(
    "video_access_time",
    moment(video_access_time).format("DD/MM/YYYY")
  );
  reqData.append("doc", doc[0]);
  reqData.append(
    "doc_access_time",
    moment(doc_access_time).format("DD/MM/YYYY")
  );
  product_list.forEach(({ id }) => reqData.append("product_id[]", id));

  return reqData;
};

const useMaterialsAdd = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();
  const methods = useMaterialForm();
  const navigate = useNavigate();
  // console.log(methods.formState.errors, methods.getValues());
  const onSubmit = async (inputData) => {
    try {
      const { status, data } = await axiosInstance.post(
        "/api/admin/materials",
        genReqData(inputData)
      );

      if (status === 200) {
        enqueueSnackbar(data.message);
        navigate(PATH_DASHBOARD.store.material);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return { methods, onSubmit: methods.handleSubmit(onSubmit) };
};

export default useMaterialsAdd;
