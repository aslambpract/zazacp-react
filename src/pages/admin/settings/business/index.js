import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import MainSection from "./business/index";
import useLocales from "src/hooks/useLocales";

const Index = () => {
  const { translate } = useLocales();
  return (
    <>
      <Page title={translate("adminSettings.businessBuilder.Titile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminSettings.businessBuilder.businessBuilder")}
            links={[
              { name:translate("dashboard") , href: PATH_DASHBOARD.root },
              { name:translate("adminSettings.businessBuilder.businessBuilder")  },
            ]}
          />
          <Card sx={{ p: 2 }}>
            <MainSection />
          </Card>
        </Box>
      </Page>
    </>
  );
};

export default Index;
