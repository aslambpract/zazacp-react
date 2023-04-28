import { Autocomplete, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import useUsersList from "src/components/UsersAutoComplete/hooks/useUsersList";
import useLocales from "src/hooks/useLocales";


const Users = ({ size }) => {
  const { translate } = useLocales();
  const usersList = useUsersList();
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
  return (
    <Autocomplete
      options={usersList}
      onChange={(_, v) => setValue("user_id", v.user_id)}
      getOptionLabel={(option) => option.username}
      renderInput={(params) => (
        <TextField
          label={translate("adminStore.assignSubscriptions.users")} 
          {...params}
          error={Boolean(errors.user_id)}
          helperText={errors.user_id?.message}
          size="small"
        />
      )}
    />
  );
};

export default Users;
