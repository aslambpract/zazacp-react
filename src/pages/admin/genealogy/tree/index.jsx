import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import Tree from "./components/tree";

const Index = () => {
  const { translate } = useLocales();
  return (
    <Page title={translate("adminGenealogy.sponsor.treeTitile")}>
      <Box sx={{ p: 2 }}>
        <HeaderBreadcrumbs
          heading={translate("adminGenealogy.tree.tree")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name: translate("adminGenealogy.tree.tree") },
          ]}
        />
        <Card sx={{ p: 2 }}>
          <Tree />
        </Card>
      </Box>
    </Page>
  );
};

export default Index;
