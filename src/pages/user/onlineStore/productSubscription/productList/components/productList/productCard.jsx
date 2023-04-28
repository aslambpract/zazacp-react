import {
  Box,
  Card,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { paramCase } from "change-case";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import Image from "src/components/Image";
import Label from "src/components/Label";
import Ternary from "src/components/ternary";
import useLocales from "src/hooks/useLocales";
import { trim } from "src/pages/admin/store/productCategories/Components/ProductCategory";
import { PATH_USER } from "src/routes/paths";
import { ExistingUser, NewUser } from "./gift";
import ProductActions from "./productActions";

const ShopProductCard = ({ product }) => {
  const { translate } = useLocales();
  const { name, product_images, id } = product;
  const [isUser, setIsUser] = useState(false);
  const linkTo = PATH_USER.onlineStore.productSubscription.view(
    paramCase(name)
  );
  // dialog buy as a gift
  const [openGift, setOpenGift] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpenGift = () => {
    setOpenGift(true);
  };

  const handleClose = () => {
    setOpenGift(false);
  };

  const onAddCart = () => {};

  return (
    <>
      <Card>
        <Box sx={{ position: "relative" }}>
          <Link
            to={linkTo}
            color="inherit"
            component={RouterLink}
            state={{ pid: id }}
          >
            <Image
              alt={name}
              src={product_images.find(Boolean)?.image_url}
              ratio="1/1"
            />
          </Link>
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link
            to={linkTo}
            state={{ pid: id }}
            color="inherit"
            component={RouterLink}
          >
            <Typography variant="subtitle2" noWrap>
              {trim(name)}
            </Typography>
          </Link>
          <ProductActions product={product} />
        </Stack>
      </Card>
      <Dialog
        fullScreen={fullScreen}
        open={openGift}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {translate("userOnlineStore.buyAs")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>{translate("userOnlineStore.doYouLike")}</Typography>
            <Checkbox checked={isUser} onClick={() => setIsUser(!isUser)} />
          </DialogContentText>
          <Ternary
            when={isUser}
            then={<ExistingUser onClose={handleClose} addToCart={onAddCart} />}
            otherwise={<NewUser onClose={handleClose} addToCard={onAddCart} />}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default ShopProductCard;
