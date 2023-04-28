import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import useDepartmentList from "src/components/ProductAutoComplete/hooks/useDepartmentList";
import useLocales from "src/hooks/useLocales";

const Departments = () => {
  const { translate } = useLocales();
  const options = useDepartmentList();
  
  return (
    <RHFAutoComplete
      multiple
      name="department_ids"
      label= {translate("adminSubAdmin.subAdmin.departments")} 
      options={options}
      getOptionLabel={(option) => option.name}
    />
  );
};

export default Departments;
