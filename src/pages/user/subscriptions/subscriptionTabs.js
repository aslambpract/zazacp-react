import { Box, Card, Tab, Tabs } from "@mui/material";
import { Page } from "@react-pdf/renderer";
import { capitalCase } from "change-case";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router";
// components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import { PATH_USER } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

const SUB_TABS = [
  {
    value: "home",
    text: "userMySubscriptions.home",
  },
  {
    value: "documents",
    text: "userMySubscriptions.documents",
  },
  {
    value: "events",
    text: "userMySubscriptions.event",
  },
  {
    value: "videos",
    text: "userMySubscriptions.videos",
  },
  {
    value: "comment",
    text: "userMySubscriptions.leaveComment",
  },
];

const useSubscriptionTab = () => {
  const { pathname } = useLocation();
  const [currentTab, setCurrentTab] = useState(0);
  const onChangeTab = (_, newValue) => setCurrentTab(newValue);

  useEffect(() => {
    const name = pathname.split("/").pop();
    const index = SUB_TABS.findIndex((item) => item.value === name);
    setCurrentTab(index);
  }, [pathname]);

  return { currentTab, onChangeTab };
};

const SubscriptionTab = () => {
  const { translate } = useLocales();
  const { currentTab, onChangeTab } = useSubscriptionTab();
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div>
      <Page title={translate("userMySubscriptions.subscriptions")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("userMySubscriptions.subscription")}
            links={[
              { name: translate("dashboard"), href: PATH_USER.root },
              { name: translate("userMySubscriptions.mySubscription"), href: PATH_USER.subscriptions.root },
              { name: translate("userMySubscriptions.view") },
            ]}
          />
          <Card sx={{ p: 2 }}>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {SUB_TABS.map((tab) => (
                <Tab
                  onClick={() =>
                    navigate(PATH_USER.subscriptions.view(id)(tab.value))
                  }
                  disableRipple
                  key={tab.value}
                  label={capitalCase(translate(tab.text))}
                  icon={tab.icon}
                />
              ))}
            </Tabs>
            <Box sx={{ mb: 2 }} />
            <Outlet />
          </Card>
        </Box>
      </Page>
    </div>
  );
};

export default SubscriptionTab;
