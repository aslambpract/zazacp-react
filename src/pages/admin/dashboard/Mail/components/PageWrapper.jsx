import { Container } from "@mui/material";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useSettings from "src/hooks/useSettings";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

const PageWrapper = ({ children }) => {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  return (
    <Page title={translate("adminCommunication.mail.mail")}>
      <Container maxWidth={themeStretch ? false : "xl"}>
        <HeaderBreadcrumbs
          heading={translate("adminCommunication.mail.mail")}
          links={[
            {
              name: translate("dashboard"),
              href: PATH_DASHBOARD.root,
            },
            { name:translate("adminCommunication.mail.mail")  },
          ]}
        />
        {children}
      </Container>
    </Page>
  );
};

export default PageWrapper;
