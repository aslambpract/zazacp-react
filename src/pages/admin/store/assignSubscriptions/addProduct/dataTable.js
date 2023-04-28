import { useEffect, useState } from "react";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import Scrollbar from "src/components/Scrollbar";
import axiosInstance from "src/utils/axios";
import Actions from "./Actions";
import EditDialog from "./EditDialog";
import productRow from "./productRow";
import TableMenu from "./tableMenu";
import useLocales from "src/hooks/useLocales";

const DataTable = () => {
  const { translate } = useLocales();
  const [productId, setProductId] = useState("");
  const [userId, setUserId] = useState();
  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id, userId) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setProductId(id);
    setUserId(userId);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };
  const [openCreateEdit, setOpenEdit] = useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const { count, onChange, page, seed } = usePagination();

  const [productList, setProductList] = useState([]);
  const fetchProductList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/business-builder-subscriptions?page=${page}`
      );
      const { status, data: subscriptions } = data;
      if (status) {
        seed(subscriptions.last_page);
        setProductList(subscriptions.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductList(page);
  }, [page]);

  return (
    <div>
      <Card sx={{ mt: 4 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("adminStore.assignSubscriptions.no")}</TableCell>
                  <TableCell>{translate("adminStore.assignSubscriptions.userName")}</TableCell>
                  <TableCell>{translate("adminStore.assignSubscriptions.bvUpdate")}</TableCell>
                  <TableCell>{translate("adminStore.assignSubscriptions.effectiveUntil")}</TableCell>
                  <TableCell>{translate("adminStore.assignSubscriptions.amount")}</TableCell>
                  <TableCell>{translate("adminStore.assignSubscriptions.date")}</TableCell>
                  <TableCell>{translate("adminStore.assignSubscriptions.action")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productList.map(productRow(handleOpenMenu))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <TableMenu onClose={handleCloseMenu} open={openMenu}>
          <Actions
            userId={userId}
            productId={productId}
            fetchProductList={fetchProductList}
            close={handleCloseMenu}
            openEdit={handleClickOpenEdit}
          />
        </TableMenu>
      </Card>

      <EditDialog
        open={openCreateEdit}
        onClose={handleCloseEdit}
        productId={productId}
        fetchData={() => fetchProductList(page)}
      />
      <PaginationButtons count={count} onChange={onChange} page={page} />
    </div>
  );
};

export default DataTable;
