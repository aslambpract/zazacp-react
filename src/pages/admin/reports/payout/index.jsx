import { TableCell } from "@mui/material";
import PaginationButtons from "src/components/pagination";
import { BodyRow, ReportTable } from "../components";
import useReport from "../hooks/useReport";

const headers = [
  "no",
  "username",
  "fullName",
  "status",
  "walletAddress",
  "requestedAmount",
  "adminFeeDeducted",
  "amountReleased",
  "coin",
  "date",
];

const Payout = ({ title, heading }) => {
  const { report, getReport, rowStart, ...rest } = useReport("payout", {
    title,
    heading,
  });

  return (
    <>
      <ReportTable headers={headers}>
        {report?.map((row, i) => (
          <BodyRow key={row.id}>
            <TableCell component="th" scope="row">
              {i + rowStart}
            </TableCell>
            <TableCell>{row.user?.username}</TableCell>
            <TableCell>
              {row.user_profile?.first_name} {row.user_profile?.last_name}
            </TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.user_coin_address.address}</TableCell>
            <TableCell>{row.amount}</TableCell>
            <TableCell>{row.admin_fee_deducted}</TableCell>
            <TableCell>{row.released_amount}</TableCell>
            <TableCell>{row.available_coin.name}</TableCell>
            <TableCell>
              {new Date(row.created_at).toLocaleDateString("en-GB")}
            </TableCell>
          </BodyRow>
        ))}
      </ReportTable>
      <PaginationButtons {...rest} />
    </>
  );
};

export default Payout;
