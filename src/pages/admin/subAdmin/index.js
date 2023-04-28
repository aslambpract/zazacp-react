import { Box, Button, useMediaQuery } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import SubAdmin from "./subAdmin";
import useLocales from "src/hooks/useLocales";

const Index = () => {
  const { translate } = useLocales();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <div>
      <Page title={translate("adminSubAdmin.subAdmin.SubAdminTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminSubAdmin.subAdmin.subAdmins")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminSubAdmin.subAdmin.subAdmins") },
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
                      sm: "repeat(2, 1fr)",
                    },
                  }}
                >
                  <Button
                    {...buttonProps}
                    component={RouterLink}
                    to={PATH_DASHBOARD.subAdmin.add_user_group}
                    variant="contained"
                    startIcon={<Iconify icon={"eva:plus-fill"} />}
                  >
                    {translate("adminSubAdmin.subAdmin.userGroup")}
                  </Button>

                  <Button
                    {...buttonProps}
                    component={RouterLink}
                    to={PATH_DASHBOARD.subAdmin.add_sub_admin}
                    variant="contained"
                    startIcon={<Iconify icon={"eva:plus-fill"} />}
                  >
                    {translate("adminSubAdmin.subAdmin.subAdmin")}
                  </Button>
                </Box>
              </>
            }
          />
          <SubAdmin />
        </Box>
      </Page>
    </div>
  );
};

export default Index;
