import {
  Card,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// components
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Iconify from "src/components/Iconify";
import Page from "src/components/Page";
import PaginationButtons from "src/components/pagination";
import Scrollbar from "src/components/Scrollbar";
import TableMenu from "src/components/tableMenu";
import { PATH_USER } from "src/routes/paths";
import useMyOrders from "./hooks/useMyOrders";
import _data from "./_data";
import useLocales from "src/hooks/useLocales";

const MyOrders = () => {
  const { translate } = useLocales();
  const navigate = useNavigate();

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const [openCombo, setOpenCombo] = useState(false);
  const { data, fetchData, rowStart, ...rest } = useMyOrders();

  return (
    <Page title= {translate("usersMyOrders.myOrdersTitile")} >
      <Container maxWidth="100%">
        <HeaderBreadcrumbs
          heading= {translate("usersMyOrders.myOrders")} 
          links={[
            { name:translate("dashboard") , href: PATH_USER.root },
            {
              name: translate("usersMyOrders.subscription"),
              href: PATH_USER.onlineStore.productSubscription.root,
            },
            { name: translate("usersMyOrders.myOrders") },
          ]}
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: "relative" }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell> {translate("usersMyOrders.no")} </TableCell>
                      <TableCell> {translate("usersMyOrders.invoiceId")} </TableCell>
                      <TableCell> {translate("usersMyOrders.paymentMethod")}  </TableCell>
                      <TableCell> {translate("usersMyOrders.orderDate")} </TableCell>
                      <TableCell> {translate("usersMyOrders.totalPrice")} </TableCell>
                      <TableCell> {translate("usersMyOrders.action")} </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, i) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {i + rowStart}
                          </TableCell>
                          <TableCell>{row.invoice_id}</TableCell>
                          <TableCell>{row.payment_type?.name}</TableCell>
                          <TableCell>{row.date}</TableCell>
                          <TableCell>{row.total_amount}</TableCell>
                          <TableCell>
                            <IconButton
                              LinkComponent={Link}
                              to={PATH_USER.my_orders.view(row.id)}
                            >
                              <Iconify icon="carbon:view" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </TableContainer>
          </Scrollbar>
        </Card>
        <PaginationButtons {...rest} />
      </Container>

      <TableMenu open={openMenu} onClose={handleCloseMenu}>
        <MenuItem
          onClick={() => {
            setOpenCombo(true);
          }}
        >
          <Iconify icon="carbon:view" />
          {translate("usersMyOrders.combo")}
        </MenuItem>
        <MenuItem onClick={() => navigate("view")}>
          <Iconify icon="carbon:view" />
         {translate("usersMyOrders.view")} 
        </MenuItem>
      </TableMenu>

      <Dialog open={openCombo} onClose={() => setOpenCombo(false)}>
        <DialogTitle>{translate("usersMyOrders.combo")}</DialogTitle>
      </Dialog>
    </Page>
  );
};

export default MyOrders;
