import { Container, Grid } from "@mui/material";
import Page from "src/components/Page";
import useSettings from "src/hooks/useSettings";
import {
  BalanceWidget,
  CalenderWidget,
  CustomersWidget,
  LatestSaleList,
  NetworkBalanceWidget,
  ProductActive,
  ProfitWidget,
  SalesOverallChartWidget,
  TopSellingProductsList,
} from "../components";

import useLocales from "src/hooks/useLocales";
import BalanceIcon from "src/images/balance.png";
import NewBonusIcon from "src/images/nw-bonus.png";
import useWidgetData from "./hooks/useWidgetData";

const Business = () => {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();
  const {
    balance,
    network_bonus,
    total_profit_last_month,
    total_profit,
    total_sales,
    total_sales_last_month,
    total_expense,
    total_expense_last_month,
    ...rest
  } = useWidgetData();
  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      <Page title={translate("dashboard")}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <BalanceWidget
              title={translate("adminDashboard.network.latestRegistrations")}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <ProfitWidget
                  title={translate("adminDashboard.business.totalSales")}
                  prev={total_sales_last_month | 0}
                  current={total_sales || 0}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ProfitWidget
                  title={translate("adminDashboard.business.totalExpense")}
                  prev={total_expense_last_month || 0}
                  current={total_expense || 0}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <ProfitWidget
                  title={translate("adminDashboard.business.totalProfit")}
                  prev={total_profit_last_month || 0}
                  current={total_profit || 0}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <NetworkBalanceWidget
                  title={translate("adminDashboard.business.networkBonus")}
                  total={parseInt(network_bonus || 0)}
                  icon={NewBonusIcon}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <NetworkBalanceWidget
                  title={translate("adminDashboard.business.balance")}
                  total={balance || 0}
                  icon={BalanceIcon}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomersWidget {...rest} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={8}>
            <SalesOverallChartWidget />
          </Grid>
          <Grid item xs={12} md={9}>
            <LatestSaleList />
          </Grid>
          <Grid item xs={12} md={3}>
            <CalenderWidget />
          </Grid>
          <Grid item xs={12} md={9}>
            <TopSellingProductsList />
          </Grid>
          <Grid item xs={12} md={3}>
            <ProductActive />
          </Grid>
        </Grid>
      </Page>
    </div>
  );
};

export default Business;
