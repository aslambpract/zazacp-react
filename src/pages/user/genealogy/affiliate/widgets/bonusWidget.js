import { Box, Card, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";


const RootStyle = styled(Card)(({ theme }) => ({
  display: "flex",
  position: "relative",
  alignItems: "center",
  padding: theme.spacing(3),
  backgroundColor: theme.palette.primary.darker,
}));

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: "absolute",
  right: theme.spacing(-3),
  color: theme.palette.common.white,
}));

AppWidget.propTypes = {
  chartData: PropTypes.number.isRequired,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function AppWidget({ total, icon, color = "primary" }) {
  const { translate } = useLocales();
  const theme = useTheme();

  return (
    <RootStyle
      sx={{
        bgcolor: theme.palette[color].darker,
      }}
    >
      <img width={180} />
      <Box sx={{ ml: 3, color: "common.white" }}>
        <Typography variant="body2" sx={{ opacity: 0.55 }}>
          {translate("userGenealogy.affiliateDashboard.upcomingWeek")}
        </Typography>
        <Typography variant="h4"> $ {total}</Typography>
        <Typography variant="body1" sx={{ opacity: 0.9 }}>
         {translate("userGenealogy.affiliateDashboard.binaryBonus")} 
        </Typography>
      </Box>
      <IconStyle icon={icon} />
    </RootStyle>
  );
}
