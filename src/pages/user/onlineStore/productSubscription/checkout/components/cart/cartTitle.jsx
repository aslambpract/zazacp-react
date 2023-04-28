import { CardHeader, Typography } from "@mui/material";
import React from "react";
import { useCartData } from "../../store/cartStore";
import useLocales from "src/hooks/useLocales";

const CartTitle = () => {
  const { translate } = useLocales();
  const cartList = useCartData();
  const totalItems = cartList?.length;
  return (
    <CardHeader
      title={
        <Typography variant="h6">
         {translate("userOnlineStore.cart")}
          <Typography component="span" sx={{ color: "text.secondary" }}>
            &nbsp;({totalItems} item)
          </Typography>
        </Typography>
      }
      sx={{ mb: 3 }}
    />
  );
};

export default CartTitle;
