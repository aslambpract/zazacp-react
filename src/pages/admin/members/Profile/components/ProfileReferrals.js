import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import Scrollbar from "src/components/Scrollbar";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";


const ProfileReferrals = () => {
  const { translate } = useLocales();
  const [data, setData] = useState([]);
  const { mid } = useParams();
  const { count, onChange, page, rowStart, seed } = usePagination();
  useEffect(() => {
    const fetchData = async (page = 1) => {
      const { data, status } = await axiosInstance(
        `/api/referrals-of-user/${mid}`,
        {
          params: {
            page: page,
          },
        }
      );
      if (status === 200) {
        const { last_page, from, data: list } = data.referrals;
        seed(last_page, from);

        setData(list);
      }
    };
    fetchData(page);
  }, [mid]);
  return (
    <div>
      <Card sx={{ p: 3 }}>
        <Typography variant="subtitle2" color="text.primary" mt={2} mb={2}>
         {translate("profile.referrals")} 
        </Typography>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{translate("profile.no")}</TableCell>
                  <TableCell>{translate("profile.userName")} </TableCell>
                  <TableCell>{translate("profile.email")}</TableCell>
                  <TableCell>{translate("profile.active")}</TableCell>
                  <TableCell>{translate("profile.businessBuilder")}</TableCell>
                  <TableCell>{translate("profile.dateJoined")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, i) => (
                  <TableRow>
                    <TableCell>{rowStart + i}</TableCell>
                    <TableCell>{item?.username} </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{Boolean(item.active) ? "yes" : "no"}</TableCell>
                    <TableCell>{item.rank_id > 1 ? "yes" : "no"}</TableCell>
                    <TableCell>
                      {moment(item.created_at).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <PaginationButtons count={count} onChange={onChange} page={page} />
    </div>
  );
};

export default ProfileReferrals;
