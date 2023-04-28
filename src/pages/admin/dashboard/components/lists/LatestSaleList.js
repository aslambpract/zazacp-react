import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Scrollbar from "src/components/Scrollbar";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import { trim } from "src/pages/admin/store/productCategories/Components/ProductCategory";
import useLatestSales from "../widgets/hooks/useLatestSales";

export default function AppNewInvoice() {
  const { translate } = useLocales();
  const list = useLatestSales();
  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader
        title={translate("adminDashboard.business.latestSales")}
        sx={{ mb: 1 }}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  {translate("adminDashboard.business.invoice")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminDashboard.business.userName")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminDashboard.business.product")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminDashboard.business.price")}{" "}
                </TableCell>
                <TableCell>
                  {" "}
                  {translate("adminDashboard.business.date")}{" "}
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              <Map
                list={list.slice(0, 4)}
                render={(row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.user_purchase?.invoice_id}</TableCell>
                    <TableCell>{row.user_purchase?.user?.username}</TableCell>
                    <TableCell>{trim(row.product?.name)}</TableCell>
                    <TableCell>{row.product_price?.price}</TableCell>
                    <TableCell>
                      {new Date(row.created_at).toLocaleDateString("en-GB")}
                    </TableCell>
                  </TableRow>
                )}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
