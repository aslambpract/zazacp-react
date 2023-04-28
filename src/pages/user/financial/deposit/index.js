import { Box, Grid } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import useFetchSummary from "../hooks/useFetchSummary";
import Cards from "./cards";
import DataList from "./components/dataTable";
import FilterCard from "./filterCard";
import PayNow from "./payNow";

import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n";

const Index = () => {
  const { translate } = useLocales();
  const _data = [
    {
      title: i18n.t("userFinancial.depositWallet.balance"),
      icon: "arcticons:priceconverter",
      color: "#d279a6",
      key: "balance",
    },
    {
      title: i18n.t("userFinancial.depositWallet.transferOut"),
      icon: "bx:transfer-alt",
      color: "#6699ff",
      key: "transfer_out",
    },
    {
      title: i18n.t("userFinancial.depositWallet.creditedByAdmin"),
      icon: "material-symbols:admin-panel-settings",
      color: "#26a69a",
      key: "credited_by_admin",
    },
  ];
  const summary = useFetchSummary("deposit-wallet-data");

  return (
    <div>
      <Page
        title={translate("userFinancial.depositWallet.depositWalletTitile")}
      >
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("userFinancial.depositWallet.depositWallet")}
            links={[
              { name: "Dashboard", href: PATH_USER.root },
              { name: translate("userFinancial.depositWallet.depositWallet") },
            ]}
          />

          <Grid container spacing={3}>
            {_data.map((props) => (
              <Grid item xs={12} md={4}>
                <Cards {...props} total={summary[props.key]} />
              </Grid>
            ))}
            <Grid item xs={12} md={12}>
              <PayNow balance={summary.balance} />
            </Grid>

            <Grid item xs={12} md={12}>
              <FilterCard />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <DataList />
          </Grid>
        </Box>
      </Page>
    </div>
  );
};

export default Index;
