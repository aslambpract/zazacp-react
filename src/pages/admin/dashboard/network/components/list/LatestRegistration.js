import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";

const useLatest = () => {
  const [latestRegistrations, setLatestRegistrations] = useState([]);

  const handleErrors = useErrors();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance(
          URI.admin.network.latestRegistrations
        );

        if (status === 200) {
          setLatestRegistrations(data.data);
        }
      } catch (err) {
        handleErrors(err);
      }
    };

    fetchData();
  }, []);

  return latestRegistrations;
};
const LatestRegistration = () => {
  const { translate } = useLocales();
  const latestRegistrations = useLatest();
  return (
    <Card>
      <CardHeader
        title={translate("adminDashboard.network.latestRegistrations")}
      />
      <Stack
        spacing={3}
        sx={{
          p: 3,
          maxHeight: 306,
          overflow: "auto",
        }}
      >
        {latestRegistrations.map((data) => {
          return <AuthorItem key={data.id} {...data} />;
        })}
      </Stack>
    </Card>
  );
};

AuthorItem.propTypes = {
  id: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
  created_at: PropTypes.string,
  user_profile: PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

function AuthorItem({ created_at, email, user_profile }) {
  const { first_name, profile_image } = user_profile;
  const createdDate = new Date(created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const createdTime = new Date(created_at).toLocaleTimeString("en-US", {
    timeStyle: "short",
  });

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar alt={first_name} src={profile_image} />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{first_name}</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          {email}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, textAlign: "right" }}>
        <Typography variant="subtitle2">{createdDate}</Typography>
        <Typography
          variant="caption"
          sx={{
            mt: 0.5,
            color: "text.secondary",
          }}
        >
          {createdTime}
        </Typography>
      </Box>
    </Stack>
  );
}

export default LatestRegistration;
