import DatePicker from "@mui/lab/DatePicker";
import { Box, Card, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RHFSelect, RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import LabelStyle from "src/pages/admin/store/product/ProductAddForm/LabelStyle";
import TimeList from "./TimeList";
import TimeZones from "./TimeZones";

const TimeInfo = () => {
  const { translate } = useLocales();
  const { control } = useFormContext();
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} mt={2}>
        <LabelStyle>{translate("adminStore.events.when")}</LabelStyle>

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
            name="date"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DatePicker
                disablePast
                label={translate("adminStore.events.date")}
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
          <RHFTextField
            type="time"
            name="time"
            label={translate("adminStore.events.time")}
          />

          <RHFSelect name="hr" label="Hr">
            <option value="" />
            <TimeList />
          </RHFSelect>
          <RHFSelect name="min" label={translate("adminStore.events.min")}>
            <option value="" />
            <TimeList limit={60} />
          </RHFSelect>
        </Box>
        <RHFSelect
          type="time"
          name="timezone"
          label={translate("adminStore.events.timeZone")}
        >
          <option value="" />
          <TimeZones />
        </RHFSelect>
      </Stack>
    </Card>
  );
};

export default TimeInfo;
