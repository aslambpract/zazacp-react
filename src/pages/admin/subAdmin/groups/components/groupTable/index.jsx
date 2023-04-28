import { Card, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useMemo, useState } from "react";
import Iconify from "src/components/Iconify";
import PaginationButtons from "src/components/pagination";
import useLocales from "src/hooks/useLocales";
import Actions from "./actions";
import DeleteDialog from "./deleteDialog";
import useGroupTable from "./hooks/useGroupTable";

const GroupTable = ({ onEdit, load }) => {
  const { translate } = useLocales();
  const { groupList, fetchData, rowStart, ...rest } = useGroupTable();
  const [openMenu, setOpenMenu] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [openedDialog, setOpenedDialog] = useState(null);

  const toggleMenu = (id) => (e) => {
    if (id) setActiveId(id);
    setOpenMenu(openMenu ? null : e.currentTarget);
    setOpenedDialog(null);
  };

  const handleAction = (name = null) => {
    toggleMenu()();
    setOpenedDialog(name);
  };

  useMemo(() => {
    if (openedDialog === "edit") {
      const { name, description, sub_admin_group_permissions } =
        groupList.find(({ id }) => id === activeId) || {};
      const { permission_string } =
        sub_admin_group_permissions?.find(Boolean) || {};
      const data = {
        id: activeId,
        permissionString: JSON.parse(permission_string),
        name,
        description,
      };
      onEdit(data);
    }
  }, [openedDialog]);

  useMemo(() => {
    if (load) {
      fetchData();
    }
  }, [load]);

  return (
    <>
      <Card sx={{ p: 3 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{translate("no")}</TableCell>
                <TableCell align="left">{translate("name")}</TableCell>
                <TableCell align="left">{translate("createdAt")}</TableCell>
                <TableCell align="left">{translate("action")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groupList.map((row, i) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + rowStart}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="left">
                    {new Date(row.created_at).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton onClick={toggleMenu(row.id)}>
                      <Iconify icon="ic:outline-more-vert" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <PaginationButtons {...rest} />
      </Card>
      <Actions forwardRef={openMenu} onClose={handleAction} />

      <DeleteDialog
        fetchData={fetchData}
        name="delete"
        openedDialog={openedDialog}
        selectedId={activeId}
        onClose={() => setOpenedDialog(null)}
      />
    </>
  );
};

export default GroupTable;
