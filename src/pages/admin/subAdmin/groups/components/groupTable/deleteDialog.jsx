import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import useLocales from "src/hooks/useLocales";
import useSubAdminDelete from "./hooks/useDelete";

const DeleteDialog = ({
  selectedId,
  name,
  openedDialog,
  onClose,
  fetchData,
}) => {
  const handleDelete = useSubAdminDelete(selectedId, () => {
    fetchData();
    handleClose();
  });
  const [open, setOpen] = useState(false);
  const { translate } = useLocales();

  useMemo(() => {
    setOpen(openedDialog === name);
  }, [openedDialog]);
  const handleClose = () => {
    onClose();
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {translate("dialog.subAdminDelete")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {translate("dialog.reversed")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
          {translate("delete")}
        </Button>
        <Button onClick={handleClose} autoFocus>
          {translate("cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
