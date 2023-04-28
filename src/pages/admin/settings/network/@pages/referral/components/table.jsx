import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Scrollbar from "src/components/Scrollbar";
import { FormProvider } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";

const Table = ({ children }) => {
  const { translate } = useLocales();

  return (
    <Scrollbar>
      <FormProvider>
        <TableContainer sx={{ minWidth: 720 }}>
          <MuiTable>
            <TableHead>
              <TableRow>
                <TableCell>{translate("adminSettings.network.rank")}</TableCell>
                <TableCell>
                  {translate("adminSettings.network.referralBonus")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </MuiTable>
        </TableContainer>
      </FormProvider>
    </Scrollbar>
  );
};

export default Table;
