import { Autocomplete, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useLocales from "src/hooks/useLocales";


const ProductAutoComplete = ({ name }) => {
  const { translate } = useLocales();
  const { control, getValues, setValue } = useFormContext();
  const productList = useProductList();
  const productId = getValues(name);
  const list = productList.filter(({ id }) => productId.includes(id));
  if (list.length)
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, onChange, ...field } }) => (
          <Autocomplete
            multiple
            options={productList}
            getOptionLabel={({ name }) => name}
            onChange={(_, v) => {
              setValue(
                "product_ids",
                v.map(({ id }) => id)
              );
            }}
            defaultValue={list}
            renderInput={(params) => (
              <TextField
                {...params}
                {...field}
                fullWidth
                inputRef={ref}
                label={translate("adminStore.coupons.products")}
              />
            )}
          />
        )}
      />
    );
  return null;
};

ProductAutoComplete.propTypes = {
  name: PropTypes.string.isRequired,
};
export default ProductAutoComplete;
