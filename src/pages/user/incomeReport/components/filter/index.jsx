import { Box, Button } from "@mui/material";
import { FormProvider } from "src/components/hook-form";
import useLocales from "src/hooks/useLocales";
import CustomRHFDatePicker from "./components/customRHFDatePicker";
import PaymentTypes from "./components/paymentTypes";
import useFilter from "./hooks/useFilter";

const Filter = ({ onFilter }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useFilter(onFilter);

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(1,1fr)",
            sm: "repeat(4, 1fr)",
          },
          rowGap: 3,
          columnGap: 3,
          marginBottom: "2rem",
        }}
      >
        <CustomRHFDatePicker
          label={translate("adminFinancial.payout.pickStartDate")}
          name="start_date"
          size="small"
        />
        <CustomRHFDatePicker
          label={translate("adminFinancial.payout.pickEndDate")}
          name="end_date"
          size="small"
        />

        <PaymentTypes />

        <Button type="submit" variant="contained" size="medium">
          Get Report
        </Button>
      </Box>
    </FormProvider>
  );
};

export default Filter;
