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

const DeleteDialog = ({ open, deleteId, onClose, reload }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const data = new FormData();
    data.append("_method", "DELETE");

    const { status } = await axiosInstance.post(
      `/api/admin/tool-documents/${deleteId}`,
      data
    );

    if (status === 200) {
      enqueueSnackbar("Deleted the document");
      onClose();
      reload();
      return;
    }
    enqueueSnackbar("Failed to delete the document", { variant: "error" });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="delete-document"
    >
      <DialogTitle id="delete-document"> {translate("adminTools.documents.deleteDocument")}  </DialogTitle>
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
              {translate("adminTools.documents.areYousure")}  
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
           {translate("adminTools.documents.delete")}  
        </Button>
        <Button onClick={onClose}>{translate("adminTools.documents.cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
