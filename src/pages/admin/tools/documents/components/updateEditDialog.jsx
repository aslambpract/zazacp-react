import { Dialog, DialogTitle, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useDocumentAdd from "../hooks/useAddDocument";
import useEditDocument from "../hooks/useEditDocument";

import Form from "./form";
import useLocales from "src/hooks/useLocales";

const DialogWrapper = ({ open, onClose, children, label }) => {
  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="tool-doc"
    >
      <DialogTitle id="tool-doc">{label}</DialogTitle>
      {children}
    </Dialog>
  );
};

export const AddDialog = ({ open, onClose, reload }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useDocumentAdd(() => {
    reload();
    onClose();
  });
  return (
    <DialogWrapper open={open} onClose={onClose} label={translate("adminTools.documents.addDocument")}>
      <Form methods={methods} onSubmit={onSubmit} onClose={onClose} />
    </DialogWrapper>
  );
};

export const EditDialog = ({ open, onClose, reload, selectedId }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useEditDocument(selectedId, () => {
    reload();
    onClose();
  });
  return (
    <DialogWrapper open={open} onClose={onClose} label={translate("adminTools.documents.updateDocument")}>
      <Form methods={methods} onSubmit={onSubmit} onClose={onClose} />
    </DialogWrapper>
  );
};
