import { Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import { MaintenanceIllustration } from "src/assets";
import Page from "src/components/Page";

const RootStyle = styled("div")(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function Maintenance() {
  return (
    <Page title="Maintenance" sx={{ height: 1 }}>
      <RootStyle>
        <Container sx={{ textAlign: "center" }}>
          <Typography variant="h3" paragraph>
            Website currently under maintenance
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            We are currently working hard on this page!
          </Typography>

          <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/"
          >
            Go to Home
          </Button>
        </Container>
      </RootStyle>
    </Page>
  );
}
