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
import PaginationButtons from "src/components/pagination";

import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";
import useReferrals from "src/pages/user/profile/subPages/referrals/hooks/useReferrals";

const Referrals = () => {
  const { translate } = useLocales();
  const { count, data, onChange, page, rowStart } = useReferrals();

  return (
    <div>
      <Card>
        <CardHeader
          title={translate("userGenealogy.affiliateDashboard.referrals")}
          sx={{ mb: 3 }}
        />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    {translate("userGenealogy.affiliateDashboard.no")}
                  </TableCell>
                  <TableCell width={50}>
                    {translate("userGenealogy.affiliateDashboard.userName")}
                  </TableCell>
                  <TableCell width={50}>
                    {translate("userGenealogy.affiliateDashboard.email")}{" "}
                  </TableCell>
                  <TableCell width={50}>
                    {translate("userGenealogy.affiliateDashboard.active")}
                  </TableCell>
                  <TableCell width={50}>
                    {translate(
                      "userGenealogy.affiliateDashboard.activeProducts"
                    )}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{rowStart + i}</TableCell>

                    <TableCell>{row.username}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{Boolean(row.active) ? "yes" : "no"}</TableCell>
                    <TableCell>{row.rank_id > 1 ? "yes" : "no"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
        <PaginationButtons onChange={onChange} count={count} page={page} />
      </Card>
    </div>
  );
};

export default Referrals;
