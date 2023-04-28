import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { RHFTextField } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";

const CardInfo = () => {
  const { translate } = useLocales();
  const { setValue, watch } = useFormContext();

  const isRecurring = watch("finpay_recurring") === "yes";

  return (
    <Box>
      <Typography sx={{ marginBottom: "1rem" }} variant="h5">
        {translate("userOnlineStore.cardDetails")}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 2,
          gridTemplateRows: "auto",
          gridTemplateAreas: `"payment_cardname payment_cardnumber" "payment_cardexpiry paymentcard_csc" 
  `,
        }}
      >
        <Box sx={{ gridArea: "payment_cardname" }}>
          <RHFTextField label="Card Holder Name" name="payment_cardname" />
        </Box>
        <Box sx={{ gridArea: "payment_cardnumber" }}>
          <RHFTextField
            label={translate("userOnlineStore.cardNumber")}
            name="payment_cardnumber"
          />
        </Box>

        <Box sx={{ gridArea: "payment_cardexpiry" }}>
          <RHFTextField
            label="Card Expiry"
            name="payment_cardexpiry"
            placeholder="MMYY"
          />
        </Box>
        <Box sx={{ gridArea: "paymentcard_csc" }}>
          <RHFTextField
            label={translate("userOnlineStore.cardCSC")}
            name="paymentcard_csc"
          />
        </Box>
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={isRecurring}
            onChange={(e) => {
              const checked = e.target.checked;
              setValue("finpay_recurring", checked ? "yes" : "no");
            }}
            name=""
          />
        }
        label={translate("userOnlineStore.enableRecurring")}
      />
    </Box>
  );
};

export default CardInfo;
