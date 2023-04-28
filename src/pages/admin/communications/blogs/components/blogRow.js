import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";

const articlesRow =
  (handleOpenMenu, row) =>
  ({ id, image_url, title, type, meta_description, created_at }, i) => {
    return (
      <TableRow key={id}>
        <TableCell>{i + row}</TableCell>
        <TableCell>
          <img width={100} src={image_url} />
        </TableCell>
        <TableCell>{title}</TableCell>
        <TableCell>{meta_description}</TableCell>
        <TableCell>{Number(type) ? "private" : "public"}</TableCell>
        <TableCell>
          {new Date(created_at).toLocaleDateString("en-GB")}
        </TableCell>
        <TableCell>
          <IconButton onClick={handleOpenMenu(id)}>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

export default articlesRow;
