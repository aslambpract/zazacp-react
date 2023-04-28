import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";

import { PATH_AUTH } from "src/routes/paths";

import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import useAuth from "src/hooks/useAuth";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import { AuthWraper } from "../ResetPassword";

const useIncomingValues = () => {
  const [searchParam, _] = useSearchParams();
  return { token: searchParam.get("token"), email: searchParam.get("email") };
};

const NewPassword = () => {
  const { token, email } = useIncomingValues();
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const newPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    repassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    ),
  });

  const defaultValues = {
    email,
    token,
    password: "",
    repassword: "",
  };

  const methods = useForm({
    resolver: yupResolver(newPasswordSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { isSubmitting, ...rest },
  } = methods;
  const onSubmit = async (data) => {
    try {
      const isSuccess = await resetPassword(data);
      if (isSuccess) {
        navigate("/auth/password-reset/success", { replace: true });
        reset();
      }
      // enqueueSnackbar("Password Changed success Welcome !!!");
    } catch (error) {
      console.error(error);

      reset();
      if (isMountedRef.current) {
        // setError('afterSubmit', { ...error, message: error.message });
        setError("afterSubmit", {
          ...error,
          message: Object.values(error).toString(),
        });
      }
    }
  };
  return (
    <>
      <AuthWraper>
        <Typography variant="h3" paragraph>
          Your New password
        </Typography>
        <Typography sx={{ color: "text.secondary", mb: 5 }}>
          Please enter your new password !!!
        </Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <RHFTextField name="email" label="Email address" />
            <RHFTextField
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <Iconify
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="repassword"
              label="Re Enter Password"
              type={showRePassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={() => setShowRePassword(!showRePassword)}
                    >
                      <Iconify
                        icon={
                          showRePassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
          </Stack>
        </FormProvider>

        <Button
          fullWidth
          size="large"
          sx={{ mt: 1 }}
          component={RouterLink}
          to={PATH_AUTH.login}
        >
          Back to Login
        </Button>
      </AuthWraper>
    </>
  );
};

export default NewPassword;
