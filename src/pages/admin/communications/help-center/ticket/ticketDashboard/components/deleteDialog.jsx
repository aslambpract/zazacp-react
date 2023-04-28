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

const DeleteDialog = ({ open, selectedId, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");

    try {
      const { data } = await axiosInstance.post(
        `/api/admin/support-tickets/${selectedId}`,
        reqData
      );

      const { status, message } = data;
      if (status) {
        enqueueSnackbar(message);
        onClose();
        fetchData();
        return;
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="delete-category"
    >
      <DialogTitle id="delete-category">{translate("adminCommunication.helpCenter.deleteTicket")}</DialogTitle>
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
            {translate("adminCommunication.helpCenter.areYouSure")} 
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
         {translate("adminCommunication.helpCenter.delete")}
        </Button>
        <Button onClick={onClose}>{translate("adminCommunication.helpCenter.cancel")} </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
