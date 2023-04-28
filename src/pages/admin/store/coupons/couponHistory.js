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

const CouponHistory = () => {
  const { translate } = useLocales();

  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminStore.coupons.no")}</TableCell>
                <TableCell>{translate("adminStore.coupons.couponCode")}</TableCell>
                <TableCell>{translate("adminStore.coupons.userName")}</TableCell>
                <TableCell>{translate("adminStore.coupons.email")} </TableCell>
                <TableCell>{translate("adminStore.coupons.product")} </TableCell>
                <TableCell>{translate("adminStore.coupons.period")}</TableCell>
                <TableCell>{translate("adminStore.coupons.amount")}</TableCell>
                <TableCell>{translate("adminStore.coupons.paidAmount")}</TableCell>
                <TableCell>{translate("adminStore.coupons.discount")}</TableCell>
                <TableCell>{translate("adminStore.coupons.date")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </div>
  );
};

export default CouponHistory;
