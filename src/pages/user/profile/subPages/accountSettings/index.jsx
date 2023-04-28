import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { LoadingButton } from "@mui/lab";
import {
  Card,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CoinAddress from "src/components/coinAddress";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useErrors from "src/hooks/useErrors";
import useLocales from "src/hooks/useLocales";
import { ProfileNotificationSettings } from "src/sections/user/profile";
import axiosInstance from "src/utils/axios";

const ProfileAccountSettings = () => {
  const { translate } = useLocales();
  const handleErrors = useErrors();

  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const ChangePassWordSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const defaultValues = {
    password: "",
    confirmNewPassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (reqdata) => {
    let data = new FormData();
    data.append("password", reqdata.password);
    data.append("_method", "PUT");
    try {
      const { status, data: responseData } = await axiosInstance({
        method: "post",
        url: "/api/profile-password",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (status === 200) {
        reset();
        enqueueSnackbar(responseData.message);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
          {translate("userProfile.accountSettings")}
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} alignItems="flex-end">
            <RHFTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="password"
              type={showPassword ? "text" : "password"}
              label={translate("userProfile.newPassword")}
            />
            <RHFTextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowChangePassword(!showChangePassword)}
                      aria-label="toggle password visibility"
                      edge="end"
                    >
                      {showChangePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              name="confirmNewPassword"
              type={showChangePassword ? "text" : "password"}
              label={translate("userProfile.confirmNewPassword")}
            />
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              {translate("userProfile.saveChanges")}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Card>
      <CoinAddress />
      {/* <ProfilePayoutInfo /> */}
      {/* <ProfileEnable /> */}
      <ProfileNotificationSettings />
    </div>
  );
};

export default ProfileAccountSettings;
