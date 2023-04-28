import { Autocomplete, Chip, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import useAdminGroupsList from "./hooks/useAdminGroupsList";
import useDepartmentList from "./hooks/useDepartmentList";
import useProductList from "./hooks/useProductList";
import useLocales from "src/hooks/useLocales";


const ProductAutoComplete = ({ onChange }) => {
  const { translate } = useLocales();
  const productList = useProductList();
  const productId = useFormContext().getValues("product_id");

  const value = productList.find((v) => v.id === productId);
  if (value)
    return (
      <Autocomplete
        onChange={onChange}
        options={productList}
        value={value}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField label={translate("adminStore.coupons.products")} {...params} />}
      />
    );
  return null;
};

export const MultipleProductAutoComplete = ({ onChange, ...rest }) => {
  const { translate } = useLocales();
  const productList = useProductList();

  return (
    <Autocomplete
      multiple
      onChange={onChange}
      options={productList}
      getOptionLabel={(option) => option.name}
      renderProducts={(value, getProductsProps) =>
        value.map((option, index) => (
          <Chip
            {...getProductsProps({ index })}
            key={option}
            size="small"
            label={option}
          />
        ))
      }
      renderInput={(params) => (
        <TextField label={translate("adminStore.coupons.products")} {...params} {...rest} />
      )}
    />
  );
};

export const MultipleDepartmentAutoComplete = ({ onChange }) => {
  const departmentList = useDepartmentList();
  return (
    <Autocomplete
      multiple
      onChange={onChange}
      options={departmentList}
      getOptionLabel={(option) => option.name}
      renderProducts={(value, getProductsProps) =>
        value.map((option, index) => (
          <Chip
            {...getProductsProps({ index })}
            key={option}
            size="small"
            label={option}
          />
        ))
      }
      renderInput={(params) => <TextField label="Departments" {...params} />}
    />
  );
};

export const AdminGroupListAutoComplete = ({ onChange }) => {
  const adminGroupList = useAdminGroupsList();
  const { getValues } = useFormContext();

  if (adminGroupList.length) {
    const selected = adminGroupList.find(
      ({ id }) => getValues("group_id") === id
    );
    return (
      <Autocomplete
        defaultValue={selected}
        onChange={onChange}
        options={adminGroupList}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField label="Group" {...params} />}
      />
    );
  }

  return null;
};

export default ProductAutoComplete;
