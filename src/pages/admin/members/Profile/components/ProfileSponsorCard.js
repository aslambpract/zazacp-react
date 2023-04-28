import PropTypes from "prop-types";
// @mui
import { Card, CardHeader, Stack, Typography } from "@mui/material";
// components
import useAuth from "src/hooks/useAuth";
import useLocales from "src/hooks/useLocales";


export default function ProfileSponsorCard() {
  const { translate } = useLocales();
  const { user: data } = useAuth();

  if (Boolean(data.is_super_admin)) return null;

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
           {translate("profile.Username")}  :{" "}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {" "}
            {translate("profile.country")} :{" "}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {" "}
           {translate("profile.dateJoined")}  :{" "}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
