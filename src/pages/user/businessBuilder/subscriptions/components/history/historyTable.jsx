import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import useLocales from "src/hooks/useLocales";
import { PATH_USER } from "src/routes/paths";

const HistoryTable = ({ history, rowStart }) => {
  const { translate } = useLocales();

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {translate("userBusinessBuilder.subscription.no")}
              </TableCell>
              <TableCell align="right">
                {translate("userBusinessBuilder.subscription.amount")}
              </TableCell>
              <TableCell align="right">
                {translate("userBusinessBuilder.subscription.purchaseDate")}
              </TableCell>
              <TableCell align="right">
                {translate("userBusinessBuilder.subscription.effectiveUntil")}
              </TableCell>
              <TableCell align="center">
                {translate("userBusinessBuilder.subscription.paymentMethod")}
              </TableCell>
              <TableCell align="center">
                {translate("userBusinessBuilder.subscription.view")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((row, i) => {
              return (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {i + rowStart}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.invoice_date}</TableCell>
                  <TableCell align="right">{row.effective_until}</TableCell>
                  <TableCell align="center">
                    {row.payment_method ? row.payment_method : "--"}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      component={Link}
                      to={PATH_USER.business_builder.invoice(row.id)}
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
    </>
  );
};

export default HistoryTable;
