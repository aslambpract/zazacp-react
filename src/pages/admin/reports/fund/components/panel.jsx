import { TableCell } from "@mui/material";
import { noCase } from "change-case";
import { useEffect, useMemo, useState } from "react";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import { BodyRow, ReportTable } from "../../components";

const headers = ["no", "username", "email", "amount", "walletType", "date"];

const Panel = ({ data, getReport }) => {
  const { seed, rowStart, ...rest } = usePagination();
  const [report, setReport] = useState([]);
  useMemo(() => {
    if (data) {
      const { last_page, from, data: list } = data;
      seed(last_page, from);
      setReport(list);
    }
  }, [data]);

  useEffect(() => {
    getReport(rest.page);
  }, [rest.page]);

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
            <TableCell>{noCase(row.wallet_type)}</TableCell>
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

export default Panel;
