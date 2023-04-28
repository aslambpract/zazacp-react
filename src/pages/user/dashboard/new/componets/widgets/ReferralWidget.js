import { Box, Card, IconButton, Stack, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import MyAvatarReferral from "src/components/MyAvatarReferral";
import Iconify from "src/components/Iconify";
import Image from "src/components/Image";
import useAuth from "src/hooks/useAuth";

import useLocales from "src/hooks/useLocales";
import NoUser from "src/images/man.png";
import "./style.css";

const ContentStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  padding: theme.spacing(5),
  paddingTop: theme.spacing(0),
  color: theme.palette.common.black,
  borderRadius: 0,
}));

export default function ReferralWidget() {
  const { translate } = useLocales();
  const { user } = useAuth();
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    if (user.username) {
      const encoded = btoa(JSON.stringify({ username: user.username }));
      setReferralLink(`${window.location.origin.toString()}/auth/${encoded}`);
    }
  }, [user]);

  const { enqueueSnackbar } = useSnackbar();
  const copy = async () => {
    await navigator.clipboard.writeText(referralLink);
    enqueueSnackbar("Copied to clipboard");
  };

  const { palette } = useTheme();
  return (
    <div className="ref-card">
      <Box sx={{ position: "relative", zIndex: 3 }}>
        <Stack direction="row" spacing={2}>
          <MyAvatarReferral
            src={user.user_profile?.profile_image}
            sx={{
              left: 40,
              width: 100,
              height: 100,
              top: "1rem",
              borderRadius: "1rem",
              position: "relative",
              filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.24))",
            }}
            style={{ border: "solid 3px #fff", borderRadius: "1rem" }}
            variant="square"
          />

          <Box
            sx={{
              flexGrow: 1,
              zIndex: 999,
              color: "#fff",
              marginTop: "1rem !important",
              marginLeft: "10% !important",
            }}
          >
            <Typography variant="h6">
              {translate("userDashboard.welcomeBack")}
            </Typography>
            <Typography variant="h5">
              {user.user_profile?.first_name}
            </Typography>
            <Typography
              variant="subtitle2"
              className="RankStyle"
              color="text.primary"
            >
              <Iconify icon="cil:badge" /> {translate("userDashboard.rank")}{" "}
              :&nbsp;&nbsp;
              <Typography variant="span" color="primary">
                {translate("userDashboard.activeCustomer")}
              </Typography>
            </Typography>
          </Box>
        </Stack>
      </Box>
      <div
        className="rfrlCntnt"
        style={{
          backgroundColor: palette.background.paper,
        }}
      >
        <ContentStyle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6" sx={{ mt: 1, mb: 2 }} color="text.primary">
              {translate("userDashboard.referralLink")}
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            sx={{ mt: 1, mb: 2 }}
            color="text.primary"
          >
            {translate("userDashboard.sendThisLinkToYourReferrals")}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography
              onClick={() => copy()}
              sx={{
                cursor: "pointer",
                color: "primary.main",
                fontWeight: "fontWeightMedium",
              }}
            >
              {referralLink.slice(0, 40)}
            </Typography>
            <Box>
              <IconButton
                variant="outlined"
                onClick={() => copy()}
                sx={{ color: "primary.main" }}
              >
                <Iconify icon="fluent:copy-20-regular" />
              </IconButton>
              <IconButton variant="outlined" sx={{ color: "primary.main" }}>
                <Iconify icon="ci:share-outline" />
              </IconButton>
            </Box>
          </Stack>
        </ContentStyle>
      </div>
    </div>
  );
}
