import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { alpha, useTheme, styled } from "@mui/material/styles";
import { Box, Card, Typography, Stack } from "@mui/material";
// utils
import { fShortenNumber } from "src/utils/formatNumber";
// components
import Iconify from "src/components/Iconify";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

Cards.propTypes = {
  chartColor: PropTypes.string.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.number).isRequired,
  percent: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default function Cards({ title, color, total, chartColor, icon }) {
  const theme = useTheme();

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: "68%", borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fShortenNumber(seriesName),
        title: {
          formatter: () => "",
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Typography variant="h3">$ {fShortenNumber(total)}</Typography>
      </Box>

      <Box>
        <Iconify color={color} width={60} height={60} icon={icon} />
      </Box>
    </Card>
  );
}
