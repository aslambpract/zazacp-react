import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import useImpersonate from "src/hooks/useImpersonate";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";

const Actions = ({
  tankId,
  fetchHoldingTankList,
  close,
  impersonationId,
  isMailTurnedOn,
  openToggleMail,
}) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmDialog, setOpenDialog] = useState(false);
  const onImpersonate = useImpersonate(impersonationId);
  const handleDelete = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/holding-tank/${tankId}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        fetchHoldingTankList();
        close();
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <MenuItem onClick={onImpersonate} sx={{ color: "default.main" }}>
        <Iconify icon={"ant-design:user-switch-outlined"} />
        {translate("adminMembersManagement.holdingTank.impersonation")}
      </MenuItem>
      <MenuItem
        component={Link}
        to={`${PATH_DASHBOARD.members.member_profile}/${impersonationId}`}
        sx={{ color: "default.main" }}
      >
        <Iconify icon={"ant-design:user-outlined"} />
        {translate("adminMembersManagement.holdingTank.profile")}
      </MenuItem>
      {/* <MenuItem sx={{ color: "default.main" }}>
        <Iconify icon={"fluent:mail-16-regular"} />
        Email
      </MenuItem> */}

      <MenuItem sx={{ color: "default.main" }} onClick={openToggleMail}>
        <Iconify icon={"carbon:notification-off"} />
        {isMailTurnedOn ? translate("adminMembersManagement.holdingTank.turnOffEmail")  : translate("adminMembersManagement.holdingTank.turnOnEmail")}
      </MenuItem>

      <Divider />
      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => setOpenDialog(true)}
      >
        <Iconify icon={"eva:trash-2-outline"} />
       {translate("adminMembersManagement.holdingTank.action")} Delete
      </MenuItem>

      <Dialog open={openConfirmDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{translate("adminMembersManagement.holdingTank.deleteHoldindTank")}</DialogTitle>
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
               {translate("adminMembersManagement.holdingTank.areYouSure")} 
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
           {translate("adminMembersManagement.holdingTank.delete")} 
          </Button>
          <Button onClick={() => setOpenDialog(false)}>{translate("adminMembersManagement.holdingTank.cancel")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
