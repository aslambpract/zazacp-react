import { Container, Stack } from "@mui/material";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import History from "./components/history";
import PayNow from "./components/payNow";
import useLocales from "src/hooks/useLocales";

const Subscriptions = () => {
  const { translate } = useLocales();
  return (
    <Page title={translate("userBusinessBuilder.subscription.subscriptions")}>
      <Container maxWidth="100%">
        <HeaderBreadcrumbs
          heading={translate("userBusinessBuilder.subscription.subscriptions")}
          links={[
            { name: translate("dashboard"), href: PATH_USER.root },
            { name: translate("userBusinessBuilder.subscription.subscriptions") },
          ]}
        />
        <Stack spacing={10}>
          <PayNow />
          <History />
        </Stack>
      </Container>
    </Page>
  );
};

export default Subscriptions;
