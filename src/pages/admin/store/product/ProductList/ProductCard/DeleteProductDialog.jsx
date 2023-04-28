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
import useLocales from "src/hooks/useLocales";
import useDeleteProduct from "./hooks/useDeleteProduct";

const DeleteProductDialog = ({ itemId, onClose, refresh }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const deleteProduct = useDeleteProduct();
  const handleDelete = async () => {
    const status = await deleteProduct(itemId);
    if (status) {
      onClose();
      refresh();
      return;
    }
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(itemId)}
      onClose={onClose}
      aria-labelledby="delete-product"
    >
      <DialogTitle id="delete-product">
        {translate("adminStore.products.deleteProduct")}
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
        <Button
          onClick={() => handleDelete()}
          variant="contained"
          color="error"
        >
          {translate("adminStore.products.delete")}
        </Button>
        <Button onClick={onClose}>
          {translate("adminStore.products.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductDialog;
