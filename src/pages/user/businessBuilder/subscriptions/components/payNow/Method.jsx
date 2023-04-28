import { Box, Stack, Typography } from "@mui/material";
import { RHFRadioGroup } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";

const Method = () => {
  const { translate } = useLocales();
  return (
    <Box>
      <Stack spacing={1}>
        <Typography variant="h5" fontWeight="bold">
        {translate("userBusinessBuilder.subscription.paymentMethod")}
        </Typography>
        <RHFRadioGroup name="method" options={["Coin Payment", "Card"]} />
      </Stack>
    </Box>
  );
};

export default Method;
