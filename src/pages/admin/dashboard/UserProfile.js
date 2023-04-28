import { Box, Card, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import { Outlet, useNavigate } from "react-router";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import TabsWrapperStyle from "src/components/TabsWrapperStyle";
import useCustomTabs from "src/hooks/useCustomTabs";
import { PATH_DASHBOARD } from "src/routes/paths";
import { ProfileCover } from "src/sections/user/profile";
// import PROFILE_TABS from "./profileTabs";
import useLocales from "src/hooks/useLocales";
import useProfileTabs from "./profileTabs";

const UserProfile = () => {
  const PROFILE_TABS = useProfileTabs();
  const { translate } = useLocales();
  const navigate = useNavigate();
  const { currentTab, onChangeTab } = useCustomTabs(
    "profile_section",
    "profile"
  );

  return (
    <Page title={translate("profile.profile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("profile.profile")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name: translate("profile.admin") },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: "relative",
          }}
        >
          <ProfileCover />
          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
              style={{ width: "85%" }}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                  onClick={() => navigate(tab.href)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>
        <Outlet />
      </Box>
    </Page>
  );
};

export default UserProfile;
