import { Box, Tab, Tabs } from "@mui/material";
import { capitalCase } from "change-case";
import { Outlet } from "react-router";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";
import { isBinary, isNotBinary } from "src/utils/isBinary";
import Wrapper from "./components/wrapper";
import useTabs from "./hooks/useTabs";
import tabs from "./tabs";

const { binary, nonBinary } = tabs;
const NETWORK_TABS = isBinary() ? [...binary, ...nonBinary] : [...nonBinary];

const NetworkSettings = () => {
  const { translate } = useLocales();
  const { currentTab, onChangeTab } = useTabs(
    isNotBinary() ? "referral" : "rank"
  );

  return (
    <>
      <Wrapper>
        <Tabs
          allowScrollButtonsMobile
          variant="scrollable"
          scrollButtons="auto"
          value={currentTab}
          onChange={onChangeTab}
        >
          {NETWORK_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(translate(tab.value))}
              icon={<Iconify icon={tab.icon} width={20} height={20} />}
              value={tab.name}
            />
          ))}
        </Tabs>
        <Box sx={{ mb: 5 }} />
        <Outlet />
      </Wrapper>
    </>
  );
};

export default NetworkSettings;
