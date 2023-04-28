import {
  Box,
  Button,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { capitalCase } from "change-case";
import { useState } from "react";
import Iconify from "src/components/Iconify";
import _data from "./_data";
import i18n from "src/locales/i18n"
import useLocales from "src/hooks/useLocales";



const Active = () => {
  const { translate } = useLocales()
  const columns = [
    i18n.t("adminUserSubscriptions.no"),
    i18n.t("adminUserSubscriptions.product"),
    i18n.t("adminUserSubscriptions.name"),
   i18n.t("adminUserSubscriptions.userNamee") ,
   i18n.t("adminUserSubscriptions.emaill") ,
    i18n.t("adminUserSubscriptions.purchasedDate"),
    i18n.t("adminUserSubscriptions.adminAssigned"),
    i18n.t("adminUserSubscriptions.expireOn"),
    i18n.t("adminUserSubscriptions.recurringEnabled"),
   i18n.t("adminUserSubscriptions.telegramUsername") ,
   i18n.t("adminUserSubscriptions.canceledDate") ,
   i18n.t("adminUserSubscriptions.reason") ,
    i18n.t("adminUserSubscriptions.action"),
  ];
  const [limit, setLimit] = useState(10);

  return (
    <>
      <Card sx={{ p: 2 }}>
        <Box textAlign="right" sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={"fluent:delete-28-regular"} />}
            sx={{ m: 1 }}
          >
           {translate("adminUserSubscriptions.resolved")} 
          </Button>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Iconify icon={"ri:file-excel-2-line"} />}
            sx={{ m: 1 }}
          >
           {translate("adminUserSubscriptions.excel")} 
          </Button>
        </Box>

        <TableContainer style={{ maxHeight: "78vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell>{capitalCase(column)}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                p: 3,
                maxHeight: 306,
                overflow: "scroll",
              }}
            >
              {_data
                .slice(0, limit)
                .map(
                  ({
                    id,
                    product,
                    name,
                    username,
                    email,
                    purchaseDate,
                    adminAssigned,
                    ExpireOn,
                    RecurringEnabled,
                    TelegramUsername,
                    CanceledDate,
                    reason,
                  }) => {
                    return (
                      <TableRow hover key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>{product}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{username}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{purchaseDate}</TableCell>
                        <TableCell>{adminAssigned}</TableCell>
                        <TableCell>{ExpireOn}</TableCell>
                        <TableCell>{RecurringEnabled}</TableCell>
                        <TableCell>{TelegramUsername}</TableCell>
                        <TableCell>{CanceledDate}</TableCell>
                        <TableCell>{reason}</TableCell>
                        <TableCell>
                          <Button variant="contained">{translate("adminUserSubscriptions.manage")}</Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
};

export default Active;
