import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import useAdminGroupsList from "src/components/ProductAutoComplete/hooks/useAdminGroupsList";
import useLocales from "src/hooks/useLocales";

const AdminGroups = () => {
  const { translate } = useLocales();
  const options = useAdminGroupsList();
  return (
    <RHFAutoComplete
      name="group_id"
      label={translate("adminSubAdmin.subAdmin.group")}
      options={options}
      getOptionLabel={(option) => option.name}
    />
  );
};

export default AdminGroups;
