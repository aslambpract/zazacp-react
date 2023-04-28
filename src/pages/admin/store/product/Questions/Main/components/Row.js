import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";

const CategoryRow = ({ handleOpenMenu, rowNumber, question }) => {
  const { id, title, description } = question;

  return (
    <TableRow key={id}>
      <TableCell>{rowNumber}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>{description?.slice(0, 80)}</TableCell>
      <TableCell>
        <IconButton onClick={handleOpenMenu(id)}>
          <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default CategoryRow;
