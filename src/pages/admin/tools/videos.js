import { Box, Button, Card, Grid } from "@mui/material";

import { useEffect, useState } from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import AddDialog from "./videos/addDialog";
import AddVideo from "./videos/addVideo";
import VideoList from "./videos/videoList";
import useLocales from "src/hooks/useLocales";

const Videos = () => {
  const { translate } = useLocales();
  const [videos, setVideos] = useState([]);
  const [editVideo, setEditVideo] = useState(null);
  const [addVideo, setAddVideo] = useState(null);

  const { count, onChange, page, seed } = usePagination();

  const fetchVideo = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/tool-videos?page=${page}`
      );
      const { status, data: videos } = data;
      if (status) {
        const { last_page, data: list } = videos;
        seed(last_page);
        setVideos(list);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideo(page);
  }, [page]);

  return (
    <Page title={translate("adminTools.videos.VideosTool")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminTools.videos.videos")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name: translate("adminTools.videos.videos") },
          ]}
        />
        <Card>
          <Box sx={{ p: 2, display: "flex", justifyContent: "right" }}>
            <AddDialog fetchVideo={fetchVideo} addVideo={addVideo} />
          </Box>

          <VideoList
            videos={videos}
            fetchVideo={fetchVideo}
            setEditVideo={setEditVideo}
          />
        </Card>
        <PaginationButtons count={count} onChange={onChange} page={page} />
      </Box>
    </Page>
  );
};

export default Videos;
