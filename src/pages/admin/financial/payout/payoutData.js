import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import Iconify from "src/components/Iconify";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";

import Scrollbar from "src/components/Scrollbar";
import axiosInstance from "src/utils/axios";
import TableHeaderRow from "./tableHeaderRow";
import useLocales from "src/hooks/useLocales";

const PayoutData = ({ data, fetchPayoutData }) => {
  const { translate } = useLocales();
  const { count, onChange, page, rowStart, seed } = usePagination();

  useEffect(() => {
    seed(data.last_page, data.from);
  }, [data]);

  useEffect(() => {
    fetchPayoutData("", page);
  }, [page]);

  const { enqueueSnackbar } = useSnackbar();

  const handler = (url) => (id) => async () => {
    try {
      const { status, data } = await axiosInstance.get(`${url}/${id}`);

      if (status === 200) {
        enqueueSnackbar(data.message);
        fetchPayoutData();
      }
    } catch (err) {
      enqueueSnackbar(
        url.includes("approve") ? "Failed to approve" : "Failed to reject",
        { variant: "error" }
      );
    }
  };

  const approve = handler("/api/admin/approve-payout");

  const reject = handler("/api/admin/reject-payout");

  return (
    <>
      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHeaderRow />
              <TableBody>
                {data.data.map(
                  (
                    {
                      id,
                      amount,
                      username,
                      user_balance,
                      wallet_address,
                      created_at,
                      admin_fee_deducted,
                      released_amount,
                      ...rest
                    },
                    i
                  ) => (
                    <TableRow>
                      <TableCell>{i + rowStart}</TableCell>
                      <TableCell>{rest.user.username}</TableCell>
                      <TableCell>{user_balance}</TableCell>
                      <TableCell>{rest.user_coin_address.address}</TableCell>
                      <TableCell>
                        {new Date(created_at).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell>{admin_fee_deducted}</TableCell>
                      <TableCell>{released_amount}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={approve(id)}
                          startIcon={<Iconify icon="akar-icons:check" />}
                          variant="contained"
                        >
                         {translate("adminFinancial.payout.approve")} 
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={reject(id)}
                          startIcon={
                            <Iconify icon="ant-design:delete-outlined" />
                          }
                          color="error"
                          variant="contained"
                        >
                         {translate("adminFinancial.payout.reject")} 
                        </Button>
                      </TableCell>
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

export default PayoutData;
