import { Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import DataTable from "./components/dataTable";

const Index = () => {
  const { translate } = useLocales();
  return (
    <>
      <Page title={translate("userIncomeReport.titile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("userIncomeReport.incomeReport")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("userIncomeReport.incomeReport") },
            ]}
          />
          <DataTable />
        </Box>
      </Page>
    </>
  );
};

export default Index;
