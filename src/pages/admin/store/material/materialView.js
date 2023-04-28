import { capitalCase } from "change-case";

import { Box, Button, Card, Tab, Tabs } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import useTabs from "src/hooks/useTabs";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";

import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import MaterialsProvider from "./store";
// import MATERIAL_TABS from "./tabs";
import useTab from "./tabs";
import useLocales from "src/hooks/useLocales";


const MaterialView = () => {
  const MATERIAL_TABS = useTab();
  const { translate } = useLocales();
  const { currentTab, onChangeTab } = useTabs("documents");
  return (
    <div>
      <Page title=  {translate("adminStore.material.materialStore")}>
        <HeaderBreadcrumbs
          heading=  {translate("adminStore.material.material")}
          links={[
            { name:translate("dashboard") , href: PATH_DASHBOARD.root },
            { name: translate("adminStore.material.material"), href: PATH_DASHBOARD.store.material },
            { name: translate("adminStore.material.view") },
          ]}
          action={
            <>
              <Button
                LinkComponent={Link}
                to="add"
                variant="contained"
                startIcon={<Iconify icon="akar-icons:plus" />}
              >
                {translate("adminStore.material.add")}
              </Button>
            </>
          }
        />
        <Card sx={{ p: 3 }}>
          <Tabs
            allowScrollButtonsMobile
            variant="scrollable"
            scrollButtons="auto"
            value={currentTab}
            onChange={onChangeTab}
          >
            {MATERIAL_TABS.map((tab) => (
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
          {MATERIAL_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Card>
      </Page>
    </div>
  );
};

export default () => (
  <MaterialsProvider>
    <MaterialView />
  </MaterialsProvider>
);
