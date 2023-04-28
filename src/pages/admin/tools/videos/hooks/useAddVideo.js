import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { UrlSchema } from "src/pages/admin/store/material/materialAdd/hooks/useMaterialForm";
import axiosInstance from "src/utils/axios";

import * as yup from "yup";

const Validator = yup.object().shape({
  title: yup.string().required("Title is required"),
  video_tool_url: yup
    .string()
    .required("Video url is required")
    .matches(UrlSchema, "Video must me a url"),
});

const defaultValues = {
  video_tool_url: "",
  title: "",
};
const getRequestData = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => formData.append(key, value));
  return formData;
};

const useAddVideo = (fetchVideo) => {
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Validator),
  });

  const onSubmit = async (reqData) => {
    try {
      const { data } = await axiosInstance.post(
        `/api/admin/tool-videos`,
        getRequestData(reqData)
      );
      if (data.status) {
        enqueueSnackbar(data.message);
        methods.reset();
        fetchVideo();
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to add video", { variant: "error" });
    }
  };

  return { methods, onSubmit };
};

export default useAddVideo;
