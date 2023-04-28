// @mui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PaginationButtons from "src/components/pagination";

// component
import useLocales from "src/hooks/useLocales";
import Page from "../../../../components/Page";
import Scrollbar from "../../../../components/Scrollbar";
import useTrashed from "./hooks/useTrashed";

const Trashed = () => {
  const { translate } = useLocales();
  const { productHistoryList, rowStart, ...rest } = useTrashed();
  return (
    <div>
      <Page title="Trashed: Store">
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.no")}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.userName")}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.product")}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.categories")}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.note")}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.certifiedDate")}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.effectiveUntil")}
                  </TableCell>
                  <TableCell>
                    {translate("adminStore.assignSubscriptions.createdDate")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productHistoryList.map(
                  (
                    { user_purchase, product, effective_until, created_at },
                    i
                  ) => {
                    return (
                      <TableRow>
                        <TableCell>{i + rowStart}</TableCell>
                        <TableCell>{user_purchase.user.username} </TableCell>
                        <TableCell>{product.name} </TableCell>
                        <TableCell>
                          {user_purchase.product_subscription_category?.name}
                        </TableCell>
                        <TableCell>{user_purchase.note}</TableCell>
                        <TableCell>
                          {user_purchase.date?.replaceAll("/", "-")}
                        </TableCell>
                        <TableCell>
                          {effective_until?.split("-").reverse().join("-")}
                        </TableCell>
                        <TableCell>
                          {new Date(created_at)
                            .toLocaleDateString("en-GB")
                            .replaceAll("/", "-")}
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Page>
      <PaginationButtons {...rest} />
    </div>
  );
};

export default Trashed;
