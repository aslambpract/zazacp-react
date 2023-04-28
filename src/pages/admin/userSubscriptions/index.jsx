import { Box } from "@mui/material";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import Active from "./components/active";
import Subscriptions from "./components/subscription";
import UserSubscriptions from "./components/users";
import useLocales from "src/hooks/useLocales";


const ActiveSubscriptions = () => {
  const { translate } = useLocales();
  return (
    <Page title={translate("adminUserSubscriptions.activeSubscriptionsTitile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminUserSubscriptions.userSubscriptions")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name: translate("adminUserSubscriptions.userSubscriptions")},
          ]}
        />
        <Active />
        <UserSubscriptions />
        <Subscriptions />
      </Box>
    </Page>
  );
};

export default ActiveSubscriptions;
