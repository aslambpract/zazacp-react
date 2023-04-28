import { Box, Card, Grid } from "@mui/material";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import { PATH_DASHBOARD } from "src/routes/paths";
import useFetchSummary from "../hooks/useFetchSummary";
import useFetchWitPagination from "../hooks/useFetchWithPagination";
import Cards from "./cards";
import DataList from "./dataList";
import RequestForm from "./requestForm";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"
 i18n.t("userFinancial.requestPayout.requestPayout") 


const Index = () => {
  const _data = [
    {
      title: i18n.t("userFinancial.requestPayout.availableBalance"),
      key: "available_balance",
  
      color: "#795548",
      icon: "entypo:wallet",
    },
    {
      title:i18n.t("userFinancial.requestPayout.minimumWithdrawal") ,
      key: "minimum_withdrawal",
      color: "#ccc",
      icon: "entypo:wallet",
    },
  ];
  
  const { translate } = useLocales();
  const { data, rowStart, ...rest } = useFetchWitPagination("payout-request");
  const summary = useFetchSummary("request-payout-data");
  return (
    <>
      <div>
        <Page title={translate("userFinancial.requestPayout.requestPayoutTitile")}>
          <Box sx={{ p: 2 }}>
            <HeaderBreadcrumbs
              heading={translate("userFinancial.requestPayout.requestPayout")}
              links={[
                { name:translate("dashboard") , href: PATH_DASHBOARD.root },
                { name: translate("userFinancial.requestPayout.requestPayout")},
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
                <RequestForm minimumWithdrawal={summary.minimum_withdrawal} />
              </Grid>
            </Card>
            <Grid item xs={12} md={12}>
              <DataList data={data} rowStart={rowStart} />
            </Grid>
          </Box>
        </Page>
      </div>

      <PaginationButtons {...rest} />
    </>
  );
};

export default Index;
