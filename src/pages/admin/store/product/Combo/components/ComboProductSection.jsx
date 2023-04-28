import { Autocomplete, Button, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Iconify from "src/components/Iconify";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useLocales from "src/hooks/useLocales";

const ComboProductSection = ({ removeClick, value }) => {
  const { translate } = useLocales();
  const productList = useProductList();
  const { setValue, getValues } = useFormContext();
  const options = productList?.filter(
    ({ id }) => !getValues("product_ids").includes(id)
  );
  return (
    <div>
      <Autocomplete
        onChange={(_, item) =>
          setValue("product_ids", [...getValues("product_ids"), item.id])
        }
        options={options}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            label={translate("adminStore.products.products")}
            {...params}
          />
        )}
      />

      <Button
        variant="text"
        startIcon={<Iconify icon={"gala:remove"} />}
        value="remove"
        onClick={removeClick}
        type="button"
        size="small"
        color="error"
        style={{ float: "right", marginTop: 10, marginBottom: 10 }}
      >
        {translate("adminStore.products.remove")}
      </Button>
    </div>
  );
};

export default ComboProductSection;
