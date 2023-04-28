import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";
import { isBinary } from "src/utils/isBinary";

const businessRow =
  (handleOpenMenu, row) =>
  ({ id, name, amount, bv }, i) => {
    return (
      <TableRow key={id}>
        <TableCell>{i + row}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{amount}</TableCell>
        {isBinary() && <TableCell>{bv}</TableCell>}
        <TableCell>
          <IconButton onClick={handleOpenMenu(id)}>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

export default businessRow;
