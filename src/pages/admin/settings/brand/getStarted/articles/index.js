import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { useSnackbar } from "notistack";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";
import Actions from "../../../../../../components/Actions";
import TableMenu from "../../../../../../components/tableMenu";
import EditForm from "./EditForm";
import AddForm from "./addForm";
import articlesRow from "./articlesRow";
import useGetAllArticles from "./hooks/useGetAllArticles";

const Articles = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const { articlesList, fetchArticles, rowStart, ...rest } =
    useGetAllArticles();
  const [openMenu, setOpenMenuActions] = useState(null);
  const [openAddArticles, setOpenAddArticles] = useState(false);
  const [openDeleteArticle, setOpenDeleteArticle] = useState(false);
  const [openEditArticles, setOpenEditArticles] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);

  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setSelectedArticleId(id);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
    setSelectedArticleId(null);
  };

  const openDeleteDialog = () => setOpenDeleteArticle(true);
  const closeDeleteDialog = () => {
    setOpenDeleteArticle(false);
    handleCloseMenu();
  };

  const handleClickOpenAddArticles = () => {
    setOpenAddArticles(true);
  };
  const handleClickOpenEditArticles = () => {
    setOpenEditArticles(true);
  };

  const handleCloseAddArticles = () => {
    setOpenAddArticles(false);
  };
  const handleCloseEditArticles = () => {
    setOpenEditArticles(false);
  };

  const deleteArticle = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `api/admin/brand-get-started-articles/${selectedArticleId}`,
        reqData
      );
      if (status === 200) {
        fetchArticles();
        enqueueSnackbar(data.message);
        closeDeleteDialog();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Grid container>
        <Grid item sm={12} mr={1} mb={2}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<Iconify icon={"carbon:add"} />}
              onClick={handleClickOpenAddArticles}
            >
              {translate("adminSettings.brand.addArticles")}
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminSettings.brand.no")}</TableCell>
                <TableCell>
                  {translate("adminSettings.brand.sectionName")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSettings.brand.menuName")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSettings.brand.sortOrder")}{" "}
                </TableCell>
                <TableCell>{translate("adminSettings.brand.action")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {articlesList.map(articlesRow(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          openEdit={handleClickOpenEditArticles}
          openDelete={openDeleteDialog}
        />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddArticles}
        onClose={handleCloseAddArticles}
        aria-labelledby="add-articles"
      >
        <DialogTitle id="add-articles">
          {translate("adminSettings.brand.addArticles")}
        </DialogTitle>
        <AddForm
          fetchArticles={fetchArticles}
          onClose={handleCloseAddArticles}
        />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEditArticles}
        onClose={handleCloseEditArticles}
        aria-labelledby="edit-articles"
      >
        <DialogTitle id="edit-articles">
          {translate("adminSettings.brand.editArticles")}
        </DialogTitle>
        <EditForm
          fetchArticles={fetchArticles}
          onClose={handleCloseEditArticles}
          articleId={selectedArticleId}
        />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openDeleteArticle}
        onClose={closeDeleteDialog}
        aria-labelledby="edit-articles"
      >
        <DialogTitle id="edit-articles">
          {translate("adminSettings.brand.deleteArticles")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {translate("adminSettings.brand.areYouSure")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={deleteArticle}
            type="submit"
            variant="contained"
          >
            {translate("adminSettings.brand.delete")}
          </LoadingButton>
          <Button onClick={closeDeleteDialog} autoFocus color="error">
            {translate("adminSettings.brand.cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      <PaginationButtons {...rest} />
    </div>
  );
};

export default Articles;
