import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";


const TableWrapper = ({ children }) => {
  const { translate } = useLocales();
  return(
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> {translate("adminCommunication.articile.no")} </TableCell>
              <TableCell> {translate("adminCommunication.articile.categoryName")}</TableCell>
              <TableCell> {translate("adminCommunication.articile.createdAt")} </TableCell>
              <TableCell> {translate("adminCommunication.articile.action")} </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}

export default TableWrapper;
