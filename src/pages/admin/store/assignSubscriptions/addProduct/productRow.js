import {
  Button,
  IconButton,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import Iconify from "src/components/Iconify";

const productRow =
  (handleOpenMenu) =>
  ({ id, effective_until, amount, created_at, user, business_builder }, i) => {
    return (
      <TableRow key={id}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{user.username} </TableCell>
        <TableCell>{business_builder.amount} </TableCell>
        <TableCell>
          {new Date(effective_until).toLocaleDateString("en-GB")}
        </TableCell>
        <TableCell>{amount}</TableCell>
        <TableCell>
          {new Date(created_at).toLocaleDateString("en-GB")}
        </TableCell>
        <TableCell>
          <IconButton onClick={handleOpenMenu(id, user.id)}>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

export default productRow;
