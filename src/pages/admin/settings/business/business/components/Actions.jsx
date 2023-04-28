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

const Actions = ({ businessId, reload, close, openEdit }) => {
  const theme = useTheme();
  const { translate } = useLocales();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/business-builder/${businessId}`,
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
        {translate("adminSettings.businessBuilder.edit")}  
      </MenuItem>

      <Divider />

      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => setOpenDialog(true)}
      >
        <Iconify icon={"eva:trash-2-outline"} />
         {translate("adminSettings.businessBuilder.delete")} 
      </MenuItem>

      <Dialog
        maxWidth="sm"
        fullWidth
        fullScreen={fullScreen}
        open={openConfirmDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle> {translate("adminSettings.businessBuilder.deleteBusinessBuilder")}  </DialogTitle>
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
                {translate("adminSettings.businessBuilder.areYouSure")}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
            {translate("adminSettings.businessBuilder.delete")}  
          </Button>
          <Button onClick={() => setOpenDialog(false)}> {translate("adminSettings.businessBuilder.cancel")} </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
