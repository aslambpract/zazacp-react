import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";

const DeleteDialog = ({ deleteId, onClose, fetchVideos }) => {
  const { translate } = useLocales();{translate("adminTools.videos.docTitle")} 
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const data = new FormData();
    data.append("_method", "DELETE");

    const { status } = await axiosInstance.post(
      `/api/admin/tool-videos/${deleteId}`,
      data
    );

    if (status === 200) {
      enqueueSnackbar("Deleted the video");
      onClose();
      fetchVideos();
      return;
    }
    enqueueSnackbar("Failed to delete the video", { variant: "error" });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(deleteId)}
      onClose={onClose}
      aria-labelledby="delete-document"
    >
      <DialogTitle id="delete-document">{translate("adminTools.videos.deleteVideos")} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              marginTop: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
              },
            }}
          >
            <Typography>
            {translate("adminTools.videos.areYouSure")} 
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
         {translate("adminTools.videos.delete")}  
        </Button>
        <Button onClick={onClose}>{translate("adminTools.videos.cancel")} </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
