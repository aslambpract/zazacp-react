import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import AddDialog from "./components/Add";
import DeleteCategory from "./components/Delete";
import EditDialog from "./components/Edit";
import useGetSubscriptionCategory from "./hooks/useGetSubscriptionCategory";

const Index = () => {
  const { translate } = useLocales();
  const { subscriptionCategoryList, fetchSubCategoryList, rowStart, ...rest } =
    useGetSubscriptionCategory();
  const [selectedId, setSelectedId] = useState(null);

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setSelectedId(id);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedId(null);
  };

  const [openAddCategory, setOpenAddCategory] = useState(false);
  const handleClickOpenAddCategory = () => {
    setOpenAddCategory(true);
  };

  const handleCloseAddCategory = () => {
    setOpenAddCategory(false);
  };

  const [openEditCategory, setOpenEditCategory] = useState(false);
  const handleClickOpenEditCategory = () => {
    setOpenEditCategory(true);
    handleCloseMenu();
  };
  const handleCloseEditCategory = () => {
    setOpenEditCategory(false);
    setSelectedId(null);
  };

  return (
    <div>
      <Page title="Assign Subscriptions Categories: Store">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            startIcon={<Iconify icon={"eva:plus-fill"} />}
            onClick={handleClickOpenAddCategory}
          >
            {translate("adminStore.assignSubscriptions.category")}
          </Button>
        </Box>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.no")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.categoryy")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.action")}{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptionCategoryList.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <IconButton onClick={handleOpenMenu(row.id)}>
                        <Iconify
                          icon={"eva:more-vertical-fill"}
                          width={20}
                          height={20}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <PaginationButtons {...rest} />
      </Page>

      <TableMenu open={openMenu} onClose={handleCloseMenu}>
        <MenuItem
          sx={{ color: "default.main" }}
          onClick={handleClickOpenEditCategory}
        >
          <Iconify icon={"akar-icons:edit"} />
          {translate("adminStore.assignSubscriptions.edit")}
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "error.main" }} onClick={handleOpenDelete}>
          <Iconify icon={"eva:trash-2-outline"} />
          {translate("adminStore.assignSubscriptions.delete")}
        </MenuItem>
      </TableMenu>

      <AddDialog
        open={openAddCategory}
        onClose={handleCloseAddCategory}
        fetchData={fetchSubCategoryList}
      />

      <DeleteCategory
        onClose={handleCloseDelete}
        open={openDelete}
        deleteId={selectedId}
        fetchData={fetchSubCategoryList}
      />

      <EditDialog
        open={openEditCategory}
        onClose={handleCloseEditCategory}
        editId={selectedId}
        fetchData={fetchSubCategoryList}
      />
    </div>
  );
};

export default Index;
