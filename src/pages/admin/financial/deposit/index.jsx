import { Box } from "@mui/material";
import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import DataTable from "./components/dataTable";
import useLocales from "src/hooks/useLocales";


const DepositWallet = () => {
  const { translate } = useLocales();
  return (
    <div>
      <Page title={translate("adminFinancial.depositWallet.depositWalletTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminFinancial.depositWallet.depositWallet")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminFinancial.depositWallet.depositWalletHistory") },
            ]}
          />
          <DataTable />
        </Box>
      </Page>
    </div>
  );
};

export default DepositWallet;
