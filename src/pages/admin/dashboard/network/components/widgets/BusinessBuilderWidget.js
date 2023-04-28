import { Box, Card, CardHeader, TextField } from "@mui/material";
import { capitalCase } from "change-case";
import merge from "lodash/merge";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BaseOptionChart } from "src/components/chart";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import { genYears } from "src/pages/admin/dashboard/components/widgets/SalesOverWidget";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";

export const serializeData = (data) => {
  return data.map((item) => {
    const [k, v] = Object.values(item);
    return { name: capitalCase(k), data: v };
  });
};

const useNetworkJoining = () => {
  const [data, setData] = useState([]);
  const handleErrors = useErrors();
  const fetchData = async (year) => {
    try {
      const { data, status } = await axiosInstance(
        URI.admin.network.networkJoining,
        {
          params: {
            year,
          },
        }
      );

      if (status === 200) {
        setData(serializeData(data.data));
      }
    } catch (err) {
      handleErrors(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { networkJoining: data, fetchJoining: fetchData };
};

export default function BusinessBuilderWidget() {
  const { translate } = useLocales();
  const { networkJoining, fetchJoining } = useNetworkJoining();
  const [seriesData, setSeriesData] = useState(2022);
  const handleChangeSeriesData = (event) => {
    const year = Number(event.target.value);

    fetchJoining(year);
    setSeriesData(year);
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { position: "top", horizontalAlign: "right" },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  return (
    <>
      <Card>
        <CardHeader
          title={translate("adminDashboard.network.networkJoining")}
          subheader={translate("adminDashboard.network.yearlySalesReport")}
          action={
            <TextField
              select
              fullWidth
              value={seriesData}
              SelectProps={{ native: true }}
              onChange={handleChangeSeriesData}
              sx={{
                "& fieldset": { border: "0 !important" },
                "& select": {
                  pl: 1,
                  py: 0.5,
                  pr: "24px !important",
                  typography: "subtitle2",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0.75,
                  bgcolor: "background.neutral",
                },
                "& .MuiNativeSelect-icon": {
                  top: 4,
                  right: 0,
                  width: 20,
                  height: 20,
                },
              }}
            >
              {genYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </TextField>
          }
        />

        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart
            type="area"
            series={networkJoining}
            options={chartOptions}
            height={200}
          />
        </Box>
      </Card>
    </>
  );
}
