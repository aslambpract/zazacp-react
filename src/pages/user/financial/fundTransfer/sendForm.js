import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useFundForm from "./hooks/useFundForm";
import UsersList from "./usersList";
import useLocales from "src/hooks/useLocales";

const SendForm = ({ refetch }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useFundForm(refetch);

  const {
    formState: { isSubmitting },
  } = methods;
  return (
    <>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">{translate("userFinancial.fundTransfer.sendForm")}</Typography>
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  marginTop: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                }}
              >
                <RHFSelect name="wallet" label={translate("userFinancial.fundTransfer.from")}>
                  <option />
                  <option value="ewallet">{translate("userFinancial.fundTransfer.e-Wallet")}</option>
                  <option value="deposit_wallet">{translate("userFinancial.fundTransfer.depositWallet")}</option>
                </RHFSelect>
                <RHFTextField type="number" name="amount" label={translate("userFinancial.fundTransfer.amount")} />

                <UsersList />
              </Box>
              <Box
                sx={{
                  display: "grid",
                  rowGap: 3,
                  columnGap: 2,
                  marginTop: 2,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                  },
                }}
              >
                <RHFTextField
                  multiline
                  fullWidth
                  rows={3}
                  name="note"
                  label={translate("userFinancial.fundTransfer.note")}
                />
              </Box>
              <Box sx={{ display: "flex", mt: 2 }}>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                >
                  {translate("send")}
                </LoadingButton>
              </Box>
            </FormProvider>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SendForm;
