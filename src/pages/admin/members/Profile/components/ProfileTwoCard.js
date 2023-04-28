import { Card, Divider, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Iconify from "src/components/Iconify";
import { useMemberProfileContext } from "..";
import useLocales from "src/hooks/useLocales";


// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 30,
  height: 30,
  marginTop: 2,
  flexShrink: 0,
  marginRight: theme.spacing(0),
}));

// ----------------------------------------------------------------------

export default function ProfileTwoCard() {
  const { translate } = useLocales();
  const { memberProfile } = useMemberProfileContext();

  const { referral_count, balance_amount } = memberProfile;
  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">
            <IconStyle icon={"bx:user-pin"} style={{ color: "green" }} />
          </Typography>
          <Typography variant="h4">{referral_count}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
             {translate("profile.referrals")}
          </Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">
            <IconStyle icon={"material-symbols:account-balance-wallet"} />
          </Typography>
          <Typography variant="h4">{balance_amount}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {translate("profile.balance")} 
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
