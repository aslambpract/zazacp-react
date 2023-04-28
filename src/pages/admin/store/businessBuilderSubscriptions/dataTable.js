import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";


const DataTable = ({ data, rowStart }) => {
  const { translate } = useLocales();
  return (
    <>
      <Card sx={{ mt: 4 }}>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("adminStore.businessBuilder.no")}</TableCell>
                  <TableCell>{translate("adminStore.businessBuilder.userName")}</TableCell>
                  <TableCell>{translate("adminStore.businessBuilder.email")}</TableCell>
                  <TableCell>{translate("adminStore.businessBuilder.amount")}</TableCell>
                  <TableCell>{translate("adminStore.businessBuilder.date")}</TableCell>
                  <TableCell>{translate("adminStore.businessBuilder.effectiveUntil")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{i + rowStart}</TableCell>
                    <TableCell>{item.user.username}</TableCell>
                    <TableCell>{item.user.email}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell>
                      {new Date(item.effective_until).toLocaleDateString(
                        "en-GB"
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
    </>
  );
};

export default DataTable;
