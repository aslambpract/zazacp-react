import { Card, Stack } from "@mui/material";
import { RHFRadioGroup } from "src/components/hook-form";
import LabelStyle from "../LabelStyle";
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n"





const PaymentMethods = () => {
  const { translate } = useLocales();
  const SUB_ONE = [ i18n.t("adminStore.products.subscription") ,  i18n.t("adminStore.products.oneOffPayment") ];
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={1}>
        <LabelStyle>{translate("adminStore.products.subscriptionOR")}</LabelStyle>
        <RHFRadioGroup
          name="subscription_type"
          options={SUB_ONE}
          sx={{
            "& .MuiFormControlLabel-root": { mr: 4 },
          }}
        />
      </Stack>
    </Card>
  );
};

export default PaymentMethods;
