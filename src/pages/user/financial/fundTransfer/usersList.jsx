import { Autocomplete, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import useUsersList from "src/components/UsersAutoComplete/hooks/useUsersList";
import useLocales from "src/hooks/useLocales";

const UsersList = () => {
  const { translate } = useLocales();
  const usersList = useUsersList();
  const {
    setValue,
    formState: { errors },
  } = useFormContext();
  const onChange = (_, v) => {
    setValue("user_id", v.user_id);
  };

  return (
    <Autocomplete
      onChange={onChange}
      options={usersList}
      getOptionLabel={(option) => option.username}
      renderInput={(params) => (
        <TextField
          label={translate("userFinancial.fundTransfer.users")}
          {...params}
          error={Boolean(errors.user_id)}
          helperText={errors.user_id?.message}
        />
      )}
    />
  );
};

export default UsersList;
