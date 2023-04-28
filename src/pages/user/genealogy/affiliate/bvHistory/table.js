// @mui
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

// _mock_
// components
import Scrollbar from "src/components/Scrollbar";

// ----------------------------------------------------------------------
import useLocales from "src/hooks/useLocales";

const _ecommerceBestSalesman = [...Array(5)].map((_, index) => ({
  id: " _mock.id(index)",
  name: " _mock.name.fullName(index)",
  email: " _mock.email(index)",
  avatar: " _mock.image.avatar(index + 8)",
  category: " CATEGORY[index]",
  flag: " `https://minimal-assets-api.vercel.app/assets/icons/ic_flag_${COUNTRY[index]}.svg`",
  total: " _mock.number.price(index)",
  rank: " `Top ${index + 1}`",
}));

export default function BvHistory() {
  const { translate } = useLocales();
  return (
    <Card>
      <CardHeader
        title={translate("userGenealogy.affiliateDashboard.weeklyBVHistory")}
        sx={{ mb: 3 }}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={50}>
                  {translate("userGenealogy.affiliateDashboard.total")}
                </TableCell>
                <TableCell width={50}>
                  {translate("userGenealogy.affiliateDashboard.aquired")}{" "}
                </TableCell>
                <TableCell width={50}>
                  {translate("userGenealogy.affiliateDashboard.required")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_ecommerceBestSalesman.slice(1, 3).map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>200</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Card>
  );
}
