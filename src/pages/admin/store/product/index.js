import { Box, Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import HeaderActions from "./HeaderActions";
import ProductList from "./ProductList";

const Index = () => {
  const { translate } = useLocales();
  return (
    <div>
      <Page title={translate("adminStore.products.ProductTitile")}>
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading={translate("adminStore.products.product")}
            links={[
              { name: translate("dashboard"), href: PATH_DASHBOARD.root },
              { name: translate("adminStore.products.product") },
            ]}
            action={<HeaderActions />}
          />
          <Card sx={{ p: 3 }}>
            <ProductList />
          </Card>
        </Box>
      </Page>
    </div>
  );
};

export default Index;
