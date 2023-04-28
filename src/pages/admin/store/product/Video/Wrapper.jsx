import { Box, Button } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

const Wrapper = ({ children, openAdd }) => {
  const { translate } = useLocales();
  return (
    <div>
      <Page title={translate("adminStore.products.videoTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.products.video")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name:translate("products") , href: PATH_DASHBOARD.store.products },
              { name: translate("adminStore.products.video") },
            ]}
            action={
              <Button
                onClick={openAdd}
                variant="contained"
                startIcon={<Iconify icon="carbon:add" />}
              >
                {translate("adminStore.products.add")}
              </Button>
            }
          />
          {children}
        </Box>
      </Page>
    </div>
  );
};

export default Wrapper;
