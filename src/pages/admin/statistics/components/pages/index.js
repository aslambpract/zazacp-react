import { Box, Card } from "@mui/material";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import DataTable from "./dataTable";
import useLocales from "src/hooks/useLocales";

const AllUsersList = () => {
  const { translate } = useLocales();
  return (
    <Page title={translate("adminStatistics.allSubscriptionsUsers")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminStatistics.allSubscriptionsUsers")}
          links={[
            { name:translate("dashboard") , href: PATH_DASHBOARD.root },
            { name: translate("adminStatistics.statistics"), href: PATH_DASHBOARD.statistics.root },
            { name: translate("adminStatistics.allSubscriptionsUsers") },
          ]}
        />
        <Card sx={{ p: 2 }}>
          <DataTable />
        </Card>
      </Box>
    </Page>
  );
};

export default AllUsersList;
