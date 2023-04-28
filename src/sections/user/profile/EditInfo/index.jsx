import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack } from "@mui/material";
import Countries from "src/components/countries";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
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
                label={translate("profile.firstName")}
                onBlur={onBlur}
              />
              <RHFTextField
                name="last_name"
                label={translate("profile.lastName")}
                onBlur={onBlur}
              />

              <RHFSelect name="gender" label={translate("profile.ggender")}>
                <option value="">--Choose Gender--</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </RHFSelect>
              <Countries />

              <RHFTextField
                name="state"
                label={translate("profile.state_Region")}
              />
              <RHFTextField name="city" label={translate("profile.citys")} />
              <RHFTextField
                name="zipcode"
                label={translate("profile.zipCodes")}
              />
              <RHFTextField
                name="address"
                label={translate("profile.address")}
              />
              <Mobile />

              <RHFTextField
                name="email"
                label={translate("profile.emailAddress")}
                disabled
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <RHFTextField name="facebook" label="Facebook" />
              <RHFTextField name="twitter" label="Twitter" />
              <RHFTextField name="whatsapp" label="WhatsApp" />
              <RHFTextField name="instagram" label="Instagram" />
              <RHFTextField name="telegram" label="Telegram" />
              <RHFTextField name="medium" label={translate("profile.medium")} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={methods.formState.isSubmitting}
              >
                {translate("profile.saveChanges")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default EditInfo;
