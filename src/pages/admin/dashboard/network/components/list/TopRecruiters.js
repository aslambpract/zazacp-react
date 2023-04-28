import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Scrollbar from "src/components/Scrollbar";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";

const useTopRecruiters = () => {
  const handleErrors = useErrors();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          URI.admin.network.topRecruiters
        );
        if (status === 200) {
          setData(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };
    fetchData();
  }, []);

  return data;
};

const TopRecruiters = () => {
  const { translate } = useLocales();
  const topRecruiters = useTopRecruiters();
  return (
    <Card>
      <CardHeader title={translate("adminDashboard.network.topRecruiters")} />
      <Scrollbar>
        <Stack
          spacing={3}
          sx={{
            p: 3,
            maxHeight: 306,
            overflow: "auto",
          }}
        >
          {topRecruiters.map((recruiter) => (
            <AuthorItem key={recruiter.id} {...recruiter} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
};

function AuthorItem({ count, sponsor, user, user_profile }) {
  const { profile_image } = user_profile || {};
  const { translate } = useLocales();
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={user.username} src={profile_image} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{user.username}</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          {user?.email}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, textAlign: "right" }}>
        <Typography variant="subtitle2">
          {translate("adminDashboard.network.count")}: {count}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            mt: 0.5,
          }}
        >
          {translate("adminDashboard.network.sponsor")}: {sponsor}
        </Typography>
      </Box>
    </Stack>
  );
}

export default TopRecruiters;
