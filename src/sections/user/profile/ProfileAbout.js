import moment from "moment";

import { Card, Stack, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Iconify from "src/components/Iconify";
import useAuth from "src/hooks/useAuth";
import useLocales from "src/hooks/useLocales";


const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const style = { width: "max-content", cursor: "pointer" };

export default function ProfileAbout() {
  const { translate } = useLocales();
  const { user } = useAuth();
  const { username, email, user_profile: userProfile } = user;
  if (!userProfile) return null;
  const {
    created_at,
    first_name: firstName,
    last_name: lastName,
    gender,
    mobile,
    zipcode,
    address,
    city,
  } = userProfile;
  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Tooltip title= {translate("profile.userName")} style={style} placement="right">
          <Stack direction="row">
            <IconStyle icon={"bxs:user-circle"} />
            <Typography variant="body2">{username}</Typography>
          </Stack>
        </Tooltip>
        <Tooltip placement="right" title= {translate("profile.email")} style={style}>
          <Stack direction="row">
            <IconStyle icon={"eva:email-fill"} />
            <Typography variant="body2">{email}</Typography>
          </Stack>
        </Tooltip>
        <Tooltip placement="right" title= {translate("profile.createdDate")} style={style}>
          <Stack direction="row">
            <IconStyle
              icon={"healthicons:i-schedule-school-date-time-outline"}
            />
            <Typography variant="body2">
              {moment(created_at).format("DD MMM YYYY")}
            </Typography>
          </Stack>
        </Tooltip>
        <Tooltip placement="right" title= {translate("profile.name")} style={style}>
          <Stack direction="row">
            <IconStyle icon={"bxs:user"} />
            <Typography variant="body2">
              {firstName} {lastName}
            </Typography>
          </Stack>
        </Tooltip>

        <Tooltip placement="right" title= {translate("profile.gender")} style={style}>
          <Stack direction="row">
            <IconStyle icon={"ph:gender-intersex-bold"} />
            <Typography variant="body2">{gender}</Typography>
          </Stack>
        </Tooltip>

        <Tooltip placement="right" title={translate("profile.mobileNumber")} style={style}>
          <Stack direction="row">
            <IconStyle icon={"carbon:phone-incoming-filled"} />
            <Typography variant="body2">{mobile}</Typography>
          </Stack>
        </Tooltip>
        <Tooltip placement="right" title= {translate("profile.zipCode")} style={style}>
          <Stack direction="row">
            <IconStyle icon={"akar-icons:home"} />
            <Typography variant="body2">{zipcode}</Typography>
          </Stack>
        </Tooltip>

        <Tooltip placement="right" title= {translate("profile.address")} style={style}>
          <Stack direction="row">
            <IconStyle icon={"entypo:location-pin"} />
            <Typography variant="body2">{address}</Typography>
          </Stack>
        </Tooltip>

        <Tooltip placement="right" title= {translate("profile.city")} style={style}>
          <Stack direction="row">
            <IconStyle icon={"healthicons:city"} />
            <Typography variant="body2">{city}</Typography>
          </Stack>
        </Tooltip>
      </Stack>
    </Card>
  );
}
