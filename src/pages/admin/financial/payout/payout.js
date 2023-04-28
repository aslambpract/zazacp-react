import { Box, Card, Grid, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import useTabs from "src/hooks/useTabs";
import { PATH_DASHBOARD } from "src/routes/paths";
import usePayout from "./hooks/usePayout";
import PayoutData from "./payoutData";
import PayoutHistory from "./payoutHistory";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"


const Payout = () => {
  const { translate } = useLocales();
  const { currentTab, onChangeTab } = useTabs("request");
  const { fetchPayoutData, payoutHistory, pendingPayout } = usePayout();
  const PAYOUT_TABS = [
    {
      value: "request",
      text:  i18n.t("adminFinancial.payout.payoutRequest") ,
      component: (
        <PayoutData data={pendingPayout} fetchPayoutData={fetchPayoutData} />
      ),
    },
    {
      value: "history",
      text:  i18n.t("adminFinancial.payout.payoutHistory") ,
      component: (
        <PayoutHistory data={payoutHistory} fetchData={fetchPayoutData} />
      ),
    },
  ];

  return (
    <>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminFinancial.payout.payout")} 
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name: translate("adminFinancial.payout.payout") },
          ]}
        />

        <Card sx={{ p: 2 }}>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {PAYOUT_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={capitalCase(tab.text)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Box sx={{ mb: 2 }} />
          {PAYOUT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Card>
        {/* <Grid spacing={1} container item xs={12}>
          <Grid item xs={12}>
            <PayoutData
              data={pendingPayout}
              fetchPayoutData={fetchPayoutData}
            />
          </Grid>
          <Grid item xs={12}>
            <PayoutHistory data={payoutHistory} fetchData={fetchPayoutData} />
          </Grid>
        </Grid> */}
      </Box>
    </>
  );
};

export default Payout;
