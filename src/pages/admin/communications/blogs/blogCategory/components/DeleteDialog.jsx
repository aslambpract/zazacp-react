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

const DeleteDialog = ({ selectedId, onClose, fetchData }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const data = new FormData();
    data.append("_method", "DELETE");

    try {
      const { status, data: responseData } = await axiosInstance.post(
        `/api/admin/blog-categories/${selectedId}`,
        data
      );

      if (status === 200) {
        fetchData();
        enqueueSnackbar(responseData.message);
        onClose();
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, {
          variant: "error",
        })
      );
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(selectedId)}
      onClose={onClose}
      aria-labelledby="delete-blog-category"
    >
      <DialogTitle id="delete-blog-category">Delete Blog Category</DialogTitle>
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
              Are you sure that you want to continue this action cannot be
              reversed
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
