import { Box, Card, Grid } from "@mui/material";
import Actions from "./Actions";
import CardBody from "./CardBody";
import HeaderSection from "./HeaderSection";
import useChangeStatus from "./hooks/useChangeStatus";

const ProductCard = (props) => {
  const {
    refresh,
    active,
    product_images,
    name,
    product_url,
    category,
    product_prices,
    ...rest
  } = props;
  const { changeStatus, isActive } = useChangeStatus(active);
  return (
    <Card
      sx={{
        m: 2,
      }}
    >
      <Grid>
        <Grid container spacing={2}>
          <Grid xs={12} md={2}>
            <Box sx={{ margin: "10% 0 0 14%" }}>
              <img
                src={product_images[0]?.image_url ?? ""}
                style={{ borderRadius: "0.8rem" }}
              />
            </Box>
          </Grid>
          <Grid xs={12} md={10}>
            <Box style={{ overflowWrap: "anywhere" }}>
              <HeaderSection
                active={isActive}
                imageUrl={product_images[0]?.image_url ?? ""}
                onChange={() => changeStatus(rest.id)}
                name={name}
                productUrl={product_url}
              />
              <CardBody
                category_name={category?.name}
                product_prices={product_prices}
              />
              <Actions data={rest} refresh={refresh} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProductCard;
