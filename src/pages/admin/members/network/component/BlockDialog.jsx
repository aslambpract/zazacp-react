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

const BlockDialog = ({ open, selectedId, onClose, fetchData, isBlocked }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();

  const handleBlock = async () => {
    const { status, data: responseData } = await axiosInstance.get(
      `/api/admin/block-user/${selectedId}`
    );

    if (status === 200) {
      enqueueSnackbar(responseData.message);
      onClose();
      fetchData();
      return;
    }
    enqueueSnackbar("Failed to block member", { variant: "error" });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="block-user"
    >
      <DialogTitle id="block-user"> {translate("adminMembersManagement.networkMembers.blockUser")}</DialogTitle>
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
              {translate("adminMembersManagement.networkMembers.areYouSure ")}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBlock} variant="contained" color="warning">
          {isBlocked ? translate("adminMembersManagement.networkMembers.unBlock") : translate("adminMembersManagement.networkMembers.block")}
        </Button>
        <Button onClick={onClose}> {translate("adminMembersManagement.networkMembers.cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockDialog;
