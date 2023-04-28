import { Box } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";

import useSettings from "src/hooks/useSettings";
import Form from "./Form";
import useAddCoupon from "./hooks/useAddCoupon";
import useLocales from "src/hooks/useLocales";


const CouponAdd = () => {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  const addCoupon = useAddCoupon();

  return (
    <>
      <Page title={translate("adminStore.coupons.addCouponTitile")}>
        <Box maxWidth={themeStretch ? false : "lg"}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.coupons.addCoupon")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminStore.coupons.coupon"), href: PATH_DASHBOARD.store.coupons },
              { name: translate("adminStore.coupons.add") },
            ]}
          />

          <Form {...addCoupon} />
        </Box>
      </Page>
    </>
  );
};

export default CouponAdd;
