import { Dialog } from "@mui/material";
import { createContext, useContext } from "react";

const DialogContext = createContext("");
export const { Provider: DialogProvider } = DialogContext;

export const useDialogContext = () => useContext(DialogContext);
export const CustomDialog = ({ name, children }) => {
  const { openDialog, open } = useDialogContext();

  return (
    <Dialog open={openDialog === name} onClose={() => open("")}>
      {children}
    </Dialog>
  );
};
