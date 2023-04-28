import DatePicker from "@mui/lab/DatePicker";
import { Box, Card, Stack, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { RHFSwitch } from "src/components/hook-form";
import LabelStyle from "../LabelStyle";
import useLocales from "src/hooks/useLocales";


const ProductAvailable = () => {
  const { translate } = useLocales();
  const { control, watch } = useFormContext();
  return (
    <Card sx={{ p: 3 }}>
      <RHFSwitch name="active" label={translate("adminStore.products.status")} />
      <Stack spacing={3} mt={2}>
        <LabelStyle>{translate("adminStore.products.productAvailable")}</LabelStyle>
        <Box
          sx={{
            display: "grid",
            columnGap: 2,
            rowGap: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          <Controller
            name="available_from"
            control={control}
            render={({ field, fieldState: { error } }) => {
              return (
                <DatePicker
                  label={translate("adminStore.products.accessFrom")}
                  disablePast
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
              );
            }}
          />

          <Controller
            name="available_to"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                disablePast
                label={translate("adminStore.products.accessTo")}
                value={field.value}
                inputFormat="dd/MM/yyyy"
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
        </Box>
      </Stack>
    </Card>
  );
};

export default ProductAvailable;
