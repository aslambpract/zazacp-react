import { LoadingButton } from "@mui/lab";
import DatePicker from "@mui/lab/DatePicker";
import { Autocomplete, Box, Button, FormGroup, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import { useEffect, useState } from "react";
import { RHFCheckbox, RHFSelect, RHFTextField } from "src/components/hook-form";
import useProductList from "src/components/ProductAutoComplete/hooks/useProductList";
import useUsersList from "src/components/UsersAutoComplete/hooks/useUsersList";
import axiosInstance from "src/utils/axios";
import { addProductFormDefaultValues } from "./hooks/useAddProductForm";
import Validity from "./validity";
import useLocales from "src/hooks/useLocales";

const useSubScriptionCategories = (open) => {

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await axiosInstance.get(
          "api/admin/product-subscription-category-names"
        );

        if (status === 200) {
          setCategoryList(
            data.data.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (open) fetchData();
  }, [open]);

  return categoryList;
};

const FormContent = ({ isCombo, onClose }) => {
  const { translate } = useLocales();
  const userList = useUsersList();
  const productList = useProductList(isCombo);
  const categoryList = useSubScriptionCategories(true);

  const {
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useFormContext();

  useEffect(() => {
    reset(addProductFormDefaultValues);
    return () => reset(addProductFormDefaultValues);
  }, []);
  return (
    <>
      <DialogContent>
        <DialogContentText>
          <Box
            sx={{
              display: "grid",
              rowGap: 3,
              columnGap: 2,
              marginTop: 3,
              gridTemplateColumns:{
                xs:"repeat(1, 1fr)",
                sm:"repeat(2, 1fr)",
              } 
            }}
          >
            <Controller
              render={({ field: { ref, onChange, ...rest } }) => (
                <Autocomplete
                  onChange={(_, value) => onChange(value.id)}
                  options={productList}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      label={translate("adminStore.assignSubscriptions.productss")}
                      {...params}
                      {...rest}
                      inputRef={ref}
                      error={Boolean(errors.product_id)}
                      helperText={errors.product_id?.message}
                    />
                  )}
                />
              )}
              control={control}
              name="product_id"
              defaultValue={null}
            />

            <Controller
              render={({ field: { ref, onChange, ...rest } }) => (
                <Autocomplete
                  onChange={(_, value) => onChange(value.user_id)}
                  options={userList}
                  getOptionLabel={(option) => option.username}
                  renderInput={(params) => (
                    <TextField
                      label={translate("adminStore.assignSubscriptions.user")}
                      {...params}
                      {...rest}
                      inputRef={ref}
                      error={Boolean(errors.user_id)}
                      helperText={errors.user_id?.message}
                    />
                  )}
                />
              )}
              control={control}
              name="user_id"
              defaultValue={null}
            />

            <RHFSelect name="category_id" label={translate("adminStore.assignSubscriptions.categories")}>
              <option value="" />
              {categoryList}
            </RHFSelect>

            <Controller
              name="date"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  disablePast
                  label={translate("adminStore.assignSubscriptions.certifiedDate")}
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />
              )}
            />
            <RHFTextField
              name="note"
              label={translate("adminStore.assignSubscriptions.note")}
              multiline
              fullWidth
              rows={3}
            />
          </Box>
          <Validity />
          <Box style={{ marginTop: 5 }}>
            <FormGroup>
              <RHFCheckbox
                name="is_with_commissions"
                label={translate("adminStore.assignSubscriptions.giveProduct")}
              />

              <RHFCheckbox
                name="is_with_materials"
                label={translate("adminStore.assignSubscriptions.giveProductMaterials")}
              />
            </FormGroup>
          </Box>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {translate("adminStore.assignSubscriptions.add")}
        </LoadingButton>

        <Button onClick={onClose} autoFocus color="error">
          {translate("adminStore.assignSubscriptions.cancel")}
        </Button>
      </DialogActions>
    </>
  );
};

export default FormContent;
