import {
  Box,
  Card,
  CardHeader,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Image from "src/components/Image";
import Scrollbar from "src/components/Scrollbar";
import Trim from "src/components/Trim";
import useLocales from "src/hooks/useLocales";
import axiosInstance from "src/utils/axios";

const useProductActive = () => {
  const [activeProduct, setActiveProduct] = useState([]);
  const fetchData = async () => {
    try {
      const { data, status } = await axiosInstance.get(
        "api/admin/dashboard/product-active-subscription"
      );

      if (status === 200) {
        setActiveProduct(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return activeProduct;
};

export default function ProductActive() {
  const { translate } = useLocales();
  const activeProducts = useProductActive();
  return (
    <Card>
      <CardHeader
        title={translate("adminDashboard.business.productsActive")}
        gutterBottom
      />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {activeProducts.map((product) => (
            <ProductItem {...product} />
          ))}
          {/* {_ecommerceLatestProducts.slice(0, 4).map((product) => (
            <ProductItem key={product.id} product={product} />
          ))} */}
        </Stack>
      </Scrollbar>

      <Divider />

      {/* <Box sx={{ p: 3, textAlign: "right" }}>
        <Button
          size="small"
          color="primary"
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
        >
       {translate("adminDashboard.business.viewMore")}  
        </Button>
      </Box> */}
    </Card>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    name: PropTypes.string,
  }),
};

function ProductItem(props) {
  const { translate } = useLocales();
  const { count, product } = props;
  const { name, product_images: image } = product;
  return (
    <>
      <Stack direction="row" spacing={2}>
        <Image
          alt={name}
          src={image[0]?.image_url}
          sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
        />

        <Box sx={{ flexGrow: 1, minWidth: 200 }}>
          <Link
            component={RouterLink}
            to="#"
            sx={{ color: "text.primary", typography: "subtitle2" }}
          >
            <Trim value={name} />
          </Link>
          <Stack direction="row">
            <Typography variant="body2" color="text.secondary">
              <b>{count}</b>{" "}
              {translate("adminDashboard.business.subscriptions")}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}
