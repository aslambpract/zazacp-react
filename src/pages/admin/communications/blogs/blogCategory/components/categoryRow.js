import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";

const articlesRow =
  (openMenu, row) =>
  ({ id, name, description }, i) => {
    return (
      <TableRow key={id}>
        <TableCell>{i + row}</TableCell>
        <TableCell>{name}</TableCell>
        <TableCell>{description}</TableCell>
        <TableCell>
          <IconButton onClick={openMenu(id)} color="error">
            <Iconify icon={"eva:trash-2-outline"} width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

export default articlesRow;
