import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormProvider } from "src/components/hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import useLocales from "src/hooks/useLocales";
import Users from "src/pages/admin/communications/help-center/ticket/components/form/components/users";

const defaultValues = {
  start_date: "",
  end_date: "",
  user_id: "",
};

const Filter = ({ setFilter }) => {
  const methods = useForm({ defaultValues });
  const { translate } = useLocales();
  const onSubmit = (data) => {
    setFilter(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
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
        <RHFDatePicker
          label={translate("adminFinancial.payout.pickStartDate")}
          name="start_date"
          size="small"
        />
        <RHFDatePicker
          label={translate("adminFinancial.payout.pickEndDate")}
          name="end_date"
          size="small"
        />

        <Users />

        <Button type="submit" variant="contained" size="medium">
          Get Report
        </Button>
      </Box>
    </FormProvider>
  );
};

export default Filter;
