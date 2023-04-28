import { Box, Card } from "@mui/material";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import PurchasedHistory from "./purchasedHistroy";
import ProfileCard from "./profilecard.js"
import useLocales from "src/hooks/useLocales";

const AllUsersList = () => {
  const { translate } = useLocales();
  return (
    <Page title={translate("adminStatistics.userProfile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminStatistics.userProfile")}
          links={[
            { name:translate("dashboard"), href: PATH_DASHBOARD.root },
            {
              name: translate("adminStatistics.statistics"),
              href: PATH_DASHBOARD.statistics.root,
            },
            {
              name: translate("adminStatistics.allSubscriptionsUsers"),
              href: PATH_DASHBOARD.statistics.subscriptions_users,
            },
            { name:translate("adminStatistics.userProfile") },
          ]}
        />
        <Card sx={{ p: 2, mb: 2 }}><ProfileCard/></Card>
        <Card sx={{ p: 2 }}>
          <PurchasedHistory />
        </Card>
      </Box>
    </Page>
  );
};

export default AllUsersList;
