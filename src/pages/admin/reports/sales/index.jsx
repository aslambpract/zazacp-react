import { TableCell } from "@mui/material";
import PaginationButtons from "src/components/pagination";
import { BodyRow, ReportTable } from "../components";
import useReport from "../hooks/useReport";

const headers = ["no", "username", "email", "amount", "date"];

const Sales = ({ title, heading }) => {
  const { report, getReport, rowStart, ...rest } = useReport("sales", {
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
            <TableCell>{row.user?.email}</TableCell>
            <TableCell>{row.total_amount}</TableCell>
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

export default Sales;
