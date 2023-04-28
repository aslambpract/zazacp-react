import { Box, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import useTabs from "src/hooks/useTabs";
import useSubAdmins from "./hooks/useGetSubAdmins";
// import SUB_ADMINS_TABS from "./SubAdminTabs";
import useSubAdminTabs from "./SubAdminTabs";

const SubAdmin = () => {
  const SUB_ADMINS_TABS  = useSubAdminTabs()
  const { currentTab, onChangeTab } = useTabs("active");
  const { subAdmins, fetchData } = useSubAdmins();

  return (
    <Box sx={{ p: 2 }}>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
      >
        {SUB_ADMINS_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Box sx={{ mb: 5 }} />
      {SUB_ADMINS_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return (
          isMatched && (
            <Box key={tab.value}>
              {tab.component(subAdmins[tab.key], fetchData)}
            </Box>
          )
        );
      })}
    </Box>
  );
};

export default SubAdmin;
