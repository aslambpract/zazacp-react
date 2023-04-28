import { Box, Button, Card, Collapse, Grid, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import useErrors from "src/hooks/useErrors";
import fetchUser from "src/utils/fetchUser";
import Coin from "./Coin";
import usePayNow from "./hooks/usePayNow";
import useLocales from "src/hooks/useLocales";

const useBusinessBuilders = () => {
 
  const [businessBuilders, setBusinessBuilders] = useState([]);
  const handleErrors = useErrors();
  const fetchData = async () => {
    try {
      const { status, data } = await (
        await fetchUser("business-builder-list")
      ).data;

      if (status) {
        setBusinessBuilders(data);
      }
    } catch (err) {
      handleErrors(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return businessBuilders;
};

const PayNow = () => {
  const { translate } = useLocales();
  const { methods, onSubmit } = usePayNow();

  const { amount, period_month, business_builder_id, coin_id } =
    methods.watch();
  const openCoin = Boolean(amount && period_month && business_builder_id);

  const businessBuilders = useBusinessBuilders();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={5} lg={5}>
        <Box>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="amount" label={translate("userBusinessBuilder.subscription.amount")}  />
                <RHFSelect name="business_builder_id" label={translate("userBusinessBuilder.subscription.businessBuilder")} >
                  <option />
                  {businessBuilders?.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                  ))}
                </RHFSelect>
                <RHFSelect name="period_month" label={translate("userBusinessBuilder.subscription.choosePeriod")} >
                  <option />
                  <option value="1 month">1 {translate("userBusinessBuilder.subscription.month")} </option>
                  <option value="2 month">3  {translate("userBusinessBuilder.subscription.month")}</option>
                  <option value="3 month">6  {translate("userBusinessBuilder.subscription.month")}</option>
                  <option value="4 month">12  {translate("userBusinessBuilder.subscription.month")}</option>
                </RHFSelect>
                <Collapse in={openCoin}>
                  <Box
                    sx={{
                      display: "grid",
                      columnGap: 2,
                      rowGap: 3,
                      gridTemplateColumns: {
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(1, 1fr)",
                      },
                    }}
                  >
                    <Coin />
                  </Box>
                </Collapse>
                <Collapse in={Boolean(coin_id)}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    endIcon={<Iconify icon="eva:chevron-right-fill" />}
                  >
                    {translate("userBusinessBuilder.subscription.payNow")} 
                  </Button>
                </Collapse>
              </Stack>
            </Card>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PayNow;
