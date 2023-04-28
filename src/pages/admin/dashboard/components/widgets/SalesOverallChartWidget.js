import { Card, Grid } from "@mui/material";
import { useState } from "react";
import OverAllStatusWidget from "./OverAllStatusWidget";
import SalesOverWidget from "./SalesOverWidget";


const SalesOverallChartWidget = () => {
  return (
    <>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <SalesOverWidget />
          </Grid>
          <Grid item xs={12} md={4} sx={{ border: "dashed 1px #cccccc57" }}>
            <OverAllStatusWidget />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default SalesOverallChartWidget;
