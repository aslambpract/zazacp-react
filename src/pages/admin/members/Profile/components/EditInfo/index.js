import { LoadingButton } from "@mui/lab";
import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useCallback } from "react";
import { useParams } from "react-router";
import Countries from "src/components/countries";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
} from "src/components/hook-form";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import SocialMedia from "src/sections/user/profile/EditInfo/components/SocialMedia";
import axiosInstance from "src/utils/axios";
import { fData } from "src/utils/formatNumber";
import { useMemberProfileContext } from "../..";
import useProfileEditForm from "./hooks/useProfileEditForm";

const genReqData = (inputData) => {
  const { social, ...rest } = inputData;
  const reqData = new FormData();
  Object.entries(rest).forEach(([key, value]) => reqData.append(key, value));
  Object.entries(social).forEach(([key, value]) =>
    reqData.append(key, value ? 1 : 0)
  );
  reqData.append("_method", "PUT");

  return reqData;
};

export default function EditInfo() {
  const { translate } = useLocales();
  const { memberProfile, dispatch, fetchMemberProfile } =
    useMemberProfileContext();

  const { enqueueSnackbar } = useSnackbar();
  const { mid } = useParams();
  const handleErrors = useErrors();
  const methods = useProfileEditForm();

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (inputData) => {
    try {
      const { status, data: responseData } = await axiosInstance.post(
        `api/user-profile-update/${mid}`,
        genReqData(inputData)
      );

      if (status === 200) {
        fetchMemberProfile();
        enqueueSnackbar(responseData.message);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("profile_image", file);
    formData.append("_method", "PUT");

    try {
      const { status, data } = await axiosInstance({
        method: "post",
        url: `/api/admin-change-profile-image/${mid}`,
        data: formData,
      });

      if (status === 200) {
        enqueueSnackbar(data.message);
        dispatch({ type: "UPDATE_PROFILE_IMAGE", payload: data.data });
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        uploadImage(file);
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <RHFUploadAvatar
                name="avatarUrl"
                fileUrl={
                  memberProfile.user_profile?.user_profile?.profile_image
                }
                accept="image/png, image/jpg, image/jpeg, image/gif"
                maxSize={114578}
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
                    {translate("profile.allowed")} *.jpeg, *.jpg, *.png, *.gif
                    <br /> {translate("profile.maxSize")} {fData(200000)}
                  </Typography>
                }
              />
            </Box>
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
              />
              <RHFTextField
                name="last_name"
                label={translate("profile.lastName")}
              />
              <RHFSelect name="gender" label={translate("profile.ggender")}>
                <option value="" />
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </RHFSelect>
              <Countries />

              <RHFTextField
                name="state"
                label={translate("profile.stateRegion")}
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
              <RHFTextField
                name="mobile"
                label={translate("profile.phoneNumbers")}
              />
              <RHFTextField
                name="email"
                label={translate("profile.emailAddress")}
                disabled
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
                loading={isSubmitting}
              >
                {translate("profile.saveChanges")}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
