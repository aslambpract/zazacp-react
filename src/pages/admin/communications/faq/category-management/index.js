import {
  Box,
  Button,
  Card,
  Dialog,
  Divider,
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

import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import Actions from "./components/Actions";
import categoryManagementRow from "./components/categoryManagementRow";
import { AddForm, EditForm } from "./components/form";
import useCategories from "./hooks/useCategories";

const DataTable = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [categoryId, setCategoryId] = useState([]);
  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setCategoryId(id);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openFaq, setOpenFaq] = useState(false);
  const handleClickOpenFaq = () => {
    setOpenFaq(true);
  };

  const handleCloseFaq = () => {
    setOpenFaq(false);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleCloseMenu();
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const { categoryList, fetchCategoryList, rowStart, ...rest } =
    useCategories();

  return (
    <Page title="Category Management: Tools">
      <Card>
        <Grid container>
          <Grid item sm={12} mr={1} mb={1} mt={1}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                size="small"
                startIcon={<Iconify icon={"carbon:add"} />}
                onClick={handleClickOpenFaq}
              >
                {translate("adminCommunication.faqs.FAQCategory")}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminCommunication.faqs.no")}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.faqs.category")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.faqs.description")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.faqs.action")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryList.map(
                  categoryManagementRow(handleOpenMenu, rowStart)
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TableMenu onClose={handleCloseMenu} open={openMenu}>
          <Actions
            openEdit={handleOpenEdit}
            categoryId={categoryId}
            fetchCategoryList={fetchCategoryList}
            close={handleCloseMenu}
          />
        </TableMenu>

        <Divider />
      </Card>

      <PaginationButtons {...rest} />
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openFaq}
        onClose={handleCloseFaq}
        aria-labelledby="faqs-category"
      >
        <AddForm onClose={handleCloseFaq} reload={fetchCategoryList} />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="faqs-category"
      >
        <EditForm
          editId={categoryId}
          onClose={handleCloseEdit}
          reload={fetchCategoryList}
        />
      </Dialog>
    </Page>
  );
};

export default DataTable;
