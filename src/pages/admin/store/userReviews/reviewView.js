import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
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
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import Actions from "src/components/Actions";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import Scrollbar from "src/components/Scrollbar";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import useSettings from "src/hooks/useSettings";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import EditForm from "./EditForm";
import useEditReviews from "./hooks/useEditReview";
import useGetProductsReviews from "./hooks/useGetProductsReviews";
import useReviewForm from "./hooks/useReviewForm";

const ReviewView = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const methods = useReviewForm();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const { themeStretch } = useSettings();
  const { productReviews, fetchReviewsOfSingleProduct } =
    useGetProductsReviews();
  const [selectedId, setSelectedId] = useState(null);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    handleCloseMenu();
  };

  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = (id) => (e) => {
    setSelectedId(id);
    setOpenMenu(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setSelectedId(null);
    setOpenMenu(false);
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleCloseMenu();
  };

  const handleDelete = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { status, data } = await axiosInstance.post(
        `/api/admin/user-reviews/${selectedId}`,
        reqData
      );
      if (status === 200) {
        fetchReviewsOfSingleProduct();
        enqueueSnackbar(data.message);
        handleCloseDelete();
      }
    } catch (err) {
      handleCloseDelete();
      enqueueSnackbar("Failed to delete", { variant: "error" });
    }
  };

  return (
    <>
      <div>
        <Page title={translate("adminStore.userReviews.reviewViewTitile")}>
          <Box sx={{ p: 2 }}>
            <HeaderBreadcrumbs
              heading={translate("adminStore.userReviews.reviewView")}
              links={[
                { name: translate("dashboard"), href: PATH_DASHBOARD.root },
                { name: translate("adminStore.userReviews.reviewView") },
              ]}
            />
            <Card sx={{ p: 3 }}>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 720 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          {translate("adminStore.userReviews.no")}
                        </TableCell>
                        <TableCell>
                          {translate("adminStore.userReviews.userNamee")}{" "}
                        </TableCell>
                        <TableCell>
                          {translate("adminStore.userReviewscomment")}{" "}
                        </TableCell>
                        <TableCell>
                          {translate("adminStore.userReviews.rating")}
                        </TableCell>
                        <TableCell>
                          {translate("adminStore.userReviews.action")}
                        </TableCell>
                        <TableCell />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {productReviews?.map((row, i) => {
                        return (
                          <TableRow key={row.id}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.comment}</TableCell>
                            <TableCell>{row.rating}</TableCell>
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
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            </Card>
          </Box>
        </Page>
      </div>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions openDelete={handleOpenDelete} openEdit={handleOpenEdit} />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete-review"
      >
        <DialogTitle id="delete-review">
          {translate("adminStore.userReviews.deleteReview")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                marginTop: 3,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(1, 1fr)",
                },
              }}
            >
              <Typography>
                {translate("adminStore.userReviews.areYouSure")}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} variant="contained" color="error">
            {translate("adminStore.userReviews.delete")}
          </Button>
          <Button onClick={handleCloseDelete}>
            {translate("adminStore.userReviews.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
      <EditDialog
        onClose={handleCloseEdit}
        open={openEdit}
        selectedId={selectedId}
        fetchReviewsOfSingleProduct={fetchReviewsOfSingleProduct}
      />
    </>
  );
};

const EditDialog = ({
  open,
  onClose,
  selectedId,
  fetchReviewsOfSingleProduct,
}) => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { methods, fetchReviewById, onSubmit } = useEditReviews(
    selectedId,
    onClose,
    fetchReviewsOfSingleProduct
  );

  useEffect(() => {
    if (open) fetchReviewById(selectedId);
  }, [selectedId, open]);

  return (
    <Dialog
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      aria-labelledby="delete-review"
    >
      <DialogTitle id="delete-review">
        {translate("adminStore.userReviews.editReview")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <EditForm methods={methods} onSubmit={onSubmit} onClose={onClose} />
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewView;
