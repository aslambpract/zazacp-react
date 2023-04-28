import { Box } from "@mui/material";
import { Page } from "@react-pdf/renderer";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { PATH_USER } from "src/routes/paths";
import Card from "./components/card";
import useLocales from "src/hooks/useLocales";

const Subscriptions = () => {
  const { translate } = useLocales();
  return (
    <Page title= {translate("userMySubscriptions.mySubscriptions")} >
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading= {translate("userMySubscriptions.mySubscription")} 
          links={[
            { name: translate("dashboard") , href: PATH_USER.root },
            { name:translate("userMySubscriptions.mySubscription")},
          ]}
        />
      </Box>
      <Card />
    </Page>
  );
};

export default Subscriptions;
