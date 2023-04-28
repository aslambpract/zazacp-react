import { LoadingButton } from "@mui/lab";
import { Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form"; // form

import { RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";

const DetailsForm = () => {
  const { translate } = useLocales();

  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <>
      <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
       {translate("adminSettings.brand.companyDetails")} 
      </Typography>

      <Stack spacing={3} alignItems="flex-end">
        <RHFTextField name="name" type="text" label={translate("adminSettings.brand.companyName")} />
        <RHFTextField name="address" type="text" label={translate("adminSettings.brand.companyAddress")} />
        <RHFTextField
          fullWidth
          placeHolder="johndoe@gmail.com"
          name="email"
          type="text"
          label={translate("adminSettings.brand.email")}
          InputLabelProps={{ shrink: true }}
        />
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {translate("adminSettings.brand.save")}
        </LoadingButton>
      </Stack>
    </>
  );
};
export default DetailsForm;
