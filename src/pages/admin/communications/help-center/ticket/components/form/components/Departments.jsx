import { RHFSelect } from "src/components/hook-form";
import useDepartmentOptions from "../hooks/useDepartmentOptions";
import useLocales from "src/hooks/useLocales";

const Departments = () => {
  const { translate } = useLocales();
  const options = useDepartmentOptions();
  return (
    <RHFSelect name="department_id" label={translate("adminCommunication.helpCenter.department")}>
      <option value="" />
      {options}
    </RHFSelect>
  );
};

export default Departments;
