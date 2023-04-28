import { useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { useNavigate } from "react-router";
import Actions from "src/components/Actions";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import axiosInstance from "src/utils/axios";
import couponRow from "./couponRow";
import useCoupons from "./hooks/useCoupons";

const CouponList = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { enqueueSnackbar } = useSnackbar();
  const { couponList, fetchCouponList, rowStart, ...rest } = useCoupons();
  const navigate = useNavigate();
  const [openMenu, setOpenMenuActions] = useState(null);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setSelectedCouponId(id);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
    setSelectedCouponId(null);
  };

  const navigateToEdit = () =>
    navigate(`${PATH_DASHBOARD.store.coupons_edit}/${selectedCouponId}`);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleCloseMenu();
  };

  const deleteCoupon = async () => {
    const reqData = new FormData();
    reqData.append("_method", "DELETE");
    try {
      const { data, status } = await axiosInstance.post(
        `api/admin/coupons/${selectedCouponId}`,
        reqData
      );
      if (status === 200) {
        enqueueSnackbar(data.message);
        handleCloseDelete();
        fetchCouponList();
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, { variant: "error" });
    }
  };

  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminStore.coupons.no")}</TableCell>
                <TableCell>
                  {translate("adminStore.coupons.couponName")}
                </TableCell>
                <TableCell>{translate("adminStore.coupons.code")}</TableCell>
                <TableCell>
                  {translate("adminStore.coupons.discountFix")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminStore.coupons.startDate")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminStore.coupons.endDate")}{" "}
                </TableCell>
                <TableCell>{translate("adminStore.coupons.status")}</TableCell>
                <TableCell>{translate("adminStore.coupons.action")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {couponList.map(couponRow(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions openEdit={navigateToEdit} openDelete={handleOpenDelete} />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete-video"
      >
        <DialogTitle id="delete-video">
          {translate("adminStore.coupons.deleteCoupon")}
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
                {translate("adminStore.coupons.areYouSure")}
              </Typography>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteCoupon} variant="contained" color="error">
            {translate("adminStore.coupons.delete")}
          </Button>
          <Button onClick={handleCloseDelete}>
            {translate("adminStore.coupons.cancel")}
          </Button>
        </DialogActions>
      </Dialog>
      <PaginationButtons {...rest} />
    </div>
  );
};

export default CouponList;
