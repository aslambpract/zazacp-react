import { Box, Grid } from "@mui/material";

import GetReport from "src/components/getReport";
import { FormProvider } from "src/components/hook-form";
import RHFDatePicker from "src/components/hook-form/RHFDatePicker";
import Users from "src/components/users";
import useFilter from "src/hooks/useFilter";
import useLocales from "src/hooks/useLocales";

const DataFilter = ({ fetchData }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useFilter(fetchData);

  return (
    <>
      <Grid item xs={12} md={12} sx={{ p: 2, mb: 2, mt: 1 }}>
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
              label={translate("adminFinancial.Ewallet.pickStartDate")}
              name="start_date"
              size="small"
            />
            <RHFDatePicker label={translate("adminFinancial.Ewallet.pickEndDate")} name="end_date" size="small" />
            <Users label={translate("adminFinancial.Ewallet.userName")} name="user_id" size="small" />
            <GetReport size="medium" />
          </Box>
        </FormProvider>
      </Grid>
    </>
  );
};

export default DataFilter;
