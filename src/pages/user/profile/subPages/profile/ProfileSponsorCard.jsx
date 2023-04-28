import { Card, CardHeader, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useAuth from "src/hooks/useAuth";
import useLocales from "src/hooks/useLocales";


export default function ProfileSponsorCard() {
  const { translate } = useLocales();
  const { user } = useAuth();

  if (Boolean(user?.is_super_admin)) return null;
  const { name, username, country, joinedAt } = user.sponsorInfo || {};

  return (
    <Card>
      <CardHeader title= {translate("userProfile.sponsorInformation")} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="column" alignItems="start">
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
           {translate("userProfile.name")}  : {name}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
           {translate("userProfile.Username")}  : {username}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {" "}
            {translate("userProfile.country")} : {country}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {" "}
            {translate("userProfile.dateJoined")} :{joinedAt}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
