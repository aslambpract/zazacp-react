import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import Assign from "./assign";
import Add from "./components/add";
import useLocales from "src/hooks/useLocales";

const Index = () => {
  const { translate } = useLocales();
  return (
    <div>
      <Page title={translate("adminStore.assignSubscriptions.addBusinessBuilderSubscription")} >
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.assignSubscriptions.addBusinessBuilderSubscriptionheading")}
            links={[
              { name:translate("dashboard") , href: PATH_DASHBOARD.root },
              {
                name: translate("adminStore.assignSubscriptions.assignSubscriptions"),
                href: PATH_DASHBOARD.store.assign_subscriptions,
              },
              { name:translate("adminStore.assignSubscriptions.addBusinessBuilderSubscriptionheading") },
            ]}
          />
          <Card sx={{ p: 3, mt: 3 }}>
            <Add />
          </Card>
          <Card sx={{ p: 3, mt: 3 }}>
            <Assign />
          </Card>
        </Box>
      </Page>
    </div>
  );
};

export default Index;
