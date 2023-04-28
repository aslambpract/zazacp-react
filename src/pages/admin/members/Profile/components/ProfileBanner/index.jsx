import { Card } from "@mui/material";
import ProfileCover from "./ProfileCover";
import ProfileTabs from "./ProfileTabs";
const ProfileBanner = (props) => {
  return (
    <Card
      sx={{
        mb: 3,
        height: 280,
        position: "relative",
      }}
    >
      <ProfileCover />
      <ProfileTabs {...props} />
    </Card>
  );
};

export default ProfileBanner;
