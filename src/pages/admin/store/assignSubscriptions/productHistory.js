import { useState } from "react";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import BlockDialog from "src/pages/admin/members/network/component/BlockDialog";
import Actions from "./Actions";
import EditDialog from "./EditDialog";
import Options from "./Options";
import AddProductDialog from "./addProductDialog";
import ProductHistoryTable from "./components/ProductHistoryTable";
import UserList from "./components/UserList";
import DeleteDialog from "./deleteDialog";
import useProductHistoryList from "./hooks/useProductHistoryList";
import ReportCard from "./reportCard";

const ProductHistory = () => {
  const [openMenu, setOpenMenuActions] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const { fetchProductHistoryList, productHistoryList, rowStart, ...rest } =
    useProductHistoryList();

  const handleOpenMenu = (id, user_id, blocked) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setIsBlocked(blocked);
    setUserId(user_id);
    setSelectedId(id);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openAddComProduct, setOpenAddComProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleCloseMenu();
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedId(null);
  };

  const handleClickOpenAddProduct = () => {
    setOpenAddProduct(true);
  };

  const handleClickOpenAddComProduct = () => {
    setOpenAddComProduct(true);
  };

  const handleClickOpenEditProduct = () => {
    setOpenEditProduct(true);
    handleCloseMenu();
  };

  const handleCloseAddProduct = () => {
    setOpenAddProduct(false);
  };

  const handleCloseAddComProduct = () => {
    setOpenAddComProduct(false);
  };

  const handleCloseEditProduct = () => {
    setOpenEditProduct(false);
  };

  const handleOpenBlock = () => {
    setOpenBlock(true);
    handleCloseMenu();
  };

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };

  return (
    <div>
      <Page title="Product History: Store">
        <Options
          openCombo={handleClickOpenAddComProduct}
          openProduct={handleClickOpenAddProduct}
        />
        <ReportCard fetchData={fetchProductHistoryList} />
        <UserList>
          <ProductHistoryTable
            rowStart={rowStart}
            dataList={productHistoryList}
            handleOpenMenu={handleOpenMenu}
          />

          <TableMenu onClose={handleCloseMenu} open={openMenu}>
            <Actions
              isBlocked={isBlocked}
              openBlock={handleOpenBlock}
              userId={userId}
              openDelete={handleOpenDelete}
              openEdit={handleClickOpenEditProduct}
            />
          </TableMenu>
        </UserList>

        <BlockDialog
          isBlocked={isBlocked}
          selectedId={userId}
          open={openBlock}
          onClose={handleCloseBlock}
          fetchData={fetchProductHistoryList}
        />

        <DeleteDialog
          deleteId={selectedId}
          open={openDelete}
          onClose={handleCloseDelete}
          fetchData={fetchProductHistoryList}
        />

        <EditDialog
          open={openEditProduct}
          onClose={handleCloseEditProduct}
          selectedId={selectedId}
          fetchData={fetchProductHistoryList}
        />

        <AddProductDialog
          open={openAddProduct}
          onClose={handleCloseAddProduct}
          fetchData={fetchProductHistoryList}
        />

        <AddProductDialog
          open={openAddComProduct}
          onClose={handleCloseAddComProduct}
          fetchData={fetchProductHistoryList}
          isCombo
        />
        <PaginationButtons {...rest} />
      </Page>
    </div>
  );
};

export default ProductHistory;
