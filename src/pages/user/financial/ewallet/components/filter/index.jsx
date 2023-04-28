import DatePicker from "@mui/lab/DatePicker";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import useLocales from "src/hooks/useLocales";

import UserAutoComplete from "src/components/UsersAutoComplete";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import AmountType from "./components/amountType";
import RowsPerPage from "./components/rowsPerPage";

const defaultValues = {
  start_date: "",
  end_date: "",
  user_name: "",
  amount_type: "all",
  rows_page: "10",
};

const FilterCard = ({ fetchData }) => {
  const { translate } = useLocales();

  const methods = useForm({
    defaultValues,
  });
  const onSubmit = (inputData) => {
    const { start_date, end_date, ...rest } = inputData;

    fetchData({
      ...rest,
      start_date: start_date
        ? new Date(start_date).toLocaleDateString("en-GB")
        : "",
      end_date: end_date ? new Date(end_date).toLocaleDateString("en-GB") : "",
    });
  };
  const { control, setValue } = methods;
  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Box>
          <Typography variant="subtitle2">
            {translate("userFinancial.eWallet.walletHistory")}
          </Typography>
          <FormProvider
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                marginTop: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(5, 1fr)",
                },
              }}
            >
              <Controller
                control={control}
                name="start_date"
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label="Pick Start Date"
                    inputFormat="dd/MM/yyyy"
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
                    inputFormat="dd/MM/yyyy"
                    label={translate("userFinancial.eWallet.pickEndDate")}
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

              <UserAutoComplete
                freeSolo={false}
                multiple={false}
                onChange={(_, v) => {
                  setValue("user_name", v.id);
                }}
              />

              <AmountType />
              <RowsPerPage />
            </Box>
            <Box mt={2} sx={{ float: "right" }}>
              <Button type="submit" variant="contained">
                {translate("userFinancial.eWallet.getReport")}
              </Button>
            </Box>
          </FormProvider>
        </Box>
      </Card>
    </div>
  );
};

export default FilterCard;
