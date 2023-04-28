import { Card, Grid, Stack } from "@mui/material";

import { FormProvider, RHFTextField } from "src/components/hook-form";

import AppendCombo from "./AppendCombo";

import Category from "../../ProductAddForm/LeftHandPane/Category";
import Description from "../../ProductAddForm/LeftHandPane/description";
import LifeTimeAccess from "../../ProductAddForm/LeftHandPane/LifeTimeAccess";
import MetaInformation from "../../ProductAddForm/LeftHandPane/MetaInformation";
import MultiFileUpload from "../../ProductAddForm/LeftHandPane/MultiFileUpload";
import PriceAndBvs from "../../ProductAddForm/LeftHandPane/PriceAndBvs";
import RightHandPane from "../../ProductAddForm/RightHandPane";
import useAddCombo from "../hooks/useAddCombo";
import BinaryBox from "./BinaryBox";
import useLocales from "src/hooks/useLocales";


const ProductComboForm = () => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useAddCombo();

  return (
    <div>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <BinaryBox>
                  <RHFTextField name="name" label= {translate("adminStore.products.comboName")}  />
                  <RHFTextField
                    type="number"
                    name="sort_order"
                    label= {translate("adminStore.products.sortOrder")} 
                  />
                  <Category />
                </BinaryBox>
                <AppendCombo />
                <BinaryBox>
                  <MetaInformation />
                </BinaryBox>
                <Description />
                <RHFTextField name="product_url" label={translate("adminStore.products.productPageURL")}  />
                <PriceAndBvs />
                <div>
                  <MultiFileUpload />
                </div>
                <LifeTimeAccess />
              </Stack>
            </Card>
          </Grid>
          <RightHandPane />
        </Grid>
      </FormProvider>
    </div>
  );
};

export default ProductComboForm;
