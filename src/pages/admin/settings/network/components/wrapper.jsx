import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";

const Wrapper = ({ children }) => {
  const { translate } = useLocales();

  return (
    <>
      <Page title={translate("adminSettings.network.Titile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminSettings.network.title")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminSettings.network.title") },
            ]}
          />
          <Card sx={{ p: 2 }}>{children}</Card>
        </Box>
      </Page>
    </>
  );
};

export default Wrapper;
