import { Card, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useLocales from "src/hooks/useLocales";


const RowStyle = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

export default function BalanceCard({
  highestRank,
  lastWeek,
  currentRank,
  nextRank,
}) {
  const { translate } = useLocales();
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        {currentRank}
      </Typography>

      <Stack spacing={2}>
        <RowStyle>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("userGenealogy.affiliateDashboard.nextRank")}
          </Typography>
          <Typography variant="body2">{nextRank}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("userGenealogy.affiliateDashboard.highestRankAchieved")}
          </Typography>
          <Typography variant="body2">{highestRank}</Typography>
        </RowStyle>

        <RowStyle>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("userGenealogy.affiliateDashboard.paidAsRankLastWeek")}
          </Typography>
          <Typography variant="body2">{lastWeek}</Typography>
        </RowStyle>
        <RowStyle>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("userGenealogy.affiliateDashboard.currentPaid")}
          </Typography>
          <Typography variant="body2">{lastWeek}</Typography>
        </RowStyle>
      </Stack>
    </Card>
  );
}
