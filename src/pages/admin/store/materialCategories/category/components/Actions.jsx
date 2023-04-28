import { useTheme } from "@emotion/react";
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
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";



const Actions = ({ categoryId, reload, close, openEdit }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/material-categories/${categoryId}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        reload();
        close();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <MenuItem onClick={openEdit} sx={{ color: "default.main" }}>
        <Iconify icon={"akar-icons:edit"} />
       {translate("adminStore.material.edit")} 
      </MenuItem>

      <Divider />

      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => setOpenDialog(true)}
      >
        <Iconify icon={"eva:trash-2-outline"} />
        {translate("adminStore.material.delete")}   
      </MenuItem>

      <Dialog
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
        open={openConfirmDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>{translate("adminStore.material.deleteMaterialCategory")} </DialogTitle>
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
               {translate("adminStore.material.areYouSure")}  </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
           {translate("adminStore.material.delete")} 
          </Button>
          <Button onClick={() => setOpenDialog(false)}>{translate("adminStore.material.cancel")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
