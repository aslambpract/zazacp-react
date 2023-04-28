import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { forwardRef } from "react";

import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";

const TableWrapper = forwardRef(({ children }, ref) => {
  const { translate } = useLocales();
  return (
    <Scrollbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell> {translate("adminCommunication.helpCenter.no")} </TableCell>
              <TableCell> {translate("adminCommunication.helpCenter.tktNumber")}  </TableCell>
              <TableCell> {translate("adminCommunication.helpCenter.tktFrom")}  </TableCell>
              <TableCell> {translate("adminCommunication.helpCenter.date")}  </TableCell>
              <TableCell> {translate("adminCommunication.helpCenter.subject")}  </TableCell>
              <TableCell>{translate("adminCommunication.helpCenter.status")}  </TableCell>
              <TableCell> {translate("adminCommunication.helpCenter.priority")}  </TableCell>
              <TableCell> {translate("adminCommunication.helpCenter.department")}  </TableCell>
              <TableCell> {translate("adminCommunication.helpCenter.action")} </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{children}</TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
});
export default TableWrapper;
