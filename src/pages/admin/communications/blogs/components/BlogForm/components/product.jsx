import { useFormContext } from "react-hook-form";
import { RHFSelect } from "src/components/hook-form";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";

const Product = () => {
  const products = useProductList();
  const { watch } = useFormContext();
  const isShrink = Boolean(watch("product_id"));

  return (
    <RHFSelect
      InputLabelProps={{
        shrink: isShrink,
      }}
      name="product_id"
      label="Product"
    >
      <option value="" />
      {products.map((item) => (
        <option value={item.id}>{item.name}</option>
      ))}
    </RHFSelect>
  );
};

export default Product;
