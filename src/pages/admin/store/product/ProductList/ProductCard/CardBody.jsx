import { Box, Button, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import useLocales from "src/hooks/useLocales";

const CardBody = ({ category_name, product_prices }) => {
  const { translate } = useLocales();
  return (
    <Box sx={{mb:"-2rem"}}>
      <CardContent>
        <Typography
          variant="subtitle2"
          sx={{ mb: 1, display: "block", color: "text.secondary" }}
        >
          {translate("adminStore.products.categoryName")} : {category_name}
        </Typography>

        <Box
          sx={{
            mt: { xs: 2, sm: 0 },
            top: { sm: 24 },
            right: { sm: 24 },
          }}
        >
          {product_prices.map((price, i) => (
            <Button
              key={i}
              size="small"
              color="inherit"
              variant="outlined"
              sx={{ mr: 1, mt: 1 }}
            >
              {price.price} ({price.validity})
            </Button>
          ))}
        </Box>
      </CardContent>
    </Box>
  );
};

CardBody.propTypes = {
  category_name: PropTypes.string.isRequired,
  product_prices: PropTypes.array.isRequired,
};

export default CardBody;
