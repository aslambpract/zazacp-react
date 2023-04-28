import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";

const productHistoryRow =
  (handleOpenMenu, rowStart) =>
  ({ id, user_purchase, product, created_at, effective_until }, i) => {
    return (
      <TableRow key={id}>
        <TableCell>{i + rowStart}</TableCell>
        <TableCell>{user_purchase.user.username}</TableCell>
        <TableCell>{product.name}</TableCell>
        <TableCell>
          {user_purchase.product_subscription_category?.name}
        </TableCell>
        <TableCell>{user_purchase.note}</TableCell>
        <TableCell>{user_purchase.date}</TableCell>
        <TableCell>{effective_until.split("-").reverse().join("/")}</TableCell>
        <TableCell>
          <IconButton
            onClick={handleOpenMenu(
              id,
              user_purchase.user_id,
              !user_purchase?.user?.active
            )}
          >
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

export default productHistoryRow;
