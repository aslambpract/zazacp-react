import { Card, Divider, Stack, Typography } from "@mui/material";
import { useMemberProfileContext } from "..";
import useLocales from "src/hooks/useLocales";


export default function ProfileFollowInfo() {
  const { translate } = useLocales();
  const { memberProfile } = useMemberProfileContext();

  const { total_commission, total_payout } = memberProfile;
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">$ {total_commission}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("profile.totalCommission")}
          </Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">$ {total_payout}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("profile.totalPayout")}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
