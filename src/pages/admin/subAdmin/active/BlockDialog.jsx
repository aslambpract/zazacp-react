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
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";

const BlockDialog = ({ open, selectedId, onClose, fetchData, isBlocked }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleBlock = async () => {
    const { status, data: responseData } = await axiosInstance.get(
      `/api/admin/block-sub-admin/${selectedId}`
    );

    if (status === 200) {
      enqueueSnackbar(responseData.message);
      onClose();
      fetchData();
      return;
    }
    enqueueSnackbar("Failed to Block admin", { variant: "error" });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="block-sub-admin"
    >
      <DialogTitle id="block-sub-admin">
        {translate("adminSubAdmin.subAdmin.blockSubAdmin")}{" "}
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
              {translate("adminSubAdmin.subAdmin.areYouSure")}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBlock} variant="contained" color="warning">
          {!isBlocked
            ? translate("adminSubAdmin.subAdmin.unBlock")
            : translate("adminSubAdmin.subAdmin.block")}
        </Button>
        <Button onClick={onClose}>
          {" "}
          {translate("adminSubAdmin.subAdmin.cancel")}{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockDialog;
