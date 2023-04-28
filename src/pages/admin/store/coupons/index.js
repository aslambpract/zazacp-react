import { Link as RouterLink } from "react-router-dom";

import { Box, Button, Card, Typography, useMediaQuery } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import { default as Page } from "src/components/Page";
import CouponHistory from "./couponHistory";
import CouponList from "./couponList";
import useLocales from "src/hooks/useLocales";

const Index = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  const { translate } = useLocales();
  return (
    <div>
      <Page title={translate("adminStore.coupons.couponTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.coupons.coupon")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminStore.coupons.coupon") },
            ]}
            action={
              <>
                <Box
                  sx={{
                    display: "grid",
                    columnGap: 1,
                    rowGap: 3,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(1, 1fr)",
                    },
                  }}
                >
                  <Button
                    {...buttonProps}
                    component={RouterLink}
                    to={PATH_DASHBOARD.store.coupons_add}
                    variant="contained"
                    startIcon={<Iconify icon={"eva:plus-fill"} />}
                  >
                    {translate("adminStore.coupons.addCoupon")}
                  </Button>
                </Box>
              </>
            }
          />

          <Card sx={{ p: 3 }}>
            <CouponList />
          </Card>
          <Card sx={{ p: 3, mt: 3 }}>
            <Typography variant="subtitle2" p={2}>
              {translate("adminStore.coupons.couponAppliedHistory")}
            </Typography>
            <CouponHistory />
          </Card>
        </Box>
      </Page>
    </div>
  );
};

export default Index;
