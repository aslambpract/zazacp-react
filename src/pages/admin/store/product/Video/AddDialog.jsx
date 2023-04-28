import { Dialog, DialogTitle, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Form from "./Form";
import useAddVideo from "./hooks/useAddVideo";
import useLocales from "src/hooks/useLocales";

const AddDialog = ({ open, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onSubmit = useAddVideo(() => {
    onClose();
    fetchData();
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="add-video"
    >
      <DialogTitle id="add-video">{translate("adminStore.products.addVideo")}</DialogTitle>
      <Form onClose={onClose} onSubmit={onSubmit} buttonLabel={translate("adminStore.products.add")} />
    </Dialog>
  );
};

export default AddDialog;
