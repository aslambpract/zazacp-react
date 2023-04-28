import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useCoinTypes from "src/hooks/useCoinTypes";
import useRequestForm from "./hooks/useRequestForm";
import useLocales from "src/hooks/useLocales";

const RequestForm = ({ minimumWithdrawal }) => {
  const { translate } = useLocales();
  const coinTypes = useCoinTypes();
  const { methods, onSubmit } = useRequestForm(minimumWithdrawal);
  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">{translate("userFinancial.requestPayout.payoutRequest")}</Typography>
            <FormProvider methods={methods} onSubmit={onSubmit}>
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
                  type="number"
                  name="amount"
                  label={translate("userFinancial.requestPayout.requestAmount")}
                />
                <RHFSelect name="coin_id" label={translate("userFinancial.requestPayout.coinType")}>
                  <option />
                  {coinTypes.map(({ id, name }) => (
                    <option value={id}>{name}</option>
                  ))}
                </RHFSelect>
              </Box>

              <Box sx={{ display: "flex", mt: 2 }}>
                <LoadingButton type="submit" variant="contained">
                 {translate("userFinancial.requestPayout.request")} 
                </LoadingButton>
              </Box>
            </FormProvider>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default RequestForm;
