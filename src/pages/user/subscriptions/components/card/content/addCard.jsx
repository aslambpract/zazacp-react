import { LoadingButton } from "@mui/lab";
import { Box, Button, DialogActions, DialogContent } from "@mui/material";
import Countries from "src/components/countries";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import useCardForm from "./hooks/useCardForm";

const AddCard = ({ onClose, productId, purchaseId, fetchData }) => {
  const { methods, onSubmit } = useCardForm(
    productId,
    purchaseId,
    onClose,
    fetchData
  );
  const {
    formState: { isSubmitting },
  } = methods;
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <DialogContent>
        <Box
          sx={{
            display: "grid",
            rowGap: 3,
            columnGap: 2,
            marginTop: 3,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          <Countries />

          <RHFTextField name="state" label="State" />

          <RHFTextField name="city" label="City" />
          <RHFTextField name="zip" label="Post Code" />
        </Box>
        <Box
          sx={{
            display: "grid",
            rowGap: 3,
            columnGap: 2,
            marginTop: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(1, 1fr)",
            },
          }}
        >
          <RHFTextField name="address1" label="Address" />
        </Box>
        <Box
          sx={{
            display: "grid",
            rowGap: 3,
            columnGap: 2,
            marginTop: 3,
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          <RHFTextField name="payment_cardname" label="Payment Card Name" />
          <RHFTextField
            type="number"
            name="payment_cardnumber"
            label="Payment Card Number"
          />
          <RHFTextField
            type="number"
            name="payment_cardexpiry"
            label="Payment Card Expiry"
          />
          <RHFTextField
            type="number"
            name="paymentcard_csc"
            label="PaymentCardCSC/CVN"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          autoFocus
          disableElevation
        >
          Enable Recurring payment
        </LoadingButton>
        <Button onClick={onClose} autoFocus variant="outlined`">
          Close
        </Button>
      </DialogActions>
    </FormProvider>
  );
};

export default AddCard;
