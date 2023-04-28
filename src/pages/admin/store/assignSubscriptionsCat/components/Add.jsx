import { Dialog, DialogTitle, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useAddSubScription from "../hooks/useAddSubscription";
import Form from "./Form";
import useLocales from "src/hooks/useLocales";


const AddDialog = ({ open, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { methods, onSubmit } = useAddSubScription(() => {
    fetchData();
    onClose();
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="add-Category"
    >
      <DialogTitle id="add-Category">{translate("adminStore.assignSubscriptions.addCategory")}</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit} onClose={onClose} />
    </Dialog>
  );
};

export default AddDialog;
