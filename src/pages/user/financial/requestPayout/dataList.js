import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";

const DataList = ({ data, rowStart }) => {
  const { translate } = useLocales();
  return (
    <>
      <Card sx={{ mt: 2 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("userFinancial.requestPayout.no")}</TableCell>
                  <TableCell>{translate("userFinancial.requestPayout.amount")}</TableCell>
                  <TableCell>{translate("userFinancial.requestPayout.walletAddress")}</TableCell>
                  <TableCell>{translate("userFinancial.requestPayout.coin")}</TableCell>
                  <TableCell>{translate("userFinancial.requestPayout.status")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(
                  (
                    { status, user_coin_address, available_coin, amount },
                    i
                  ) => {
                    const { address } = user_coin_address || {};
                    const { code } = available_coin || {};
                    return (
                      <TableRow>
                        <TableCell>{i + rowStart}</TableCell>
                        <TableCell>{amount}</TableCell>
                        <TableCell>{address}</TableCell>
                        <TableCell>{code}</TableCell>
                        <TableCell>{status}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
};

export default DataList;
