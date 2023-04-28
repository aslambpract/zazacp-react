import { Box, Card, Grid } from "@mui/material";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";

import Form from "./components/Form";
import useCrumps from "./hooks/crumps";

const AddSubAdmin = () => {
  const crumps = useCrumps();
  const { translate } = useLocales();
  return (
    <>
      <Page title={translate("adminSubAdmin.subAdmin.subAdminsTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminSubAdmin.subAdmin.addSubAdmin")}
            links={crumps}
          />

          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Form />
            </Card>
          </Grid>
        </Box>
      </Page>
    </>
  );
};

export default AddSubAdmin;
