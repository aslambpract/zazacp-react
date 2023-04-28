import { Box, Pagination, Stack, Typography } from "@mui/material";
import { useState } from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import Ternary from "src/components/ternary";
import useLocales from "src/hooks/useLocales";
import { PATH_USER } from "src/routes/paths";
import CartWidget from "./components/cartWidget";
import FilterSidebar from "./components/filterSidebar";
import ProductList from "./components/productList";
import ProductSearch from "./components/productSearch";
import useProducts from "./hooks/useProducts";

const Subscriptions = () => {
  const { translate } = useLocales();
  const [openFilter, setOpenFilter] = useState(false);
  const [activePage, setActivePage] = useState(() => {
    const selectedPage = sessionStorage.getItem("pageNumber");
    return selectedPage ? parseInt(selectedPage) : 1;
  });
  const { products, totalPages, filterIds, setFilterIds, isEmpty } =
    useProducts(activePage);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleCloseFilter();
  };

  return (
    <Page title={translate("userOnlineStore.ShopTitile")} sx={{ p: 4 }}>
      <HeaderBreadcrumbs
        heading={translate("userOnlineStore.productSubscription")}
        links={[
          { name: translate("dashboard"), href: PATH_USER.user_dashboard },
          { name: translate("userOnlineStore.productSubscription") },
        ]}
      />

      <Stack
        spacing={2}
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ sm: "center" }}
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <ProductSearch />

        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <FilterSidebar
            setFilterIds={setFilterIds}
            onResetAll={handleResetFilter}
            isOpen={openFilter}
            onOpen={handleOpenFilter}
            onClose={handleCloseFilter}
            filterIds={filterIds}
          />
        </Stack>
      </Stack>
      <Ternary
        when={isEmpty}
        otherwise={<ProductList products={products} />}
        then={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography>No Products Found</Typography>
          </Box>
        }
      />
      <Stack
        sx={{
          marginTop: "2rem",
          float: "right",
        }}
      >
        <Pagination
          count={totalPages}
          onChange={(_, page) => setActivePage(page)}
          page={activePage}
          variant="outlined"
          color="primary"
        />
      </Stack>
      <CartWidget />
    </Page>
  );
};

export default Subscriptions;
