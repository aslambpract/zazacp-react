import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import DataTable from "./components/dataTable";

const Index = () => {
  const { translate } = useLocales();
  return (
    <div>
      <Page title={translate("holdingTank")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("holdingTank")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              {
                name: translate("holdingTank"),
              },
            ]}
          />

          <DataTable />
        </Box>
      </Page>
    </div>
  );
};

export default Index;
