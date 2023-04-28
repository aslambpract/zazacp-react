import { Dialog, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRef, useState } from "react";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import { EditForm } from "../components/form";
import TableWrapper from "./components/TableWrapper";
import Actions from "./components/actions";
import DeleteDialog from "./components/deleteDialog";
import StatusPopup from "./components/statusPopup";
import ticketRow from "./components/ticketRow";
import useStatusChange from "./hooks/useStatusChange";
import useTicketList from "./hooks/useTicketsList";

const Index = ({ title }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { ticketList, fetchTicketList, rowStart, ...rest } = useTicketList();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [impersonationId, setImpersonationId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleToggle = (id) => (e) => {
    setSelectedId(id);
    setOpen((prevOpen) => !prevOpen);
    anchorRef.current = e.currentTarget;
  };

  const handleClose = (event) => {
    if (!(anchorRef.current && anchorRef.current.contains(event.target)))
      setOpen(false);
  };

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id, userId) => (event) => {
    setImpersonationId(userId);
    setOpenMenuActions(event.currentTarget);
    setSelectedId(id);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleCloseMenu();
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(true);
    handleClose();
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const changeStatus = useStatusChange(selectedId, () => {
    fetchTicketList();
    setOpen(false);
  });

  return (
    <>
      <Typography variant="subtitle2" sx={{ m: 2 }}>
        {title}
      </Typography>

      <TableWrapper ref={anchorRef}>
        {ticketList.map(ticketRow(handleToggle, handleOpenMenu, rowStart))}
      </TableWrapper>

      <TableMenu open={openMenu} onClose={handleCloseMenu}>
        <Actions
          impersonationId={impersonationId}
          openEdit={handleOpenEdit}
          openDelete={handleOpenDelete}
          id={selectedId}
        />
      </TableMenu>

      <StatusPopup
        changeStatus={changeStatus}
        onClose={handleClose}
        open={open}
        ref={anchorRef}
      />

      <DeleteDialog
        fetchData={fetchTicketList}
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
        aria-labelledby="delete-category"
      >
        <EditForm
          onClose={handleCloseEdit}
          reload={fetchTicketList}
          selectedId={selectedId}
        />
      </Dialog>

      <PaginationButtons {...rest} />
    </>
  );
};

export default Index;
