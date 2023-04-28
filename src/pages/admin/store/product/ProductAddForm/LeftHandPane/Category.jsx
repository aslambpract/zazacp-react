import { RHFSelect } from "src/components/hook-form";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import { trim } from "../../../productCategories/Components/ProductCategory";
import useProductCategory from "../useProductCategory";

const Category = () => {
  const { translate } = useLocales();
  const data = useProductCategory();
  return (
    <RHFSelect
      InputLabelProps={{
        shrink: true,
      }}
      name="product_category_id"
      label={translate("adminStore.products.productCategory")}
    >
      <option
        value=""
        style={{
          color: "grey",
        }}
      >
        --Choose Product Category--
      </option>
      <Map
        list={data}
        render={(item) => <option value={item.id}>{trim(item.name)}</option>}
      />
    </RHFSelect>
  );
};

export default Category;
