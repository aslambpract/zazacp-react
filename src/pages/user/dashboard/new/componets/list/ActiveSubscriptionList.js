import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Iconify from "src/components/Iconify";
import Image from "src/components/Image";
import Scrollbar from "src/components/Scrollbar";
import useLocales from "src/hooks/useLocales";
import BlogIcon from "src/images/blogs.png";
import DocumentsIcon from "src/images/documents.png";
import EventsIcon from "src/images/events-user.png";
import ReviewIcon from "src/images/reviews.png";
import VideoIcon from "src/images/videos.png";
import useFetchSubscription from "src/pages/user/subscriptions/components/card/content/hooks/useFetchSubscription";
import { PATH_USER } from "src/routes/paths";

const useActiveSubscriptions = () => {
  const { data } = useFetchSubscription();

  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    setSubscriptions(data.splice(0, 3));
  }, [data]);

  return subscriptions;
};

const ProductActive = () => {
  const { translate } = useLocales();
  const subscriptions = useActiveSubscriptions();
  return (
    <Card>
      <CardHeader
        title={translate("userDashboard.activeSubscriptions")}
        gutterBottom
      />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {subscriptions.map((product) => {
            return (
              <Card sx={{ p: 1 }}>
                <ProductItem key={product.id} product={product} />
              </Card>
            );
          })}
        </Stack>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 1, textAlign: "right" }}>
        <Button
          component={RouterLink}
          to={PATH_USER.subscriptions.root}
          size="small"
          color="primary"
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
        >
          {translate("userDashboard.viewMore")}
        </Button>
      </Box>
    </Card>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    colors: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    name: PropTypes.string,
  }),
};

function ProductItem({ product }) {
  const { translate } = useLocales();
  const { purchase_product, created_at, effective_until, id, product_id } =
    product;
  const { name, product_images: image } = purchase_product || {};
  const purchaseDate = new Date(created_at);
  const expiry = new Date(effective_until);
  const expireIn = parseInt(
    (expiry.getTime() - purchaseDate.getTime()) / (1000 * 3600 * 24)
  );
  const view = PATH_USER.subscriptions.view(id);

  const actionButtons = [
    {
      icon: ReviewIcon,
      toolTip: "userDashboard.addReview",
      href: PATH_USER.subscriptions.view(product_id)("comment"),
    },
    {
      icon: BlogIcon,
      toolTip: "userDashboard.blog",
      href: `${PATH_USER.subscriptions.blog(product_id)}`,
    },
    {
      icon: EventsIcon,
      toolTip: "userDashboard.events",
      href: PATH_USER.subscriptions.view(product_id)("events"),
    },
    {
      icon: DocumentsIcon,
      toolTip: "userDashboard.documents",
      href: PATH_USER.subscriptions.view(product_id)("documents"),
    },
    {
      icon: VideoIcon,
      toolTip: "userDashboard.video",
      href: PATH_USER.subscriptions.view(product_id)("videos"),
    },
  ];

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Image
          alt={name}
          src={image[0]?.image_url}
          sx={{ width: 100, height: 100, borderRadius: 1.5, flexShrink: 0 }}
        />

        <Box sx={{ flexGrow: 1 }}>
          <Link
            component={RouterLink}
            to="#"
            sx={{ color: "text.primary", typography: "subtitle2" }}
          >
            {name}
          </Link>
          <Stack>
            <Typography variant="body2" color="text.secondary">
              {translate("userDashboard.purchasedOn")}{" "}
              {new Date(purchaseDate).toLocaleDateString("en-GB")}
            </Typography>

            <Typography variant="caption" color="primary.main">
              {expireIn} {translate("userDashboard.daysRemaining")}
            </Typography>
            <Box
              sx={{
                display: "grid",
                rowGap: 0,
                columnGap: 0,
                marginTop: 1,
                gridTemplateColumns: {
                  xs: "repeat(10, 1fr)",
                  sm: "repeat(10, 1fr)",
                },
              }}
            >
              {actionButtons.map(({ icon, toolTip, href }) => {
                return (
                  <Box>
                    <Tooltip title={translate(toolTip)}>
                      <IconButton LinkComponent={RouterLink} to={href}>
                        <Image src={icon} sx={{ width: 20, height: 20 }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                );
              })}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </>
  );
}

export default ProductActive;
