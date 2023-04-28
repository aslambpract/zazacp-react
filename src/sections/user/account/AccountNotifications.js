import { useSnackbar } from "notistack";
// form
import { useForm } from "react-hook-form";
// @mui
import { LoadingButton } from "@mui/lab";
import { Card, Stack, Typography } from "@mui/material";
// components
import useLocales from "src/hooks/useLocales";
import i18n from "src/locales/i18n";
import { FormProvider, RHFSwitch } from "../../../components/hook-form";

// ----------------------------------------------------------------------

const NOTIFICATION_SETTINGS = {
  activityComments: true,
  activityAnswers: true,
  activityFollows: false,
  applicationNews: true,
  applicationProduct: false,
  applicationBlog: false,
};

// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const { translate } = useLocales();
  const ACTIVITY_OPTIONS = [
    {
      value: "activityComments",
      label: i18n.t("headerSettings.emailMe1"),
    },
    {
      value: "activityAnswers",
      label: i18n.t("headerSettings.emailMe2"),
    },
    { value: "activityFollows", label: i18n.t("headerSettings.emailMe3") },
  ];

  const APPLICATION_OPTIONS = [
    {
      value: "applicationNews",
      label: i18n.t("headerSettings.newsAndAnnouncements"),
    },
    {
      value: "applicationProduct",
      label: i18n.t("headerSettings.weeklyProduct"),
    },
    { value: "applicationBlog", label: i18n.t("headerSettings.weeklyBlog") },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    activityComments: NOTIFICATION_SETTINGS.activityComments,
    activityAnswers: NOTIFICATION_SETTINGS.activityAnswers,
    activityFollows: NOTIFICATION_SETTINGS.activityFollows,
    applicationNews: NOTIFICATION_SETTINGS.applicationNews,
    applicationProduct: NOTIFICATION_SETTINGS.applicationProduct,
    applicationBlog: NOTIFICATION_SETTINGS.applicationBlog,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
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

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              {translate("headerSettings.activity")}
            </Typography>

            <Stack spacing={1}>
              {ACTIVITY_OPTIONS.map((activity) => (
                <RHFSwitch
                  key={activity.value}
                  name={activity.value}
                  label={activity.label}
                  sx={{ m: 0 }}
                />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={2} sx={{ width: 1 }}>
            <Typography variant="overline" sx={{ color: "text.secondary" }}>
              {translate("headerSettings.application")}
            </Typography>
            <Stack spacing={1}>
              {APPLICATION_OPTIONS.map((application) => (
                <RHFSwitch
                  key={application.value}
                  name={application.value}
                  label={application.label}
                  sx={{ m: 0 }}
                />
              ))}
            </Stack>
          </Stack>

          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {translate("headerSettings.saveChanges")}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
