import { Dialog, DialogTitle, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

import axiosInstance from "src/utils/axios";
import useEditProductCategory from "../hooks/useEditProductCategory";
import Form from "./Form";
import useLocales from "src/hooks/useLocales";


const EditDialog = ({ open, onClose, fetchData, editId }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { fetchSubscriptionCategoryById, methods, onSubmit } =
    useEditProductCategory(() => {
      fetchData();
      onClose();
    });

  useEffect(() => {
    if (open) fetchSubscriptionCategoryById(editId);
  }, [editId, open]);

  console.log(methods.getValues());

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="add-Category"
    >
      <DialogTitle id="add-Category">{translate("adminStore.assignSubscriptions.editCategory")}</DialogTitle>
      <Form
        methods={methods}
        onSubmit={methods.handleSubmit(onSubmit(editId))}
        onClose={onClose}
      />
    </Dialog>
  );
};

export default EditDialog;
