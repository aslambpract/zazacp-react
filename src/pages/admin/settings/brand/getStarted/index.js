import { Box, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import Iconify from "src/components/Iconify";
import useTabs from "src/hooks/useTabs";
import Articles from "./articles";
import Section from "./section";
import useLocales from "src/hooks/useLocales";

const UserGuidance = () => {
  const { translate } = useLocales();
  const { currentTab, onChangeTab } = useTabs("sections");

  const USER_GUIDANCE_TABS = [
    {
      value:  translate("adminSettings.brand.sections"),
      icon: <Iconify icon={"radix-icons:section"} width={20} height={20} />,
      component: <Section />,
    },
    {
      value:  translate("adminSettings.brand.articles"),
      icon: (
        <Iconify
          icon={"pixelarticons:article-multiple"}
          width={20}
          height={20}
        />
      ),
      component: <Articles />,
    },
  ];

  return (
    <div>
      <Tabs
        allowScrollButtonsMobile
        variant="scrollable"
        scrollButtons="auto"
        value={currentTab}
        onChange={onChangeTab}
      >
        {USER_GUIDANCE_TABS.map((tab) => (
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
      {USER_GUIDANCE_TABS.map((tab) => {
        const isMatched = tab.value === currentTab;
        return isMatched && <Box key={tab.value}>{tab.component}</Box>;
      })}
    </div>
  );
};

export default UserGuidance;
