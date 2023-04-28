import { Link as RouterLink } from "react-router-dom";

import { Box, Button, Card, useMediaQuery } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import EventsList from "./eventsList";
import useLocales from "src/hooks/useLocales";

const Index = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  const { translate } = useLocales();
  return (
    <div>
      <Page title={translate("adminStore.events.eventsTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.events.events")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminStore.events.events") },
            ]}
            action={
              <>
                <Box
                  sx={{
                    display: "grid",
                    columnGap: 1,
                    rowGap: 3,
                    gridTemplateColumns: {
                      xs: "repeat(1, 1fr)",
                      sm: "repeat(1, 1fr)",
                    },
                  }}
                >
                  <Button
                    {...buttonProps}
                    component={RouterLink}
                    to={PATH_DASHBOARD.store.events_add}
                    variant="contained"
                    startIcon={<Iconify icon={"eva:plus-fill"} />}
                  >
                    {translate("adminStore.events.addEvents")}
                  </Button>
                </Box>
              </>
            }
          />

          <Card sx={{ p: 3 }}>
            <EventsList />
          </Card>
        </Box>
      </Page>
    </div>
  );
};

export default Index;
