import { TableCell, TableHead, TableRow } from "@mui/material";
import useLocales from "src/hooks/useLocales";

const TableHeaderRow = () =>{
  const { translate } = useLocales();

  return(
    <TableHead>
      <TableRow>
        <TableCell>{translate("adminFinancial.payout.no")}</TableCell>
        <TableCell>{translate("adminFinancial.payout.userName")} </TableCell>
        <TableCell>{translate("adminFinancial.payout.userBalance")} </TableCell>
        <TableCell>{translate("adminFinancial.payout.walletAddress")} </TableCell>
        {/* <TableCell>Coin </TableCell> */}
        <TableCell>{translate("adminFinancial.payout.date")}</TableCell>
        <TableCell>{translate("adminFinancial.payout.requestedAmount")}</TableCell>
        <TableCell>{translate("adminFinancial.payout.adminFeeDeducted")}</TableCell>
        <TableCell>{translate("adminFinancial.payout.amountReleased")}</TableCell>
        <TableCell>{translate("adminFinancial.payout.action")}</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
} 

export default TableHeaderRow;
