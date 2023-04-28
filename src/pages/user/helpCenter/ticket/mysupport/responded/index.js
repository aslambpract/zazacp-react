import { Box, Pagination } from "@mui/material";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import PaginationButtons from "src/components/pagination";
import Scrollbar from "src/components/Scrollbar";
import DataTable from "./components/dataTable";
import useFetchResponded from "./hooks/useFetchResponded";

const Index = () => {
  const [searchParams] = useSearchParams();
  const isDense = Boolean(parseInt(searchParams.get("isDense")));
  const { data, fetchData, rowStart, ...rest } = useFetchResponded();

  return (
    <>
      <Scrollbar>
        <Box sx={{ minWidth: { md: 800 } }}>
          <DataTable isDense={isDense} data={data} />
        </Box>
      </Scrollbar>
      <Box sx={{ p: 2 }}>
        <PaginationButtons
          {...rest}
          variant="outlined"
          color="primary"
          sx={{ float: "right" }}
        />
      </Box>
    </>
  );
};

Index.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default Index;
