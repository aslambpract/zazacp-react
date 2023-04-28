import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PaginationButtons from "src/components/pagination";
import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";

const DataList = ({ data, rowStart, ...rest }) => {
  const { translate } = useLocales();
  return (
    <>
      <Card sx={{ mt: 2 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("userFinancial.fundTransfer.no")}</TableCell>
                  <TableCell>{translate("userFinancial.fundTransfer.toUser")}</TableCell>
                  <TableCell>{translate("userFinancial.fundTransfer.paymentType")}</TableCell>
                  <TableCell>{translate("userFinancial.fundTransfer.walletType")}</TableCell>
                  <TableCell>{translate("userFinancial.fundTransfer.amount")}</TableCell>
                  <TableCell>{translate("userFinancial.fundTransfer.date")}</TableCell>
                  <TableCell>{translate("userFinancial.fundTransfer.note")}</TableCell>
                  <TableCell>{translate("userFinancial.fundTransfer.paymentStatus")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(
                  (
                    {
                      user,
                      debit_total,
                      payment_type,
                      wallet_type,
                      created_at,
                      note,
                      payment_status,
                      total_amount,
                    },
                    i
                  ) => {
                    return (
                      <TableRow>
                        <TableCell>{i + rowStart}</TableCell>
                        <TableCell>{user?.username}</TableCell>
                        <TableCell>{payment_type}</TableCell>
                        <TableCell>{wallet_type}</TableCell>
                        <TableCell>{total_amount}</TableCell>
                        <TableCell>
                          {new Date(created_at)?.toLocaleDateString("en-GB")}
                        </TableCell>
                        <TableCell>{note}</TableCell>
                        <TableCell>{payment_status}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      <PaginationButtons {...rest} />
    </>
  );
};

export default DataList;
