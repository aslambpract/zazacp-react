import { DialogContent } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
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
import { useState } from "react";
import { useParams } from "react-router";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";

const DeleteDialog = ({
  isSampleDocs,
  docId,
  onClose,
  fetchData = () => null,
}) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const { pid } = useParams();
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    const type = isSampleDocs ? "product-sample-docs" : "product-docs";
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/${type}/${docId}`,
        reqData
      );

      if (status === 200) {
        setLoading(false);
        enqueueSnackbar(data.message);
        fetchData(pid);
        onClose();
        return;
      }
    } catch (err) {
      console.log(err);
      // enqueueSnackbar("Failed to delete the document", { variant: "error" });
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(docId)}
      onClose={onClose}
      aria-labelledby="delete-video"
    >
      <DialogTitle id="delete-video">
        {translate("adminStore.products.deleteDocument")}
      </DialogTitle>
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
        <Button variant="outlined" onClick={onClose}>
          {translate("adminStore.products.cancel")}
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleDelete}
          variant="contained"
          color="error"
        >
          {translate("adminStore.products.delete")}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
