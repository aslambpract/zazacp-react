import { Card } from "@mui/material";

import { PATH_DASHBOARD } from "src/routes/paths";

import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import ProductAddForm from "./ProductAddForm";
import useLocales from "src/hooks/useLocales";


const ProductAdd = () => {
  const { translate } = useLocales();
  return (
    <div>
      <Page title= {translate("adminStore.products.productAddTitile")} >
        <HeaderBreadcrumbs
          heading= {translate("adminStore.products.productAdd")} 
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            { name: translate("adminStore.products.product"), href: PATH_DASHBOARD.store.products },
            { name:translate("adminStore.products.add")  },
          ]}
        />
        <Card sx={{ p: 3 }}>
          <ProductAddForm />
        </Card>
      </Page>
    </div>
  );
};

export default ProductAdd;
