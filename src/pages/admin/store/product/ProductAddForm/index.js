import { Grid } from "@mui/material";
import { FormProvider } from "src/components/hook-form";
import useAddProduct from "../hook/useAddProduct";
import LeftHandPane from "./LeftHandPane";
import RightHandPane from "./RightHandPane";

const ProductAddForm = () => {
  const { methods, onSubmit } = useAddProduct();

  return (
    <div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <LeftHandPane />
          <RightHandPane />
        </Grid>
      </FormProvider>
    </div>
  );
};

export default ProductAddForm;
