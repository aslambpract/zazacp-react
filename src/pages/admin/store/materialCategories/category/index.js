import {
  Box,
  Button,
  Card,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import Actions from "./components/Actions";
import Row from "./components/Row";
import { AddForm, EditForm } from "./components/form";
import useList from "./hooks/useList";

const Index = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { categoryList, fetchCategoryList, rowStart, ...rest } = useList();
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [categoryId, setCategoriesId] = useState(null);

  const handleClickOpenAddCategory = () => {
    setOpenAddCategory(true);
  };

  const handleCloseAddBusiness = () => {
    setOpenAddCategory(false);
  };

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setCategoriesId(id);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleCloseMenu();
  };

  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
      <Page title={translate("adminStore.material.materialCategoryTitile")}>
        <HeaderBreadcrumbs
          heading={translate("adminStore.material.materialCategory")}
          links={[
            { name: translate("dashboard"), href: PATH_DASHBOARD.root },
            {
              name: translate("adminStore.material.materials"),
              href: PATH_DASHBOARD.store.material,
            },
            { name: translate("adminStore.material.category") },
          ]}
        />
        <Card sx={{ p: 2 }}>
          <Grid container>
            <Grid item sm={12} mr={1} mb={1} mt={1}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  startIcon={<Iconify icon={"eva:plus-fill"} />}
                  onClick={handleClickOpenAddCategory}
                >
                  {translate("adminStore.material.add")}
                </Button>
              </Box>
            </Grid>
          </Grid>
          <Scrollbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{translate("adminStore.material.no")}</TableCell>
                    <TableCell>
                      {translate("adminStore.material.category")}{" "}
                    </TableCell>
                    <TableCell>
                      {translate("adminStore.material.sortOrder")}{" "}
                    </TableCell>
                    <TableCell>
                      {translate("adminStore.material.action")}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categoryList.map(Row(handleOpenMenu, rowStart))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TableMenu onClose={handleCloseMenu} open={openMenu}>
            <Actions
              openEdit={handleOpenEdit}
              categoryId={categoryId}
              reload={fetchCategoryList}
              close={handleCloseMenu}
            />
          </TableMenu>
        </Card>
      </Page>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddCategory}
        onClose={handleCloseAddBusiness}
        aria-labelledby="add-category"
      >
        <AddForm onClose={handleCloseAddBusiness} reload={fetchCategoryList} />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="edit-category"
      >
        <EditForm
          selectedId={categoryId}
          onClose={handleCloseEdit}
          reload={fetchCategoryList}
        />
      </Dialog>

      <PaginationButtons {...rest} />
    </>
  );
};

export default Index;
