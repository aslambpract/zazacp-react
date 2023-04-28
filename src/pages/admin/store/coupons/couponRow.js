import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";

const couponRow =
  (handleOpenMenu, row) =>
  ({ id, name, code, discount, start_date, end_date, active }, i) => {
    return (
      <TableRow key={id}>
        <TableCell>{i + row}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{code}</TableCell>
        <TableCell>{discount}</TableCell>
        <TableCell>{start_date}</TableCell>
        <TableCell>{end_date}</TableCell>
        <TableCell>{active ? "Yes" : "No"}</TableCell>

        <TableCell>
          <IconButton onClick={handleOpenMenu(id)}>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

export default couponRow;
