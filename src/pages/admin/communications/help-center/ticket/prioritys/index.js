import {
  Box,
  Button,
  Dialog,
  Grid,
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
import { useState } from "react";

import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import Actions from "./components/Actions";
import { AddForm, EditForm } from "./components/form";
import priorityRow from "./components/priorityRow";
import usePriorities from "./hooks/usePriorities";

const Index = () => {
  const { translate } = useLocales();
  {
    translate("adminCommunication.helpCenter.editCannnedResponse");
  }
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openAddPriority, setOpenAddPriority] = useState(false);
  const [priorityId, setPriorityId] = useState(null);

  const { fetchPriorities, priorities, rowStart, ...rest } = usePriorities();
  const handleClickOpenAddPriority = () => {
    setOpenAddPriority(true);
  };

  const handleCloseAddPriority = () => {
    setOpenAddPriority(false);
  };

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setPriorityId(id);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleCloseMenu();
  };
  const handleCloseEdit = () => setOpenEdit(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };
  return (
    <div>
      <Grid container>
        <Grid item sm={12} mr={1} mb={1} mt={1}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="subtitle2">
              {translate("adminCommunication.helpCenter.priority")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              {...buttonProps}
              variant="contained"
              startIcon={<Iconify icon={"eva:plus-fill"} />}
              onClick={handleClickOpenAddPriority}
            >
              {translate("adminCommunication.helpCenter.priority")}
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Scrollbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {translate("adminCommunication.helpCenter.no")}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.priority")}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.priorityDesc")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.priorityColor")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.status")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.action")}{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priorities.map(priorityRow(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          priorityId={priorityId}
          fetchPriorityList={fetchPriorities}
          close={handleCloseMenu}
          openEdit={handleOpenEdit}
        />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddPriority}
        onClose={handleCloseAddPriority}
        aria-labelledby="add-priority"
      >
        <AddForm onClose={handleCloseAddPriority} refresh={fetchPriorities} />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="add-priority"
      >
        <EditForm
          onClose={handleCloseEdit}
          refresh={fetchPriorities}
          editId={priorityId}
        />
      </Dialog>

      <PaginationButtons {...rest} />
    </div>
  );
};

export default Index;
