import { useSnackbar } from "notistack";
import { useCallback } from "react";
import useAuth from "src/hooks/useAuth";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useUploadImage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const handleErrors = useErrors();
  const { setProfileImage } = useAuth();

  const uploadImage = async (file) => {
    try {
      const { status, data } = await axiosInstance.post(
        "/api/profile-image",
        genReqData(file)
      );

      if (status === 200) {
        enqueueSnackbar(data.message);
        setProfileImage(data.url);
      }
    } catch (error) {
      handleErrors(error);
    }
  };
  return useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      uploadImage(file);
    }
  }, []);
};

const genReqData = (file) => {
  const reqData = new FormData();
  reqData.append("profile_image", file);
  reqData.append("_method", "PUT");
  return reqData;
};

export default useUploadImage;
