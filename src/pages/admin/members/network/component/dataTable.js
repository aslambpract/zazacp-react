import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import PaginationButtons from "src/components/pagination";
import Scrollbar from "src/components/Scrollbar";
import TableMenu from "src/components/tableMenu";

import useLocales from "src/hooks/useLocales";
import Actions from "./actions";
import BlockDialog from "./BlockDialog";
import DataFilter from "./dataFilter";
import EditUserNameDialog from "./editUserNameDialog";
import useMembers from "./hooks/useMembers";
import memberRow from "./memberRow";
import TurnOfMail from "./turnOfMailDialog";
import UpdatePasswordDialog from "./updatePasswordDialog";
import VerifyMail from "./verifyMail";

const DataTable = () => {
  const { translate } = useLocales();
  const { fetchMemberList, membersList, rowStart, ...rest } =
    useMembers("network");
  const [openMenu, setOpenMenuActions] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isMailTurnedOn, setIsMailTurnedOn] = useState(false);

  const [isMailVerified, setIsMailVerified] = useState(false);

  const handleOpenMenu =
    (id, blockedStatus, isMailTurnedOn, mailVerified) => (event) => {
      setIsBlocked(blockedStatus);
      setOpenMenuActions(event.currentTarget);
      setSelectedId(id);
      setIsMailTurnedOn(isMailTurnedOn);
      setIsMailVerified(mailVerified);
    };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleClickOpenChangePassword = () => {
    setUserName(getUserName());
    setOpenChangePassword(true);
    handleCloseMenu();
  };
  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
    setUserName(null);
  };

  const [username, setUserName] = useState(null);
  const getUserName = () =>
    membersList.find((member) => member.id === selectedId).username;

  const [openChangeUsername, setOpenChangeUsername] = useState(false);

  const handleClickOpenChangeUsername = () => {
    setUserName(getUserName());
    setOpenChangeUsername(true);
    handleCloseMenu();
  };
  const handleCloseChangeUsername = () => {
    setOpenChangeUsername(false);
    setUserName(null);
  };

  const [openBlock, setOpenBlock] = useState(false);
  const handleOpenBlock = () => setOpenBlock(true);
  const handleCloseBlock = () => {
    setOpenBlock(false);
    handleCloseMenu();
  };

  const [openTurnOnMail, setOpenTurnOnMail] = useState(false);

  const handleOpenTurnOnMail = () => {
    setOpenTurnOnMail(true);
    handleCloseMenu();
  };

  const handleCloseTurnOnMail = () => {
    setOpenTurnOnMail(false);
  };

  const [openVerify, setOpenVerify] = useState(false);
  const handleOpenVerify = () => {
    setOpenVerify(true);
    handleCloseMenu();
  };

  const handleCloseVerify = () => {
    setOpenVerify(false);
  };

  return (
    <>
      <Card>
        <DataFilter fetchData={fetchMemberList} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminMembersManagement.networkMembers.no")}
                  </TableCell>
                  <TableCell>
                    {translate("adminMembersManagement.networkMembers.userID")}
                  </TableCell>
                  <TableCell>
                    {translate("adminMembersManagement.networkMembers.email")}
                  </TableCell>
                  <TableCell>
                    {translate(
                      "adminMembersManagement.networkMembers.paidActive"
                    )}
                  </TableCell>
                  <TableCell>
                    {translate(
                      "adminMembersManagement.networkMembers.createdAt"
                    )}
                  </TableCell>
                  <TableCell>
                    {translate("adminMembersManagement.networkMembers.action")}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {membersList.map(memberRow(handleOpenMenu, rowStart))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <Divider />
      </Card>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          isMailVerified={isMailVerified}
          handleOpenVerify={handleOpenVerify}
          handleOpenTurnOnMail={handleOpenTurnOnMail}
          isMailTurnedOn={isMailTurnedOn}
          isBlocked={isBlocked}
          openChangePassword={handleClickOpenChangePassword}
          openChangeUsername={handleClickOpenChangeUsername}
          openBlock={handleOpenBlock}
          selectedId={selectedId}
          fetchMemberList={fetchMemberList}
        />
      </TableMenu>

      <BlockDialog
        isBlocked={isBlocked}
        onClose={handleCloseBlock}
        open={openBlock}
        selectedId={selectedId}
        fetchData={fetchMemberList}
      />

      <TurnOfMail
        isMailTurnedOn={isMailTurnedOn}
        onClose={handleCloseTurnOnMail}
        open={openTurnOnMail}
        selectedId={selectedId}
        fetchData={fetchMemberList}
      />

      <VerifyMail
        fetchData={fetchMemberList}
        onClose={handleCloseVerify}
        open={openVerify}
        selectedId={selectedId}
      />
      <UpdatePasswordDialog
        open={openChangePassword}
        username={username}
        fetchData={fetchMemberList}
        onClose={handleCloseChangePassword}
      />
      <EditUserNameDialog
        open={openChangeUsername}
        onClose={handleCloseChangeUsername}
        username={username}
        fetchData={fetchMemberList}
      />
      <PaginationButtons {...rest} />
    </>
  );
};

export default DataTable;
