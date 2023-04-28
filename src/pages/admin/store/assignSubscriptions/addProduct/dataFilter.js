import { useSnackbar } from "notistack";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import DatePicker from "@mui/lab/DatePicker";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// components

import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "../../../../../components/hook-form";

// hooks
import useLocales from "src/hooks/useLocales";
import useSettings from "../../../../../hooks/useSettings";

const DataFilter = () => {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();

  const { enqueueSnackbar } = useSnackbar();

  const DataFilter = Yup.object().shape({
    // start_date: Yup.string().required("Pick Start Date is required"),
    // end_date: Yup.string().required("Pick End Date is required"),
    // username: Yup.string().required("User Name is required"),
  });

  const defaultValues = {
    start_date: "",
    end_date: "",
    username: "",
  };

  const methods = useForm({
    resolver: yupResolver(DataFilter),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar("Update success!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Grid item xs={12} md={12}>
        <Typography sx={{ p: 1, mb: 1 }} variant="subtitle2">
          {translate("adminStore.assignSubscriptions.assignedBusinessBuilder")}
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: "repeat(5, 1fr)",
            }}
          >
            <Controller
              name="start_date"
              size="small"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label={translate(
                    "adminStore.assignSubscriptions.pickStartDate"
                  )}
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      size="small"
                    />
                  )}
                />
              )}
            />
            <Controller
              name="end_date"
              size="small"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label={translate(
                    "adminStore.assignSubscriptions.pickEndDate"
                  )}
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!error}
                      helperText={error?.message}
                      size="small"
                    />
                  )}
                />
              )}
            />
            <RHFTextField
              name="username"
              label={translate("adminStore.assignSubscriptions.userName")}
              size="small"
            />

            <Stack alignItems="flex-start" sx={{ justifyContent: "center" }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {translate("adminStore.assignSubscriptions.getReport")}
              </LoadingButton>
            </Stack>
          </Box>
        </FormProvider>
      </Grid>
    </div>
  );
};

export default DataFilter;
