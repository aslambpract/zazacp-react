import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import Iconify from "src/components/Iconify";

import useUserOptions from "../hooks/useUserOptions";

const Users = ({ name = "user_id", onChange }) => {
  const { users, setSearchTerm } = useUserOptions();
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch(name);
  const selectedUser = useMemo(() => {
    const user = users.find((user) => user[name] === value);
    return user || null;
  }, [value]);
  return (
    <Autocomplete
      value={selectedUser}
      sx={{
        "& .MuiAutocomplete-popupIndicator": {
          transform: "none",
        },
      }}
      size="small"
      onChange={(e, v) => {
        if (onChange) {
          onChange(e, v);
          return;
        }
        if (v) setValue(name, v.user_id);
        else setValue(name, "");
      }}
      clearOnBlur
      onBlur={() => setSearchTerm("")}
      autoHighlight
      disablePortal
      noOptionsText="No users found"
      popupIcon={<Iconify icon="material-symbols:search-rounded" />}
      id="users"
      options={users}
      getOptionLabel={(item) => item.username}
      renderInput={(params) => (
        <TextField
          error={Boolean(errors[name])}
          helperText={errors[name]?.message}
          {...params}
          placeholder={"Search By Username"}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      )}
    />
  );
};

export default Users;
