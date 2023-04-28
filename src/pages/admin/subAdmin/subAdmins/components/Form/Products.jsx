import RHFAutoComplete from "src/components/hook-form/RHFAutoComplete";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useLocales from "src/hooks/useLocales";

const Products = () => {
  const { translate } = useLocales();
  const productList = useProductList();

  return (
    <RHFAutoComplete
      multiple
      name="product_ids"
      label= {translate("adminSubAdmin.subAdmin.products")} 
      options={productList}
      getOptionLabel={(option) => option.name}
    />
  );
};

export default Products;
