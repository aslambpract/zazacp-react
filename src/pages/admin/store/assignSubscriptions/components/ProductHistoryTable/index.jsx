import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Scrollbar from "src/components/Scrollbar";
import productHistoryRow from "./productHistoryRow";
import useLocales from "src/hooks/useLocales";

const ProductHistoryTable = ({ dataList, handleOpenMenu, rowStart }) => {
  const { translate } = useLocales();
  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translate("adminStore.assignSubscriptions.no")}</TableCell>
              <TableCell>{translate("adminStore.assignSubscriptions.userName")}</TableCell>
              <TableCell>{translate("adminStore.assignSubscriptions.product")}</TableCell>
              <TableCell>{translate("adminStore.assignSubscriptions.categoryy")}</TableCell>
              <TableCell>{translate("adminStore.assignSubscriptions.note")} </TableCell>
              <TableCell>{translate("adminStore.assignSubscriptions.certifiedDate")}</TableCell>
              <TableCell>{translate("adminStore.assignSubscriptions.effectiveUntil")}</TableCell>
              <TableCell>{translate("adminStore.assignSubscriptions.action")}</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map(productHistoryRow(handleOpenMenu, rowStart))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
};

export default ProductHistoryTable;
