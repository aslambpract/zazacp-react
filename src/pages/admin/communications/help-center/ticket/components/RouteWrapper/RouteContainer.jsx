import { Card, Container, Grid, Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useSettings from "src/hooks/useSettings";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

const RouteContainer = ({ children }) => {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  return (
    <Page title={translate("adminCommunication.helpCenter.createTicketTitile")} >
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminCommunication.helpCenter.createTicket")}
          links={[
            { name: translate("dashboard") , href: PATH_DASHBOARD.root },
            {
              name: translate("adminCommunication.helpCenter.helpCenter") ,
              href: PATH_DASHBOARD.communication.help_center,
            },
            { name: translate("adminCommunication.helpCenter.createTicket") },
          ]}
        />
        <Card sx={{ p: 4 }}>
          <Grid container spacing={3}>
            {children}
          </Grid>
        </Card>
      </Box>
    </Page>
  );
};

export default RouteContainer;
