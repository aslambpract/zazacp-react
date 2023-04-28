import useAuth from "src/hooks/useAuth";
import useSettings from "src/hooks/useSettings";
import { getPlan } from "src/utils/plan";
import Horizontal from "./components/horizontal";
import Vertical from "./components/vertical";
import navConfig from "./navConfig";

const Layout = () => {
  const flavor = getPlan();
  const { isAdmin } = useAuth();
  const config = navConfig[flavor][isAdmin ? "admin" : "user"];

  const { themeLayout } = useSettings();
  const verticalLayout = themeLayout === "vertical";
  return verticalLayout ? (
    <Vertical navConfig={config} />
  ) : (
    <Horizontal navConfig={config} />
  );
};
export default Layout;
