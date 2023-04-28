import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import Iconify from "src/components/Iconify";
import useAuth from "src/hooks/useAuth";
import useIsMountedRef from "src/hooks/useIsMountedRef";
import * as Yup from "yup";

export default function RegisterForm() {
  const { register } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { uname } = useParams();
  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    username: Yup.string().required("User Name is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    repassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    ),
  });

  const defaultValues = {
    email: "",
    username: "",
    password: "",
    repassword: "",
    referral: "nimz1",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await register(data.email, data.username, data.password, data.referral);
      enqueueSnackbar("registered success Welcome !!!");
    } catch (error) {
      Object.entries(error.errors).forEach(([k, v]) =>
        setError(k, { message: v[0] })
      );

      setError("afterSubmit", {
        message: error.message.toString(),
      });
    }
  };

  useMemo(() => {
    if (uname) {
      methods.setValue("referral", JSON.parse(atob(uname)).username);
    }
  }, [uname]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && (
          <Alert severity="error">{errors.afterSubmit.message}</Alert>
        )}

        <RHFTextField name="email" label="Email address" />
        <RHFTextField name="username" label="User Name" />
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
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
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
                    icon={showRePassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="referral"
          label="Referral ID"
          disabled={Boolean(uname)}
        />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "text.secondary", mt: 0 }}
          >
            {/* <RHFCheckbox name="agree" label="I agree to Bpract MLM" /> */}
            <Link underline="always" color="text.primary" href="#">
              Terms of Service
            </Link>
            &nbsp; & &nbsp;
            <Link underline="always" color="text.primary" href="#">
              Privacy Policy
            </Link>
          </Typography>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
