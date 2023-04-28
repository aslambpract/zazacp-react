import {
  Avatar,
  Card,
  CardHeader,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { MemberAvatar } from "src/components/MyAvatar";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import { useMemberProfileContext } from "..";

ProfileActivityCard.propTypes = {
  post: PropTypes.object,
};

export default function ProfileActivityCard() {
  const { translate } = useLocales();

  const { mid } = useParams();
  const [data, setData] = useState([]);
  const { memberProfile } = useMemberProfileContext();
  const [lastLogout, setLastLogout] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosInstance(`/api/user-activity/${mid}`);
      setData(data.data);
      setLastLogout(data.last_logout);
    };
    fetchData();
  }, [mid]);
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <MemberAvatar
            name={memberProfile.user_profile?.username}
            uri={memberProfile.user_profile?.user_profile?.profile_image}
          />
        }
        title={
          <Link
            to="#"
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            {memberProfile.user_profile?.username}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {translate("profile.lastSeen")}:{" "}
            {lastLogout && moment(lastLogout).calendar()}
          </Typography>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography>{translate("profile.yourActivityHistory")}</Typography>
        <Stack spacing={1.5}>
          {data?.map((item) => (
            <Stack key={item.id} direction="row" spacing={2}>
              <Avatar
                src={memberProfile.user_profile?.user_profile?.profile_image}
              >
                {item.user.username.slice(0, 1)}
              </Avatar>
              <Paper
                sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  alignItems={{ sm: "center" }}
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography variant="subtitle2">
                    {item.user.username}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "text.disabled" }}>
                    {moment(item.created_at).format("DD MMM YYYY")}{" "}
                    {moment(item.created_at).format("LT")}
                  </Typography>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.action} : {item.ip_address}
                </Typography>
              </Paper>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
