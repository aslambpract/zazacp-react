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
import useFetchDepositWallet from "../hooks/useFetchDepositWallet";
import useLocales from "src/hooks/useLocales";

const DataList = () => {
  const { translate } = useLocales();
  const { data, rowStart, ...rest } = useFetchDepositWallet();
  return (
    <>
      <Card sx={{ mt: 2 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("userFinancial.depositWallet.no")}</TableCell>
                  <TableCell>{translate("userFinancial.depositWallet.userName")}</TableCell>
                  <TableCell>{translate("userFinancial.depositWallet.paymentMethod")}</TableCell>
                  <TableCell>{translate("userFinancial.depositWallet.paymentAmount")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data?.map(
                  ({ id, user, payment_type, total_amount, from_user }, i) => {
                    return (
                      <TableRow key={id}>
                        <TableCell>{i + rowStart}</TableCell>
                        <TableCell>{from_user.username}</TableCell>
                        <TableCell>{payment_type}</TableCell>
                        <TableCell>{total_amount}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      {/* <PaginationButtons {...rest} /> */}
    </>
  );
};

export default DataList;
