import { useTheme } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";

import { FormProvider } from "src/components/hook-form";
import FormContent from "./FormContent";
import useAddProduct from "./hooks/useAddProduct";
import useLocales from "src/hooks/useLocales";

const AddProductDialog = ({ open, onClose, fetchData, isCombo = false }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { methods, onSubmit } = useAddProduct(() => {
    fetchData();
    onClose();
  });

  if (!open) return null;
  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="add-product"
    >
      <DialogTitle id="add-product"> {translate("adminStore.assignSubscriptions.addProduct")} </DialogTitle>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        {open && <FormContent isCombo={isCombo} onClose={onClose} />}
      </FormProvider>
    </Dialog>
  );
};

export default AddProductDialog;
