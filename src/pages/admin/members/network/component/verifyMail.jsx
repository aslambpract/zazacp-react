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

const useHandleVerification = (id) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleVerification = async () => {
    try {
      const { data, status } = await axiosInstance(
        `api/admin/verify-email/${id}`
      );

      if (status === 200) {
        enqueueSnackbar(data.message);
        return true;
      }
      return false;
    } catch (err) {
      enqueueSnackbar(err.message);
      return false;
    }
  };

  return handleVerification;
};

const VerifyMail = ({ open, selectedId, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const verify = useHandleVerification(selectedId);

  const handleVerify = async () => {
    const status = await verify();
    if (status) {
      onClose();
      fetchData();
    }
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
      <DialogTitle id="block-user">{translate("adminMembersManagement.networkMembers.verifyMail")}</DialogTitle>
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
             {translate("adminMembersManagement.networkMembers.areYouSure")}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleVerify}>
          {translate("adminMembersManagement.networkMembers.verify")}
        </Button>
        <Button onClick={onClose}>{translate("adminMembersManagement.networkMembers.cancel")}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default VerifyMail;
