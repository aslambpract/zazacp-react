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
import departmentRow from "./components/departmentRow";
import { AddForm, EditForm } from "./components/form";
import useFetchDepartmentList from "./hooks/useFetchDepartmentList";

const Index = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openAddDepartment, setOpenAddDepartment] = useState(false);
  const [departmentId, setDepartmentId] = useState(null);
  const { departmentList, fetchDepartmentList, rowStart, ...rest } =
    useFetchDepartmentList();
  const handleClickOpenAddDepartment = () => {
    setOpenAddDepartment(true);
  };

  const handleCloseAddDepartment = () => {
    setOpenAddDepartment(false);
  };

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setDepartmentId(id);
  };
  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    handleCloseMenu();
  };
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const buttonProps = {
    size: isSmallScreen ? "small" : "medium",
  };

  const handleCloseEdit = () => setOpenEdit(false);
  return (
    <div>
      <Grid container>
        <Grid item sm={12} mr={1} mb={1} mt={1}>
          <Box display="flex" justifyContent="flex-start">
            <Typography variant="subtitle2">
              {translate("adminCommunication.helpCenter.department")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              {...buttonProps}
              variant="contained"
              startIcon={<Iconify icon={"eva:plus-fill"} />}
              onClick={handleClickOpenAddDepartment}
            >
              {translate("adminCommunication.helpCenter.department")}
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
                  {translate("adminCommunication.helpCenter.name")}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.status")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.descriptions")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.action")}{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departmentList.map(departmentRow(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          departmentId={departmentId}
          fetchDepartmentList={fetchDepartmentList}
          close={handleCloseMenu}
          openEdit={handleOpenEdit}
        />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddDepartment}
        onClose={handleCloseAddDepartment}
        aria-labelledby="create-article"
      >
        <AddForm
          onClose={handleCloseAddDepartment}
          reload={fetchDepartmentList}
        />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="create-article"
      >
        <EditForm
          editId={departmentId}
          onClose={handleCloseEdit}
          reload={fetchDepartmentList}
        />
      </Dialog>

      <PaginationButtons {...rest} />
    </div>
  );
};

export default Index;
