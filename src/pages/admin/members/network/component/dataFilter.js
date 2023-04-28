import { Box, Grid, Typography } from "@mui/material";

import GetReport from "src/components/getReport";
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from "src/components/hook-form";
import Users from "src/components/users";
import useFilter from "./hooks/useFilter";
import useLocales from "src/hooks/useLocales";

const DataFilter = ({ fetchData }) => {
  const { translate } = useLocales();
  const { methods, onSubmit } = useFilter(fetchData);

  return (
    <>
      <Grid item xs={12} md={12} sx={{ p: 2, mb: 2 }}>
        <Typography sx={{ p: 1, mb: 1 }} variant="subtitle2">
         {translate("adminMembersManagement.networkMembers.users")} 
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
            <Users label={translate("adminMembersManagement.networkMembers.userName")} name="user_id" size="small" />
            <RHFTextField name="email" label={translate("adminMembersManagement.networkMembers.email")} size="small" />

            <RHFSelect name="rank_id" label={translate("adminMembersManagement.networkMembers.rank")} size="small">
              <option value="" />

              <option value="1"> {translate("adminMembersManagement.networkMembers.customer")}</option>
              <option value="2" selected="">
              {translate("adminMembersManagement.networkMembers.activeCustomer")} 
              </option>
              <option value="3"> {translate("adminMembersManagement.networkMembers.businessBuilder")}</option>
              <option value="4">{translate("adminMembersManagement.networkMembers.bronzeExecutive")} </option>
              <option value="5"> {translate("adminMembersManagement.networkMembers.silverExecutive")}</option>
              <option value="6"> {translate("adminMembersManagement.networkMembers.goldExecutive")}</option>
              <option value="7"> {translate("adminMembersManagement.networkMembers.emeraldExecutive")}</option>
            </RHFSelect>
            <RHFSelect name="active" label={translate("adminMembersManagement.networkMembers.active")} size="small">
              <option value="" />
              <option value={1}>{translate("adminMembersManagement.networkMembers.active")}</option>
              <option value={0}>{translate("adminMembersManagement.networkMembers.blocked")}</option>
            </RHFSelect>
            <GetReport />
          </Box>
        </FormProvider>
      </Grid>
    </>
  );
};

export default DataFilter;
