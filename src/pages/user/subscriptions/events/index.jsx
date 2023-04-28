import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  Tab,
  Tabs,
} from "@mui/material";
import { capitalCase } from "change-case";
import { useState } from "react";
import useTabs from "src/hooks/useTabs";
import Past from "./components/past";
import Upcoming from "./components/upcoming";
import useLocales from "src/hooks/useLocales";

const Index = () => {
  const { translate } = useLocales();
  const { currentTab, onChangeTab } = useTabs("upcoming");

  const [isPublic, setIsPublic] = useState(false);
 
  const EVENTS_TABS = [
    {
      value: "upcoming",
      text: translate("userMySubscriptions.upcomingEvents"),
      component: <Upcoming isPublic={isPublic} />,
    },
    {
      value: "past",
      text: translate("userMySubscriptions.pastEvents"),
      component: <Past isPublic={isPublic} />,
    },
  ];
  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Box>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  onChange={() => setIsPublic(!isPublic)}
                />
              }
              label={translate("userMySubscriptions.listPublicEvents")} 
              labelPlacement="start"
            />
          </FormGroup>
        </Box>
        <Box sx={{ p: 1 }}>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {EVENTS_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={capitalCase(tab.text)}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Box sx={{ mb: 4 }} />
          {EVENTS_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Index;
