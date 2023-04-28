import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LoginForm } from "src/sections/auth/login";
import Message from "./Message";
import NoAccountSection from "./NoAccountSection";

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  justifyContent: "center",
  padding: theme.spacing(12, 0),
}));

const MainSection = () => {
  return (
    <Container maxWidth="sm">
      <ContentStyle>
        <Message />

        <LoginForm />

        <NoAccountSection />
      </ContentStyle>
    </Container>
  );
};

export default MainSection;
