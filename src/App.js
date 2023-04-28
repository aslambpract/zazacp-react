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

export default function App() {
  useMenu();
  const { getUser, user } = useAuth();
  useEffect(() => {
    if (user && !Object.keys(user).length) {
      getUser();
      return;
    }
  }, [user]);

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
