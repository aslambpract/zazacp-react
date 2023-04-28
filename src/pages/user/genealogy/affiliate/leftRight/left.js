import PropTypes from "prop-types";
// @mui
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";

const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

export default function LeftR̦ightCard({ title, caption }) {
  const { translate } = useLocales();

  return (
    <Card>
      <CardHeader title={title} />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ backgroundColor: "#f4f4f4" }}>
            <Iconify icon={"emojione:star"} width={20} height={20} />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">
              {translate("userGenealogy.affiliateDashboard.startup")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              120
            </Typography>
          </Box>
          <IconWrapperStyle>
            <Iconify icon={"bi:arrow-bar-left"} width={20} height={20} />
          </IconWrapperStyle>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ backgroundColor: "#f4f4f4" }}>
            <Iconify icon={"emojione:star"} width={20} height={20} />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">
              {translate("userGenealogy.affiliateDashboard.customer")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              111
            </Typography>
          </Box>
          <IconWrapperStyle>
            <Iconify icon={"bi:arrow-bar-left"} width={20} height={20} />
          </IconWrapperStyle>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ backgroundColor: "#f4f4f4" }}>
            <Iconify icon={"emojione:star"} width={20} height={20} />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">
              {translate("userGenealogy.affiliateDashboard.activeCustomer")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              009
            </Typography>
          </Box>
          <IconWrapperStyle>
            <Iconify icon={"bi:arrow-bar-left"} width={20} height={20} />
          </IconWrapperStyle>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ backgroundColor: "#f4f4f4" }}>
            <Iconify icon={"emojione:star"} width={20} height={20} />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">
              {translate("userGenealogy.affiliateDashboard.activeBusiness")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              0
            </Typography>
          </Box>
          <IconWrapperStyle>
            <Iconify icon={"bi:arrow-bar-left"} width={20} height={20} />
          </IconWrapperStyle>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ backgroundColor: "#f4f4f4" }}>
            <Iconify icon={"emojione:star"} width={20} height={20} />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">
              {translate("userGenealogy.affiliateDashboard.bronze")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              695
            </Typography>
          </Box>
          <IconWrapperStyle>
            <Iconify icon={"bi:arrow-bar-left"} width={20} height={20} />
          </IconWrapperStyle>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ backgroundColor: "#f4f4f4" }}>
            <Iconify icon={"emojione:star"} width={20} height={20} />
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">
              {translate("userGenealogy.affiliateDashboard.sliverExecutive")}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              358
            </Typography>
          </Box>
          <IconWrapperStyle>
            <Iconify icon={"bi:arrow-bar-left"} width={20} height={20} />
          </IconWrapperStyle>
        </Stack>
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

LeftSide.propTypes = {
  author: PropTypes.shape({
    avatar: PropTypes.string,
    favourite: PropTypes.number,
    name: PropTypes.string,
  }),
  index: PropTypes.number,
};

function LeftSide({ author, index, icon }) {
  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={author.name} src={author.avatar} />
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">lorem content</Typography>
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            587
          </Typography>
        </Box>
        <IconWrapperStyle>
          <Iconify icon={icon} width={20} height={20} />
        </IconWrapperStyle>
      </Stack>
    </>
  );
}
