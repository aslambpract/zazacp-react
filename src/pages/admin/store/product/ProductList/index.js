import { CircularProgress } from "@mui/material";
import PaginationButtons from "src/components/pagination";
import ProductCard from "./ProductCard";
import useProductList from "./hooks/useProductList";

const ProductList = () => {
  const { products, fetchProducts, ...rest } = useProductList();
  return products?.length === 0 ? (
    <div style={{ textAlign: "center" }}>
      <CircularProgress />
    </div>
  ) : (
    <div>
      {products?.map((item) => (
        <ProductCard {...item} key={item.id} refresh={fetchProducts} />
      ))}
      <PaginationButtons {...rest} />
    </div>
  );
};

export default ProductList;
