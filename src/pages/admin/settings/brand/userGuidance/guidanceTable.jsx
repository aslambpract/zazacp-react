import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Scrollbar from "src/components/Scrollbar";
import getStartedListRow from "./getStartedListRow";
import useLocales from "src/hooks/useLocales";

const GuidanceTable = ({ dataList = [], handleOpenMenu, rowStart }) =>{
  const { translate } = useLocales();
  return(
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translate("adminSettings.brand.no")} </TableCell>
              <TableCell> URL</TableCell>
              <TableCell>{translate("adminSettings.brand.blogTitle")}  </TableCell>
              <TableCell>{translate("adminSettings.brand.description")}  </TableCell>
              <TableCell>{translate("adminSettings.brand.action")} </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList.map(getStartedListRow(handleOpenMenu, rowStart))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
export default GuidanceTable;
