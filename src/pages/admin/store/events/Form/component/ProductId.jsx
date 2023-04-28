import { Autocomplete, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useLocales from "src/hooks/useLocales";


const ProductId = ({ name = "product_id" }) => {
  const { translate } = useLocales();
  const productList = useProductList();
  const { control, setValue, watch } = useFormContext();
  const productId = watch(name);
  const selected = productList.find(({ id }) => productId === id);

  const { eid } = useParams();
  if (eid)
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, onChange, ...field } }) => {
          if (selected)
            return (
              <Autocomplete
                options={productList}
                getOptionLabel={({ name }) => name}
                onChange={(_, v) => {
                  setValue(
                    name,
                    v.map(({ id }) => id)
                  );
                }}
                defaultValue={selected}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    fullWidth
                    inputRef={ref}
                    label={translate("adminStore.events.products")}
                  />
                )}
              />
            );
          return null;
        }}
      />
    );
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, ...field } }) => (
        <Autocomplete
          options={productList}
          getOptionLabel={({ name }) => name}
          onChange={(_, v) => {
            setValue(name, v.id);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              fullWidth
              inputRef={ref}
              label={translate("adminStore.events.products")}
            />
          )}
        />
      )}
    />
  );
};

export default ProductId;
