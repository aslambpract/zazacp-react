import { DialogContent } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useLocales from "src/hooks/useLocales";

const DeleteDialog = ({ open, onClose, handleDelete }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="delete-mail"
    >
      <DialogTitle id="delete-mail">
        {translate("adminCommunication.mail.deleteMail")}{" "}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            {translate("adminCommunication.mail.areYouSure")}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} variant="contained" color="error">
          {translate("adminCommunication.mail.delete")}
        </Button>
        <Button onClick={onClose}>
          {translate("adminCommunication.mail.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
