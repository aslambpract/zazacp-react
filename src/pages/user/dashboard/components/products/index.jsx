import { Button, Divider, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import Iconify from "src/components/Iconify";
import LabeledPaper from "src/components/LabeledPaper";
import { PATH_USER } from "src/routes/paths";
import Action from "./Action";
import Content from "./Content";
import data from "./_data";

const Products = () => {
  return (
    <LabeledPaper label="Products">
      {data.map((item) => (
        <ProductCard {...item} />
      ))}
      <Button
        LinkComponent={Link}
        to={PATH_USER.onlineStore.productSubscription.root}
        endIcon={<Iconify icon="ci:chevron-duo-right" />}
      >
        View All Products
      </Button>
    </LabeledPaper>
  );
};

const ProductCard = (props) => (
  <Paper variant="outlined">
    <Content {...props} />
    <Divider />
    <Action />
  </Paper>
);

export default Products;
