import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import GetReport from "src/components/getReport";

import { FormProvider, RHFTextField } from "src/components/hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import Product from "src/components/Product";
import Users from "src/components/users";
import objectToQueryString from "src/utils/objectToQueryString";
import useLocales from "src/hooks/useLocales";

const ReportCard = ({ fetchData }) => {
  const { translate } = useLocales();
  const defaultValues = {
    start_date: "",
    end_date: "",
    user_id: "",
    email: "",
    product_id: "",
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (inputData) => fetchData(objectToQueryString(inputData));

  return (
    <Box
      sx={{
        mb: 3,
      }}
    >
      <Grid item xs={12} md={12}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(6, 1fr)",
              },
           
            }}
          >
            <RHFDatePicker
              name="start_date"
              label={translate("adminStore.assignSubscriptions.pickStartDate")}
              size="small"
            />
            <RHFDatePicker name="end_date" label={translate("adminStore.assignSubscriptions.pickEndDate")} size="small" />
            <Users name="user_id" label={translate("adminStore.assignSubscriptions.user")} size="small" />
            <RHFTextField name="email" label={translate("adminStore.assignSubscriptions.email")} size="small" />
            <Product size="small" />
            <GetReport />
          </Box>
        </FormProvider>
      </Grid>
    </Box>
  );
};

export default ReportCard;
