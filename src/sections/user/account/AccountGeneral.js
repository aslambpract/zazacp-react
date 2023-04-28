import { useSnackbar } from "notistack";
import { useCallback } from "react";
import * as Yup from "yup";
// form
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
// hooks
import useAuth from "../../../hooks/useAuth";
// utils
import { fData } from "../../../utils/formatNumber";
// _mock
import { countries } from "../../../../_mock";
// components
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from "../../../components/hook-form";

// ----------------------------------------------------------------------
import useLocales from "src/hooks/useLocales";

export default function AccountGeneral() {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required("Name is required"),
  });

  const defaultValues = {
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    phoneNumber: user?.phoneNumber || "",
    country: user?.country || "",
    address: user?.address || "",
    state: user?.state || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    about: user?.about || "",
    isPublic: user?.isPublic || false,
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar("Update success!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "photoURL",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  {translate("headerSettings.allowed")} *.jpeg, *.jpg, *.png,
                  *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />

            <RHFSwitch
              name="isPublic"
              labelPlacement="start"
              label={translate("headerSettings.publicProfile")}
              sx={{ mt: 5 }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField
                name="displayName"
                label={translate("headerSettings.name")}
              />
              <RHFTextField
                name="email"
                label={translate("headerSettings.emailAddress")}
              />

              <RHFTextField
                name="phoneNumber"
                label={translate("headerSettings.phoneNumber")}
              />
              <RHFTextField
                name="address"
                label={translate("headerSettings.address")}
              />

              <RHFSelect
                name="country"
                label={translate("headerSettings.country")}
                placeholder={translate("headerSettings.country")}
              >
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>

              <RHFTextField
                name="state"
                label={translate("headerSettings.stateRegion")}
              />

              <RHFTextField
                name="city"
                label={translate("headerSettings.city")}
              />
              <RHFTextField
                name="zipCode"
                label={translate("headerSettings.zipCode")}
              />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <RHFTextField
                name="about"
                multiline
                rows={4}
                label={translate("headerSettings.about")}
              />

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {translate("headerSettings.saveChanges")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
