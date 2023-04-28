import { useEffect } from "react";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import { ChartStyle } from "./components/chart";
import NotistackProvider from "./components/NotistackProvider";
import { ProgressBarStyle } from "./components/ProgressBar";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import Settings from "./components/settings";
import ThemeColorPresets from "./components/ThemeColorPresets";
import useAuth from "./hooks/useAuth";
import useMenu from "./hooks/useMenu";
import Router from "./routes";
import ThemeProvider from "./theme";
import axiosInstance from "./utils/axios";
const fetchBrandSettings = async () => {
  try {
    const { data, status } = await axiosInstance("api/company-logos");
    if (status === 200) {
      const { logo, side_bar_logo, favicon } = data.data;
      if (logo) {
        localStorage.setItem("logo", logo);
        localStorage.setItem("side_bar_logo", side_bar_logo);
        localStorage.setItem("favicon", favicon);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default function App() {
  useMenu();
  const { getUser, user } = useAuth();
  useEffect(() => {
    if (user && !Object.keys(user).length) {
      getUser();
      return;
    }
  }, [user]);
  useEffect(() => {
    fetchBrandSettings();
  }, []);
  return (
    <ThemeProvider>
      <ThemeColorPresets>
        <RtlLayout>
          <NotistackProvider>
            <MotionLazyContainer>
              <ProgressBarStyle />
              <ChartStyle />
              <Settings />
              <ScrollToTop />
              <Router />
            </MotionLazyContainer>
          </NotistackProvider>
        </RtlLayout>
      </ThemeColorPresets>
    </ThemeProvider>
  );
}
