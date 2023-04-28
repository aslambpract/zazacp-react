import { Grid } from "@mui/material";
import Page from "src/components/Page";
import { isBinary } from "src/utils/isBinary";
import {
  ActiveSessionWidget,
  BinaryBonusWidget,
  BusinessBuilderWidget as NetWorkJoiningWidget,
  LatestRegistration,
  MemberMapWidget,
  RightLeftTeamWidget,
  SupportTicketWidget,
  TopRecruiters,
} from "./components";
import RegisteredWidget from "./components/registered";
import Total from "./components/total";

const Index = () => {
  return (
    <div
      style={{
        marginTop: "2rem",
      }}
    >
      <Page title="Dashboard">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Total />
              <Grid item xs={12} md={6}>
                <ActiveSessionWidget />
              </Grid>
              <Grid item xs={12} md={6}>
                <SupportTicketWidget />
              </Grid>
              <Grid item xs={12} md={12}>
                <MemberMapWidget />
              </Grid>
              <Grid item xs={12} md={12}>
                <NetWorkJoiningWidget />
              </Grid>
              <TeamWidget />
            </Grid>
          </Grid>
          {/* right  */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <BonusWidget />

              <RegisteredWidget />
              <Grid item xs={12} md={12}>
                <LatestRegistration />
              </Grid>

              <TeamWidget />
              <Grid item xs={12} md={12}>
                <TopRecruiters />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Page>
    </div>
  );
};

const BonusWidget = () =>
  isBinary() && (
    <Grid item xs={12} md={12}>
      <BinaryBonusWidget />
    </Grid>
  );

const TeamWidget = () =>
  isBinary() && (
    <Grid item xs={12} md={12}>
      <RightLeftTeamWidget />
    </Grid>
  );

export default Index;
