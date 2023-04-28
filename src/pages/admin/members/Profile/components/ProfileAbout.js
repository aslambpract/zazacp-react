import moment from "moment";

import { Card, Stack, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import Iconify from "src/components/Iconify";
import { useMemberProfileContext } from "..";
import useLocales from "src/hooks/useLocales";


const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

const ProfileAbout = () => {
  const { translate } = useLocales();
  const {
    memberProfile: { user_profile: data },
  } = useMemberProfileContext();
  return (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Tooltip
          placement="right"
          title={translate("profile.userName")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle icon={"bxs:user-circle"} />
            <Typography variant="body2">{data?.username ?? "_"}</Typography>
          </Stack>
        </Tooltip>
        <Tooltip
          placement="right"
          title={translate("profile.email")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle icon={"eva:email-fill"} />
            <Typography variant="body2">{data?.email ?? "_"}</Typography>
          </Stack>
        </Tooltip>
        <Tooltip
          placement="right"
          title={translate("profile.createdDate")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle
              icon={"healthicons:i-schedule-school-date-time-outline"}
            />
            <Typography variant="body2">
              {moment(data?.created_at ?? "_").format("DD MMM YYYY")}
            </Typography>
          </Stack>
        </Tooltip>
        <Tooltip
          placement="right"
          title={translate("profile.name")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle icon={"bxs:user"} />
            <Typography variant="body2">
              {data?.user_profile?.first_name ?? "_"}{" "}
              {data?.user_profile?.last_name ?? "_"}
            </Typography>
          </Stack>
        </Tooltip>

        <Tooltip
          placement="right"
          title={translate("profile.gender")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle icon={"ph:gender-intersex-bold"} />
            <Typography variant="body2">
              {data?.user_profile?.gender ?? "_"}
            </Typography>
          </Stack>
        </Tooltip>

        <Tooltip
          placement="right"
          title={translate("profile.mobileNumber")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle icon={"carbon:phone-incoming-filled"} />
            <Typography variant="body2">
              {data?.user_profile?.mobile ?? "_"}
            </Typography>
          </Stack>
        </Tooltip>
        <Tooltip
          placement="right"
          title={translate("profile.zipCode")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle icon={"akar-icons:home"} />
            <Typography variant="body2">
              {data?.user_profile?.zipcode ?? "_"}
            </Typography>
          </Stack>
        </Tooltip>

        <Tooltip
          placement="right"
          title={translate("profile.address")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle icon={"entypo:location-pin"} />
            <Typography variant="body2">
              {data?.user_profile?.address ?? "_"}
            </Typography>
          </Stack>
        </Tooltip>

        <Tooltip
          placement="right"
          title={translate("profile.city")}
          style={{ cursor: "pointer", width: "max-content" }}
        >
          <Stack direction="row">
            <IconStyle icon={"healthicons:city"} />
            <Typography variant="body2">
              {data?.user_profile?.city ?? "_"}
            </Typography>
          </Stack>
        </Tooltip>
      </Stack>
    </Card>
  );
};

export default ProfileAbout;
