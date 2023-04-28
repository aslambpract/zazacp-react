import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material/styles";
import * as yup from "yup";
import { FormControl } from "@mui/material";
import { useSnackbar } from "notistack";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";

const VideoEditDialog = ({ open, onClose, title, methods, fetchVideos }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ title, video_tool_url, id }) => {
    const reqData = new FormData();
    reqData.append("title", title);
    reqData.append("video_tool_url", video_tool_url);
    reqData.append("_method", "PUT");

    try {
      const { status, data: resData } = await axiosInstance.post(
        `/api/admin/tool-videos/${id}`,
        reqData
      );
      if (status === 200) {
        fetchVideos();
        onClose();
        enqueueSnackbar(resData.message);
      }
    } catch (err) {}
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="tool-doc"
    >
      <DialogTitle id="tool-doc">{title}</DialogTitle>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            <Box mt={3}>
              <FormControl fullWidth>
                <RHFTextField
                  name="title"
                  id="doc-title"
                  label={translate("adminTools.videos.docTitle")} 
                  variant="outlined"
                />
              </FormControl>
            </Box>

            <Box mt={3}>
              <FormControl fullWidth>
                <RHFTextField
                  name="video_tool_url"
                  id="video-url"
                  label={translate("adminTools.videos.videoURL")} 
                  variant="outlined"
                />
              </FormControl>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            autoFocus

            // startIcon={<Iconify icon={"bi:upload"} />}
          >
           {translate("adminTools.videos.update")}  
          </Button>
          <Button onClick={onClose} autoFocus color="error">
           {translate("adminTools.videos.close")}  
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default VideoEditDialog;
