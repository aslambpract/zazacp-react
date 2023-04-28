import { LoadingButton } from "@mui/lab";
import { Grid, Stack } from "@mui/material";

import { useFormContext } from "react-hook-form";
import DocUpload from "./DocUpload";
import PaymentMethods from "./PaymentMethods";
import PaymentTypes from "./paymentTypes";
import ProductAvailable from "./ProductAvailable";
import Video from "./Video";
import useLocales from "src/hooks/useLocales";


const RightHandPane = ({ disableButton = false }) => {
  const { translate } = useLocales();
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Grid item xs={12} md={5}>
      <Stack spacing={3}>
        <ProductAvailable />
        <PaymentTypes />
        <PaymentMethods />
        <Video />
        <DocUpload />
        <LoadingButton
          disabled={disableButton}
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
        >
          {disableButton ? translate("adminStore.products.pleaseSelect")  : translate("adminStore.products.submit")}
        </LoadingButton>
      </Stack>
    </Grid>
  );
};

export default RightHandPane;
