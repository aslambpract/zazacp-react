import { DialogContent } from "@material-ui/core";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";

const DeleteDialog = ({ videoId, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const data = new FormData();
    data.append("_method", "DELETE");

    const { status, data: responseData } = await axiosInstance.post(
      `/api/admin/product-videos/${videoId}`,
      data
    );

    if (status === 200) {
      enqueueSnackbar(responseData.message);
      onClose();
      fetchData();

      return;
    }
    enqueueSnackbar("Failed to delete the video", { variant: "error" });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(videoId)}
      onClose={onClose}
      aria-labelledby="delete-video"
    >
      <DialogTitle id="delete-video">{translate("adminStore.products.deleteVideo")}</DialogTitle>
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
             {translate("adminStore.products.areYouSure")}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
          {translate("adminStore.products.delete")}
        </Button>
        <Button onClick={onClose}>{translate("adminStore.products.cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
