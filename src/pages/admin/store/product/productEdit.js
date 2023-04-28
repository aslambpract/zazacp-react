import { Card } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import ProductEditForm from "./ProductEditForm/index";
import useLocales from "src/hooks/useLocales";


const ProductEdit = () => {
  const { translate } = useLocales();
  return (
    <div>
      <Page title= {translate("adminStore.products.productEditTitile")}>
        <HeaderBreadcrumbs
          heading= {translate("adminStore.products.productEdit")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name:translate("adminStore.products.products") , href: PATH_DASHBOARD.store.products },
            { name: translate("adminStore.products.productEdit")},
          ]}
        />
        <Card sx={{ p: 3 }}>
          <ProductEditForm />
        </Card>
      </Page>
    </div>
  );
};

export default ProductEdit;
