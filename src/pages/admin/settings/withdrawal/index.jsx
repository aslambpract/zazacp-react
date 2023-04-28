import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import Available from "./components/Available";
import AdminFee from "./components/adminFee";
import useWithdrawal from "./hooks/useWithdrawal";

const Withdraw = () => {
  const { translate } = useLocales();
  const { data, handleChange, onSubmit } = useWithdrawal();
  const {
    admin_fee_percent,
    withdrawal_open_days,
    min_amount,
    available_coins,
  } = data;

  return (
    <>
      <Page title={translate("adminSettings.network.withdrawal")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminSettings.network.withdrawal")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              {
                name: translate("adminSettings.network.withdrawal"),
                href: PATH_DASHBOARD.settings.network.root,
              },
            ]}
          />

          <Card sx={{ p: 4 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <Available
                handleChange={handleChange}
                available={available_coins}
                min={min_amount}
              />
              <AdminFee
                handleChange={handleChange}
                fee={admin_fee_percent}
                openDays={withdrawal_open_days}
              />
            </Box>
            <Button onClick={onSubmit} variant="contained">
              {translate("adminSettings.network.submit")}
            </Button>
          </Card>
        </Box>
      </Page>
    </>
  );
};

export default Withdraw;
