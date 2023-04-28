import {
  Box,
  Card,
  Checkbox,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { sentenceCase } from "change-case";
import { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { SkeletonProduct } from "src/components/skeleton";
import useSettings from "src/hooks/useSettings";
import { PATH_USER } from "src/routes/paths";

import CartWidget from "src/components/cartWidget";
import Ternary from "src/components/ternary";
import useLocales from "src/hooks/useLocales";
import Summary from "./components/Summary";
import MoreInfo from "./components/moreInfo";
import DetailsCarousel from "./components/productCarousel";
import useGetProduct from "./hooks/useGetProduct";

const ProductDetails = () => {
  const { translate } = useLocales();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { product } = useGetProduct();
  const { themeStretch } = useSettings();
  const { name = "" } = useParams();

  const handleClickOpenGift = () => {
    setOpenGift(true);
  };

  const handleClose = () => {
    setOpenGift(false);
  };

  const [isUser, setIsUser] = useState(false);
  const [openGift, setOpenGift] = useState(false);

  const images = product.product_images?.map((image) => image.image_url) || [];

  const productImages = [...images];

  return (
    <Page title={translate("profuctDetails.titile")}>
      <Container maxWidth={themeStretch ? false : "lg"}>
        <HeaderBreadcrumbs
          heading={translate("profuctDetails.productDetails")}
          links={[
            { name: translate("dashboard"), href: PATH_USER.user_dashboard },
            {
              name: translate("profuctDetails.productSubscription"),
              href: PATH_USER.onlineStore.productSubscription.root,
            },
            { name: sentenceCase(name) },
          ]}
        />

        <CartWidget />
        <Ternary
          when={product}
          then={
            <>
              <Card>
                <Grid container>
                  <Grid item xs={12} md={6} lg={7}>
                    <DetailsCarousel images={productImages} />
                  </Grid>
                  <Grid item xs={12} md={6} lg={5}>
                    <Summary
                      product={product}
                      handleClickOpenGift={handleClickOpenGift}
                    />
                  </Grid>
                </Grid>
              </Card>

              <Box sx={{ mt: 4 }} />

              <MoreInfo product={product} />
            </>
          }
          otherwise={<SkeletonProduct />}
        />

        {/* {error && (
          <Typography variant="h6">
            404 {translate("profuctDetails.productFound")}
          </Typography>
        )} */}
      </Container>

      <Dialog
        fullScreen={fullScreen}
        open={openGift}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {translate("profuctDetails.buyAsGift")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              marginTop: "1rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography>{translate("profuctDetails.existingUser")}</Typography>
            <Checkbox checked={isUser} onClick={() => setIsUser(!isUser)} />
          </DialogContentText>
          {/* {isUser ? (
            <ExistingUser onClose={handleClose} addToCart={onAddCart} />
          ) : (
            <NewUser onClose={handleClose} addToCard={onAddCart} />
          )} */}
        </DialogContent>
      </Dialog>
    </Page>
  );
};

export default ProductDetails;
