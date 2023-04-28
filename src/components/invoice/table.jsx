import {
  Table as MuiTable,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";
import Map from "../map";

const Table = ({ body, headings }) => {
  const { translate } = useLocales();

  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 960 }}>
        <MuiTable>
          <TableHead
            sx={{
              borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
              "& th": { backgroundColor: "transparent" },
            }}
          >
            <TableRow>
              <TableCell width={40}>#</TableCell>
              <Map
                list={headings}
                render={(heading) => (
                  <TableCell align="left">{translate(heading)}</TableCell>
                )}
              />
            </TableRow>
          </TableHead>
          {body}
        </MuiTable>
      </TableContainer>
    </Scrollbar>
  );
};

export default Table;
