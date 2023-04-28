import { Dialog, DialogTitle, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Form from "./Form";
import useEditDialog from "./hooks/useEditDialog";
import useLocales from "src/hooks/useLocales";

const EditDialog = ({ data, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onSubmit = useEditDialog(() => {
    onClose();
    fetchData();
  });

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={Boolean(data)}
      onClose={onClose}
      aria-labelledby="edit-video"
    >
      <DialogTitle id="edit-video">{translate("adminStore.products.editVideo")}</DialogTitle>
      <Form
        onClose={onClose}
        onSubmit={onSubmit}
        data={data}
        buttonLabel={translate("adminStore.products.update")}
      />
    </Dialog>
  );
};

export default EditDialog;
