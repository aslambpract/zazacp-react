import { Box, Button, Grid } from "@mui/material";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import VideoCard from "./videoCard";
import useLocales from "src/hooks/useLocales";

const VideoList = ({ fetchVideo, videos, setEditVideo }) => {
  const { translate } = useLocales();
  return (
    <Page title={translate("adminTools.videos.VideosTool")}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ flexGrow: 1, mb: 5 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {videos.map((video) => (
              <Grid key={video.id} item xs={4} sm={3} md={3}>
                <VideoCard
                  video={video}
                  fetchVideos={fetchVideo}
                  setEditVideo={() => setEditVideo(video)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Page>
  );
};

export default VideoList;
