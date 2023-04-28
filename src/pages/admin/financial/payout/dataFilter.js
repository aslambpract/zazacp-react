import { Box, Grid } from "@mui/material";

import GetReport from "src/components/getReport";
import { FormProvider, RHFSelect } from "src/components/hook-form";
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
              label={translate("adminFinancial.payout.pickStartDate")}
              name="start_date"
              size="small"
            />
            <RHFDatePicker label={translate("adminFinancial.payout.pickEndDate")} name="end_date" size="small" />
            <Users label={translate("adminFinancial.payout.userName")} name="user_id" size="small" />
            <RHFSelect name="status" label={translate("adminFinancial.payout.status")} size="small">
              <option value="" />
              <option value="approved">{translate("adminFinancial.payout.approved")}</option>
              <option value="rejected">{translate("adminFinancial.payout.rejected")}</option>
              <option value="pending">{translate("adminFinancial.payout.pending")}</option>
              <option value="failed">{translate("adminFinancial.payout.failed")}</option>
            </RHFSelect>
            <GetReport />
          </Box>
        </FormProvider>
      </Grid>
    </>
  );
};

export default DataFilter;
