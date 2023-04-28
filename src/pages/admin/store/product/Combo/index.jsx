import { Card } from "@mui/material";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_DASHBOARD } from "src/routes/paths";
import ProductComboForm from "./components/productComboForm";

const ProductCombo = () => {
  return (
    <div>
      <Page title="Product Combo: Store">
        <HeaderBreadcrumbs
          heading="Product Combo "
          links={[
            { name: "Dashboard", href: PATH_DASHBOARD.root },
            { name: "Product", href: PATH_DASHBOARD.store.products },
            { name: "Combo" },
          ]}
        />
        <Card sx={{ p: 3 }}>
          <ProductComboForm />
        </Card>
      </Page>
    </div>
  );
};

export default ProductCombo;
