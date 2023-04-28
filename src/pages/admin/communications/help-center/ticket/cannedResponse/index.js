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
import cannedRow from "./components/cannedRow";
import { AddForm, EditForm } from "./components/form";
import useCannedResponseList from "./hooks/useCannedRespnoseList";

const Index = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openAddCanned, setOpenAddCanned] = useState(false);
  const [cannedId, setCannedId] = useState(null);
  const { cannedList, fetchCannedList, rowStart, ...rest } =
    useCannedResponseList();
  const handleClickOpenAddCannedResponse = () => {
    setOpenAddCanned(true);
  };

  const handleCloseAddCanned = () => {
    setOpenAddCanned(false);
  };

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setCannedId(id);
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
              {translate("adminCommunication.helpCenter.cannedResponse")}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <Button
              {...buttonProps}
              variant="contained"
              startIcon={<Iconify icon={"eva:plus-fill"} />}
              onClick={handleClickOpenAddCannedResponse}
            >
              {translate("adminCommunication.helpCenter.cannedResponse")}
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
                  {translate("adminCommunication.helpCenter.title")}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.delete")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminCommunication.helpCenter.action")}{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cannedList.map(cannedRow(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          openEdit={handleOpenEdit}
          cannedId={cannedId}
          fetchCannedList={fetchCannedList}
          close={handleCloseMenu}
        />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddCanned}
        onClose={handleCloseAddCanned}
        aria-labelledby="add-categories"
      >
        <AddForm onClose={handleCloseAddCanned} reload={fetchCannedList} />
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="add-categories"
      >
        <EditForm
          selectedId={cannedId}
          onClose={handleCloseEdit}
          reload={fetchCannedList}
        />
      </Dialog>
      <PaginationButtons {...rest} />
    </div>
  );
};

export default Index;
