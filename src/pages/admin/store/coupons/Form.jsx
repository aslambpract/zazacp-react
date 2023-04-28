import { LoadingButton } from "@mui/lab";
import DatePicker from "@mui/lab/DatePicker";
import { Box, Card, Grid, Stack, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import useLocales from "src/hooks/useLocales";


import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";

import { MultipleProductAutoComplete } from "src/components/ProductAutoComplete";

const getTomorrow = () => {
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  return tomorrow;
};

const Form = ({ methods, onSubmit }) => {
  const { translate } = useLocales();
  const {
    control,
    formState: { isSubmitting, errors },
  } = methods;
  return (
    <Grid item xs={12} md={12}>
      <Card sx={{ p: 3 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: "repeat(3, 1fr)",
            }}
          >
            <RHFTextField name="name" label= {translate("adminStore.coupons.couponName")} />
            <RHFTextField name="code" label= {translate("adminStore.coupons.code")} />
            <RHFSelect name="type" label= {translate("adminStore.coupons.type")}>
              <option value="" />
              <option value="Fixed"> {translate("adminStore.coupons.fixedAmount")}</option>
              <option value="Percentage"> {translate("adminStore.coupons.percentage")}</option>
            </RHFSelect>
            <RHFTextField name="discount" label= {translate("adminStore.coupons.discount")} />
            <RHFTextField
              name="total_amount"
              label= {translate("adminStore.coupons.totalAmount")}
              type="number"
            />
            <RHFSelect name="active" label= {translate("adminStore.coupons.status")}>
              <option value={1}> {translate("adminStore.coupons.enabled")}</option>
              <option value={0}> {translate("adminStore.coupons.disabled")}</option>
            </RHFSelect>
            <RHFTextField
              type="number"
              name="uses_per_coupon"
              label= {translate("adminStore.coupons.usesPerCoupon")}
            />
            <RHFTextField
              type="number"
              name="uses_per_customer"
              label= {translate("adminStore.coupons.usesPerCustomer")}
            />
          </Box>
          <Box
            sx={{
              mt: 3,
              width: "50%",
            }}
          >
            <MultipleProductAutoComplete
              onChange={(_, item) =>
                methods.setValue(
                  "product_ids",
                  item.map(({ id }) => id)
                )
              }
              error={Boolean(errors.product_ids)}
              helperText={errors.product_ids?.message}
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
              mt: 3,
            }}
          >
            <Controller
              control={control}
              name="start_date"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  disablePast
                  label={translate("adminStore.coupons.from")}
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(new Date(newValue));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
            <Controller
              control={control}
              name="end_date"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  disablePast
                  label= {translate("adminStore.coupons.to")}
                  minDate={getTomorrow()}
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(new Date(newValue));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
          </Box>
          <Stack alignItems="flex-end" sx={{ mt: 3 }}>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
               {translate("adminStore.coupons.submit")}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
    </Grid>
  );
};

export default Form;
