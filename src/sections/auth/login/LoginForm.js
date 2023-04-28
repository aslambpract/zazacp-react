import { LoadingButton } from "@mui/lab";
import { Box, Link, Stack } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from "src/components/hook-form";
import Password from "src/components/Password";
import { PATH_AUTH } from "src/routes/paths";

import AuthHelper from "./components/authHelper";
import ErrorBanner from "./components/errorBanner";
import useLogin from "./hooks/useLogin";

const LoginForm = () => {
  const { methods, onSubmit } = useLogin();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mb: 3 }}>
        <AuthHelper />
        <ErrorBanner />
      </Stack>

      <Box>
        <Stack spacing={2}>
          <RHFTextField name="email" label="Email address" />
          <Password name="password" label="Password" />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          <RHFCheckbox name="remember" label="Remember me" />
          <Link
            component={RouterLink}
            variant="subtitle2"
            to={PATH_AUTH.resetPassword}
          >
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
