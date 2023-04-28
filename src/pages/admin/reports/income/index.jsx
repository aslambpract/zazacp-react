import { TableCell } from "@mui/material";
import { capitalCase } from "change-case";
import PaginationButtons from "src/components/pagination";
import { BodyRow, ReportTable } from "../components";
import useReport from "../hooks/useReport";

const headers = ["no", "username", "bonusType", "credit", "date"];

const Income = ({ title, heading }) => {
  const { report, getReport, rowStart, ...rest } = useReport("income", {
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
            <TableCell>{capitalCase(row.payment_type)}</TableCell>
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

export default Income;
