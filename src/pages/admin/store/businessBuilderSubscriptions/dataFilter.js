import { Box, Grid, Typography } from "@mui/material";
import GetReport from "src/components/getReport";
import { FormProvider, RHFTextField } from "src/components/hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import Users from "src/components/users";
import useFilter from "./hooks/useFilter";
import useLocales from "src/hooks/useLocales";


const DataFilter = ({ fetchData }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useFilter(fetchData);

  return (
    <>
      <Grid item xs={12} md={12}>
        <Typography sx={{ p: 1, mb: 1 }} variant="subtitle2">
          {translate("adminStore.businessBuilder.businessBuilderSubscriptionSales")}
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              display: "grid",
              columnGap: 2,
              rowGap: 3,
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                sm: "repeat(5, 1fr)",
              },
            }}
          >
            <RHFDatePicker
              label={translate("adminStore.businessBuilder.pickStartDate")}
              name="start_date"
              size="small"
            />
            <RHFDatePicker label={translate("adminStore.businessBuilder.pickEndDate")} name="end_date" size="small" />
            <Users name="username" label={translate("adminStore.businessBuilder.userName")} size="small" />
            <RHFTextField name="email" label={translate("adminStore.businessBuilder.email")} size="small" />
            <GetReport />
          </Box>
        </FormProvider>
      </Grid>
    </>
  );
};

export default DataFilter;
