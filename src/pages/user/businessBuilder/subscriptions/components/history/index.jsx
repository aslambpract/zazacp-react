import { Box, Card, Stack, Typography } from "@mui/material";
import PaginationButtons from "src/components/pagination";
import HistoryTable from "./historyTable";
import useFetchHistoryTable from "./hooks/useFetchHistoryTable";
import useLocales from "src/hooks/useLocales";

const History = () => {
  const { translate } = useLocales();
  const { history, rowStart, ...rest } = useFetchHistoryTable();

  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant="h5" fontWeight="bold">
          {translate("userBusinessBuilder.subscription.orderHistory")} 
          </Typography>
          <HistoryTable history={history} rowStart={rowStart} />
        </Stack>
      </Card>
      <PaginationButtons {...rest} />
    </Box>
  );
};

export default History;
