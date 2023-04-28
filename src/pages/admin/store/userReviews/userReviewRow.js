import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";

const userReviews =
  (goToView) =>
  ({ product_id: id, rating, total_reviews, product }, i) => {
    return (
      <TableRow key={id}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>{total_reviews}</TableCell>
        <TableCell>{rating}</TableCell>

        <TableCell>
          <IconButton onClick={() => goToView(id)}>
            <Iconify icon="carbon:view" width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

export default userReviews;
