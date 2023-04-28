import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import useLocales from "src/hooks/useLocales";
import Logo from "../Logo";

const TitleBar = ({ date, invoiceNumber }) => {
  const { translate } = useLocales();
  return (
    <Grid container>
      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Logo />
      </Grid>

      <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
        <Box sx={{ textAlign: { sm: "right" } }}>
          <Typography variant="h6">{invoiceNumber}</Typography>
          <Typography
            paragraph
            variant="overline"
            sx={{ color: "text.disabled" }}
          >
            {translate("usersMyOrders.dateInvoice")}
            {date}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TitleBar;
