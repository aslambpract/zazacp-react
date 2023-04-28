import { Box, Card, Grid } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import useFetchSummary from "../hooks/useFetchSummary";
import Cards from "./cards";
import DataList from "./dataList";
import useFundTransfer from "./hooks/useFundTransfer";
import SendForm from "./sendForm";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"



const Index = () => {
  const _data = [
    {
      title: i18n.t("userFinancial.fundTransfer.e-WalletBalance") ,
      color: "#795548",
      icon: "entypo:wallet",
      key: "ewallet_balance",
    },
    {
      title: i18n.t("userFinancial.fundTransfer.depositWalletBalance") ,
      color: "#607d8b",
      icon: "fluent:wallet-32-filled",
      key: "deposit_wallet_balance",
    },
  ];
  const { translate } = useLocales();
  const summary = useFetchSummary("fund-transfer-data");
  const { refetch, ...rest } = useFundTransfer();

  return (
    <div>
      <Page title={translate("userFinancial.fundTransfer.fundTransferTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("userFinancial.fundTransfer.fundTransfer")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("userFinancial.fundTransfer.fundTransfer") },
            ]}
          />
          <Card sx={{ p: 2 }}>
            <Grid container spacing={3}>
              {_data.map((props) => (
                <Grid item xs={12} md={4}>
                  <Cards {...props} total={summary[props.key]} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12} md={12}>
              <SendForm refetch={refetch} />
            </Grid>
          </Card>
          <Grid item xs={12} md={12}>
            <DataList {...rest} />
          </Grid>
        </Box>
      </Page>
    </div>
  );
};

export default Index;
