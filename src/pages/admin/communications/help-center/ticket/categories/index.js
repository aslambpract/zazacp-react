import {
  Box,
  Button,
  Dialog,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import Actions from "./components/Actions";
import categoriesRow from "./components/categoriesRow";
import { AddForm, EditForm } from "./components/form";
import useCategoriesList from "./hooks/useCategoriesList";

const Index = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { categoriesList, fetchCategoriesList, rowStart, ...rest } =
    useCategoriesList();
  const [openAddCategories, setOpenAddCategories] = useState(false);
  const [categoriesId, setCategoriesId] = useState(null);

  const handleClickOpenAddCategories = () => {
    setOpenAddCategories(true);
  };

  const handleCloseAddCategories = () => {
    setOpenAddCategories(false);
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
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <div>
      <Grid container>
        <Grid item sm={12} mr={1} mb={1} mt={1}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="subtitle2">
              {translate("adminCommunication.helpCenter.category")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              {...buttonProps}
              variant="contained"
              startIcon={<Iconify icon={"eva:plus-fill"} />}
              onClick={handleClickOpenAddCategories}
            >
              {translate("adminCommunication.helpCenter.category")}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {translate("adminCommunication.helpCenter.no")}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.category")}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.descriptions")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.action")}{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoriesList.map(categoriesRow(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          openEdit={handleOpenEdit}
          categoriesId={categoriesId}
          fetchCategoriesList={fetchCategoriesList}
          close={handleCloseMenu}
        />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddCategories}
        onClose={handleCloseAddCategories}
        aria-labelledby="add-categories"
      >
        <AddForm
          onClose={handleCloseAddCategories}
          reload={fetchCategoriesList}
        />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="add-categories"
      >
        <EditForm
          selectedId={categoriesId}
          onClose={handleCloseEdit}
          reload={fetchCategoriesList}
        />
      </Dialog>

      <PaginationButtons {...rest} />
    </div>
  );
};

export default Index;
