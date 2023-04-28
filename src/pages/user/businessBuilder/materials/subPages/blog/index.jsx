import { Box, Card, Stack, Typography } from "@mui/material";
import Vimeo from "@u-wave/react-vimeo";
import Progress from "src/components/Progress";
import { useMaterialContext } from "../..";

const Videos = () => {
  const { videos } = useMaterialContext();
  const isLoaded = videos.length;
  return (
    <Card sx={{ padding: "2rem" }}>
      <Stack spacing={2}>
        <Typography variant="h6">Videos</Typography>
        <Box
          sx={{
            display: "grid",
            columnGap: 2,
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          {isLoaded ? (
            videos.map(({ id, video_url: video }) => (
              <Card key={id}>
                <Vimeo video={video} />
              </Card>
            ))
          ) : (
            <Progress />
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default Videos;
