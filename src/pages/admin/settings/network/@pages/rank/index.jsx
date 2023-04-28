import { LoadingButton } from "@mui/lab";
import { Box, Stack } from "@mui/material";
import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";
import TableBody from "./components/tableBody";
import TableHeader from "./components/tableHeader";
import "./style.css";

const DataTable = () => {
  const { translate } = useLocales();
  return (
    <div className="rank">
      <Scrollbar>
        <table
          className="table table-hover"
          style={{ height: "20px", overflowY: "scroll" }}
        >
          <TableHeader />

          <TableBody />
        </table>
      </Scrollbar>
      <Box textAlign="right">
        <Stack alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained">
            {translate("adminSettings.network.update")}
          </LoadingButton>
        </Stack>
      </Box>
    </div>
  );
};

export default DataTable;
