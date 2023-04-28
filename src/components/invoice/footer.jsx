import { Grid, Typography } from "@mui/material";
import React from "react";
import useLocales from "src/hooks/useLocales";

const Footer = () => {
  const { translate } = useLocales();
  return (
    <Grid container>
      <Grid item xs={12} md={9} sx={{ py: 3 }}>
        <Typography variant="subtitle2">
          {translate("usersMyOrders.notes")}
        </Typography>
        <Typography variant="body2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's
        </Typography>
      </Grid>
      <Grid item xs={12} md={3} sx={{ py: 3, textAlign: "right" }}>
        <Typography variant="subtitle2">
          {translate("usersMyOrders.haveQuestion")}
        </Typography>
        <Typography
          variant="body2"
          component="a"
          href="mailto:support@cloudmlm.com"
          target="_blank"
        >
          support@cloudmlm.com
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
