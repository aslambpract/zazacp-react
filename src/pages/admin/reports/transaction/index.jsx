import { TableCell } from "@mui/material";
import PaginationButtons from "src/components/pagination";
import { BodyRow, ReportTable } from "../components";
import useReport from "../hooks/useReport";

const headers = ["no", "username", "email", "amount", "dateJoined"];

const Builder = ({ title, heading }) => {
  const { report, getReport, rowStart, ...rest } = useReport("builder", {
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
            <TableCell align="right">{row.user?.username}</TableCell>
            <TableCell align="right">{row.user?.email}</TableCell>
            <TableCell align="right">{row.amount}</TableCell>
            <TableCell align="right">
              {new Date(row.created_at).toLocaleDateString("en-GB")}
            </TableCell>
          </BodyRow>
        ))}
      </ReportTable>
      <PaginationButtons {...rest} />
    </>
  );
};

export default Builder;
