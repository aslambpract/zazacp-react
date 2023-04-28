import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useLocales from "src/hooks/useLocales";


const ChooseProducts = () => {
  const { translate } = useLocales();
  const productList = useProductList();
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id);

      const selected = productList.filter(({ id }) => id === parsedId);

      setValue("product_list", selected);
    }
  }, [id, productList]);
  const selected = watch("product_list");
  if (id) {
    if (selected.length)
      return (
        <Controller
          control={control}
          name="product_list"
          render={({ field: { ref, onChange, ...field } }) => (
            <Autocomplete
              options={productList}
              disabled
              getOptionLabel={({ name }) => name}
              onChange={(_, v) => {
                console.log(v);
                setValue(
                  "product_list",
                  v.map(({ id }) => id)
                );
              }}
              defaultValue={selected[0]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  {...field}
                  fullWidth
                  inputRef={ref}
                  label={translate("adminStore.material.products") }
                />
              )}
            />
          )}
        />
      );
    return null;
  }
  return (
    <Controller
      control={control}
      name="product_list"
      render={({ field }) => (
        <Autocomplete
          {...field}
          multiple
          onChange={(_, newValue) => {
            field.onChange(newValue);
          }}
          options={productList}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              label={translate("adminStore.material.chooseProducts") }
              {...params}
              error={Boolean(errors.product_list)}
              helperText={errors.product_list?.message}
            />
          )}
        />
      )}
    />
  );
};

export default ChooseProducts;
