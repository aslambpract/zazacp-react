import { LoadingButton } from "@mui/lab";
import { Card, FormControl, FormGroup, Stack, Typography } from "@mui/material";
import { FormProvider, RHFSwitch } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import { isBinary } from "src/utils/isBinary";
import useUpdateProfileNotification from "./EditInfo/hooks/useUpdateProfileNotification";

const ProfileNotificationSettings = () => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useUpdateProfileNotification();
  const {
    formState: { isSubmitting },
  } = methods;

  return (
    <div>
      <Card sx={{ p: 3, mt: 1 }}>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
            {translate("profile.twoStep")}
          </Typography>
          <RHFSwitch
            name="twofa"
            label={translate("profile.twoStepAuthentication")}
          />
          <Stack spacing={3} alignItems="flex-end">
            <Stack spacing={2} sx={{ width: 1 }}>
              <Typography
                variant="subtitle2"
                color="text.primary"
                mt={2}
                mb={2}
              >
                {translate("profile.emailNotificationSettings")}
              </Typography>

              <Stack spacing={1}>
                <FormControl component="fieldset" variant="standard">
                  <FormGroup>
                    <RHFSwitch name="1" label="Material Add" />
                    {isBinary() && (
                      <RHFSwitch
                        name="2"
                        label={translate("profile.productBusiness")}
                      />
                    )}

                    <RHFSwitch name="3" label={translate("profile.blog")} />
                    <RHFSwitch
                      name="4"
                      label={translate("profile.rankAchieved")}
                    />
                    <RHFSwitch
                      name="5"
                      label={translate("profile.paymentCompleted")}
                    />
                    {isBinary() && (
                      <RHFSwitch
                        name="6"
                        label="New user added to the binary network"
                      />
                    )}
                    <RHFSwitch
                      name="7"
                      label={translate("profile.accountUpdate")}
                    />
                    <RHFSwitch
                      name="8"
                      label={translate("profile.friendRegisterMail")}
                    />
                    <RHFSwitch
                      name="9"
                      label={translate("profile.telegramInstructionMails")}
                    />
                    <RHFSwitch
                      name="10"
                      label={translate("profile.mailsFromAdmin")}
                    />
                  </FormGroup>
                </FormControl>
              </Stack>
            </Stack>

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {translate("profile.saveChanges")}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
    </div>
  );
};

export default ProfileNotificationSettings;
