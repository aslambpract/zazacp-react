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

const Actions = ({ productId, fetchProductList, close, openEdit, userId }) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/business-builder-subscriptions/${productId}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        fetchProductList();
        close();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onImpersonate = useImpersonate(userId);
  return (
    <>
      <MenuItem sx={{ color: "default.main" }} onClick={openEdit}>
        <Iconify icon={"akar-icons:edit"} />
       {translate("adminStore.assignSubscriptions.edit")}  
      </MenuItem>

      <MenuItem onClick={onImpersonate} sx={{ color: "default.main" }}>
        <Iconify icon={"ant-design:user-switch-outlined"} />
        {translate("adminStore.assignSubscriptions.impersonate")} 
      </MenuItem>
      <MenuItem
        component={Link}
        to={`${PATH_DASHBOARD.members.member_profile}/${userId}`}
      >
        <Iconify icon={"ant-design:user-outlined"} />
       {translate("adminStore.assignSubscriptions.profile")}  
      </MenuItem>

      <Divider />
      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => setOpenDialog(true)}
      >
        <Iconify icon={"eva:trash-2-outline"} />
       {translate("adminStore.assignSubscriptions.delete")}  
      </MenuItem>

      <Dialog open={openConfirmDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{translate("adminStore.assignSubscriptions.deleteCategory")} </DialogTitle>
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
               {translate("adminStore.assignSubscriptions.areYouSure")}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
           {translate("adminStore.assignSubscriptions.delete")}  
          </Button>
          <Button onClick={() => setOpenDialog(false)}>{translate("adminStore.assignSubscriptions.cancel")} </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
