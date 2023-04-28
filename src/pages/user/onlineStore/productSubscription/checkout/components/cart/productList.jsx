import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import Scrollbar from "src/components/Scrollbar";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import { useCartData } from "../../store/cartStore";
import Item from "./Item";
import useRemoveFromCart from "./hooks/useRemoveFromCart";

const ProductList = () => {
  const { translate } = useLocales();
  const cartList = useCartData() || [];
  const removeFromCart = useRemoveFromCart();
  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 720 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{translate("userOnlineStore.product")} </TableCell>
              <TableCell align="left">
                {translate("userOnlineStore.price")}{" "}
              </TableCell>
              <TableCell align="center">
                {translate("userOnlineStore.subscription")}{" "}
              </TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <Map
              list={cartList}
              render={(cartItem) => (
                <Item
                  key={cartItem.id}
                  item={cartItem}
                  removeFromCart={removeFromCart}
                />
              )}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onDelete: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
};

export default ProductList;
