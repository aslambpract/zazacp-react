import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { paramCase } from "change-case";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Image from "src/components/Image";
import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";
import useAddToCart from "src/pages/user/onlineStore/productSubscription/hooks/useAddToCart";
import useProducts from "src/pages/user/onlineStore/productSubscription/productList/hooks/useProducts";
import { PATH_USER } from "src/routes/paths";

const useProductList = () => {
  const { products } = useProducts();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(products.splice(0, 4));
  }, [products]);

  return data;
};

const ProductList = () => {
  const { translate } = useLocales();
  const products = useProductList();
  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader title={translate("userDashboard.products")} />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {products.map((product) => (
            <NewsItem key={product.id} product={product} />
          ))}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          to="#"
          size="small"
          color="primary"
          component={RouterLink}
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
        >
          {translate("viewAll")}
        </Button>
      </Box>
    </Card>
  );
};

NewsItem.propTypes = {
  news: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    postedAt: PropTypes.instanceOf(Date),
    title: PropTypes.string,
  }),
};

function NewsItem({ product }) {
  const { translate } = useLocales();
  const navigate = useNavigate();
  const addToCart = useAddToCart();
  const {
    id,
    name: title,
    short_description: description,
    product_images: image,
    product_prices: price,
  } = product;

  const linkTo = PATH_USER.onlineStore.productSubscription.view(
    paramCase(title)
  );
  const { palette } = useTheme();
  return (
    <>
      <Card>
        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
            <Stack direction="row" spacing={2}>
              <Image
                alt={title}
                src={image[0]?.image_url}
                sx={{ width: 80, height: 80, borderRadius: 1.5, flexShrink: 0 }}
              />

              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  sx={{ color: "text.primary", typography: "subtitle2" }}
                >
                  {title}
                </Typography>
                <Stack direction="row">
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {description}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ marginTop: "0.5rem" }}
                >
                  <Button
                    fullWidth
                    variant="text"
                    startIcon={<Iconify icon="carbon:view" />}
                    color="primary"
                    size="small"
                    sx={{ backgroundColor: palette.primary.lighter }}
                    onClick={() => navigate(linkTo, { state: { pid: id } })}
                  >
                    {translate("view")}
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    size="small"
                    startIcon={<Iconify icon={"eva:shopping-bag-outline"} />}
                    onClick={() => {
                      const { price: amount, product_id, id } = price[0];
                      addToCart({ price: amount, product_id, price_id: id });
                    }}
                  >
                    {translate("userDashboard.addCart")}
                  </Button>
                </Stack>
              </Box>

              <Box sx={{ marginRight: "3rem !important" }} fontWeight={600}>
                $ {price[0]?.price}
              </Box>
            </Stack>
          </Stack>
        </Scrollbar>
      </Card>
    </>
  );
}

export default ProductList;
