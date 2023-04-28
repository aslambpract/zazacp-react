import React from "react";
// @mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { paramCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
import Scrollbar from "src/components/Scrollbar";
import { PATH_DASHBOARD } from "src/routes/paths";
import useLocales from "src/hooks/useLocales";

const PurchasedHistroy = () => {
  const { translate } = useLocales();
  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminStatistics.no")}</TableCell>
                <TableCell>{translate("adminStatistics.startDate")} </TableCell>
                <TableCell>{translate("adminStatistics.endDate")} </TableCell>
                <TableCell>{translate("adminStatistics.duration")} </TableCell>
                <TableCell>{translate("adminStatistics.status")} </TableCell>
                <TableCell>{translate("adminStatistics.price")} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                 {translate("adminStatistics.longTermTrade")} 
                </TableCell>
                <TableCell>20</TableCell>
                <TableCell>25</TableCell>
                <TableCell>15398</TableCell>
                <TableCell>22</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>
                 {translate("adminStatistics.movesTermTrade")}
                </TableCell>
                <TableCell>20</TableCell>
                <TableCell>25</TableCell>
                <TableCell>15398</TableCell>
                <TableCell>89</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell>starter pack</TableCell>
                <TableCell>20</TableCell>
                <TableCell>25</TableCell>
                <TableCell>15398</TableCell>
                <TableCell>32</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
};

export default PurchasedHistroy;
