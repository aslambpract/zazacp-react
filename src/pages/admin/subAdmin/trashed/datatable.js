import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";

const DataTable = ({ data, rowStart }) => {
  const { translate } = useLocales();
  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminSubAdmin.subAdmin.no")} </TableCell>
                <TableCell>
                  {translate("adminSubAdmin.subAdmin.name")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSubAdmin.subAdmin.userName")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSubAdmin.subAdmin.email")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSubAdmin.subAdmin.userGroup")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSubAdmin.subAdmin.reasons")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSubAdmin.subAdmin.createdAt")}{" "}
                </TableCell>
                <TableCell>
                  {translate("adminSubAdmin.subAdmin.deleteAt")}{" "}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, i) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell>{i + rowStart}</TableCell>
                    <TableCell>{row.user?.user_profile?.first_name}</TableCell>
                    <TableCell>{row.user.username}</TableCell>
                    <TableCell>{row.user.email}</TableCell>
                    <TableCell>{row.user_group.name}</TableCell>
                    <TableCell>{row.reason}</TableCell>
                    <TableCell>
                      {new Date(row.created_at).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>
                      {new Date(row.deleted_at).toLocaleDateString("en-GB")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
};

export default DataTable;
