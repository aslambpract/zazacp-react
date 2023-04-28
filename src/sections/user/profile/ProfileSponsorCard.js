import { Card, CardHeader, Stack, Typography } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import useLocales from "src/hooks/useLocales";


export default function ProfileSponsorCard() {
  const { translate } = useLocales();
  const {
    user: { is_super_admin: isSuperAdmin },
  } = useAuth();

  if (Boolean(isSuperAdmin)) return null;

  return (
    <Card>
      <CardHeader title="Sponsor Information" />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="column" alignItems="start">
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {" "}
             {translate("profile.name")} :{" "}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {" "}
             {translate("profile.Username")} :{" "}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {" "}
             {translate("profile.country")} :{" "}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {" "}
             {translate("profile.dateJoined")} :{" "}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
