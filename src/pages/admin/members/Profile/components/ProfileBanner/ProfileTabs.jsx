import { Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import TabsWrapperStyle from "src/components/TabsWrapperStyle";
// import PROFILE_TABS from "../../profileTabs";
import useProfileTabs from "../../profileTabs";

const ProfileTabs = (props) =>{
  const PROFILE_TABS  = useProfileTabs();
  return(
    <TabsWrapperStyle>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        {...props}
      >
        {PROFILE_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            value={tab.value}
            icon={tab.icon}
            label={capitalCase(tab.value)}
          />
        ))}
      </Tabs>
    </TabsWrapperStyle>
  );
} 
export default ProfileTabs;
