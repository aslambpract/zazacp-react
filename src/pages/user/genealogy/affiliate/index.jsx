import { Box, Divider, Grid } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";

import ActiveCustomers from "./activeCustomers/index";
import BvHistory from "./bvHistory/index";
import useFetchAffiliateList from "./hooks/useFetchAffiliateList";
import LeftSide from "./leftRight/left";
import RightSide from "./leftRight/right";
import Referrals from "./referrals/index";
import ReportCard from "./reportCards/index";
import BonusWidget from "./widgets/bonusWidget";
import SmallWidgets from "./widgets/smallWidget";
import TeamCard from "./widgets/teamCard";
import useLocales from "src/hooks/useLocales";


const Affiliate = () => {
  const { translate } = useLocales();
  const {
    current_rank,
    network_bonus,
    referal_bonus,
    referrals_count,
    personal_sales_bv,
    team_sales_bv,
    left_team,
    right_team,
    next_rank,
    highest_rank_acheved,
    last_week_rank,
    weekly_binary_bonus,
  } = useFetchAffiliateList();

  return (
    <Page title={translate("userGenealogy.affiliateDashboard.affiliate")}>
      <HeaderBreadcrumbs heading={translate("dashboard")} links={[{ name: "Affiliate" }]} />
      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
          <SmallWidgets
            title={translate("userGenealogy.affiliateDashboard.personalSales")}
            total={personal_sales_bv}
            icon={"bxs:user"}
            color="success"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <SmallWidgets
            title={translate("userGenealogy.affiliateDashboard.teamSales")}
            total={team_sales_bv}
            icon={"heroicons:users-solid"}
            color="error"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <SmallWidgets
            title={translate("userGenealogy.affiliateDashboard.networkBonus")}
            total={network_bonus}
            icon={"akar-icons:network"}
            color="primary"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <SmallWidgets
            title={translate("userGenealogy.affiliateDashboard.referralBonus")}
            total={referal_bonus}
            icon={"fa6-solid:bag-shopping"}
            color="secondary"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <SmallWidgets
            title={translate("userGenealogy.affiliateDashboard.refferals")}
            total={referrals_count}
            icon={"fluent:gift-card-20-filled"}
            s
            color="warning"
          />
        </Grid>
        <Grid item xs={6} md={2}>
          <SmallWidgets
            title={translate("userGenealogy.affiliateDashboard.weeklyPayout")}
            total={666}
            icon={"entypo:back-in-time"}
            color="info"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ActiveCustomers
            currentRank={current_rank}
            nextRank={next_rank}
            highestRank={highest_rank_acheved}
            lastWeek={last_week_rank}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BonusWidget
            title={translate("userGenealogy.affiliateDashboard.registeredMembers")}
            total={weekly_binary_bonus}
            icon={"eva:person-fill"}
            holdingTank={5}
            networkMembers={3}
            chartData={weekly_binary_bonus}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <BvHistory />
        </Grid>
        <Grid item xs={12} md={6}>
          <Referrals referrals={[]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              marginTop: "1rem",
              display: "grid",
              columnGap: 1,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              },
            }}
          >
            <TeamCard
              title={translate("userGenealogy.affiliateDashboard.leftTeam")}
              total={left_team}
              icon="bi:arrow-bar-left"
            />
            <TeamCard
              title={translate("userGenealogy.affiliateDashboard.rightTeam")}
              total={right_team}
              icon="bi:arrow-bar-right"
            />
            <Box sx={{ marginTop: "1rem" }}>
              <LeftSide title={translate("userGenealogy.affiliateDashboard.left")} />
            </Box>
            <Box sx={{ marginTop: "1rem" }}>
              <RightSide title={translate("userGenealogy.affiliateDashboard.right")} />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider />
          <Box
            sx={{
              padding: "1rem",
              display: "grid",
              columnGap: 1,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(1, 1fr)",
                md: "repeat(6, 1fr)",
              },
            }}
          >
            <ReportCard title={translate("userGenealogy.affiliateDashboard.totalNumberL")} count="250" />
            <ReportCard title={translate("userGenealogy.affiliateDashboard.totalNumberR")} count="0" />
            <ReportCard title={translate("userGenealogy.affiliateDashboard.totalTeamL")} count="$ 999" />
            <ReportCard title={translate("userGenealogy.affiliateDashboard.totalTeamR")} count="$ 123" />
            <ReportCard title={translate("userGenealogy.affiliateDashboard.weeklyL")} count="654" />
            <ReportCard title={translate("userGenealogy.affiliateDashboard.weeklyR")} count="12" />
          </Box>
          <Divider />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Affiliate;
