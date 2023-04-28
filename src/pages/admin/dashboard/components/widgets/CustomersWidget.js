import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import merge from "lodash/merge";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BaseOptionChart } from "src/components/chart";
import { fPercent } from "src/utils/formatNumber";
import useLocales from "src/hooks/useLocales";

import i18n from "src/locales/i18n"






const getPercentage = (total, current) => (current / total) * 100;
export default function CustomersWidget({ total_customers, active_customers }) {
  const { translate } = useLocales();
  const theme = useTheme();
  const [activePercentage, setActivePercentage] = useState(0);

  useEffect(() => {
    setActivePercentage(getPercentage(total_customers, active_customers) || 0);
  }, [total_customers, active_customers]);

  return (
    <Card sx={{ p: 2 }}>
      <Box
        sx={{
          justifyContent: "center",
          display: "grid",
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
          },
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: 0.8 }}>
            {translate("adminDashboard.business.customers")}  
          </Typography>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {total_customers}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {translate("adminDashboard.business.totalCustomers")}  
          </Typography>

          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {active_customers}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>
            {translate("adminDashboard.business.activeCustomers")}  
          </Typography>
        </Box>
        <Box height={activePercentage ? "initial" : 200}>
          {activePercentage ? (
            <ReactApexChart
              type="radialBar"
              series={[activePercentage]}
              options={generator(theme)(activePercentage)}
              height={200}
            />
          ) : null}
        </Box>
      </Box>
    </Card>
  );
}

export const generator =
  (theme) =>
  (percent = 0) => {
    return merge(BaseOptionChart(), {
      legend: { show: false },
      fill: {
        type: "gradient",
        gradient: {
          colorStops: [
            [
              { offset: 0, color: theme.palette.primary.light },
              { offset: 100, color: theme.palette.primary.main },
            ],
          ],
        },
      },
      plotOptions: {
        radialBar: {
          hollow: { size: "60%" },
          dataLabels: {
            name: { offsetY: -16 },
            value: { offsetY: 8 },
            total: {
              label: i18n.t("adminDashboard.business.active"),
              formatter: () => fPercent(percent),
            },
          },
        },
      },
    });
  };
