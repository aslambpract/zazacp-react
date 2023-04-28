import { useEffect } from "react";
import useTabs from "src/hooks/useTabs";

const useTab = () => {
  const { currentTab, onChangeTab } = useTabs(
    localStorage.getItem("profile_section") || "profile"
  );

  useEffect(() => {
    return () => localStorage.setItem("profile_section", "profile");
  }, []);

  return { currentTab, onChangeTab };
};

export default useTab;
