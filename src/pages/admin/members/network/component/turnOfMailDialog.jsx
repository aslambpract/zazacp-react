import { DialogContent } from "@material-ui/core";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useTurnOfEmail from "./hooks/useTurnOfEmail";
import useLocales from "src/hooks/useLocales";

const TurnOfMail = ({
  open,
  selectedId,
  onClose,
  fetchData,
  isMailTurnedOn,
}) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const onTurnOfMail = useTurnOfEmail(selectedId, fetchData);

  const handleTurnedOf = async () => {
    const status = await onTurnOfMail();
    if (status) {
      fetchData();
      onClose();
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="block-user"
    >
      <DialogTitle id="block-user">{translate("adminMembersManagement.networkMembers.turnOfMail")}  </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              marginTop: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
              },
            }}
          >
            <Typography>
             {translate("adminMembersManagement.networkMembers.areYouSure")}
            </Typography>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTurnedOf} variant="contained">
          {isMailTurnedOn ? "Turn Off" : "Turn On"}
        </Button>
        <Button onClick={onClose}>{translate("adminMembersManagement.networkMembers.cancel")}  </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TurnOfMail;
