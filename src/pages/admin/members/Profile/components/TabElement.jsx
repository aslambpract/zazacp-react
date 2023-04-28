import { Box } from "@mui/material";
// import PROFILE_TABS from "../profileTabs";
import useProfileTabs from "../profileTabs";
const TabElements = ({ currentTab }) => {
  const PROFILE_TABS = useProfileTabs();
  return PROFILE_TABS.map((tab) => {
    const isMatched = tab.value === currentTab;
    return isMatched && <Box key={tab.value}>{tab.component()}</Box>;
  });
};

export default TabElements;
