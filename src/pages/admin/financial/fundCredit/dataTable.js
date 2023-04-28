import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import Scrollbar from "src/components/Scrollbar";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";


const useHistory = () => {

  const [history, setHistory] = useState([]);
  const { count, onChange, page, rowStart, seed } = usePagination();
  useEffect(() => {
    const fetchData = async (page = 1) => {
      try {
        const { status, data } = await axiosInstance(
          "api/admin/fund-transaction-history",
          {
            params: {
              page,
            },
          }
        );
        if (status === 200) {
          const { last_page, from, data: list } = data.data;
          seed(last_page, from);
          setHistory(list);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData(page);
  }, [page]);

  return { history, onChange, page, rowStart, count };
};

const DataTable = () => {
  const { translate } = useLocales();
  const { history, rowStart, ...rest } = useHistory();
  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminFinancial.fundCredit.no")}</TableCell>
                <TableCell>{translate("adminFinancial.fundCredit.userName")} </TableCell>
                <TableCell>{translate("adminFinancial.fundCredit.amount")} </TableCell>
                <TableCell>{translate("adminFinancial.fundCredit.paymentType")} </TableCell>
                <TableCell>{translate("adminFinancial.fundCredit.walletType")}</TableCell>
                <TableCell>{translate("adminFinancial.fundCredit.notes")} </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>{rowStart + i}</TableCell>
                  <TableCell>{item?.user?.username}</TableCell>
                  <TableCell>{item.total_amount}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.wallet_type}</TableCell>
                  <TableCell>{item.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <PaginationButtons {...rest} />
    </div>
  );
};

export default DataTable;
