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
import Iconify from "src/components/Iconify";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";


const Actions = ({ openEdit, faqId, fetchFaqList, close }) => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [openConfirmDialog, setOpenDialog] = useState(false);

  const handleDelete = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/faq/${faqId}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        fetchFaqList();
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
      {translate("adminCommunication.faqs.edit")}  
      </MenuItem>
      <Divider />
      <MenuItem
        sx={{ color: "error.main" }}
        onClick={() => setOpenDialog(true)}
      >
        <Iconify icon={"eva:trash-2-outline"} />
       {translate("adminCommunication.faqs.delete")} 
      </MenuItem>

      <Dialog open={openConfirmDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{translate("adminCommunication.faqs.deleteCategory")}</DialogTitle>
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
               {translate("adminCommunication.faqs.areYouSure")}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
           {translate("adminCommunication.faqs.delete")} 
          </Button>
          <Button onClick={() => setOpenDialog(false)}> {translate("adminCommunication.faqs.cancel")}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
