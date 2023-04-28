import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useErrors from "src/hooks/useErrors";
import axiosInstance from "src/utils/axios";

const useGetVideo = () => {
  const [videoList, setVideoList] = useState([]);
  const { pid } = useParams();
  const handleErrors = useErrors();
  const fetchVideos = async () => {
    try {
      const { status, data } = await axiosInstance.get(
        `/api/admin/product-videos/${pid}`
      );
      if (status === 200) {
        setVideoList(data.data);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [pid]);

  return { videoList, fetchVideos };
};

export default useGetVideo;
