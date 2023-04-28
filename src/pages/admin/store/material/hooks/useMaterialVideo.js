import { useEffect, useState } from "react";
import { useParams } from "react-router";
import usePagination from "src/components/pagination/usePagination";
import axiosInstance from "src/utils/axios";

const useMaterialVideo = () => {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  const { count, onChange, page, rowStart, seed } = usePagination();

  const fetchVideos = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/materials-video/${id}?page=${page}`
      );
      const { status, data: videos } = data;
      if (status) {
        const { data: list, last_page, from } = videos;
        seed(last_page, from);
        setVideos(list.find(Boolean)?.material_videos);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos(page);
  }, [page]);

  return {
    videos,
    count,
    onChange,
    rowStart,
    page,
    fetchVideos: () => fetchVideos(page),
  };
};
export default useMaterialVideo;
