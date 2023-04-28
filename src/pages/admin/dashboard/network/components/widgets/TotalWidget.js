import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import merge from "lodash/merge";
import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
import { BaseOptionChart } from "src/components/chart";
import Iconify from "src/components/Iconify";
import { fNumber, fPercent } from "src/utils/formatNumber";

TotalWidgets.propTypes = {
  chartColor: PropTypes.string,
  chartData: PropTypes.arrayOf(PropTypes.number),
  percent: PropTypes.number,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default function TotalWidgets({
  title,
  percent,
  total,
  chartColor,
  chartData,
}) {
  const chartOptions = merge(BaseOptionChart(), {
    colors: [chartColor],
    chart: { animations: { enabled: true }, sparkline: { enabled: true } },
    stroke: { width: 2 },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => "",
        },
      },
      marker: { show: false },
    },
  });

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2" paragraph>
          {title}
        </Typography>
        <Typography variant="h3" gutterBottom>
          $ {fNumber(total)}
        </Typography>

        <Stack direction="row" alignItems="center">
          <Chip
            sx={{
              ...(percent < 0 && {
                color: "error.main",
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
              }),
            }}
            label={
              <>
                {percent > 0 && "+"}
                {fPercent(percent)}
              </>
            }
            size="small"
          />
          <Iconify
            width={16}
            height={16}
            icon={
              percent >= 0 ? "eva:trending-up-fill" : "eva:trending-down-fill"
            }
          />
        </Stack>
      </Box>

      <ReactApexChart
        type="line"
        series={[{ data: chartData }]}
        options={chartOptions}
        width={120}
        height={80}
      />
    </Card>
  );
}
