import { Box, Card, CardHeader, TextField } from "@mui/material";
import merge from "lodash/merge";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BaseOptionChart } from "src/components/chart";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import { genYears } from "src/pages/admin/dashboard/components/widgets/SalesOverWidget";
import axiosInstance from "src/utils/axios";
import URI from "src/utils/urlConfig";
import { serializeData } from "./BusinessBuilderWidget";

// const serializeData = (data) => {

const useNetworkBonus = () => {
  const [bonus, setBonus] = useState([]);
  const handleErrors = useErrors();
  const fetchData = async (year) => {
    try {
      const { data, status } = await axiosInstance(
        URI.admin.network.bonusGraph,
        {
          params: {
            year,
          },
        }
      );
      if (status === 200) {
        setBonus(serializeData(data.data));
      }
    } catch (err) {
      handleErrors(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { bonus, fetchBonus: fetchData };
};

const ActiveSessionWidget = () => {
  const { translate } = useLocales();
  const { bonus, fetchBonus } = useNetworkBonus();
  const [seriesData, setSeriesData] = useState(new Date().getFullYear());
  const handleChangeSeriesData = (event) => {
    const year = Number(event.target.value);
    fetchBonus(year);
    setSeriesData(year);
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <CardHeader
        title={translate("adminDashboard.network.networkBonus")}
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
      {bonus?.map((item, i) => (
        <Box key={i} sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart
            type="line"
            series={[item]}
            options={chartOptions}
            height={170}
          />
        </Box>
      ))}
    </Card>
  );
};

export default ActiveSessionWidget;
