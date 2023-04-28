import { styled } from "@mui/material/styles";
import Logo from "src/components/Logo";
import GetStartedTitle from "./GetStartedTitle";

const Wrapper = styled("header")(({ theme }) => ({
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

const Header = () => (
  <Wrapper>
    <Logo />
    <GetStartedTitle />
  </Wrapper>
);

export default Header;
