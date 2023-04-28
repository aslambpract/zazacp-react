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


const DeleteCategory = ({ deleteId, onClose, fetchData, open }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const data = new FormData();
    data.append("_method", "DELETE");

    const { status, data: responseData } = await axiosInstance.post(
      `/api/admin/product-subscription-categories/${deleteId}`,
      data
    );

    if (status === 200) {
      enqueueSnackbar(responseData.message);
      onClose();
      fetchData();

      return;
    }
    enqueueSnackbar("Failed to delete Category", { variant: "error" });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="delete-Category"
    >
      <DialogTitle id="delete-Category">{translate("adminStore.assignSubscriptions.deleteCategory")}</DialogTitle>
      <DialogContent>
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
          <DialogContentText>
            <Typography>
              {translate("adminStore.assignSubscriptions.areYouSure")}
            </Typography>
          </DialogContentText>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
          {translate("adminStore.assignSubscriptions.delete")}
        </Button>
        <Button onClick={onClose}>{translate("adminStore.assignSubscriptions.cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCategory;
