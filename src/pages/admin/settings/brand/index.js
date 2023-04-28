import { PATH_DASHBOARD } from "src/routes/paths";

import { Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import BrandTabs from "./brandTabs";
import useLocales from "src/hooks/useLocales";


const Brand = () => {
  const { translate } = useLocales();
  return (
    <>
      <Page title={translate("adminSettings.brand.brandSettingsTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminSettings.brand.brandSettings")} 
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminSettings.brand.brandSettings") },
            ]}
          />
          <BrandTabs />
        </Box>
      </Page>
    </>
  );
};

export default Brand;
