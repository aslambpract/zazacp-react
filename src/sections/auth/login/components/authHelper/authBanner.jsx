import { Alert, Button, useMediaQuery, useTheme } from "@mui/material";

import Typography from "@mui/material/Typography";
import AlertText from "./alertText";

const AuthBanner = ({ onClick, info }) => {
  const theme = useTheme();

  const { email, password } = info;

  const showButton = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Alert
      severity="info"
      sx={{
        fontSize: "0.8rem",
      }}
      onClick={onClick}
      action={
        showButton && (
          <Typography>
            <Button color="inherit" size="small" onClick={onClick}>
              USE
            </Button>
          </Typography>
        )
      }
    >
      <AlertText>
        User email:<b>{email}</b> password:
        <b>{password}</b>
      </AlertText>
    </Alert>
  );
};

export default AuthBanner;
