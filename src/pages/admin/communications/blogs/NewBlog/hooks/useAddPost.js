import { useSnackbar } from "notistack";
import { useNavigate } from "react-router";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";

const useAddPost = (setError) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  return (isDraft = false) =>
    async (inputData) => {
      const { document_url, image } = inputData;
      if (!document_url) {
        setError("document_url", { message: "Document is required" });
        return;
      }

      if (!image) {
        setError("image", { message: "Image is required" });
        return;
      }

      const reqData = genReqData(inputData);
      reqData.set("is_draft", isDraft ? 1 : 0);
      try {
        const { data } = await axiosInstance.post("/api/admin/blogs", reqData);

        const { status, message } = data;

        if (status) {
          enqueueSnackbar(message);
          navigate(PATH_DASHBOARD.communication.blog);
        }
      } catch (error) {
        Object.values(error).flatMap((err) =>
          enqueueSnackbar(err, { variant: "error" })
        );
      }
    };
};

export const genReqData = (inputData) => {
  // console.log(inputData);
  const reqData = new FormData();

  const { document_url, image, product_id, type, ...rest } = inputData;
  Object.entries(rest).forEach(([key, value]) => reqData.append(key, value));
  if (image.length) {
    if (typeof image[0] === "object") reqData.set("blogimage_url", image[0]);
  }
  if (document_url.length) reqData.set("document_url", document_url[0]);

  const isPrivate = type === "Private";

  if (isPrivate) {
    reqData.set("product_id", product_id);
  }

  reqData.set("type", isPrivate ? 1 : 0);

  return reqData;
};

export default useAddPost;
