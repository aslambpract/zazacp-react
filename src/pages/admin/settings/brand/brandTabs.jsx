import { Box, Card, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import Iconify from "src/components/Iconify";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import useTabs from "src/hooks/useTabs";
import CompanyDetails from "./companyDetails";
import GetStarted from "./getStarted";
import UserGuidance from "./userGuidance";

const BrandTabs = () => {
  const tabs = useTabs("companyDetails");

  return (
    <Card sx={{ p: 3 }}>
      <TabHeaders {...tabs} />
      <Box sx={{ mb: 5 }} />
      <TabItems currentTab={tabs.currentTab} />
    </Card>
  );
};

const TabHeaders = ({ currentTab, onChangeTab }) => {
  const { translate } = useLocales();
  const BRAND_TABS = [
    {
      value: translate("adminSettings.brand.companyDetails"),
      icon: <Iconify icon={"ep:office-building"} width={20} height={20} />,
      component: <CompanyDetails />,
    },
    {
      value: translate("adminSettings.brand.getStarted"),
      icon: <Iconify icon={"cil:book"} width={20} height={20} />,
      component: <GetStarted />,
    },
    {
      value: translate("adminSettings.brand.userGuidance"),
      icon: (
        <Iconify
          icon={"fluent:cursor-click-24-regular"}
          width={20}
          height={20}
        />
      ),
      component: <UserGuidance />,
    },
  ];
  return (
    <Tabs
      allowScrollButtonsMobile
      variant="scrollable"
      scrollButtons="auto"
      value={currentTab}
      onChange={onChangeTab}
    >
      <Map
        list={BRAND_TABS}
        render={(tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={capitalCase(tab.value)}
            icon={tab.icon}
            value={tab.value}
          />
        )}
      />
    </Tabs>
  );
};

const TabItems = ({ currentTab }) => {
  const { translate } = useLocales();
  const BRAND_TABS = [
    {
      value: translate("adminSettings.brand.companyDetails"),
      icon: <Iconify icon={"ep:office-building"} width={20} height={20} />,
      component: <CompanyDetails />,
    },
    {
      value: translate("adminSettings.brand.getStarted"),
      icon: <Iconify icon={"cil:book"} width={20} height={20} />,
      component: <GetStarted />,
    },
    {
      value: translate("adminSettings.brand.userGuidance"),
      icon: (
        <Iconify
          icon={"fluent:cursor-click-24-regular"}
          width={20}
          height={20}
        />
      ),
      component: <UserGuidance />,
    },
  ];
  return (
    <>
      <Map
        list={BRAND_TABS}
        render={(tab) =>
          tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>
        }
      />
    </>
  );
};

export default BrandTabs;
