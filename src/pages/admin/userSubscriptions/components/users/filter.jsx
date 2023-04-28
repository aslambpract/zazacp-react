import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import React from "react";
import useLocales from "src/hooks/useLocales";

const Filter = () => {
  const { translate } = useLocales();
  return (
    <Paper
      sx={{
        margin: "1rem 0",
        padding: "2rem",
      }}
    >
      <Grid
        sx={{
          display: "grid",
          columnGap: 2,
          rowGap: 3,
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(3, 1fr)",
          },
        }}
      >
        <TextField label={translate("adminUserSubscriptions.userName")} placeholder= {translate("adminUserSubscriptions.searchMember")} />
        <TextField
          label= {translate("adminUserSubscriptions.userSelectPeriod")}
          placeholder= {translate("adminUserSubscriptions.all")}
          select
          SelectProps={{ native: true }}
          fullWidth
        >
          <option value={1}> {translate("adminUserSubscriptions.member")} 1</option>
          <option value={2}> {translate("adminUserSubscriptions.member")} 2</option>
        </TextField>
        <TextField label= {translate("adminUserSubscriptions.email")} placeholder= {translate("adminUserSubscriptions.enterEmail")} />
        <TextField
          label= {translate("adminUserSubscriptions.selectProduct")}
          select
          SelectProps={{ native: true }}
          fullWidth
        >
          <option value={1}> {translate("adminUserSubscriptions.product")} 1</option>
          <option value={2}> {translate("adminUserSubscriptions.product")} 2</option>
        </TextField>
        <Box
          sx={{
            marginTop: "1rem",
          }}
        >
          <Button variant="contained"> {translate("adminUserSubscriptions.getReport")}</Button>
        </Box>
      </Grid>
    </Paper>
  );
};

export default Filter;
