import React from "react";
// @mui
import DatePicker from "@mui/lab/DatePicker";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

// components
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";

const FilterCard = () => {
  const { translate } = useLocales();
  const methods = useForm();
  const onSubmit = methods.handleSubmit((inputData) => {});
  const {
    control,
    formState: { isSubmitting },
  } = methods;
  return (
    <>
      <Card sx={{ p: 3 }}>
        <Box>
          <Typography variant="subtitle2">{translate("userFinancial.depositWallet.walletHistory")}</Typography>

          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                marginTop: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(4, 1fr)",
                },
              }}
            >
              <Controller
                control={control}
                name="start_date"
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label={translate("userFinancial.depositWallet.pickStartDate")}
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
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
                    label={translate("userFinancial.depositWallet.pickEndDate")}
                    value={field.value}
                    onChange={(newValue) => {
                      field.onChange(newValue);
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

              <RHFTextField name="userName" label={translate("userFinancial.depositWallet.Username")} />
              <RHFSelect name="amountType" label={translate("userFinancial.depositWallet.amountType")}>
                <option value="all">{translate("userFinancial.depositWallet.all")}</option>
                <option value="released">{translate("userFinancial.depositWallet.released")}</option>
                <option value="pending">{translate("userFinancial.depositWallet.pending")}</option>
                <option value="failed">{translate("userFinancial.depositWallet.failed")}</option>
                <option value="rejected">{translate("userFinancial.depositWallet.rejected")}</option>
                <option value="finished">{translate("userFinancial.depositWallet.finished")}</option>
                <option value="approved">{translate("userFinancial.depositWallet.approved")}</option>
                <option value="fund_transfer">{translate("userFinancial.depositWallet.fundTransfer")}</option>
                <option value="plan_purchase">{translate("userFinancial.depositWallet.planPurchase")}</option>
                <option value="fund_transfer">{translate("userFinancial.depositWallet.fundTransfer")}</option>
                <option value="self_transfer">{translate("userFinancial.depositWallet.selfTransfer")}</option>
                <option value="referral_bonus">{translate("userFinancial.depositWallet.referralBonus")}</option>
                <option value="achievement_bonus">{translate("userFinancial.depositWallet.achievementBonus")}</option>
                <option value="first_order_bonus">{translate("userFinancial.depositWallet.firstOrderBonus")}</option>
                <option value="binary_bonus">{translate("userFinancial.depositWallet.binaryBonus")}</option>
                <option value="credited_by_admin">{translate("userFinancial.depositWallet.creditedByAdmin")}</option>
                <option value="deducted_by_admin">{translate("userFinancial.depositWallet.deductedByAdmin")}</option>
              </RHFSelect>
            </Box>
            <Box mt={2} sx={{ float: "right" }}>
              <Button variant="contained">{translate("getReport")}</Button>
            </Box>
          </FormProvider>
        </Box>
      </Card>
    </>
  );
};

export default FilterCard;
