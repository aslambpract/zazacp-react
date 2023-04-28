import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Card,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { FormProvider } from "react-hook-form";
import { RHFSelect, RHFTextField } from "src/components/hook-form";
import useAddForm from "./hooks/useAddForm";
import useFetchUsers from "./hooks/useFetchUsers";
import useLocales from "src/hooks/useLocales";

const FormFund = () => {
  const { translate } = useLocales();

  const { userList, setSearchTerm } = useFetchUsers();
  const { methods, onSubmit } = useAddForm();

  const {
    formState: { errors },
  } = methods;

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <>
      <Card sx={{ p: 3 }}>
        <FormProvider {...methods}>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(2, 1fr)",
              },
              mb: 2,
            }}
          >
            <Autocomplete
              onChange={(_, value) => methods.reset({ user_id: value.user_id })}
              disablePortal
              loading
              id="combo-box-demo"
              options={userList}
              getOptionLabel={(option) => option.username}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  label={translate("adminFinancial.fundCredit.startTyping")}
                  name="user_id"
                  error={Boolean(errors.user_id)}
                  helperText={errors.user_id?.message}
                />
              )}
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
              mb: 2,
            }}
          >
            <RHFTextField
              name="amount"
              type="number"
              label={translate("adminFinancial.fundCredit.amount")}
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
              mb: 2,
            }}
          >
            <RHFSelect
              name="wallet_type"
              label={translate("adminFinancial.fundCredit.to")}
            >
              <option value="" />
              <option value="ewallet">
                {translate("adminFinancial.fundCredit.eWallet")}
              </option>
              <option value="deposit_wallet">
                {translate("adminFinancial.fundCredit.depositWallet")}
              </option>
            </RHFSelect>
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
              mb: 2,
            }}
          >
            <RHFTextField
              simple
              name="notes"
              multiline
              fullWidth
              rows={3}
              label={translate("adminFinancial.fundCredit.notes")}
            />
          </Box>

          <Stack alignItems="flex-start" sx={{ mt: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: "repeat(2, 1fr)",
                mb: 2,               
              }}
            >
              <LoadingButton
                {...buttonProps}
                type="submit"
                variant="outlined"
                onClick={methods.handleSubmit(onSubmit(true))}
              >
                {translate("adminFinancial.fundCredit.deductFund")}
              </LoadingButton>

              <LoadingButton
                {...buttonProps}
                type="submit"
                variant="contained"
                onClick={methods.handleSubmit(onSubmit(false))}
              >
                {translate("adminFinancial.fundCredit.addAmount")}
              </LoadingButton>
            </Box>
          </Stack>
        </FormProvider>
      </Card>
    </>
  );
};

export default FormFund;
