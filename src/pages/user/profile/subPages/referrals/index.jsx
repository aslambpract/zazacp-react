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
import Scrollbar from "src/components/Scrollbar";
import PaginationButtons from "src/components/pagination";
import useLocales from "src/hooks/useLocales";
import { isBinary } from "src/utils/isBinary";
import useReferrals from "./hooks/useReferrals";

const ProfileReferrals = () => {
  const { translate } = useLocales();
  const { count, data, onChange, page, rowStart } = useReferrals();

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
                  {isBinary() && (
                    <TableCell>
                      {translate("profile.businessBuilder")}
                    </TableCell>
                  )}
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
                    {isBinary() && (
                      <TableCell>{item.rank_id > 1 ? "yes" : "no"}</TableCell>
                    )}
                    <TableCell>
                      {moment(item.created_at).format("DD MMM YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <PaginationButtons onChange={onChange} count={count} page={page} />
        {/* <Alert severity="warning" color="warning">
             Empty
          </Alert> */}
      </Card>
    </div>
  );
};

export default ProfileReferrals;
