import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import useLocales from "src/hooks/useLocales";


import PropTypes from "prop-types";

const MaterialDatePicker = ({ name }) => {
  const { translate } = useLocales();
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          disablePast
          label={translate("adminStore.material.accessTime")}
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
  );
};
MaterialDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
};
export default MaterialDatePicker;
