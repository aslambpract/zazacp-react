import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack } from "@mui/material";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import Countries from "../../../../../components/countries";
import Mobile from "./components/Mobile";
import ProfilePicture from "./components/ProfilePicture";
import SocialMedia from "./components/SocialMedia";
import useUser from "./hooks/useUser";

const EditInfo = () => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useUser();

  const onBlur = ({ target: { value, name } }) =>
    methods.setValue(name, value.trim());

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <ProfilePicture />
            <SocialMedia />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <RHFTextField
                name="first_name"
                label={translate("userProfile.firstName")}
                onBlur={onBlur}
              />
              <RHFTextField
                name="last_name"
                label={translate("userProfile.lastName")}
                onBlur={onBlur}
              />

              <RHFSelect name="gender" label={translate("userProfile.genderS")}>
                <option value="" />
                <option value="male">{translate("userProfile.male")}</option>
                <option value="female">
                  {translate("userProfile.female")}
                </option>
                <option value="other">{translate("userProfile.other")}</option>
              </RHFSelect>
              <Countries />

              <RHFTextField
                name="state"
                label={translate("userProfile.stateRegion")}
              />
              <RHFTextField
                name="city"
                label={translate("userProfile.cityS")}
              />
              <RHFTextField
                name="zipcode"
                label={translate("userProfile.zip_Code")}
              />
              <RHFTextField
                name="address"
                label={translate("userProfile.address")}
              />
              <Mobile />

              <RHFTextField
                name="email"
                label={translate("userProfile.emailAddress")}
                disabled
              />
              <RHFTextField
                name="facebook"
                label={translate("userProfile.facebook")}
              />
              <RHFTextField
                name="twitter"
                label={translate("userProfile.twitter")}
              />
              <RHFTextField
                name="whatsapp"
                label={translate("userProfile.whatsapp")}
              />
              <RHFTextField
                name="instagram"
                label={translate("userProfile.instagram")}
              />
              <RHFTextField
                name="telegram"
                label={translate("userProfile.telegram")}
              />
              <RHFTextField
                name="medium"
                label={translate("userProfile.medium")}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={methods.formState.isSubmitting}
              >
                {translate("userProfile.saveChanges")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default EditInfo;
