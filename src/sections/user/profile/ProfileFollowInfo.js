import { Card, Divider, Stack, Typography } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import useLocales from "src/hooks/useLocales";

export default function ProfileFollowInfo() {
  const { translate } = useLocales();
  const { user } = useAuth();
  const { totalCommission, totalPayout } = user;
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">$ {totalCommission || 0}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {translate("profile.totalCommission")}
          </Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">$ {totalPayout || 0}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {translate("profile.totalPayout")}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
