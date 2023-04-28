import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Iconify from "src/components/Iconify";
import {
  findGrowthRate,
  genBgColor,
  genLabel,
  getColor,
  getIcon,
} from "./utils";
import useLocales from "src/hooks/useLocales";



ProfitWidget.propTypes = {
  percent: PropTypes.number,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function ProfitWidget({ title, prev, current }) {
  const { translate } = useLocales();
  const growthRate = findGrowthRate(prev, current);
  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack direction="row" alignItems="center">
          <Chip
            label={genLabel(growthRate)}
            size="small"
            sx={{
              bgcolor: genBgColor(growthRate),
            }}
          />

          <Iconify
            width={16}
            height={16}
            icon={getIcon(growthRate)}
            color={getColor(growthRate)}
          />
        </Stack>
        <Typography
          variant="body2"
          noWrap
          sx={{ mt: 1, color: "text.secondary" }}
        >
         {translate("adminDashboard.business.thenLastMonth")} 
        </Typography>

        <Typography variant="h4" gutterBottom>
          $ {current}
        </Typography>
        <Typography
          variant="subtitle2"
          paragraph
          sx={{ color: "text.secondary" }}
        >
          {title}
        </Typography>
      </Box>
    </Card>
  );
}
