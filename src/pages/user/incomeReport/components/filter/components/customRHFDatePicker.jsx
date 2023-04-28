import DatePicker from "@mui/lab/DatePicker";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

const CustomRHFDatePicker = ({ name, label, size }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <DatePicker
            inputFormat="dd/MM/yyyy"
            label={label}
            value={new Date(field.value || "")}
            onChange={(newValue) => {
              if (newValue) {
                field.onChange(newValue);
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
        );
      }}
    />
  );
};

export default CustomRHFDatePicker;
