import { Box, Card, Container, Link, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import Image from "src/components/Image";
import Logo from "src/components/Logo";
import Page from "src/components/Page";
import useResponsive from "src/hooks/useResponsive";
import { PATH_AUTH } from "src/routes/paths";
import { RegisterForm } from "src/sections/auth/register";
import RootStyle from "./shared/rootStyle";
import { DOMAIN_NAME } from "src/config";
const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  padding: theme.spacing(3),
  justifyContent: "space-between",
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: 564,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

export default function Register() {
  const smUp = useResponsive("up", "sm");

  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account&nbsp;? &nbsp;&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.login}
              >
                Login
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Register New Member <br /> {DOMAIN_NAME}
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="register"
              src="https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1007.jpg?t=st=1651485790~exp=1651486390~hmac=fc62458c813421a4570f0a6b5eda5d64a85eba207df174f9182e65aef46651f4&w=996"
            />
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Get started marketing partner.
                </Typography>
                {/* <Typography sx={{ color: "text.secondary" }}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.{" "}
                </Typography> */}
              </Box>
            </Box>

            <RegisterForm />

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: "center" }}>
                Already have an account&nbsp;?&nbsp;
                <Link
                  variant="subtitle2"
                  to={PATH_AUTH.login}
                  component={RouterLink}
                >
                  Login
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
