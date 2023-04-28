import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { SentIcon } from "src/assets";
import Page from "src/components/Page";
import LogoOnlyLayout from "src/layouts/LogoOnlyLayout";
import { PATH_AUTH } from "src/routes/paths";
import { ResetPasswordForm } from "src/sections/auth/reset-password";
import axiosInstance from "src/utils/axios";

const RootStyle = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const SendEmailSection = ({ onSent }) => {
  return (
    <>
      <Typography variant="h3" paragraph>
        Forgot your password?
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 5 }}>
        Please enter the email address associated with your account and We will
        email you a link to reset your password.
      </Typography>

      <ResetPasswordForm onSent={onSent} />

      <Button
        fullWidth
        size="large"
        component={RouterLink}
        to={PATH_AUTH.login}
        sx={{ mt: 1 }}
      >
        Back
      </Button>
    </>
  );
};

const AfterSend = ({ mail }) => (
  <Box sx={{ textAlign: "center" }}>
    <SentIcon sx={{ mb: 5, mx: "auto", height: 160 }} />

    <Typography variant="h3" gutterBottom>
      Request sent successfully
    </Typography>
    <Typography>
      We have sent a confirmation email to &nbsp;
      <strong>{mail}</strong>
      <br />
      Please check your email.
    </Typography>

    <Button
      size="large"
      variant="contained"
      component={RouterLink}
      to={PATH_AUTH.login}
      sx={{ mt: 5 }}
    >
      Back
    </Button>
  </Box>
);

export default function ResetPassword() {
  const [sent, setSent] = useState(false);
  const [sentMailId, setSentMailId] = useState("");
  const sendResetRequest = async (email) => {
    const formData = new FormData();
    formData.append("email", email);

    const res = await axiosInstance.post("/api/forgot-password", formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });
    if (res.status === 200) {
      setSentMailId(email);
      setSent(true);
    }
  };

  return (
    <AuthWraper>
      {sent ? (
        <AfterSend mail={sentMailId} />
      ) : (
        <SendEmailSection onSent={sendResetRequest} />
      )}
    </AuthWraper>
  );
}

export const AuthWraper = ({ children }) => {
  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />
        <Container>
          <Box sx={{ maxWidth: 480, mx: "auto" }}>{children}</Box>
        </Container>
      </RootStyle>
    </Page>
  );
};
