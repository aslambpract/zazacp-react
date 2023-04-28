import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import MyAvatar from "src/components/MyAvatar";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import useAuth from "src/hooks/useAuth";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";

const useUserActivity = (URL) => {
  const { count, onChange, page, seed } = usePagination();
  const [data, setData] = useState({ list: [] });

  useEffect(() => {
    const fetchData = async (page = 1) => {
      try {
        const { status, data } = await axiosInstance(URL, {
          params: { page },
        });
        if (status === 200) {
          const { last_login } = data;
          const { last_page, from, data: list } = data.data;
          seed(last_page, from);
          setData((prev) => ({ ...prev, list, lastSeen: last_login }));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData(page);
  }, [page]);

  return { data, count, onChange, page };
};

const UserProfile = ({ username }) => {
  const { user } = useAuth();
  return <Avatar src={user?.user_profile?.profile_image}>{username}</Avatar>;
};

const UserLoginActivity = () => {
  const { translate } = useLocales();
  const { user } = useAuth();

  const { count, data, onChange, page } = useUserActivity("/api/activity");
  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={<MyAvatar />}
        title={
          <Link
            to="#"
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
          >
            {user.username}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {translate("profile.lastSeen")} :{" "}
            {data.lastSeen && moment(data.lastSeen).calendar()}
          </Typography>
        }
      />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Typography>{translate("profile.yourActivityHistory")}</Typography>
        <Stack spacing={1.5}>
          <Activities data={data.list} />
        </Stack>

        <Box sx={{ marginTop: "0px !important" }}>
          <PaginationButtons count={count} onChange={onChange} page={page} />
        </Box>
      </Stack>
    </Card>
  );
};

const Activities = ({ data }) => (
  <>
    {data?.map((item) => (
      <Stack key={item.id} direction="row" spacing={2}>
        <UserProfile username={item.user?.username.slice(0, 1)} />
        <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Typography variant="subtitle2">{item.user?.username}</Typography>
            <Typography variant="caption" sx={{ color: "text.disabled" }}>
              {moment(item.created_at).calendar()}
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {item.action} : {item.ip_address}
          </Typography>
        </Paper>
      </Stack>
    ))}
  </>
);

export default UserLoginActivity;
