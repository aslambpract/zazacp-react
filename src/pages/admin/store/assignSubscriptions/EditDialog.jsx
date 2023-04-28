import { LoadingButton } from "@mui/lab";
import DatePicker from "@mui/lab/DatePicker";
import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Controller } from "react-hook-form";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import useLocales from "src/hooks/useLocales";

import { useSnackbar } from "notistack";
import { useEffect } from "react";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import axiosInstance from "src/utils/axios";
import useSubScriptionCategories from "./addProduct/hooks/useSubscriptionCategories";
import useGetSubscriptionById from "./hooks/useGetSubscriptionById";

const EditDialog = ({ open, selectedId, onClose, fetchData }) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { methods, fetchSubScriptionById } = useGetSubscriptionById();
  const { enqueueSnackbar } = useSnackbar();
  const categoryList = useSubScriptionCategories(open);

  useEffect(() => {
    if (open) fetchSubScriptionById(selectedId);
  }, [open]);

  const {
    watch,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;
  const [certifiedDate, effectiveUntil] = watch(["date", "effective_until"]);
  const onSubmit = async (inputData) => {
    const formData = new FormData();
    const { date, effective_until, ...rest } = inputData;

    Object.entries(rest).forEach(([key, value]) => formData.append(key, value));
    formData.append("_method", "PUT");
    formData.append("date", new Date(date).toLocaleDateString("en-GB"));
    formData.append(
      "effective_until",
      new Date(effective_until).toLocaleDateString("en-GB")
    );
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/product-subscriptions/${selectedId}`,
        formData
      );
      if (status === 200) {
        fetchData();
        onClose();
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      Object.values(err).flatMap((item) =>
        enqueueSnackbar(item, { variant: "error" })
      );
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="edit-products"
    >
      <DialogTitle id="edit-products">{translate("adminStore.assignSubscriptions.editSubscription")}</DialogTitle>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                marginTop: 3,
                gridTemplateColumns: "repeat(1, 1fr)",
              }}
            >
              <RHFTextField
                name="note"
                label={translate("adminStore.assignSubscriptions.note")}
                multiline
                fullWidth
                rows={3}
              />
              <RHFSelect name="category_id" label={translate("adminStore.assignSubscriptions.category")}>
                <option value="" />
                {categoryList}
              </RHFSelect>

              <Controller
                name="date"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label={translate("adminStore.assignSubscriptions.certifiedDate")}
                    inputFormat="dd/MM/yyyy"
                    maxDate={new Date(effectiveUntil)}
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
                      />
                    )}
                  />
                )}
              />
              <Controller
                name="effective_until"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DatePicker
                    label={translate("adminStore.assignSubscriptions.effectiveUntil")}
                    disablePast
                    minDate={new Date(certifiedDate)}
                    inputFormat="dd/MM/yyyy"
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
                      />
                    )}
                  />
                )}
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
           {translate("adminStore.assignSubscriptions.update")} 
          </LoadingButton>

          <Button onClick={onClose} autoFocus color="error">
            {translate("adminStore.assignSubscriptions.close")}
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default EditDialog;
