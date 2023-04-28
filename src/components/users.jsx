import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import useUsersList from "src/components/UsersAutoComplete/hooks/useUsersList";

const Users = ({ name, label, size, defaultValue, ...rest }) => {
  const usersList = useUsersList();

  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { ref, onChange, ...field } }) => (
        <Autocomplete
          clearOnBlur
          clearOnEscape
          defaultValue={defaultValue}
          onChange={(_, v) => {
            if (v) onChange(v.user_id);
            else onChange("");
          }}
          options={usersList}
          getOptionLabel={(option) => option.username}
          renderInput={(params) => (
            <TextField
              label={label}
              {...field}
              {...params}
              inputRef={ref}
              error={Boolean(errors[name])}
              helperText={errors[name]?.message}
              size={size}
            />
          )}
          {...rest}
        />
      )}
    />
  );
};

export default Users;
