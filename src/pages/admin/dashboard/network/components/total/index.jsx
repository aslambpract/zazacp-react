import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TotalWidget from "../widgets/TotalWidget";
import useTotal from "./useTotal";
import useLocales from "src/hooks/useLocales";



const Total = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const {
    network_bonus_graph,
    network_growthRate,
    total_network_bonus,
    payout_graph,
    total_payout,
    payout_growth,
  } = useTotal();

  return (
    <>
      <Grid item xs={12} md={6}>
        <TotalWidget
          title={translate("adminDashboard.network.totalNetworkBonus")}
          percent={network_growthRate}
          total={total_network_bonus}
          chartColor={theme.palette.primary.main}
          chartData={network_bonus_graph}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TotalWidget
          title={translate("adminDashboard.network.totalPayout")}
          percent={payout_growth}
          total={total_payout}
          chartColor={theme.palette.chart.green[0]}
          chartData={payout_graph}
        />
      </Grid>
    </>
  );
};

export default Total;
