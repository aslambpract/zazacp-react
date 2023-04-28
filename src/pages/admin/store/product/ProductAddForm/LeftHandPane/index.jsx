import { Card, Grid, Stack } from "@mui/material";
import { capitalCase } from "change-case";
import { RHFEditor, RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import LabelStyle from "../LabelStyle";
import BasicInfo from "./BasicInfo";
import LifeTimeAccess from "./LifeTimeAccess";
import MultiFileUpload from "./MultiFileUpload";
import PriceAndBvs from "./PriceAndBvs";

const LeftHandPane = () => {
  const { translate } = useLocales();
  return (
    <Grid item xs={12} md={7}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <BasicInfo />
          <div>
            <LabelStyle>
              {capitalCase(translate("adminStore.products.description"))}
            </LabelStyle>
            <RHFEditor simple name="product_description" />
          </div>
          <RHFTextField
            name="product_url"
            label={translate("adminStore.products.productPageURL")}
          />
          <MultiFileUpload />
          <PriceAndBvs />
          <LifeTimeAccess />
        </Stack>
      </Card>
    </Grid>
  );
};
export default LeftHandPane;
