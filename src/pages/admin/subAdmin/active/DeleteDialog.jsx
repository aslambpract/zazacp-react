import { DialogContent } from "@material-ui/core";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useState } from "react";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";

const DeleteDialog = ({ open, selectedId, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const [reason, setReason] = useState("");

  const handleDelete = async () => {
    const data = new FormData();
    data.append("_method", "DELETE");
    data.append("reason", reason);
    const { status, data: responseData } = await axiosInstance.post(
      `/api/admin/sub-admins/${selectedId}`,
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
      open={open}
      onClose={onClose}
      aria-labelledby="delete-video"
    >
      <DialogTitle id="delete-video">{translate("adminSubAdmin.subAdmin.deleteSubAdmin")} </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
           {translate("adminSubAdmin.subAdmin.areYouSure")}
          </Typography>
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
            <TextField
              onInput={(e) => setReason(e.target.value)}
              name="reason"
              variant="outlined"
              rows={3}
              fullWidth
              multiline
              label={translate("adminSubAdmin.subAdmin.reason")}
            />
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
         {translate("adminSubAdmin.subAdmin.delete")} 
        </Button>
        <Button onClick={onClose}>{translate("adminSubAdmin.subAdmin.cancel")} </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
