import {
  Box,
  Button,
  Divider,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Iconify from "src/components/Iconify";
import SocialsButton from "src/components/SocialsButton";
import Map from "src/components/map";
import useLocales from "src/hooks/useLocales";
import { trim } from "src/pages/admin/store/productCategories/Components/ProductCategory";
import { fCurrency, fShortenNumber } from "src/utils/formatNumber";
import useAddToCart from "../../hooks/useAddToCart";
import useBuyNow from "../hooks/useBuyNow";

const RootStyle = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

const useSelectPrice = (price) => {
  const [selectedPrice, setSelectedPrice] = useState({
    price: null,
    price_id: null,
  });

  useEffect(() => {
    if (!selectedPrice.price) {
      const defaultValue = price?.find(Boolean);
      if (defaultValue) {
        const { price, id } = defaultValue;
        setSelectedPrice({
          price: price,
          price_id: id,
        });
      }
    }
  }, [price]);

  const selectMonth = (e) => {
    setSelectedPrice(JSON.parse(e.target.value));
  };

  return { selectedPrice, selectMonth };
};

const Summary = ({ product, user_review, handleClickOpenGift, ...other }) => {
  const { translate } = useLocales();
  const addToCart = useAddToCart();
  const buyNow = useBuyNow();
  const {
    id,
    name,
    product_prices: price,
    priceSale,
    meta_description: description,
    user_reviews,
  } = product;
  const { selectedPrice, selectMonth } = useSelectPrice(price);
  const [review] = user_reviews || [];
  const handleAddCart = () =>
    addToCart({
      ...selectedPrice,
      product_id: id,
    });

  const handleBuyNow = () =>
    buyNow({
      ...selectedPrice,
      product_id: id,
    });

  return (
    <RootStyle {...other}>
      <Typography variant="h5" paragraph>
        {trim(name)}
      </Typography>
      <Typography
        variant="subtitle2"
        paragraph
        sx={{ color: "#637381", fontWeight: "400" }}
      >
        {trim(description)}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Rating value={parseInt(review?.rating)} precision={0.1} readOnly />
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          ({fShortenNumber(review?.review_count)} reviews)
        </Typography>
      </Stack>
      <Typography variant="h4" sx={{ mb: 3 }}>
        <Box
          component="span"
          sx={{ color: "text.disabled", textDecoration: "line-through" }}
        >
          {priceSale && fCurrency(priceSale)}
        </Box>
        &nbsp;{fCurrency(selectedPrice.price)}
      </Typography>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 3, my: 2 }}
      >
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          {translate("profuctDetails.subscription")}
        </Typography>

        <TextField
          label={translate("profuctDetails.selectMonth")}
          select
          sx={{ maxWidth: "75%", ml: 2 }}
          fullWidth
          size="small"
          SelectProps={{ native: true }}
          InputLabelProps={{
            shrink: true,
          }}
          FormHelperTextProps={{
            sx: {
              textAlign: "right",
              margin: 0,
              mt: 1,
              ml: 2,
              width: "80%",
            },
          }}
          onChange={selectMonth}
        >
          <Map
            list={price}
            render={({ price, validity, id }) => (
              <option value={JSON.stringify({ price, price_id: id })} key={id}>
                {validity}
              </option>
            )}
          />
        </TextField>
      </Stack>
      <Divider sx={{ borderStyle: "dashed" }} />
      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
        <Button
          fullWidth
          size="large"
          color="warning"
          variant="contained"
          startIcon={<Iconify icon={"ic:round-add-shopping-cart"} />}
          onClick={handleAddCart}
          sx={{ whiteSpace: "nowrap" }}
        >
          {translate("profuctDetails.addCart")}
        </Button>

        <Button
          onClick={handleBuyNow}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {translate("profuctDetails.buyNow")}
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
        {/* <Button
          fullWidth
          size="medium"
          color="success"
          variant="text"
          startIcon={<Iconify icon={"fluent:gift-card-add-20-regular"} />}
          onClick={handleClickOpenGift}
          sx={{ whiteSpace: "nowrap" }}
        >
          Buy as Gift
        </Button> */}
      </Stack>
    </RootStyle>
  );
};

Summary.propTypes = {
  cart: PropTypes.array,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.shape({
    available: PropTypes.number,
    colors: PropTypes.arrayOf(PropTypes.string),
    cover: PropTypes.string,
    id: PropTypes.string,
    inventoryType: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    priceSale: PropTypes.number,
    sizes: PropTypes.arrayOf(PropTypes.string),
    status: PropTypes.string,
    totalRating: PropTypes.number,
    totalReview: PropTypes.number,
  }),
};

const Incrementer = ({
  available,
  quantity,
  onIncrementQuantity,
  onDecrementQuantity,
}) => {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        borderColor: "grey.50032",
      }}
    >
      <IconButton
        size="small"
        color="inherit"
        disabled={quantity <= 1}
        onClick={onDecrementQuantity}
      >
        <Iconify icon={"eva:minus-fill"} width={14} height={14} />
      </IconButton>

      <Typography
        variant="body2"
        component="span"
        sx={{ width: 40, textAlign: "center" }}
      >
        {quantity}
      </Typography>

      <IconButton
        size="small"
        color="inherit"
        disabled={quantity >= available}
        onClick={onIncrementQuantity}
      >
        <Iconify icon={"eva:plus-fill"} width={14} height={14} />
      </IconButton>
    </Box>
  );
};

Incrementer.propTypes = {
  available: PropTypes.number,
  quantity: PropTypes.number,
  onIncrementQuantity: PropTypes.func,
  onDecrementQuantity: PropTypes.func,
};

export default Summary;
