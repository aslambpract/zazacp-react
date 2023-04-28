import Page from "src/components/Page";
import RootStyle from "../shared/rootStyle";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import MainSection from "./components/MainSection";

const Login = () => {
  return (
    <Page title="Login">
      <RootStyle>
        <Header />
        <ImageCard />
        <MainSection />
      </RootStyle>
    </Page>
  );
};

export default Login;
