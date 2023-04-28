import {
  Autocomplete,
  Button,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import useUsersList from "src/components/UsersAutoComplete/hooks/useUsersList";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import DataFilter from "src/pages/admin/financial/shared/dataFilter";
import axiosInstance from "src/utils/axios";
import { isBinary } from "src/utils/isBinary";
import useMembers from "../../network/component/hooks/useMembers";
import TurnOfMail from "../../network/component/turnOfMailDialog";
import Actions from "./Actions";

const DataTable = () => {
  const { translate } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const [tankId, setTank] = useState(null);
  const usersList = useUsersList();
  const [userId, setUserId] = useState(null);
  const [impersonationId, setImpersonationId] = useState(null);
  const [mailTurnedOn, setMailTurnedOn] = useState(false);
  const [openMenu, setOpenMenuActions] = useState(null);
  const [openTunOfMail, setOpenTurnOfMail] = useState(false);
  const handleOpenMenu = (id, user_id, isMailTurnedOn) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setTank(id);
    setImpersonationId(user_id);
    setMailTurnedOn(Boolean(isMailTurnedOn));
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOpenToggleMail = () => {
    setOpenTurnOfMail(true);
    handleCloseMenu();
  };

  const handleCloseToggleMail = () => {
    setOpenTurnOfMail(false);
  };
  const {
    fetchMemberList: fetchHoldingTankList,
    membersList: holdingTankList,
    rowStart,
    ...rest
  } = useMembers("holding-tank");

  const addToBinary = (id) => async () => {
    const reqData = new FormData();
    reqData.append("user_id", userId);
    try {
      const { status, data } = await axiosInstance.post(
        `api/admin/add-to-binary/${id}`,
        reqData
      );
      if (status === 200) {
        fetchHoldingTankList(rest.page);
        enqueueSnackbar(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const binaryMode = isBinary();

  return (
    <>
      <Card>
        <DataFilter fetchData={fetchHoldingTankList} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminMembersManagement.holdingTank.no")}
                  </TableCell>
                  <TableCell>
                    {translate("adminMembersManagement.holdingTank.userName")}
                  </TableCell>
                  <TableCell>
                    {translate("adminMembersManagement.holdingTank.email")}
                  </TableCell>
                  <TableCell>
                    {translate("adminMembersManagement.holdingTank.paidActive")}
                  </TableCell>
                  <TableCell>
                    {translate("adminMembersManagement.holdingTank.joinedAt")}
                  </TableCell>
                  <TableCell>
                    {translate("adminMembersManagement.holdingTank.team")}
                  </TableCell>

                  <TableCell>
                    {translate("adminMembersManagement.holdingTank.status")}
                  </TableCell>
                  <TableCell>
                    {translate(
                      binaryMode
                        ? "adminMembersManagement.holdingTank.addToBinary"
                        : "approve"
                    )}
                  </TableCell>

                  <TableCell>
                    {translate("adminMembersManagement.holdingTank.action")}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {holdingTankList.map(
                  (
                    {
                      holding_tank,
                      id,
                      username,
                      email,
                      created_at,
                      paid_active,
                      user_profile,
                      is_turn_on_email,
                    },
                    i
                  ) => {
                    return (
                      <TableRow key={id}>
                        <TableCell>{i + rowStart}</TableCell>
                        <TableCell>{username}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>
                          {paid_active === 0 ? "no" : "yes"}
                        </TableCell>
                        <TableCell>
                          {new Date(created_at).toLocaleDateString("en-GB")}
                        </TableCell>
                        <TableCell>
                          <Autocomplete
                            onChange={(_, { user_id }) => {
                              setUserId(user_id);
                            }}
                            options={usersList}
                            getOptionLabel={(option) => option.username}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                name="user_name"
                                id="outlined-basic"
                                label="Enter Username"
                                variant="outlined"
                                style={{ width: "150px" }}
                                size="small"
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          {Boolean(user_profile.active)
                            ? translate(
                                "adminMembersManagement.holdingTank.approved"
                              )
                            : translate(
                                "adminMembersManagement.holdingTank.pending"
                              )}
                        </TableCell>
                        <TableCell>
                          <Button
                            onClick={addToBinary(holding_tank.id)}
                            size="small"
                          >
                            {translate(
                              binaryMode
                                ? "adminMembersManagement.holdingTank.binary"
                                : "approve"
                            )}
                          </Button>
                        </TableCell>

                        <TableCell>
                          <IconButton
                            onClick={handleOpenMenu(
                              holding_tank.id,
                              user_profile.id,
                              Boolean(is_turn_on_email)
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
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          isMailTurnedOn={mailTurnedOn}
          impersonationId={impersonationId}
          tankId={tankId}
          fetchHoldingTankList={fetchHoldingTankList}
          close={handleCloseMenu}
          openToggleMail={handleOpenToggleMail}
        />
      </TableMenu>
      <PaginationButtons {...rest} />

      <TurnOfMail
        fetchData={fetchHoldingTankList}
        isMailTurnedOn={mailTurnedOn}
        selectedId={impersonationId}
        onClose={handleCloseToggleMail}
        open={openTunOfMail}
      />
    </>
  );
};

export default DataTable;
