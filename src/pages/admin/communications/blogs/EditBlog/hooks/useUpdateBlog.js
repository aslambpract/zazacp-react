import { useSnackbar } from "notistack";
import { useParams } from "react-router";
import axiosInstance from "src/utils/axios";
import { genReqData } from "../../NewBlog/hooks/useAddPost";
import useGetBlogById from "./useGetBlogById";

const useUpdateBlog = () => {
  const methods = useGetBlogById();
  const { bid } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const onSubmit = () => async (inputData) => {
    const reqData = genReqData(inputData);
    reqData.append("_method", "PUT");
    try {
      const { status, data } = await axiosInstance.post(
        `api/admin/blogs/${bid}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  return { methods, onSubmit };
};

export default useUpdateBlog;
