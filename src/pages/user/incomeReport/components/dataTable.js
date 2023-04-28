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
import Map from "src/components/map";
import PaginationButtons from "src/components/pagination";
import useLocales from "src/hooks/useLocales";
import useFetchIncome from "../hooks/useFetchIncome";
import Filter from "./filter";
import Row from "./row";

const DataTable = () => {
  const { translate } = useLocales();
  const { data, fetchData, rowStart, setFilter, ...rest } = useFetchIncome();
  return (
    <>
      <Card sx={{ mt: 2, p: 2 }}>
        <Filter
          onFilter={(filter) => {
            fetchData(rest.page, filter);
          }}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> {translate("userIncomeReport.no")}</TableCell>
                  <TableCell>
                    {translate("userIncomeReport.fromName")}
                  </TableCell>
                  <TableCell>
                    {translate("userIncomeReport.amountType")}
                  </TableCell>
                  <TableCell> {translate("userIncomeReport.credit")}</TableCell>
                  <TableCell>{translate("userIncomeReport.created")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Map
                  list={data}
                  render={(item, i) => (
                    <Row data={item} rowNumber={i + rowStart} />
                  )}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <PaginationButtons {...rest} />
    </>
  );
};

export default DataTable;
