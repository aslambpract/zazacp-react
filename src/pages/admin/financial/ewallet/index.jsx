import { Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import DataTable from "./components/dataTable";

export default function InvoiceList() {
  const { translate } = useLocales();
  return (
    <Page title={translate("adminFinancial.Ewallet.walletTitile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminFinancial.Ewallet.wallet")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name: translate("adminFinancial.Ewallet.wallet") },
          ]}
        />

        <DataTable />
      </Box>
    </Page>
  );
}
