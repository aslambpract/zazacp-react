import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import { PATH_USER } from "src/routes/paths";
import { useOpenDialog } from "../..";
import useLocales from "src/hooks/useLocales";

const DepositWallet = ({ message }) => {
  const { value } = useOpenDialog();
  const isOpen = value.toLowerCase().replace(" ", "") === "depositwallet";
  return (
    <Dialog open={isOpen} fullWidth maxWidth="xs">
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export const ErrorDialog = ({ message }) => {
  const { translate } = useLocales();
  const { value } = useOpenDialog();
  const isOpen = value === "error";
  const { palette } = useTheme();
  return (
    <Dialog open={isOpen} fullWidth maxWidth="xs">
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Iconify
            icon="ic:round-error"
            sx={{
              fontSize: "8rem",
              color: palette.error.main,
            }}
          />

          <Typography color={palette.text.secondary} variant="h6">
            {message}
          </Typography>

          <Button
            to={PATH_USER.onlineStore.productSubscription.root}
            LinkComponent={Link}
            sx={{ marginTop: "1rem" }}
            variant="contained"
            color="error"
          >
           {translate("userOnlineStore.tryAgain")}  
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DepositWallet;
