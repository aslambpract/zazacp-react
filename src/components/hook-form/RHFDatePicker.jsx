import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import convertDMYToMDY from "src/utils/convertDMYToMDY";

const RHFDatePicker = ({ name, label, size }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          label={label}
          value={new Date(convertDMYToMDY(field.value))}
          onChange={(newValue) => {
            if (newValue) {
              field.onChange(new Date(newValue).toLocaleDateString("en-GB"));
            } else {
              field.onChange("");
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={!!error}
              helperText={error?.message}
              size={size}
            />
          )}
        />
      )}
    />
  );
};

export default RHFDatePicker;
