import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
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
                  <TableCell>{translate("userFinancial.eWallet.no")}</TableCell>
                  <TableCell>{translate("userFinancial.eWallet.fromUser")}</TableCell>
                  <TableCell>{translate("userFinancial.eWallet.amountType")}</TableCell>
                  <TableCell>{translate("userFinancial.eWallet.amount")}</TableCell>
                  <TableCell>{translate("userFinancial.eWallet.date")}</TableCell>
                  <TableCell>{translate("userFinancial.eWallet.paymentStatus")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow>
                    <TableCell>{i + rowStart}</TableCell>
                    <TableCell>{item.from_user.username}</TableCell>
                    <TableCell>{item.payment_type}</TableCell>
                    <TableCell>{item.total_amount}</TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>{item.payment_status}</TableCell>
                  </TableRow>
                ))}
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
