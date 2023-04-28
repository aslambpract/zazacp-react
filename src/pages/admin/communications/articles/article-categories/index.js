import { useState } from "react";

import { Dialog, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import TableWrapper from "./components/TableWrapper";
import Actions from "./components/actions";
import articleRow from "./components/articleRow";
import ArticleWrapper from "./components/articleWrapper";
import DeleteDialog from "./components/deleteDialog";
import { EditForm } from "./components/form";
import useArticleCategoryList from "./hooks/useArticleCategoryList";

const DataTable = () => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { categoryList, fetchCategoryList, rowStart, ...rest } =
    useArticleCategoryList();
  const [selectedId, setSelectedId] = useState(null);
  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setSelectedId(id);
  };
  const handleCloseMenu = () => setOpenMenuActions(null);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleCloseMenu();
  };

  const handleCloseEdit = () => setOpenEdit(false);

  return (
    <>
      <ArticleWrapper fetchCategoryList={fetchCategoryList}>
        <TableWrapper>
          {categoryList.map(articleRow(handleOpenMenu, rowStart))}
        </TableWrapper>

        <TableMenu onClose={handleCloseMenu} open={openMenu}>
          <Actions openDelete={handleOpenDelete} openEdit={handleOpenEdit} />
        </TableMenu>
      </ArticleWrapper>

      <DeleteDialog
        fetchData={fetchCategoryList}
        onClose={handleCloseDelete}
        open={openDelete}
        selectedId={selectedId}
      />

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="add-article-category"
      >
        <EditForm
          selectedId={selectedId}
          fetchData={fetchCategoryList}
          onClose={handleCloseEdit}
        />
      </Dialog>

      <PaginationButtons {...rest} />
    </>
  );
};

export default DataTable;
