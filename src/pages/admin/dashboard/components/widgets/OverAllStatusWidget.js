import { CardHeader } from "@mui/material";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import useOverallStatus from "./hooks/useOverallStatus";
import "./style.css";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"





const OverAllStatusWidget = () => {
  const { translate } = useLocales();
  const [options, setOptions] = useState({
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#1ab7ea", "#0084ff"],
    labels: [i18n.t("adminDashboard.business.payout"), i18n.t("adminDashboard.business.sales")],
    legend: {
      show: true,
      floating: true,
      fontSize: "13px",
      position: "left",
      offsetX: 0,
      offsetY: 10,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
      },
      formatter: function (seriesName, opts) {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 5,
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const series = useOverallStatus();

  return (
    <div id="chart resp-mobile">
      <CardHeader title= {translate("adminDashboard.business.overallStatus")}  />
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={290}
      />
    </div>
  );
};

export default OverAllStatusWidget;
