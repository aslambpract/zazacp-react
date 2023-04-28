import { Box, Button, Card, Grid, Stack } from "@mui/material";

import Vimeo from "@u-wave/react-vimeo";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";

const VideoCard = ({ item, openEdit, openDelete }) =>{
  const { translate } = useLocales();
  return(

    <Card sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={5}>
            <Card>
              <Vimeo video={item.video_url} controls responsive />
            </Card>
    
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 1,
                m: 1,
                borderRadius: 1,
              }}
            >
              <Button
                variant="outlined"
                size="small"
                startIcon={<Iconify icon={"akar-icons:edit"} />}
                onClick={openEdit}
              >
               {translate("adminStore.products.edit")} 
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Iconify icon={"eva:trash-2-outline"} />}
                color="error"
                onClick={openDelete}
              >
                {translate("adminStore.products.delete")}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Card>
    );
} 

export default VideoCard;
