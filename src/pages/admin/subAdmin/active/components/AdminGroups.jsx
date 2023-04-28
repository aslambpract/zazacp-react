import { useFormContext } from "react-hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import useAdminGroupsList from "src/components/ProductAutoComplete/hooks/useAdminGroupsList";
import useLocales from "src/hooks/useLocales";

const AdminGroups = () => {
  const { translate } = useLocales();
  const options = useAdminGroupsList();
  const { getValues } = useFormContext();
  if (options.length) {
    const selectedValue = options.find(
      ({ id }) => getValues("group_id") === id
    );
    if (selectedValue)
      return (
        <RHFAutoComplete
          defaultValue={selectedValue}
          name="group_id"
          label={translate("adminSubAdmin.subAdmin.group")} 
          options={options}
          getOptionLabel={(option) => option.name}
        />
      );
  }

  return null;
};

export default AdminGroups;
