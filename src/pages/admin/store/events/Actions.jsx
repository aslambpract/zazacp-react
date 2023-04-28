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
import { NavLink } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";


const Actions = ({ eventId, fetchEventsList, close }) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/events/${eventId}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        fetchEventsList();
        close();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <MenuItem
        component={NavLink}
        to={`${PATH_DASHBOARD.store.events_edit}/${eventId}`}
        sx={{ color: "default.main" }}
      >
        <Iconify icon={"carbon:view"} />
       {translate("adminStore.events.viewEdit")} 
      </MenuItem>
      <Divider />
      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => setOpenDialog(true)}
      >
        <Iconify icon={"eva:trash-2-outline"} />
        {translate("adminStore.events.delete")}
      </MenuItem>

      <Dialog open={openConfirmDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{translate("adminStore.events.deleteEvent")}</DialogTitle>
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
               {translate("adminStore.events.areYouSure")}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
           {translate("adminStore.events.delete")} 
          </Button>
          <Button onClick={() => setOpenDialog(false)}>{translate("adminStore.events.cancel")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
