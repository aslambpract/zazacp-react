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

const DataTable = () => {
  const { translate } = useLocales();
  const linkTo = PATH_DASHBOARD.statistics.profile_user;
  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminStatistics.no")}</TableCell>
                <TableCell>{translate("adminStatistics.userName")} </TableCell>
                <TableCell>{translate("adminStatistics.email")} </TableCell>
                <TableCell>{translate("adminStatistics.purchasedDate")} </TableCell>
                <TableCell>{translate("adminStatistics.adminAssigned")} </TableCell>
                <TableCell>{translate("adminStatistics.status")} </TableCell>
                <TableCell>{translate("adminStatistics.expireOn")} </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell to={linkTo} color="inherit" component={RouterLink}>
                  shibi
                </TableCell>
                <TableCell>shibi123@gmail.com</TableCell>
                <TableCell>30 oct 2020</TableCell>
                <TableCell>No</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>28 Nov 2022</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell to={linkTo} color="inherit" component={RouterLink}>
                  shibi
                </TableCell>
                <TableCell>shibi123@gmail.com</TableCell>
                <TableCell>30 oct 2020</TableCell>
                <TableCell>No</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>28 Nov 2022</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
};

export default DataTable;
