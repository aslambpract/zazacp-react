// @mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
} from "@mui/material";
// utils
import useLocales from "src/hooks/useLocales";

// components
import Scrollbar from "src/components/Scrollbar";

const DataList = () => {
  const { translate } = useLocales();
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
                  <TableCell>{translate("userFinancial.depositWallet.paymentType")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>Shibi</TableCell>
                  <TableCell>Card</TableCell>
                  <TableCell>$ 5784</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
};

export default DataList;
