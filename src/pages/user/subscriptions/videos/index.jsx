import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import useFetch from "../documents/hooks/useFetch";
import VideoCard from "./videoCard";
import i18n from "src/locales/i18n"
import useLocales from "src/hooks/useLocales";



const VideoList = () => {
  const { translate } = useLocales();
  const [category, setCategory] = useState("all");
  const { data, rowStart, ...rest } = useFetch("videos");
  const labels = [ i18n.t("userMySubscriptions.openDay") ,  i18n.t("userMySubscriptions.module")];

  return (
    <Page title= {translate("userMySubscriptions.videoTtitle")}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ flexGrow: 1, mb: 5 }}>
          {[ i18n.t("userMySubscriptions.all"), ...labels].map((label) => (
            <Button
              onClick={() => setCategory(label)}
              variant={label === category && "contained"}
              disabled
            >
              {label}
            </Button>
          ))}
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data.map((video, i) => (
              <Grid key={i} item xs={3} sm={3} md={3}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <PaginationButtons {...rest} />
      </Box>
    </Page>
  );
};

export default VideoList;
