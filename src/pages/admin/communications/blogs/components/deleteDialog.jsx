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

const DeleteDialog = ({ open, selectedId, onClose, fetchData }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async () => {
    const data = new FormData();
    data.append("_method", "DELETE");

    const { status, data: responseData } = await axiosInstance.post(
      `/api/admin/blogs/${selectedId}`,
      data
    );

    if (status === 200) {
      enqueueSnackbar(responseData.message);
      onClose();
      fetchData();
      return;
    }
    enqueueSnackbar("Failed to delete the blog", { variant: "error" });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="delete-blog"
    >
      <DialogTitle id="delete-blog">Delete Blog</DialogTitle>
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
