import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
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
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import DeleteDialog from "./components/deleteDialog";
import { AddForm, EditForm } from "./components/form";
import useArticleList from "./hooks/useArticleList";

const DataTable = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedId, setSelectedId] = useState(null);
  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setSelectedId(id);
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const [openCreateArticle, setOpenCreateArticle] = useState(false);
  const handleClickOpenCreateArticle = () => {
    setOpenCreateArticle(true);
    handleCloseMenu();
  };

  const handleCloseCreateArticle = () => {
    setOpenCreateArticle(false);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleCloseMenu();
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const { articleList, fetchArticleList, rowStart, ...rest } = useArticleList();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <>
      <div>
        <HeaderBreadcrumbs
          links={[
            { name: translate("adminCommunication.articile.allArticles") },
          ]}
          action={
            <>
              <Box
                sx={{
                  display: "grid",
                  columnGap: 1,
                  rowGap: 3,
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(1, 1fr)",
                  },
                }}
              >
                <Button
                  {...buttonProps}
                  variant="contained"
                  startIcon={<Iconify icon={"eva:plus-fill"} />}
                  onClick={handleClickOpenCreateArticle}
                >
                  {translate("adminCommunication.articile.createArticle")}
                </Button>
              </Box>
            </>
          }
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminCommunication.articile.no")}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.articile.articleTitle")}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.articile.publishTime")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminCommunication.articile.action")}{" "}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articleList.map((row, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + rowStart}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>
                      {new Date(row.created_at).toLocaleDateString("en-GB")}
                    </TableCell>
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

        <TableMenu onClose={handleCloseMenu} open={openMenu}>
          <MenuItem sx={{ color: "default.main" }} onClick={handleOpenEdit}>
            <Iconify icon={"akar-icons:edit"} />
            {translate("adminCommunication.articile.edit")}
          </MenuItem>
          <Divider />
          <MenuItem sx={{ color: "error.main" }} onClick={handleOpenDelete}>
            <Iconify icon={"eva:trash-2-outline"} />
            {translate("adminCommunication.articile.delete")}
          </MenuItem>
        </TableMenu>

        <Dialog
          fullScreen={fullScreen}
          fullWidth
          maxWidth="sm"
          open={openCreateArticle}
          onClose={handleCloseCreateArticle}
          aria-labelledby="create-article"
        >
          <DialogTitle id="create-article">
            {translate("adminCommunication.articile.createArticle")}
          </DialogTitle>
          <AddForm
            onClose={handleCloseCreateArticle}
            reload={fetchArticleList}
          />
        </Dialog>

        <Dialog
          fullScreen={fullScreen}
          fullWidth
          maxWidth="sm"
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="create-article"
        >
          <DialogTitle id="create-article">
            {translate("adminCommunication.articile.editArticle")}
          </DialogTitle>
          <EditForm
            selectedId={selectedId}
            onClose={handleCloseEdit}
            reload={fetchArticleList}
          />
        </Dialog>

        <DeleteDialog
          fetchData={fetchArticleList}
          onClose={handleCloseDelete}
          open={openDelete}
          selectedId={selectedId}
        />
      </div>
      <PaginationButtons {...rest} />
    </>
  );
};

export default DataTable;
