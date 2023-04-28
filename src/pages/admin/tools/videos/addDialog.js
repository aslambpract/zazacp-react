import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState } from "react";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";
import AddVideo from "./addVideo";
import useAddVideo from "./hooks/useAddVideo";

const AddDialog = ({ fetchVideo, onClose }) => {
  const { translate } = useLocales();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { methods, onSubmit } = useAddVideo(fetchVideo);
  const {
    formState: { errors },
  } = methods;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        variant="contained"
        size="small"
        startIcon={<Iconify icon={"carbon:add"} />}
        onClick={handleClickOpen}
      >
        {translate("adminTools.videos.addVideo")}
      </Button>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="tool-video"
      >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <DialogTitle id="responsive-dialog-title">
            {translate("adminTools.videos.addVideo")}{" "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Box mt={3}>
                <FormControl fullWidth>
                  <TextField
                    {...methods.register("title")}
                    id="video-title"
                    label={translate("adminTools.videos.title")}
                    variant="outlined"
                    error={Boolean(errors.title)}
                    helperText={errors.title?.message}
                  />
                </FormControl>
              </Box>
              <Box mt={3}>
                <FormControl fullWidth>
                  <TextField
                    {...methods.register("video_tool_url")}
                    id="video-url"
                    label={translate("adminTools.videos.videoURLs")}
                    variant="outlined"
                    error={Boolean(errors.video_tool_url)}
                    helperText={errors.video_tool_url?.message}
                  />
                </FormControl>
              </Box>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" autoFocus>
              {translate("adminTools.videos.submit")}
            </Button>
            <Button onClick={handleClose} autoFocus color="error">
              {translate("adminTools.videos.close")}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AddDialog;
