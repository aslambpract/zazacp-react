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

import Scrollbar from "src/components/Scrollbar";
import DataFilter from "../../shared/dataFilter";
import useFetchEWallet from "../hooks/useFetchEWallet";
import useLocales from "src/hooks/useLocales";

const   DataTable = () => {
  const { translate } = useLocales();
  const { data, fetchData, rowStart, ...rest } = useFetchEWallet();
  return (
    <>
      <Card>
        <DataFilter fetchData={fetchData} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("adminFinancial.Ewallet.no")}</TableCell>
                  <TableCell>{translate("adminFinancial.Ewallet.userName")} </TableCell>
                  <TableCell>{translate("adminFinancial.Ewallet.fromUser")} </TableCell>
                  <TableCell>{translate("adminFinancial.Ewallet.amountType")} </TableCell>
                  <TableCell>{translate("adminFinancial.Ewallet.amount")}</TableCell>
                  <TableCell>{translate("adminFinancial.Ewallet.date")}</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow key={item.id}>
                    <TableCell>{i + rowStart}</TableCell>
                    <TableCell>{item.user.username}</TableCell>
                    <TableCell>{item.fromuser.username}</TableCell>
                    <TableCell>{item.payment_type}</TableCell>
                    <TableCell>{item.payable_amount}</TableCell>
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
      <PaginationButtons {...rest} />
    </>
  );
};

export default DataTable;
