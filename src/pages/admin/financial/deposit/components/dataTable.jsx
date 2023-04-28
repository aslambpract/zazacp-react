import {
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PaginationButtons from "src/components/pagination";
import useLocales from "src/hooks/useLocales";
import Scrollbar from "src/components/Scrollbar";
import DataFilter from "../../shared/dataFilter";
import useFetchDepositWallet from "../hooks/useFetchDepositWallet";



const DataTable = () => {
  const { translate } = useLocales();
  const { data, fetchData, rowStart, ...rest } = useFetchDepositWallet();
  return (
    <>
      <div>
        <Card>
          <DataFilter fetchData={fetchData} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 720 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>{translate("adminFinancial.depositWallet.no")}</TableCell>
                    <TableCell>{translate("adminFinancial.depositWallet.userName")} </TableCell>
                    <TableCell>{translate("adminFinancial.depositWallet.amount")} </TableCell>
                    <TableCell>{translate("adminFinancial.depositWallet.paymentMethod")} </TableCell>
                    <TableCell>{translate("adminFinancial.depositWallet.date")}</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, i) => (
                    <TableRow key={item.id}>
                      <TableCell>{i + rowStart}</TableCell>
                      <TableCell>{item.user.username}</TableCell>
                      <TableCell>{item.payable_amount}</TableCell>
                      <TableCell>{item.payment_type}</TableCell>
                      <TableCell>
                        {new Date(item.created_at).toLocaleDateString("en-GB")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Divider />
        </Card>
      </div>

      <PaginationButtons {...rest} />
    </>
  );
};

export default DataTable;
