import { Grid } from "@mui/material";
import Page from "src/components/Page";
import Events from "./components/events";

import { isBinary } from "src/utils/isBinary";
import {
  ActiveSubscriptionList,
  ActiveUserWidget,
  AllEventsList,
  BusinessBuilderReqWidget,
  BusinessBuilderWidget,
  HigherRankProgressWidget,
  ProductList,
  ReferralWidget,
  UserJoinWidget,
} from "./new/componets";
import UserWidgets from "./new/componets/userWidgets";

const Dashboard = () => {
  const binaryMode = isBinary();
  return (
    <Page title="Dashboard">
      <Grid container spacing={3} sx={{ p: 1 }}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <ReferralWidget />
            </Grid>
            <Grid item xs={12} md={12}>
              <ActiveSubscriptionList />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container spacing={3}>
                {binaryMode && (
                  <Grid item xs={12} md={6}>
                    <BusinessBuilderReqWidget />
                  </Grid>
                )}

                <Grid item xs={12} md={6}>
                  <ActiveUserWidget />
                </Grid>
              </Grid>
            </Grid>
            {binaryMode && (
              <Grid item xs={12} md={12}>
                <HigherRankProgressWidget />
              </Grid>
            )}

            <Grid item xs={12} md={12}>
              <UserJoinWidget />
            </Grid>
            {binaryMode && (
              <Grid item xs={12} md={12}>
                <BusinessBuilderWidget />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid item xs={12} md={12}>
            <Events />
          </Grid>
          <Grid item xs={12} md={12}>
            <AllEventsList />
          </Grid>
          <Grid item xs={12} md={12}>
            <Grid container spacing={2}>
              <UserWidgets />
            </Grid>
          </Grid>
          <Grid item xs={12} md={12}>
            <ProductList />
          </Grid>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Dashboard;
