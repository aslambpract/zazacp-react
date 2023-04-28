import { useFormContext } from "react-hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import useDepartmentList from "src/components/ProductAutoComplete/hooks/useDepartmentList";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useLocales from "src/hooks/useLocales";

const Products = () => {
  const { translate } = useLocales();
  const options = useDepartmentList();
  const { getValues } = useFormContext();
  if (options.length) {
    const chosenValues = getValues("department_ids");
    const selectedValues = options.filter(({ id }) =>
      chosenValues.includes(id)
    );
    if (selectedValues.length > 0) {
      return (
        <RHFAutoComplete
          size="small"
          limitTags={2}
          multiple
          defaultValue={selectedValues}
          name="department_ids"
          label={translate("adminSubAdmin.subAdmin.departments")}
          options={options}
          getOptionLabel={(option) => option.name}
        />
      );
    }
  }
  return null;
};

export default Products;
