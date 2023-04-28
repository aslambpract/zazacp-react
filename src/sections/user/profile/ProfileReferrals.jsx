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
import Scrollbar from "src/components/Scrollbar";
import axiosInstance from "src/utils/axios";
import useLocales from "src/hooks/useLocales";


const ProfileReferrals = () => {
  const { translate } = useLocales();
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const data = await axiosInstance("/api/referrals");
    setData(data.data.referrals);
  };
  useEffect(() => {
    fetchData();
  }, []);

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
                {data?.map((item, i) => (
                  <TableRow>
                    <TableCell>{++i}</TableCell>
                    <TableCell>{item?.username} </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{Boolean(item.active) ? "yes" : "no"}</TableCell>
                    <TableCell>_</TableCell>
                    <TableCell>
                      {moment(item.created_at).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        {/* <Alert severity="warning" color="warning">
           Empty
        </Alert> */}
      </Card>
    </div>
  );
};

export default ProfileReferrals;
