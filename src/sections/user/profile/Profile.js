import { Grid, Stack } from "@mui/material";
import UserLoginActivity from "src/components/UserLoginActivity";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowInfo from "./ProfileFollowInfo";
import ProfileSponsorCard from "./ProfileSponsorCard";
import ProfileTwoCard from "./ProfileTwoCard";

export default function Profile() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileFollowInfo />
          <ProfileAbout mt={1} />
          <ProfileTwoCard />
          <ProfileSponsorCard />
        </Stack>
      </Grid>

      <Grid id item xs={12} md={8}>
        <Stack spacing={3}>
          <UserLoginActivity />
        </Stack>
      </Grid>
    </Grid>
  );
}
