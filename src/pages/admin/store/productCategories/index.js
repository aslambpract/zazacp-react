import PropTypes from "prop-types";
import { useState } from "react";

import { Box, Button, Card, Dialog, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { PATH_DASHBOARD } from "src/routes/paths";

import EmptyContent from "src/components/EmptyContent";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Map from "src/components/map";
import PaginationButtons from "src/components/pagination";
import Ternary from "src/components/ternary";
import axiosInstance from "src/utils/axios";
import DeleteDialog from "./Components/DeleteDialog";
import { AddForm, EditForm } from "./Components/Form";
import ProductCategory from "./Components/ProductCategory";
import useGetProductCategories from "./hooks/useGetProductCategories";

const ProductCategories = () => {
  const { productCategories, fetchProductCategories, ...rest } =
    useGetProductCategories();

  const theme = useTheme();

  const isNotFound = !productCategories.length;

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = (id) => () => {
    setOpenDelete(true);
    setSelectedId(id);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleClickOpenAddCategory = () => {
    setOpenAddCategory(true);
  };

  const handleClickOpenEditCategory = (id) => () => {
    setSelectedCategoryId(id);
  };

  const handleCloseAddCategory = () => {
    setOpenAddCategory(false);
  };

  const handleCloseEditCategory = () => {
    setSelectedCategoryId(false);
  };

  const changeStatus = async (id) => {
    try {
      await axiosInstance.get(`api/admin/product-categories-status/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <>
      <Page title="Product Categories: Store">
        <Box sx={{ p: 2 }}>
          <HeaderBreadcrumbs
            heading="Product Categories"
            links={[
              { name: "Dashboard", href: PATH_DASHBOARD.root },
              { name: "Product", href: PATH_DASHBOARD.store.products },
              { name: "Categories" },
            ]}
            action={
              <Button
                {...buttonProps}
                variant="contained"
                startIcon={
                  <Iconify icon={"eva:plus-fill"} width={20} height={20} />
                }
                onClick={handleClickOpenAddCategory}
              >
                Add Category
              </Button>
            }
          />

          <Card sx={{ p: 3 }}>
            <Grid container spacing={2}>
              <Ternary
                when={isNotFound}
                then={
                  <Box>
                    <EmptyContent
                      title="No Data"
                      sx={{
                        "& span.MuiBox-root": { height: 160 },
                        color: "#b2b2b2",
                      }}
                      description={
                        <p sx={{ display: "none" }}>
                          "Lorem In publishing and graphic design, Lorem ipsum
                          is a placeholder text commonly used to demonstrate the
                          visual form of a document or a typeface without
                          relying on meaningful content. "
                        </p>
                      }
                    />
                  </Box>
                }
                otherwise={
                  <Map
                    list={productCategories}
                    render={(item) => {
                      return (
                        <>
                          <ProductCategory
                            changeStatus={changeStatus}
                            item={item}
                            openEdit={handleClickOpenEditCategory}
                            openDelete={handleOpenDelete}
                          />
                        </>
                      );
                    }}
                  />
                }
              />
            </Grid>
            <PaginationButtons {...rest} />
          </Card>
        </Box>

        <Dialog
          fullScreen={fullScreen}
          fullWidth
          maxWidth="sm"
          open={openAddCategory}
          onClose={handleCloseAddCategory}
          aria-labelledby="add-category"
        >
          <AddForm
            onClose={handleCloseAddCategory}
            refresh={fetchProductCategories}
          />
        </Dialog>

        <Dialog
          fullScreen={fullScreen}
          fullWidth
          maxWidth="sm"
          open={selectedCategoryId}
          onClose={handleCloseEditCategory}
          aria-labelledby="edit-category"
        >
          <EditForm
            onClose={handleCloseEditCategory}
            refresh={fetchProductCategories}
            id={selectedCategoryId}
          />
        </Dialog>

        <DeleteDialog
          fetchData={fetchProductCategories}
          onClose={handleCloseDelete}
          refresh={fetchProductCategories}
          open={openDelete}
          selectedId={selectedId}
        />
      </Page>
    </>
  );
};

ProductCategories.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
  ]),
  icon: PropTypes.string,
  title: PropTypes.string,
  total: PropTypes.number,
};

export default ProductCategories;
