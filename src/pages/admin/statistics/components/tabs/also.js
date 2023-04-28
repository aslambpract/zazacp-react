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

const Also = () => {
  const { translate } = useLocales();
  const linkTo = PATH_DASHBOARD.statistics.subscriptions_users;
  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminStatistics.no")}</TableCell>
                <TableCell>{translate("adminStatistics.productName")} </TableCell>
                <TableCell>{translate("adminStatistics.expiredCount")} </TableCell>
                <TableCell>{translate("adminStatistics.activeCount")} </TableCell>
                <TableCell>{translate("adminStatistics.totalCount")} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell to={linkTo} color="inherit" component={RouterLink}>
                  one product
                </TableCell>
                <TableCell>20</TableCell>
                <TableCell>25</TableCell>
                <TableCell>15398</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell to={linkTo} color="inherit" component={RouterLink}>
                  Nike product
                </TableCell>
                <TableCell>20</TableCell>
                <TableCell>25</TableCell>
                <TableCell>15398</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>3</TableCell>
                <TableCell to={linkTo} color="inherit" component={RouterLink}>
                  Puma product
                </TableCell>
                <TableCell>20</TableCell>
                <TableCell>25</TableCell>
                <TableCell>15398</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
};

export default Also;
