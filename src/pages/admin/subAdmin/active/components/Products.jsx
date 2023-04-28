import { useFormContext } from "react-hook-form";
import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useLocales from "src/hooks/useLocales";

const Products = () => {
  const { translate } = useLocales();
  const options = useProductList();
  const { getValues } = useFormContext();
  if (options.length) {
    const chosenValues = getValues("product_ids");
    const selectedValues = options.filter(({ id }) =>
      chosenValues.includes(id)
    );
    if (selectedValues.length > 0) {
      return (
        <RHFAutoComplete
          limitTags={2}
          size="small"
          multiple
          defaultValue={selectedValues}
          name="product_ids"
          label={translate("adminSubAdmin.subAdmin.products")}
          options={options}
          getOptionLabel={(option) => option.name}
        />
      );
    }
  }
  return null;
};

export default Products;
