import { Dialog, useMediaQuery } from "@mui/material";

import { useTheme } from "@emotion/react";
import { AddForm } from "../form";

const AddDialog = ({ open, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      <AddForm onClose={onClose} />
    </Dialog>
  );
};

export default AddDialog;
