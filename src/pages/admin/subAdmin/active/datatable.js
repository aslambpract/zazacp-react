import {
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
import { Link } from "react-router-dom";

import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import TableMenu from "src/components/tableMenu";
import useImpersonate from "src/hooks/useImpersonate";
import useLocales from "src/hooks/useLocales";
import { PATH_DASHBOARD } from "src/routes/paths";
import BlockDialog from "./BlockDialog";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

const DataTable = ({ data, fetchData, rowStart }) => {
  const { translate } = useLocales();
  const [selectedId, setSelectedId] = useState(null);
  const [userId, setUserId] = useState(null);
  const onImpersonate = useImpersonate(userId);
  const [openMenu, setOpenMenuActions] = useState(null);
  const [isBlocked, setIsBlocked] = useState(true);

  const handleOpenMenu = (id, blockedStatus, uid) => (event) => {
    setUserId(uid);
    setSelectedId(id);
    setIsBlocked(blockedStatus);
    setOpenMenuActions(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setSelectedId(null);
    setOpenMenuActions(null);
  };

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => {
    setOpenDelete(false);
    handleCloseMenu();
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => {
    setOpenEdit(false);
    handleCloseMenu();
  };

  const [openBlockUser, setOpenBlockUser] = useState(false);
  const handleOpenBlockUser = () => setOpenBlockUser(true);
  const handleCloseBlockUser = () => {
    setOpenBlockUser(false);
    handleCloseMenu();
  };
  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  {translate("adminSubAdmin.subAdmin.no")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminSubAdmin.subAdmin.name")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminSubAdmin.subAdmin.userName")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminSubAdmin.subAdmin.email")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminSubAdmin.subAdmin.userGroup")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminSubAdmin.subAdmin.created")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminSubAdmin.subAdmin.action")}{" "}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{i + rowStart}</TableCell>
                    <TableCell>{row.user?.user_profile?.first_name}</TableCell>
                    <TableCell>{row.user.username}</TableCell>
                    <TableCell>{row.user.email}</TableCell>
                    <TableCell>{row.user_group.name}</TableCell>
                    <TableCell>
                      {new Date(row.created_at).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={handleOpenMenu(
                          row.id,
                          Boolean(row.active),
                          row.user_id
                        )}
                      >
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

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <MenuItem sx={{ color: "default.main" }} onClick={onImpersonate}>
          <Iconify icon={"ant-design:user-switch-outlined"} />
          {translate("adminSubAdmin.subAdmin.impersonate")}
        </MenuItem>
        <MenuItem sx={{ color: "default.main" }} onClick={handleOpenEdit}>
          <Iconify icon={"akar-icons:edit"} />
          {translate("adminSubAdmin.subAdmin.edit")}
        </MenuItem>
        <MenuItem
          sx={{ color: "default.main" }}
          component={Link}
          to={`${PATH_DASHBOARD.members.member_profile}/${userId}`}
        >
          <Iconify icon={"ant-design:user-outlined"} />
          {translate("adminSubAdmin.subAdmin.profile")}
        </MenuItem>
        <MenuItem sx={{ color: "warning.main" }} onClick={handleOpenBlockUser}>
          <Iconify icon={"akar-icons:block"} />
          {!isBlocked
            ? translate("adminSubAdmin.subAdmin.unBlockUser")
            : translate("adminSubAdmin.subAdmin.blockUser")}
        </MenuItem>
        <Divider />
        <MenuItem sx={{ color: "error.main" }} onClick={handleOpenDelete}>
          <Iconify icon={"eva:trash-2-outline"} />
          {translate("adminSubAdmin.subAdmin.delete")}
        </MenuItem>
      </TableMenu>

      <DeleteDialog
        fetchData={fetchData}
        open={openDelete}
        selectedId={selectedId}
        onClose={handleCloseDelete}
      />

      <EditDialog
        fetchData={fetchData}
        onClose={handleCloseEdit}
        open={openEdit}
        selectedId={selectedId}
      />

      <BlockDialog
        isBlocked={isBlocked}
        fetchData={fetchData}
        onClose={handleCloseBlockUser}
        open={openBlockUser}
        selectedId={selectedId}
      />
    </div>
  );
};

export default DataTable;
