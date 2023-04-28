import { Box, Button, Container, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import useSettings from "src/hooks/useSettings";
import { PATH_DASHBOARD } from "src/routes/paths";
import { isBinary } from "src/utils/isBinary";

const Wrapper = ({ children }) => {
  const { translate } = useLocales();
  const { themeStretch } = useSettings();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <div>
      <Page
        title={translate(
          "adminStore.assignSubscriptions.assignSubscriptionsTitile"
        )}
      >
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate(
              "adminStore.assignSubscriptions.assignSubscriptions"
            )}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              {
                name: translate(
                  "adminStore.assignSubscriptions.assignSubscriptions"
                ),
              },
            ]}
            action={
              isBinary() && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      p: 1,
                      m: 1,

                      borderRadius: 1,
                      gap: 1,
                    }}
                  >
                    <Button
                      {...buttonProps}
                      component={RouterLink}
                      to={PATH_DASHBOARD.store.assign_subscriptions_add_product}
                      variant="contained"
                      startIcon={<Iconify icon={"eva:plus-fill"} />}
                      spacing={2}
                    >
                      {translate(
                        "adminStore.assignSubscriptions.businessBuilder"
                      )}
                    </Button>
                  </Box>
                </>
              )
            }
          />

          {children}
        </Box>
      </Page>
    </div>
  );
};

export default Wrapper;
