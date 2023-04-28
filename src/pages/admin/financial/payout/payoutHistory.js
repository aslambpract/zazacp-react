import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect } from "react";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";

import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";
import DataFilter from "./dataFilter";

const PayoutHistory = ({ data, fetchData }) => {
  const { translate } = useLocales();
  const { count, onChange, page, rowStart, seed } = usePagination();

  useEffect(() => {
    seed(data.last_page, data.from);
  }, [data]);

  useEffect(() => {
    fetchData("", page);
  }, [page]);

  return (
    <>
      <Card sx={{ mt: 2 }}>
        <DataFilter fetchData={fetchData} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("adminFinancial.payout.no")}</TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.userName")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.email")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.coin")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.walletAddress")}{" "}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.requestedAmount")}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.adminFeeDeducted")}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.amountReleased")}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.date")}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.status")}
                  </TableCell>
                  <TableCell>
                    {translate("adminFinancial.payout.response")}
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map(
                  (
                    {
                      username,
                      email,
                      admin_fee_deducted,
                      released_amount,
                      created_at,
                      wallet_address,
                      status,
                      user_coin_address,
                      available_coin,
                      coin_id,
                      amount,
                      ...rest
                    },
                    i
                  ) => (
                    <TableRow>
                      <TableCell>{i + rowStart}</TableCell>
                      <TableCell>{rest.user.username} </TableCell>
                      <TableCell>{rest.user.email} </TableCell>
                      <TableCell>{available_coin.name}</TableCell>
                      <TableCell>{user_coin_address.address}</TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell>{admin_fee_deducted}</TableCell>
                      <TableCell>{released_amount}</TableCell>
                      <TableCell>
                        {new Date(created_at).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>{status}</TableCell>
                      <TableCell>_</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>

      <PaginationButtons onChange={onChange} page={page} count={count} />
    </>
  );
};

export default PayoutHistory;
