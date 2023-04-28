import { Box } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import DataTable from "./component/dataTable";

const Network = () => {
  const { translate } = useLocales();
  return (
    <Page title={translate("networkMembers")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("networkMembers")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            {
              name: translate("networkMembers"),
            },
          ]}
        />
        <DataTable />
      </Box>
    </Page>
  );
};

export default Network;
