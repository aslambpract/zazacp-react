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
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import TableMenu from "src/components/tableMenu";
import useLocales from "src/hooks/useLocales";
import { isBinary } from "src/utils/isBinary";
import Actions from "./components/Actions";
import Row from "./components/Row";
import { AddForm, EditForm } from "./components/form";
import useList from "./hooks/useList";

const Index = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { businessList, fetchBusinessList, rowStart, ...rest } = useList();
  const [openAddBusiness, setOpenAddBusiness] = useState(false);
  const [businessId, setCategoriesId] = useState(null);

  const handleClickOpenAddBusiness = () => {
    setOpenAddBusiness(true);
  };

  const handleCloseAddBusiness = () => {
    setOpenAddBusiness(false);
  };

  const [openMenu, setOpenMenuActions] = useState(null);
  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setCategoriesId(id);
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

  return (
    <>
      <Grid container>
        <Grid item sm={12} mr={1} mb={1} mt={1}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              startIcon={<Iconify icon={"eva:plus-fill"} />}
              onClick={handleClickOpenAddBusiness}
            >
              {translate("adminSettings.businessBuilder.add")}
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
                  {translate("adminSettings.businessBuilder.no")}
                </TableCell>
                <TableCell>
                  {translate("adminSettings.businessBuilder.name")}
                </TableCell>
                <TableCell>
                  {translate("adminSettings.businessBuilder.amount")}{" "}
                </TableCell>
                {isBinary() && (
                  <TableCell>
                    {translate("adminSettings.businessBuilder.Bv")}{" "}
                  </TableCell>
                )}
                <TableCell>
                  {translate("adminSettings.businessBuilder.action")}{" "}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businessList.map(Row(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          openEdit={handleOpenEdit}
          businessId={businessId}
          reload={fetchBusinessList}
          close={handleCloseMenu}
        />
      </TableMenu>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openAddBusiness}
        onClose={handleCloseAddBusiness}
        aria-labelledby="add-business"
      >
        <AddForm onClose={handleCloseAddBusiness} reload={fetchBusinessList} />
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="add-business"
      >
        <EditForm
          selectedId={businessId}
          onClose={handleCloseEdit}
          reload={fetchBusinessList}
        />
      </Dialog>

      <PaginationButtons {...rest} />
    </>
  );
};

export default Index;
